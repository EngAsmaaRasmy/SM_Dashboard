/* eslint-disable key-spacing */
<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cil-user" />
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>{{$t('message.acount')}}</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <a id="logout" @click="doLogout">
        <CIcon name="cil-lock-locked" />{{$t('message.logOut')}}
      </a>
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import swal from 'sweetalert'
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return {
      itemsCount: 42
    }
  },
  methods: {
    doLogout: function () {
      console.log('logout')
      const formData = new FormData()
      if (!localStorage.token) {
        localStorage.clear()
        this.$router.push({ name: 'Login' })
      } else {
        console.log(localStorage.token)
        formData.append('token', localStorage.token)
        this.$http
          .post(`${this.$hostUrl}admin-dashboard/logout`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
              Authorization: 'Bearer ' + localStorage.token
            }
          })
          .then((response) => {
            if (!response.data.error) {
              localStorage.clear()
              this.$router.push({ name: 'Login' })
            } else {
              swal({ title: response.data.message, buttons: 'تم' })
            }
          })
      }
    }
  }
}
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
#logout{
 color: #1f337a;
 font-weight: bold;
 }
</style>
