export const business = {
  name: 'A Tu Pinta Manicure',
  phone: '56952286717',
  phoneDisplay: '+56 9 5228 6717',
  email: 'atupintamanicure@gmail.com',
  instagramHandle: '@atupinta_manicure',
  instagramUrl: 'https://www.instagram.com/atupinta_manicure/',
  // Completar cuando exista el link directo de reseñas de Google.
  googleReviewsUrl: '',
}

export const messages = {
  general: 'Hola! Llegué desde la página de A Tu Pinta Manicure y quisiera consultar por sus servicios 💅',
  booking: 'Hola! Quisiera consultar por una hora para manicure o Nail Art en Macul o Santiago 💅',
  nailArt: 'Hola! Me gustaría consultar por un diseño de Nail Art personalizado 💅',
  pressOn: 'Hola! Me encantaron las Press On Nails de A Tu Pinta 💗 Quiero consultar por un set personalizado y los envíos a regiones.',
  shipping: 'Hola! Quisiera consultar por un set Press On personalizado y los envíos a todo Chile por Starken o Blue Express 📦',
  puc: 'Hola! Soy estudiante de la PUC San Joaquín y quisiera consultar por el beneficio de 10% OFF en Press On Nails 💅',
  referral: 'Hola! Vengo recomendada por una amiga y quiero consultar por el beneficio de referidos de A Tu Pinta 💗',
  crew: 'Hola! Vi la sección A Tu Pinta Crew y me gustaría saber más sobre las colaboraciones y canjes 💗',
}

export const services = [
  { number: '01', title: 'Manicure', text: 'Manicure presencial en Macul y Santiago, con cuidado y una terminación prolija.', icon: '✳', message: 'booking' },
  { number: '02', title: 'Manicure con Nail Art', text: 'Color y detalles creativos para darle personalidad a tu manicure.', icon: '✧', featured: true, message: 'nailArt' },
  { number: '03', title: 'Diseños personalizados', text: 'Tu idea, tus referencias y una propuesta creada especialmente para ti.', icon: '♡', featured: true, message: 'nailArt' },
  { number: '04', title: 'Nail Art creativo', text: 'Ilustraciones, combinaciones y diseños de uñas únicos, hechos a tu pinta.', icon: '✷', message: 'nailArt' },
  { number: '05', title: 'Press On Nails personalizadas', text: 'Sets de uñas postizas con Nail Art, preparados para ti y con envío a todo Chile.', icon: '📦', featured: true, message: 'pressOn' },
]

export const gallery = [
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=82', alt: 'Inspiración de manicure con uñas decoradas en tonos suaves', label: 'Soft details', shape: 'tall' },
  { src: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=82', alt: 'Ideas de Nail Art colorido y personalizado', label: 'Color play', shape: 'short' },
  { src: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=800&q=82', alt: 'Diseños de uñas con esmalte de color', label: 'Everyday art', shape: 'short' },
  { src: 'https://images.unsplash.com/photo-1619946928632-ab5f1a9d9aab?auto=format&fit=crop&w=900&q=82', alt: 'Inspiración para diseños de uñas únicos', label: 'Made for you', shape: 'tall' },
]

export const promotions = [
  {
    id: 'puc', eyebrow: 'PARA ESTUDIANTES', title: 'Beneficio PUC San Joaquín', badge: '10% OFF',
    text: 'Si estudias en la Pontificia Universidad Católica de Chile, campus San Joaquín, tienes 10% de descuento en Press On Nails. Acredita que eres estudiante al consultar.',
    action: 'Consultar beneficio', message: 'puc', icon: '✳', style: 'promo-lilac',
  },
  {
    id: 'referidos', eyebrow: 'ENTRE AMIGAS', title: 'Clientas fieles & referidos', badge: 'UN DETALLE PARA TI',
    text: 'Recomienda A Tu Pinta a una amiga nueva. Cuando concrete su primera compra, en tu próximo set Press On podrás elegir un detalle de acento sencillo. Cuéntame quién te recomendó y lo anotamos manualmente.',
    action: 'Consultar por referidos', message: 'referral', icon: '♡', style: 'promo-blue',
  },
  {
    id: 'crew', eyebrow: 'CREATIVIDAD EN COMUNIDAD', title: 'A Tu Pinta Crew', badge: 'EMBAJADORAS · CREADORAS',
    text: '¿Te encanta el Nail Art y crear contenido? Buscamos personas creativas para conversar sobre colaboraciones, canjes y proyectos. Cada propuesta se evalúa caso a caso.',
    action: 'Quiero colaborar', message: 'crew', icon: '✧', style: 'promo-coral',
  },
]

export function whatsappUrl(messageKey = 'general') {
  const message = messages[messageKey] || messages.general
  return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`
}
