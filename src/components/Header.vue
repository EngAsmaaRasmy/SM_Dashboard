<template>
  <div>
    <v-app-bar app dark class="indigo">
      <v-navigation-drawer
        v-if="loggedIn"
        v-model="drawer"
        style="scroll:none;background-color: #313B70"
        absolute
        temporary
        clipped
        app
      >
        <v-list nav>
          <v-list-item to="/products">المنتجات</v-list-item>
          <v-list-item to="/cities">المدن</v-list-item>
          <v-list-item to="/areas">المناطق</v-list-item>
           <v-list-item to="/servces">الخدمات</v-list-item>
          <v-list-item to="/orders">الطلبات</v-list-item>
          <v-list-item to="/customers">العملاء</v-list-item>
          <v-list-item to="/advertisements">الإعلانات</v-list-item>
          <v-list-item to="/feedbacks">الاراء</v-list-item>
          <v-list-item>
            <v-list-group append-icon>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    التقارير
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item to="/most-sold-reports">الاكثر مبيعا</v-list-item>
                  <v-list-item to="/wishlist-reports">المفضلات</v-list-item>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar-nav-icon v-if="loggedIn" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="loggedIn">
        <v-btn to="/" text>Boutiquana</v-btn>
      </v-toolbar-title>
      <v-toolbar-title v-if="!loggedIn">Boutiquana</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="loggedIn" origin="center center" bottom transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn color="white" icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="menu" to="/settings">
            <v-list-item-title>
              <v-icon left>mdi-cogs</v-icon>اعدادات الحساب
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="menu">
            <v-list-item-title @click="logout">
              <v-btn icon>
                <v-icon left>mdi-logout</v-icon>تسجيل الخروج
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
import {} from 'vuex'
export default {
  data () {
    return {
      drawer: false
    }
  },
  beforeMount () {
    this.$store.dispatch('getAuthStatus')
  },
  computed: {
    loggedIn: {
      get: function () {
        return this.$store.getters.isLoggedIn
      },
      set: function (val) {
        this.isLoggedIn = val
      }
    }
  },
  watch: {
    isLoggedIn: function (val) {
      if (this.loggedIn !== val) {
        this.loggedIn = val
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(_ => {
        this.$forceUpdate()
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>
<style scoped>
a {
  color: white;
  text-decoration: none;
}

a:visited,
a:link {
  color: white;
  text-decoration: none;
}
.v-list-item--active {
  color: rgba(229, 205, 243, 0.911) !important;
}
</style>
