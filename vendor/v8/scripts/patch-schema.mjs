
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=(x)=>JSON.parse(fs.readFileSync(path.join(root,'templates',x),'utf8'));
const save=(x,j)=>fs.writeFileSync(path.join(root,'templates',x),JSON.stringify(j,null,2)+'\n','utf8');
const i=read('input_schema.json');
Object.assign(i.properties,{
 tipo_sitio:{type:'string',enum:['landing','multipagina','webapp','ecommerce','existente'],description:'Permitir IA multipágina, no asumir landing única'},
 plataforma_existente:{type:'string',description:'Shopify/WordPress/Webflow/CMS/Next/Astro preexistente'},
 referencias_creativas:{type:'array',items:{type:'string'},description:'URLs verificables de excelencia visual; no clonar'},
 ambicion_visual:{type:'string',enum:['alta_editorial','alta_interactiva','minimal_fina','funcional_local']},
 firma_funcional_deseada:{type:'string',description:'Una interacción real que demuestre oferta o facilite decisión'},
 presupuesto_motion:{type:'string',enum:['bajo','medio','alto']},
 permiso_uso_assets:{type:'string',description:'Licencias y límites de imágenes/video/marcas'},
 restricciones_de_publicacion:{type:'string',description:'Permisos de compra/publicación y acceso'}
});
save('input_schema.json',i);
const o=read('output_schema.json');
o.properties.G.properties.art_direction_reference={type:'string',description:'Ruta ART_DIRECTION.md y keyframes 390/1440'};
o.properties.G.properties.signature_interaction={type:'string',description:'Firma funcional, estados y fallback'};
o.properties.H.properties.qa_evidence_reference={type:'string',description:'QA_EVIDENCE.md y capturas reales de prueba'};
o.properties.L.properties.gate_status={type:'object',description:'Estado por G0-G9 con prueba objetiva',additionalProperties:{type:'string'}};
save('output_schema.json',o);
console.log('INPUT_OUTPUT_SCHEMAS_UPDATED');
