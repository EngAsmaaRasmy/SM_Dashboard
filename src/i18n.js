import Vue from 'vue'
import VueI18n from 'vue-i18n'
import arMessages from './locales/Arabic.json'
import enMessages from './locales/English.json'

Vue.use(VueI18n)

const messages = {
  English: {
    message: enMessages
  },
  Arabic: {
    message: arMessages
  }
}
export default new VueI18n({
  locale: 'Arabic',
  fallbackLocale: 'Arabic',
  messages
})
