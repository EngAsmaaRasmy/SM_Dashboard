
<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdateAccount" @submit.prevent="UpdateAccount" >
        <CCardHeader>
            <CCol col="12" style="font-size: 25px">تعديل الحساب</CCol>
            </CCardHeader>
       <CCardBody>
            <CRow>
               <CCol sm='6'>
                <div class='form-group'>
                    <label for='accountType'>
                       نوع الحساب
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedAccountType'
                        id='account_type_id'
                        :options='accountTypes'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
              </CRow>
              <CRow v-if="selectedAccountType.id == 8">
                <CCol sm='6'>
                <div class='form-group'>
                    <label for='accountType'> الخدمة<span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedService'
                        id='service_id'
                        :options='services'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                    </div>
                  </div>
              </CCol>
              </CRow>
              <CRow>
              <CCol sm="6">
                <CInput label=" الاسم"
                  id="name"
                  v-model="account.name"
                  v-on:keypress="isLetter($event)"
                  class="required"
                 placeholder=" الاسم "
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CTextarea label=" الوصف"
                  id="description"
                  v-model="account.description"
                  v-on:keypress="isLetter($event)"
                  placeholder=" الوصف "
                  :invalidFeedback="errors.description"
                ></CTextarea>
              </CCol>
            </CRow>
          </CCardBody>
            <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> {{ $t('message.back') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'EditCategory',
  data () {
    return {
      account: [],
      accountTypes: [],
      selectedAccountType: '',
      services: [],
      errors: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/accounts/${this.$route.params.id}`)
      .then((response) => {
        this.account = response.data.data.account
        this.selectedAccountType = {
          id: this.account.type.id,
          name: this.account.type.name
        }
        this.selectedService = {
          id: this.account.service.id,
          name: this.account.service.name
        }
      })
    const accountTypes = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/account_types`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          accountTypes.push({ id: value.id, name: value.name })
        })
        this.accountTypes = accountTypes
      })
    const services = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/serviecs`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          services.push({ id: value.id, name: value.name })
        })
        this.services = services
      })
  },
  methods: {
    async UpdateAccount () {
      const formData = new FormData()
      formData.append('name', this.account.name)
      formData.append('account_type_id', this.selectedAccountType.id)
      if (this.account.descriptione !== undefined) {
        formData.append('description', this.account.description)
      }
      if (this.selectedService.id) {
        formData.append('service_id', this.selectedService.id)
      }
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}admin-dashboard/accounts/${this.$route.params.id}`, '/accounts')
    },
    goBack () {
      this.productsOpened ? this.$router.go(-1) : this.$router.push({ path: '/accounts' })
    }
  }
}
</script>
