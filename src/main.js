import Vue from 'vue'
import Main from './Main.vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import router from './router'
import messages from './locales/ru.json'

Vue
  .use(VueI18n)

const i18n = new VueI18n({
  locale: 'ru', // set locale
  fallbackLocale: 'ru',
  messages: {
    ru: messages
  }
})

const loadedLanguages = ['ru'] // our default language that is prelaoded

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(`./locales/${lang}.json`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

router.beforeEach((to, from, next) => {
  const lang = to.params.lang
  loadLanguageAsync(lang).then(() => next())
})

new Vue({
  el: '#app',
  i18n,
  router,
  devtools: true,
  render: h => h(Main)
})
