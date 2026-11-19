<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { business, gallery, promotions, services, whatsappUrl } from './siteContent.js'

const logoSquare = `${import.meta.env.BASE_URL}A%20tu%20pinta_01-imagotipo.png`
const logoLight = `${import.meta.env.BASE_URL}A%20tu%20pinta_11-variables-fondo-color-E55151v.png`
const menuOpen = ref(false)
const theme = ref('light')
const themeIcon = computed(() => theme.value === 'light' ? '☀️' : '🌙')
const themeLabel = computed(() => theme.value === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro')
const reviewsConfigured = computed(() => Boolean(business.googleReviewsUrl))
let revealObserver

function setTheme(nextTheme, persist = true) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'dark' ? '#222237' : '#fbf8f6')
  if (persist) {
    try { localStorage.setItem('atupinta-theme', nextTheme) } catch { /* El tema funciona aunque el almacenamiento esté bloqueado. */ }
  }
}

function toggleTheme() {
  setTheme(theme.value === 'light' ? 'dark' : 'light')
}

function closeMenu() {
  menuOpen.value = false
}

function hideBrokenImage(event) {
  event.target.style.display = 'none'
}

onMounted(() => {
  let savedTheme
  try { savedTheme = localStorage.getItem('atupinta-theme') } catch { /* Usa la preferencia del sistema. */ }
  const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  setTheme(preferredTheme, Boolean(savedTheme))

  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    }), { threshold: 0.12 })
    document.querySelectorAll('.service-card, .section-heading, .gallery-item, .art-copy, .art-visual, .contact-inner, .about-card, .presson-copy, .promo-card, .review-card').forEach(element => {
      element.classList.add('reveal')
      revealObserver.observe(element)
    })
  }
})

