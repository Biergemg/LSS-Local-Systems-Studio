/* Frases de la oferta operativa: un solo punto de control. Cambiar cualquiera de ellas requiere confirmación previa de la titular del sitio. */

export const CLAIMS = {
  /* Cupo semanal de diagnósticos o plazo de respuesta: no se publica hasta que exista una política operativa verificable. */
  quota: { status: 'pending', published: '' },
  /* Agenda: solo enlace a una plataforma existente; cualquier implementación nueva se define en la propuesta. */
  calendar: {
    status: 'conditional',
    published:
      'Si ya utilizas una plataforma de citas, podemos enlazarla desde tu sitio. Si necesitas implementar una, definimos la herramienta, su configuración y sus confirmaciones en la propuesta antes de contratarla.',
  },
} as const;
