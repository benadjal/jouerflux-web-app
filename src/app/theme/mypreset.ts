import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      '50': '#e0f5ee',
      '100': '#b3e7d5',
      '200': '#82d8bb',
      '300': '#52c8a2',
      '400': '#28b98b',
      '500': '#008a55',
      '600': '#007b4d',
      '700': '#00633e',
      '800': '#004a2e',
      '900': '#00321f',
    },
  },
});
