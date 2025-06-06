import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const customColors = plugin(({ addUtilities }) => {
  const shades = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colorGroups = [
    'brand',
    'brand_alpha',
    'mauve',
    'mauve_alpha',
    'error',
    'success',
  ];

  const properties = {
    bg: 'background-color',
    text: 'color',
    border: 'border-color',
    shadow: 'box-shadow',
    outline: 'outline-color',
    caret: 'caret-color',
  };

  const utilities: { [key: string]: Record<string, string> } = {};

  for (const group of colorGroups) {
    for (const shade of shades) {
      for (const [prefix, cssProp] of Object.entries(properties)) {
        const baseClass = `.${prefix}-${group}-${shade}`;
        const variable = `--${group}-${shade}`;

        if (cssProp === 'box-shadow') {
          utilities[baseClass] = {
            [cssProp]: `0 0 0 3px rgb(var(${variable}))`,
          };
        } else {
          if (group?.includes('alpha')) {
            utilities[baseClass] = {
              [cssProp]: `rgb(var(${variable}))`,
            };
          } else {
            utilities[baseClass] = {
              [cssProp]: `rgb(var(${variable}) / 1)`,
            };
          }

          for (let opacity = 0; opacity <= 100; opacity += 5) {
            const classOpacity = `.${prefix}-${group}-${shade}\\/${opacity}`;
            utilities[classOpacity] = {
              [cssProp]: `rgb(var(${variable}) / ${opacity}%)`,
            };
          }
        }
      }
    }
  }

  addUtilities(utilities);
});

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
        xs: '0.8rem',
      },
      height: {
        '18': '72px',
        total: 'calc(100vh - 178px)',
      },
      lineHeight: {
        base: '15px',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': 'calc(1366px + 2rem)',
        },
      },
      backgroundImage: {
        'image-gradient': `linear-gradient(
            180deg,
            rgb(var(--mauve-10)) 0%,
            rgb(var(--mauve-10) / 46%) 49.48%,
            rgb(var(--mauve-10)) 100%)`,
      },
      keyframes: {
        'slide-up-fade': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up-fade': 'slide-up-fade 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
      },
    },
  },
  plugins: [customColors],
} satisfies Config;
