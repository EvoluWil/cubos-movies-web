import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const customColors = plugin(({ addUtilities }) => {
  const shades = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colorGroups = ['brand', 'brand_alpha', 'mauve', 'mauve_alpha'];

  const properties = {
    bg: 'background-color',
    text: 'color',
    border: 'border-color',
    shadow: 'box-shadow',
  };

  const utilities: { [key: string]: Record<string, string> } = {};

  for (const group of colorGroups) {
    for (const shade of shades) {
      for (const [prefix, cssProp] of Object.entries(properties)) {
        const className = `.${prefix}-${group}-${shade}`;

        utilities[className] = {
          [cssProp]:
            cssProp === 'box-shadow'
              ? `0 0 0 3px var(--${group}-${shade})`
              : `var(--${group}-${shade})`,
        };
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
  plugins: [customColors],
} satisfies Config;
