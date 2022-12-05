<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'Loading',
  data () {
    return {
      selected: 'Month'
    }
  },
  created () {
    // $('.loading').show()
    if (!localStorage.token) {
      this.$router.push({ path: 'login' })
    } else {
      this.$router.push({ path: 'dashboard' })
    }
  }
}
</script>
