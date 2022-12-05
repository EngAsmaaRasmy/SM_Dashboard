<template>
  <CSidebar id="sidbar"
  :class='$i18n.locale'
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand>
      <h1 class=" responsive text-center company" style="font-color: #fff; font-size: 30px">SM ACCOUNTING SYSTEM</h1>
    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>

</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  data () {
    return {
      companyName: 'SM Dashboard'
    }
  },
  created () {
  },
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>
<style scoped>
#sidbar{
  background: linear-gradient(rgba(22,22,22,0.65), rgba(22,22,22,0.65)), url(https://almoasherbiz.com/landingpage/erp-modules/images/bg-image/hero-bg3.jpg);
 align-content: right;
}
#sidbar li a:hover{
      background-color: #347A1E !important;
}
.responsive{
  width:90% ;
  height: auto;
}
.company {
  width: 100%;
  color: #eae9e6!important;
  padding: 20px 30px !important;
  text-decoration: solid;
}
</style>
