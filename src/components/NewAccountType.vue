<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="CreateAccountType" @submit="CreateAccountType" >
          <CCardBody>
            <CRow>
                <CCol sm="12">
                <CInput label="  نوع الحساب  "
                  id="name"
                  v-model="type.name"
                  class="required"
                  placeholder=" نوع الحساب  "
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
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
  name: 'CreateAccountType',
  data: function () {
    return {
      type: {},
      errors: []
    }
  },
  methods: {
    CreateAccountType: function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.type.name)

      this.postRequest(formData, this.$hostUrl + 'admin-dashboard/account_types', '/accounts/create')
    }
  }
}
</script>
