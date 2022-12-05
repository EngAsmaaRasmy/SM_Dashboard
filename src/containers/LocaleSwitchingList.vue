<template>
 <div>
   <input type="button"  class="switcher"  :value=" $i18n.locale"  @click="switchLocale()" >
 </div>
</template>
<script>
export default {
  name: 'LocaleSwitchingList',
  watch: {
    '$i18n.locale': function (newVal, oldVal) {
      localStorage.Lang = newVal
      window.location.reload()
    }
  },
  methods: {
    switchLocale () {
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'ar'
      } else this.$i18n.locale = 'en'
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
.switcher {
  background-color: #551040; /* Green */
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 8px;
}
.switcher:hover{

color: rgb(92, 87, 82);
background: rgb(231, 216, 225);
}
</style>
