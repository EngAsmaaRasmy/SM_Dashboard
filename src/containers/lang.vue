<template>
<select v-model="$i18n.locale" >
      <option v-for="locale in locales" :key="locale" @click="switchLocale(locale)">
    {{locale}}
   </option>
    </select>
</template>
<script>
export default {
  name: 'Localeswitching',
  methods: { // <---------------------------
    switchLocale (locale) {
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale
        if (this.$i18n.locale === 'ar') {
          document.querySelector('html').classList.add('is-rtl')
        }
      }
    },
    languageSelection () {
      if (this.$i18n.locale === 'en') {
        document.querySelector('html').classList.add('is-ltr')
      }
    }
  },
  data () {
    return {
      locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
    }
  }
}
</script>
<style scoped>
select {
  text-decoration: underline;
  color: #459CE7;
  cursor: pointer;
}
</style>
