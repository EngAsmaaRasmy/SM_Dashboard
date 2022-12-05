<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <form id="UpdateServiceProvider" @submit.prevent="UpdateServiceProvider" >
        <CCardHeader>
            <CCol col="12" style="font-size: 25px;"> تعديل بيانات مٌقدم الخدمة</CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <CInput label=" الاسم "
                id="name"
                v-model="serviceProvider.name"
                class="required"
                placeholder=" أدخل اسم مٌقدم الخدمة"
                :invalidFeedback="errors.name"
                required
              />
            </CCol>
          </CRow>
           <CRow>
            <CCol sm="12">
              <CInput label=" البريد الإلكتروني "
                id="email"
                v-model="serviceProvider.email"
                placeholder=" أدخل البريد الإلكتروني لمٌقدم الخدمة"
                :invalidFeedback="errors.email"
              />
            </CCol>
          </CRow>
           <CRow>
            <CCol sm="12">
              <CInput label=" الهاتف "
                id="phone"
                v-model="serviceProvider.phone"
                class="required"
                 pattern="^0[0-9]{9}"
                oninvalid="setCustomValidity('رقم الهاتف لابد أن يتكون من عشرة أرقام ويبدأ بصفر ')"
                oninput="setCustomValidity('')"
                placeholder=" أدخل هاتف مٌقدم الخدمة"
                :invalidFeedback="errors.phone"
                required
              />
            </CCol>
          </CRow>

            </CCardBody>
            <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> حفظ</CButton>
              &emsp;
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> رجوع </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
export default {
  name: 'EditSupplier',
  data () {
    return {
      serviceProvider: [],
      errors: [],
      notifmsg: ''
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/serviecs-providers/${this.$route.params.id}`)
      .then((response) => {
        this.serviceProvider = response.data.data.serviceProvider
      })
  },
  methods: {
    async UpdateServiceProvider () {
      const formData = new FormData()
      formData.append('name', this.serviceProvider.name)
      if (this.serviceProvider.email !== undefined) {
        formData.append('email', this.serviceProvider.email)
      }
      formData.append('phone', this.serviceProvider.phone)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}admin-dashboard/serviecs-providers/${this.$route.params.id}`, '/service-providers')
    },
    goBack () {
      this.areasOpened ? this.$router.go(-1) : this.$router.push({ path: '/service-providers' })
    }
  }
}
</script>