onUnmounted(() => revealObserver?.disconnect())
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#inicio" aria-label="A Tu Pinta Manicure, inicio" @click="closeMenu"><img :src="logoSquare" alt="A Tu Pinta Manicure" /></a>
    <nav class="nav-links" :class="{ 'nav-open': menuOpen }" aria-label="Navegación principal">
      <a href="#servicios" @click="closeMenu">Servicios</a>
      <a href="#nail-art" @click="closeMenu">Nail Art</a>
      <a href="#press-on" @click="closeMenu">Press On</a>
      <a href="#beneficios" @click="closeMenu">Beneficios</a>
      <a href="#contacto" @click="closeMenu">Contacto</a>
      <a class="nav-book" :href="whatsappUrl('booking')" target="_blank" rel="noreferrer">Reserva tu hora <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a>
    </nav>
    <div class="header-actions">
      <button class="theme-toggle" type="button" :aria-label="themeLabel" :title="themeLabel" @click="toggleTheme">{{ themeIcon }}</button>
      <button class="menu-toggle" :aria-expanded="menuOpen" :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'" @click="menuOpen = !menuOpen"><span></span><span></span></button>
    </div>
  </header>

  <main>
    <section class="hero" id="inicio" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> MANICURE · NAIL ART · HECHO CON CARIÑO</p>
        <h1 id="hero-title">Tus uñas,<br />a <em>tu pinta.</em></h1>
        <p class="hero-intro">Diseños personalizados para expresarte: manicure y Nail Art en Macul y Santiago, más Press On Nails con envíos a todo Chile.</p>
        <div class="hero-actions"><a class="button button-coral" :href="whatsappUrl('booking')" target="_blank" rel="noreferrer">Consulta por WhatsApp <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a><a class="text-link" href="#nail-art">Descubre el Nail Art <span>↓</span></a></div>
        <a class="hero-shipping-link" href="#press-on"><span>📦</span> Press On personalizadas · envío a todo Chile <b>↗</b></a>
        <div class="hero-note"><span class="note-spark">✳</span><span>Tu idea es el punto de partida<br /><b>creado a tu pinta</b></span></div>
      </div>
      <div class="hero-art" aria-label="Inspiración visual de manicure y Nail Art">
        <div class="hero-image-wrap"><img class="hero-image" src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=88" alt="Inspiración de uñas decoradas con manicure en tonos pastel" fetchpriority="high" decoding="async" @error="hideBrokenImage" /><div class="image-stamp">color<br /><i>your</i><br />world</div></div>
        <div class="scribble scribble-one">✳</div><div class="scribble scribble-two">♡</div>
        <div class="hero-caption"><span>01 / 05</span><span>UNA IDEA, MIL FORMAS</span><span class="caption-line"></span></div>
      </div>
      <div class="hero-bg-word" aria-hidden="true">A TU PINTA</div>
      <a class="scroll-cue" href="#sobre-mi"><span></span> DESLIZA PARA DESCUBRIR</a>
    </section>

    <section class="about-section section-pad" id="sobre-mi" aria-labelledby="about-title">
      <div class="about-card"><div class="about-symbol" aria-hidden="true">♡</div><div><p class="eyebrow"><span></span> UN ESPACIO PARA EXPRESARTE</p><h2 id="about-title">Hola, soy <em>A Tu Pinta.</em></h2></div><p class="about-copy">Creo en esos detalles que hacen que algo se sienta tuyo. Cada diseño empieza escuchando tus ideas y buscando juntas la combinación, el color y el estilo que mejor te representa.</p><div class="about-signature">Tu idea + un poquito de color <span>✳</span></div></div>
    </section>

    <section class="services section-pad" id="servicios" aria-labelledby="services-title">
      <div class="section-heading"><div><p class="eyebrow"><span></span> MANICURE EN MACUL Y SANTIAGO · PRESS ON A TODO CHILE</p><h2 id="services-title">Pequeños detalles,<br /><em>grandes momentos.</em></h2></div><p class="section-intro">Nail Art personalizado, manicure creativa y sets que pueden llegar hasta donde estés.</p></div>
      <div class="service-grid"><article v-for="service in services" :key="service.number" class="service-card" :class="{ 'service-featured': service.featured }"><div class="service-top"><span>{{ service.number }}</span><span class="service-icon">{{ service.icon }}</span></div><h3>{{ service.title }}</h3><p>{{ service.text }}</p><a :href="whatsappUrl(service.message)" target="_blank" rel="noreferrer" :aria-label="`Consultar por ${service.title}`">Consultar <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a></article></div>
      <p class="service-footnote">¿Tienes una idea en mente? <a :href="whatsappUrl('nailArt')" target="_blank" rel="noreferrer">Conversemos tu diseño <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a></p>
    </section>

    <section class="presson-section section-pad" id="press-on" aria-labelledby="presson-title">
      <div class="presson-image"><img src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=84" alt="Inspiración para sets Press On Nails personalizados" loading="lazy" decoding="async" @error="hideBrokenImage" /><span class="presson-image-note">TU NAIL ART FAVORITO,<br /><em>ESTÉS DONDE ESTÉS</em></span></div>
      <div class="presson-copy"><p class="eyebrow"><span></span> PRESS ON NAILS PERSONALIZADAS</p><h2 id="presson-title">Tu Nail Art favorito,<br /><em>estés donde estés.</em></h2><p>¿No estás en Santiago? No importa. Creamos sets de uñas postizas con diseños personalizados y los enviamos a todo Chile para que puedas llevar tu estilo a cualquier región.</p><div class="shipping-card"><div class="shipping-heading"><span aria-hidden="true">📦</span><strong>ENVÍOS A TODO CHILE</strong></div><p>Starken <i>·</i> Blue Express <i>·</i> envío por pagar</p></div><p class="shipping-detail">Coordinamos el despacho contigo por WhatsApp. El valor del envío se paga al transportista.</p><a class="button button-coral" :href="whatsappUrl('pressOn')" target="_blank" rel="noreferrer">Quiero mis Press On ✨ <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a><a class="text-link presson-secondary" :href="whatsappUrl('shipping')" target="_blank" rel="noreferrer">Consultar por envíos a regiones</a></div>
    </section>

    <section class="art-section" id="nail-art" aria-labelledby="nail-title">
      <div class="art-orbit orbit-a"></div><div class="art-orbit orbit-b"></div>
      <div class="art-copy"><p class="eyebrow eyebrow-light"><span></span> TU IDEA ES EL PUNTO DE PARTIDA</p><h2 id="nail-title">Un lienzo<br />en <em>miniatura.</em></h2><p>Desde lo delicado y minimalista hasta ese diseño que no pasa desapercibido. Conversamos, mezclamos referencias y creamos algo que hable de ti.</p><a class="button button-white" :href="whatsappUrl('nailArt')" target="_blank" rel="noreferrer">Conversemos tu diseño <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a><div class="art-tags"><span>✳ Minimal</span><span>✳ Ilustrado</span><span>✳ Temático</span><span>✳ A tu pinta</span></div></div>
      <div class="art-visual"><div class="art-photo"><img src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85" alt="Inspiración de Nail Art con uñas decoradas y coloridas" loading="lazy" decoding="async" @error="hideBrokenImage" /><span class="art-photo-label">IDEAS QUE SE VUELVEN TUYAS</span></div><div class="art-side-note">COLOR<br /><em>+ personalidad</em></div><span class="art-star">✳</span></div>
    </section>

    <section class="gallery-section section-pad" id="galeria" aria-labelledby="gallery-title">
      <div class="section-heading gallery-heading"><div><p class="eyebrow"><span></span> UN MOODBOARD PARA EMPEZAR</p><h2 id="gallery-title">Guarda la idea.<br /><em>Hagámosla tuya.</em></h2></div><p class="section-intro">Inspiración de uñas minimalistas, coloridas y artísticas para imaginar tu próximo diseño.</p></div>
      <div class="gallery-grid"><figure v-for="(item, index) in gallery" :key="item.src" class="gallery-item" :class="`gallery-${item.shape}`"><div class="gallery-photo"><img :src="item.src" :alt="item.alt" loading="lazy" decoding="async" @error="hideBrokenImage" /><span class="gallery-index">0{{ index + 1 }}</span></div><figcaption>{{ item.label }}<span>↗</span></figcaption></figure></div>
      <p class="gallery-disclaimer"><span>✳</span> Imágenes referenciales de inspiración. No corresponden a trabajos propios.</p>
      <div class="gallery-cta"><span>¿Ya tienes una referencia guardada?</span><a class="text-link" :href="whatsappUrl('nailArt')" target="_blank" rel="noreferrer">Envíamela por WhatsApp <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a></div>
    </section>

    <section class="promotions-section section-pad" id="beneficios" aria-labelledby="promotions-title">
      <div class="section-heading"><div><p class="eyebrow"><span></span> BUENAS IDEAS, BUENOS ENCUENTROS</p><h2 id="promotions-title">Promociones<br /><em>& beneficios.</em></h2></div><p class="section-intro">Un beneficio para la comunidad PUC, un detalle para recomendar y un espacio para crear juntas.</p></div>
      <div class="promo-grid"><article v-for="promo in promotions" :key="promo.id" class="promo-card" :class="promo.style"><div class="promo-card-top"><span class="promo-icon" aria-hidden="true">{{ promo.icon }}</span><span class="promo-badge">{{ promo.badge }}</span></div><p class="promo-eyebrow">{{ promo.eyebrow }}</p><h3>{{ promo.title }}</h3><p class="promo-description">{{ promo.text }}</p><a class="promo-link" :href="whatsappUrl(promo.message)" target="_blank" rel="noreferrer">{{ promo.action }} <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a></article></div>
      <p class="promo-note">Los beneficios se coordinan directamente por WhatsApp. La recomendación se registra manualmente.</p>
    </section>

    <section class="reviews-section section-pad" id="resenas" aria-labelledby="reviews-title">
      <div class="review-card"><div class="review-star" aria-hidden="true">✳</div><div class="review-copy"><p class="eyebrow"><span></span> TU OPINIÓN ME AYUDA A CRECER</p><h2 id="reviews-title">¿Te gustó tu experiencia<br /><em>en A Tu Pinta?</em> 💗</h2><p>Tu opinión ayuda a que nuevas personas conozcan la marca y me permite seguir creando diseños que te encanten. Si ya probaste mis servicios, me encantaría conocer tu experiencia, tal como fue.</p><a v-if="reviewsConfigured" class="button button-coral" :href="business.googleReviewsUrl" target="_blank" rel="noreferrer">Dejar mi reseña ⭐</a><button v-else class="button button-review-disabled" type="button" disabled title="El enlace de reseñas de Google se configurará aquí">Dejar mi reseña ⭐</button><small v-if="!reviewsConfigured">El enlace directo de Google se habilitará aquí cuando esté configurado.</small></div><div class="review-decoration" aria-hidden="true">♡</div></div>
    </section>

    <section class="contact-section" id="contacto" aria-labelledby="contact-title"><div class="contact-inner"><div class="contact-mark" aria-hidden="true">✳</div><p class="eyebrow eyebrow-light"><span></span> TU PRÓXIMA IDEA EMPIEZA AQUÍ</p><h2 id="contact-title">¿Qué hacemos<br /><em>a tu pinta?</em></h2><p>Manicure y Nail Art en Macul y Santiago. Press On Nails con envíos nacionales.</p><a class="button button-white contact-button" :href="whatsappUrl('general')" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20l.9-4.7a8.5 8.5 0 1 1 16.6-3.6Z"/><path d="M8.5 8.1c.3-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.3.4.5 0 .4-.2 1.1-.7 1.5-.5.5-1.2.7-2 .6-1.2-.2-2.8-.9-4.2-2.3-1.4-1.4-2.2-3-2.3-4.2-.1-.6.2-1.2.6-1.4Z"/></svg> Consultar por WhatsApp <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg></a><span class="contact-number">{{ business.phoneDisplay }}</span><div class="contact-socials"><a :href="business.instagramUrl" target="_blank" rel="noreferrer">Instagram <span>{{ business.instagramHandle }}</span> ↗</a><a :href="`mailto:${business.email}`">Correo <span>{{ business.email }}</span> ↗</a></div></div><div class="contact-doodle doodle-left" aria-hidden="true">♡</div><div class="contact-doodle doodle-right" aria-hidden="true">✳</div></section>
  </main>

  <footer class="site-footer"><a href="#inicio" class="footer-logo"><img :src="logoLight" alt="A Tu Pinta Manicure" /></a><p>Manicure con personalidad.<br /><em>Hecho a tu pinta.</em></p><div class="footer-links"><a :href="business.instagramUrl" target="_blank" rel="noreferrer">Instagram <span>{{ business.instagramHandle }}</span> ↗</a><a :href="`mailto:${business.email}`">Correo <span>{{ business.email }}</span> ↗</a><a :href="whatsappUrl('general')" target="_blank" rel="noreferrer">WhatsApp <span>{{ business.phoneDisplay }}</span> ↗</a></div><div class="footer-bottom"><span>© {{ new Date().getFullYear() }} A Tu Pinta Manicure</span><a href="#inicio">Volver arriba ↑</a><span>Hecho con cariño en Chile ♡</span></div></footer>
  <a class="whatsapp-float" :href="whatsappUrl('general')" target="_blank" rel="noreferrer" aria-label="Escribir a A Tu Pinta por WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20l.9-4.7a8.5 8.5 0 1 1 16.6-3.6Z"/><path d="M8.5 8.1c.3-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.3.4.5 0 .4-.2 1.1-.7 1.5-.5.5-1.2.7-2 .6-1.2-.2-2.8-.9-4.2-2.3-1.4-1.4-2.2-3-2.3-4.2-.1-.6.2-1.2.6-1.4Z"/></svg><span>¿Hablamos?</span></a>
</template>
