<template>
  <v-progress-circular :size="70" :width="7" color="indigo" indeterminate :hidden="isHidden"></v-progress-circular>
</template>

<script>
import { } from 'vuex'
export default {
  computed: {
    isHidden: {
      get: function () {
        return this.$store.getters.isHidden
      },
      set: function (value) {
        return (this.isHidden = value)
      }
    }
  },
  watch: {
    isHidden: function (value) {
      if (value !== this.isHidden) {
        this.isHidden = value
      }
    }
  }
}
</script>

<style>
</style>
