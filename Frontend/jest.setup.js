import { config } from '@vue/test-utils';
import translations from './src/locales/en.json';

config.global.mocks = {
  $t: (msg) => msg,
};