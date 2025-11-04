/** @type {import('tailwindcss').Config} */
module.exports = {
  // CLAVE 1: Configurar la sección 'content' para Angular
  content: [
    "./src/**/*.{html,ts,css}",
    "./src/app/**/*.{html,ts,css}", // Asegura que los componentes de torneo son escaneados
  ],

  // CLAVE 2: SAFELIST - FUERZA LA INCLUSIÓN DE ESTILOS PERDIDOS EN NETLIFY
  // Eliminamos el patrón RegExp para evitar errores de sintaxis en el build.
  safelist: [
    // --- Estilos Base ---
    'min-h-screen',
    'bg-gray-900', // Fondo principal

    // --- Utilidades de Componente Personalizadas (Custom) ---
    'btn-medieval',
    'btn-elvish',
    'tournament-tree',
    'font-elvish',

    // --- Estilos de Layout y Texto (Torneo) ---
    'pt-10',
    'text-4xl',
    'text-3xl',
    'text-xl',
    'text-xs',
    'font-extrabold',
    'font-light',
    'italic',

    // --- Clases de Color y Borde (Batallas y Log) ---
    // Colores del torneo (gray-50, yellow-600, etc.)
    'bg-gray-50',
    'text-gray-800',
    'border-b-4',
    'border-yellow-600',

    // Contenedores de Batalla
    'bg-white',
    'border',
    'border-gray-300',

    // Ganador (Bueno)
    'bg-green-50',
    'border-l-4',
    'border-green-500',
    'text-green-700',
    'text-green-800',

    // Perdedor (Malo)
    'bg-red-50',
    'border-red-500',
    'text-red-700',

    // Estado/Ganador
    'bg-blue-400',
    'border-blue-400',
    'text-gray-600',

    // Log de Combate
    'bg-yellow-100',
    'border-yellow-400',

    // Fin del Torneo
    'bg-green-100',
    'border-green-600',
    'text-green-900',
    'text-green-700',
    'shadow-xl',
    'shadow-md',
  ],

  theme: {
    extend: {
      colors: {
        // --- BASE DE LA TIERRA MEDIA ---
        'mordor-dark': '#450A0A',
        'lothlorien-leaf': '#16A34A',
        'shire-earth': '#D4D4D4',

        // --- METALES Y FANTASÍA ---
        'elvish-gold': '#FACC15',
        'mithril-silver': '#E5E7EB',

        // --- PELIGRO Y FUEGO ---
        'mount-doom-fire': '#B91C1C',
        'morgul-shadow': '#1F2937',
      },
      fontFamily: {
        elvish: ['"Uncial Antiqua"', 'cursive'],
      },
    },
  },

  // CLAVE 3: Plugins
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
