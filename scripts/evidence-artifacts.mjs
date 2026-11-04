import fs from 'node:fs';
import {inflateSync,crc32} from 'node:zlib';
import {evidencePath} from './evidence-source.mjs';

export function validateCommand(root,record) {
 const log=fs.readFileSync(evidencePath(root,record.log),'utf8');
 const metadata=JSON.parse(log.slice(0,log.indexOf('\n')));
 if(record.status!=='PASS'||record.exitCode!==0||!log.endsWith('\nEXIT 0\n')||metadata.sourceCommit!==record.sourceCommit||metadata.executedAt!==record.executedAt||[metadata.executable,...metadata.args].join(' ')!==record.command) throw new Error('COMMAND_LOG_CONTRADICTS_RECORD: '+record.kind);
}
// Decode the complete compressed raster and verify every PNG chunk. An IHDR
// signature alone is insufficient. Playwright screenshots use 8-bit RGB/RGBA.
export function validatePng(bytes,width) {
 if(bytes.length<33||!bytes.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex'))) throw new Error('PNG_INVALID_SIGNATURE');
 let offset=8,header=null,ended=false;const data=[];
 while(offset<bytes.length) {
  if(offset+12>bytes.length) throw new Error('PNG_TRUNCATED_CHUNK');
  const size=bytes.readUInt32BE(offset),end=offset+size+12;
  if(end>bytes.length) throw new Error('PNG_TRUNCATED_DATA');
  const type=bytes.toString('ascii',offset+4,offset+8),body=bytes.subarray(offset+8,end-4);
  if(crc32(bytes.subarray(offset+4,end-4))!==bytes.readUInt32BE(end-4)) throw new Error('PNG_CRC_MISMATCH');
  if(!header&&type!=='IHDR') throw new Error('PNG_IHDR_REQUIRED');
  if(type==='IHDR') {if(header||size!==13)throw new Error('PNG_BAD_IHDR');header=body;}
  if(type==='IDAT') data.push(body);
  offset=end;
  if(type==='IEND'){if(size||offset!==bytes.length)throw new Error('PNG_BAD_IEND');ended=true;break;}
 }
 if(!header||!ended||!data.length||header.readUInt32BE(0)!==width||header[8]!==8||![2,6].includes(header[9])||header[10]||header[11]||header[12]) throw new Error('PNG_RASTER_INCOMPLETE');
 const height=header.readUInt32BE(4),stride=width*(header[9]===6?4:3)+1;
 if(!height||height>20000||width>10000) throw new Error('PNG_DIMENSIONS_INVALID');
 const raster=inflateSync(Buffer.concat(data),{maxOutputLength:stride*height+1});
 if(raster.length!==stride*height) throw new Error('PNG_RASTER_LENGTH_MISMATCH');
 for(let row=0;row<height;row++)if(raster[row*stride]>4)throw new Error('PNG_FILTER_INVALID');
 return height;
}
