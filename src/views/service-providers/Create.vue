<template>
  <div class="create">
    <CRow>
      <CCol col="12">
        <CCard>
          <form id="createServiceProvider" @submit="createServiceProvider" >
          <CCardHeader>
            <CCol col="12" style="font-size: 25px;">  إضافة مٌقدم خدمة جديد </CCol>
          </CCardHeader>
          <CCardBody>
            <div v-for="(errorArray, idx) in notifmsg" :key="idx">
              <div v-for="(allErrors, idx) in errorArray" :key="idx">
                  <span class="text-danger">{{ allErrors}} </span>
              </div>
          </div>
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
            <CIcon name="cil-check-circle"/> {{ $t('message.save')}} </CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'CreateSupplier',
  data: function () {
    return {
      serviceProvider: {},
      errors: [],
      notifmsg: ''
    }
  },
  methods: {
    async createServiceProvider (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.serviceProvider.name)
      if (this.serviceProvider.email !== undefined) {
        formData.append('email', this.serviceProvider.email)
      }
      formData.append('phone', this.serviceProvider.phone)
      this.errors = await this.postRequest(formData, this.$hostUrl + 'admin-dashboard/serviecs-providers', '/service-providers')
    }
  }
}

</script>
<style scoped>
        input:required:valid , select:required:valid  ,textarea:required:valid{
            border-color: #dadada;
         }
        input:required:invalid ,select:required:invalid ,textarea:required:invalid {
            border-color: #02243b;
        }
        .red {
          color:red;
        }
</style>
