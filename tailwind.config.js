/** @type {import('tailwindcss').Config} */
module.exports = {
  // CLAVE 1: Configurar la sección 'content' para Angular
  content: [
    "./src/**/*.{html,ts,css}",
    "./src/app/**/*.{html,ts,css}", // Esto le dice a Tailwind que escanee todos los archivos HTML y TS en la carpeta 'src'
  ],
  safelist: [
   // CLASES DE TUS COMPONENTES CUSTOM (YA LO TIENES)
    'btn-medieval',
    'btn-elvish',
    'tournament-tree',
    // ... (otras clases de componente) ...

    // ✅ CLASES DE COLOR/FONDO QUE FALTAN EN EL ÁRBOL DEL TORNEO
    'bg-gray-50',
    'text-gray-800',
    'border-yellow-600',
    'text-xl', // Asegurando tamaños de texto
    'text-gray-500',

    // ✅ CLASES DE COLOR DEL LOG Y LAS BATALLAS
    'bg-white',
    'bg-green-50',
    'border-green-500',
    'text-green-700',
    'bg-red-50',
    'border-red-500',
    'text-red-700',
    'bg-blue-400',
    'text-green-800',
    'bg-yellow-100',
    'border-yellow-400',
    'text-green-700',
    'text-gray-600',
    'text-gray-500',
    'text-xs',

    // ✅ CLASES DEL CONTENEDOR DE FIN DE TORNEO
    'bg-green-100',
    'border-green-600',
    'text-green-800',
    'text-green-700',
    'text-green-900',
    'text-3xl',
  ],
  theme: {
    extend: {
      colors: {
        // --- BASE DE LA TIERRA MEDIA ---
        // Marrón Rojizo Oscuro (Mordor/Puerta Negra) - Usado en tu Nav
        'mordor-dark': '#450A0A', // Anteriormente rose-950

        // Verde Hoja de Lothlórien (Élfico)
        'lothlorien-leaf': '#16A34A', // Un verde vivo y profundo

        // Tono de Tierra (Hobbiton/Comarca)
        'shire-earth': '#D4D4D4', // Gris claro/beige para fondos

        // --- METALES Y FANTASÍA ---
        // Oro (Anillo Único/Realeza)
        'elvish-gold': '#FACC15', // Un amarillo dorado brillante (yellow-400)

        // Plata (Mitril/Élfico)
        'mithril-silver': '#E5E7EB', // Un gris muy claro (gray-200)

        // --- PELIGRO Y FUEGO ---
        // Fuego/Lava (Monte del Destino)
        'mount-doom-fire': '#B91C1C', // Rojo intenso y oscuro (red-700)

        // Sombra de Morgul (Oscuridad/Nazgûl)
        'morgul-shadow': '#1F2937', // Gris muy oscuro/negro (gray-800)
      },

      fontFamily: {
        // Renombramos a 'elvish' y usamos la nueva fuente
        elvish: ['"Uncial Antiqua"', 'cursive'],
      },
    },
  },
  // CLAVE 2: Añadir DaisyUI como plugin
  plugins: [
    require('daisyui'), // ¡Esta línea es crucial!
  ],

    daisyui: {
    themes: ["light", "dark", "cupcake"], // Ejemplo de temas
  },
}
