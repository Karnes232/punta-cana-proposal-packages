# Experience Catalog — entrega y operación

## Alcance

Nueva estructura vacía EN/ES, administrable desde Sanity. No se migran ni se borran productos automáticamente. No hay nombres, fotografías, menús ni precios comerciales inventados. Única configuración aprobada: cena USD 849, 2 invitados, 120 minutos, inicialmente inactiva.

## Auditoría del 29 de septiembre de 2026

Repositorio: Karnes232/punta-cana-proposal-packages, base c206e1c. Sanity: czmzv5on / production. Exportación autenticada: 526 documentos, incluidos 3 borradores y documentos de sistema; consulta pública: 512 documentos. Hay 17 propuestas anteriores, 289 assets de imagen y 140 posts publicados. Respaldo JSON fuera de Git; conserva documentos y referencias de assets, no sus binarios. No se eliminó contenido.

Mapeo previsto para migración posterior:

- IndividualProposalPackage: nombre, descripción, fotos y SEO hacia proposalExperience; revisar cada precio y variante antes de migrar.
- HomePageHero y ContactPageContent: revisar contenido aprobado para catalogHome y catalogContact. generalLayout sigue proporcionando logo, contacto y redes.
- Assets existentes: reutilizar referencias después de verificar relación con cada experiencia, derechos y texto alternativo.
- PageSeo: se preserva para Home y Contact como respaldo hasta completar el SEO nuevo. Blogs, FAQ, Legal y URLs anteriores permanecen disponibles.
- Al menos un slug anterior contiene texto concatenado del botón. No corregirlo sin registrar su URL original y preparar redirección individual.

## Editar contenido

Studio → EXPERIENCES contiene Proposals, Romantic Dinner, Add-ons, Menu, Occasions, Beverages y Catalog Settings. WEBSITE contiene Home, Contact, información institucional, FAQ, Blog, Legal y SEO anterior.

Crear un documento inactivo, completar EN/ES, slug, precio, 3–5 imágenes con alt y estilos reales. Crear extras globales y referenciarlos desde la experiencia. Configurar displayOrder. Activar y publicar: aparecerá sin cambiar código (caché máxima de 60 segundos). Los borradores y los documentos inactivos no aparecen en el catálogo.

Los estilos de propuesta tienen precio completo; los estilos de cena no tienen precio. Para cena configurar también maximumGuests y maximumDurationMinutes; si hay invitados adicionales, indicar additionalGuestPrice. No se inventaron estos límites. Cada persona selecciona sus propios platos. Opciones sin configurar no se rellenan automáticamente.

Los singletons se editan desde el menú, sin crear duplicados. Etiquetas funcionales tienen respaldo bilingüe editable; el contenido comercial se carga desde el CMS. Para inicialización automatizada, copiar .env.example a .env.local y configurar temporalmente SANITY_API_WRITE_TOKEN. npm run catalog:bootstrap usa createIfNotExists: no reemplaza documentos. El script detecta cualquier cena existente y evita crear otra.

## Cálculo

Propuesta = precio completo del estilo seleccionado (o base si no hay estilos) + extras. Nunca base + precio del estilo.
Cena = base + invitados adicionales + suplementos de platos por persona + suplementos de bebidas + extras. Cambiar estilo no añade precio. Las bebidas se seleccionan para la reserva, no por persona.
fixed: una unidad; perPerson: precio por invitado; perUnit: unidades; perHour: horas enteras; per30Minutes: bloques de 30 minutos. quoteOnly no inventa importe: muestra que requiere cotización. durationMinutesPerUnit suma tiempo únicamente en extras que amplían la experiencia; un fotógrafo por hora no amplía automáticamente la duración. La suma de todos los extras respeta el máximo.
Los importes se calculan en centavos. El servidor vuelve a consultar Sanity sin CDN/caché, valida referencias activas, curso de platos, límites y cantidades. Ignora cualquier total enviado por el navegador.

## Solicitudes y contacto

POST /api/experience-requests guarda contacto y configuración recalculada en Netlify Blobs, store experience-requests. Los hosts deploy-preview-N--sitio.netlify.app escriben en experience-requests-preview para separar las pruebas de las solicitudes reales. El equipo consulta los registros desde el proyecto Netlify → Blobs. No existe endpoint público para leerlos. La función solo confirma éxito después de persistir. No se configura envío de email ni pago.
Netlify suministra las credenciales al runtime de Next.js. No se guardan datos personales en el dataset público de Sanity; su plan Free actual no permite dataset privado. No hace falta ampliar el plan de Sanity.

