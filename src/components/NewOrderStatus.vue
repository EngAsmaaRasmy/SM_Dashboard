<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="CreateOrderStatus" @submit="CreateOrderStatus" >
          <CCardBody>
            <CRow>
                <CInput :label=" $t('message.name')"
                  id="name"
                  v-model="orderStatus.name"
                  v-on:keypress="isLetter($event)"
                  class="required"
                  :placeholder="$t('message.name')"
                  required
                  :invalidFeedback="errors.name"
                />
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/>  {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/>  {{ $t('message.clear') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'CreateOrderStatus',
  data: function () {
    return {
      orderStatus: {},
      errors: []
    }
  },
  methods: {
    isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      else e.preventDefault() // If not match, don't add to input text
    },
    async createOrderStatus (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.orderStatus.name)

      this.errors = await this.postRequest(formData, this.$hostUrl + 'admin-dashboard/order-status', '/orders/create')
    }
  }
}
</script>
