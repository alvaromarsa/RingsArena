/** @type {import('tailwindcss').Config} */
module.exports = {
  // CLAVE 1: Configurar la sección 'content' para Angular
  content: [
    "./src/**/*.{html,ts,css}",
    "./src/app/**/*.{html,ts,css}", // Esto le dice a Tailwind que escanee todos los archivos HTML y TS en la carpeta 'src'
  ],
  safelist: [
    'bg-gray-900',
    'text-yellow-100',
    'border',
    'border-gray-700',
    'btn-elvish',
    'font-elvish',
    'font-light',
    'text-mithril-silver',
    'tournament-tree',
    'bg-gray-50',
    'text-morgul-shadow',
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