Validar un envío en Deploy Preview con datos de prueba autorizados antes de activar producción, y confirmar el registro desde Netlify. Con next dev sin contexto Netlify, el endpoint devuelve 503. npm test prueba persistencia y fallos con almacenamiento simulado. El límite de solicitudes por IP es local al proceso, no un rate limit distribuido; para tráfico abusivo configurar protección de Netlify.
Documentación: https://docs.netlify.com/build/data-and-storage/netlify-blobs/ y https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/

## SEO y publicación

Stories, How It Works y categorías anteriores se retiraron de Home, Navbar, menú móvil, Footer y menú principal de Studio. Sus rutas y esquemas siguen disponibles para preservar enlaces y documentos. No se publican redirects masivos hacia Home.
Antes de retirar cada URL: exportar Search Console (clics/impresiones/indexación), Analytics (entradas/conversiones), backlinks y canonicals; elegir sustituto equivalente y registrar old→new; aplicar 301 y actualizar sitemap/enlaces, verificar respuesta final y ausencia de cadenas. Si no existe equivalente, decidir conservación o retiro explícito. Esta revisión de tráfico/backlinks aún está pendiente.
Nuevas rutas: /proposals, /romantic-dinners, /contact y /es equivalentes. Detalles con slug, canonical EN/ES, hreflang y Service JSON-LD. Experiencias noIndex excluidas del sitemap.

## Verificación y activación

28 pruebas automatizadas: precios, IDs inválidos, límites, duración, menús, estilos, extras conservados, galería por teclado, EN/ES, estados vacíos y persistencia. Revisión visual desktop y móvil de 390 px. TypeScript/ESLint y build de producción.
Antes de merge/despliegue: revisar catálogo vacío, Studio y persistencia real en Netlify; confirmar que la cena inicial está guardada como borrador inactivo. No se publicaron productos de prueba. La rama no cambia producción hasta integrarse y desplegarse.

Cena inicial guardada y verificada tras recarga en Sanity: drafts.8d9e1e5f-d981-4276-ab95-8d88a3ebd429. Inactiva, sin publicar; 849 USD, 2 invitados, 120 minutos. No se creó ningún token ni se modificó CORS.

## Plantilla solicitada e integración visual

Se recupera la identidad existente: negro #0b0b0c, dorado #cfae70, marfil #f7f5f1, Playfair e Inter, navbar negro, botones y bordes dorados.
En /romantic-dinners de localhost y Deploy Preview aparece una plantilla interactiva marcada como no reservable. Nunca se añade al catálogo público de producción. Incluye 3 espacios de montaje sin fotos inventadas, 2 opciones de plantilla por cada tiempo (entrada, plato principal y postre), selección independiente por invitado, transporte desde toda Punta Cana y 4 extras indicados por el usuario: rosas, espumantes premium, chocolates y neón Happy Anniversary. Extras sin precio: quoteOnly.
Studio → Dinner template guarda de forma idempotente la cena y 10 documentos relacionados en borrador (6 espacios de platos + 4 extras), sin sobrescribir campos existentes. Ya se ejecutó y confirmó. Los montajes, platos y extras están inactivos; reemplazar las etiquetas de plantilla, cargar fotos reales y confirmar precios/disponibilidad antes de activar. Los límites de 2 personas y 120 minutos del ejemplo son exclusivamente para probar la base aprobada: no se guardaron como máximos comerciales en Sanity.
El servidor exige que estén configurados los tres tiempos antes de admitir una solicitud real de cena. Cada invitado debe elegir entrada, principal y postre.

## Plantilla de propuesta de matrimonio

Studio → Proposal template crea un borrador inactivo proposal-initial-template y tres extras relacionados, sin sobrescribir documentos publicados ni borradores existentes. Incluye tres estilos por completar, tres espacios de fotografía y una inclusión editable. No se asignan precios ni nombres comerciales inventados. La vista previa /proposals muestra el ejemplo interactivo no reservable; estilos y extras funcionan sin presentar precio cero. Las solicitudes reales nunca aceptan el ID de demostración. Sustituir textos, imágenes, inclusiones y precios completos de cada estilo antes de activar y publicar.
