import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';

import enMessages from './locales/en.json';


const i18n = createI18n({
  locale: 'en',
  messages: {
    en: enMessages,
  }
});

createApp(App).use(i18n).mount('#app');