<template>
  <div>
    <Widgets/>
       <CCard class="cards">
    </CCard>
  </div>
</template>

<script>
import Widgets from './widgets/Widgets'

export default {
  name: 'Dashboard',
  components: {
    Widgets
  },
  data () {
    return {
      selected: 'Month'
    }
  },
  methods: {
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }
  }
}
</script>
