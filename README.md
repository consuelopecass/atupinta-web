# A Tu Pinta Manicure

Landing page con Vue 3, Vite y Tailwind CSS, preparada para GitHub Pages. Los textos y datos comerciales se mantienen en `src/siteContent.js`; los tres logos originales están en `public/`.

## Desarrollo local

```sh
npm install
npm run dev
```

## Build y SEO para GitHub Pages

```sh
npm run build
npm run preview
```

El workflow `.github/workflows/deploy.yml` publica `dist/` al actualizar `main`. Infiere la URL estándar de GitHub Pages del repositorio y con ella genera `sitemap.xml`, `robots.txt`, el canonical y el JSON-LD de la organización. Si el sitio usa un dominio propio, define una variable de Actions llamada `SITE_URL` con la URL pública completa y una barra final. El proyecto no fija un dominio antes de conocerlo.

La descripción y el título SEO, Open Graph y la tarjeta X están en `index.html`. El sitemap se crea en el build de publicación, porque requiere la URL pública real. El archivo `robots.txt` base permite el rastreo; el workflow añade la URL del sitemap.

## Google Search Console

1. Publica el sitio y copia su URL real desde GitHub Pages.
2. En [Google Search Console](https://search.google.com/search-console), añade una propiedad. Para una propiedad de prefijo de URL, sigue el método de verificación ofrecido por Google; si eliges DNS, agrega el registro en el proveedor del dominio.
3. Después de publicar, envía `https://TU-SITIO/sitemap.xml` desde el informe **Sitemaps**. También puedes abrir **Inspección de URL**, inspeccionar la página principal y solicitar indexación. La solicitud no garantiza que Google indexe la página ni una posición determinada.
4. Revisa **Rendimiento → Resultados de búsqueda** para consultar consultas, impresiones, clics y posición promedio a medida que Google recopila datos.

Google documenta [el envío de sitemaps](https://support.google.com/webmasters/answer/7451001?hl=es) y la [inspección y solicitud de indexación](https://support.google.com/webmasters/answer/9012289?hl=es).

## Google Business Profile, reseñas y Analytics

- **Google Business Profile:** solo corresponde si el negocio tiene contacto presencial con clientas dentro del modelo permitido por Google. Una tienda que vende únicamente online no califica. Si el servicio se presta a domicilio de las clientas, revisa si corresponde un perfil de área de servicio y oculta la dirección base; no publiques una dirección residencial. Si las clientas van a una dirección de atención, confirma primero la elegibilidad y las reglas de dirección antes de crear el perfil. Google explica [los criterios de elegibilidad](https://support.google.com/business/answer/13763036?hl=es) y [cómo mostrar u ocultar una dirección](https://support.google.com/business/answer/2853879?hl=es).
- **Enlace de reseñas:** cuando tengas tu perfil y el link directo de reseñas, pégalo en `business.googleReviewsUrl` dentro de `src/siteContent.js`. El botón está desactivado hasta entonces; no se muestran testimonios inventados ni se ofrecen incentivos por opinar.
- **Google Analytics:** no se añadió. Para esta landing, Search Console cubre el seguimiento de búsquedas orgánicas sin añadir código de analítica. Puedes integrar Google Analytics 4 más adelante si necesitas métricas de navegación o conversiones.

## Editar datos y contenido

- WhatsApp, Instagram, correo, mensajes precargados y enlace de reseñas: `src/siteContent.js`.
- Servicios, galería y tarjetas de promociones: arreglos en `src/siteContent.js`.
- Colores, responsive y modo oscuro: `src/style.css`.
- Dominio: variable `SITE_URL` en **Settings → Secrets and variables → Actions → Variables** del repositorio, solo si usas un dominio propio.
