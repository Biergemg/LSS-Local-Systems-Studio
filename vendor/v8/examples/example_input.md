# Ejemplo de Input — Clínica Dental Madrid

## Ficha del negocio

```json
{
  "negocio": "Clínica Dental Vera",
  "nicho": "clínica dental",
  "zona_geografica": "Madrid, barrio de Salamanca",
  "oferta_principal": "Blanqueamiento dental, ortodoncia invisible Invisalign y limpieza profesional para adultos entre 25 y 50 años que quieren mejorar su sonrisa sin cirugías invasivas",
  "servicios": [
    "Blanqueamiento dental profesional",
    "Ortodoncia invisible Invisalign",
    "Limpieza y profilaxis dental",
    "Revisión y diagnóstico inicial gratuito",
    "Implantes dentales"
  ],
  "buyer": {
    "descripcion": "Adulto entre 28 y 48 años, con ingresos medios-altos, que ha postergado el cuidado dental por miedo, precio o falta de tiempo. Busca un resultado visible, no solo salud.",
    "resultado_buscado": "Sonrisa visiblemente mejor sin procedimientos dolorosos ni largos plazos de espera",
    "objecion_principal": "Miedo al dolor y desconfianza sobre el precio real del tratamiento"
  },
  "conversion_primaria": "whatsapp",
  "conversion_secundaria": "formulario",
  "mecanismo_confianza": {
    "testimonios": [
      {
        "autor": "Laura M.",
        "texto": "Llevaba 3 años con el freno invisible y Clínica Vera fue la única que me explicó el proceso sin presionarme.",
        "resultado": "Ortodoncia completada en 14 meses"
      },
      {
        "autor": "Carlos R.",
        "texto": "El blanqueamiento fue indoloro y el resultado duró más de lo que esperaba.",
        "resultado": "Blanqueamiento 6 tonos en una sesión"
      }
    ],
    "anos_experiencia": 12,
    "certificaciones": ["Invisalign Certified Provider"],
    "garantia": "Revisión gratuita a los 3 meses del tratamiento"
  },
  "infraestructura_hint": "B",
  "identidad_visual": {
    "paleta_oficial": null,
    "tipografia_oficial": null,
    "logo_disponible": true,
    "assets_disponibles": "fotos_mediocres"
  },
  "datos_contacto": {
    "telefono": "+34 91 000 0000",
    "whatsapp": "+34 600 000 000",
    "email": "hola@clinicavera.es",
    "direccion": "Calle Serrano 42, Madrid 28001",
    "horarios": "Lunes a viernes 9:00-20:00, Sábados 9:00-14:00",
    "redes_sociales": {
      "instagram": "https://instagram.com/clinicavera",
      "facebook": null
    }
  },
  "competencia": "Clínicas de cadena tipo Vitaldent y Dentix que ofrecen precios bajos pero sin personalización. Diferenciación: trato personalizado, espera real explicada, sin ventas agresivas.",
  "cinematic_mode": false,
  "notas_adicionales": "El cliente quiere que se note que es una clínica boutique, no una franquicia. Primera revisión gratuita es el gancho principal."
}
```

## Notas de uso

- `infraestructura_hint: "B"` es una sugerencia. V8 confirmará o cambiará según criterio técnico.
- `assets_disponibles: "fotos_mediocres"` activa la política de evidencia visual: V8 diseñará el sistema visual para funcionar sin depender de esas fotos.
- `cinematic_mode: false` porque el nicho (salud) requiere claridad y confianza antes que dramatismo visual.
- La conversión primaria es WhatsApp porque el proceso de compra de ortodoncia requiere conversación previa, no formulario frío.
