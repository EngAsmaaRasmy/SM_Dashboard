<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <CCHeader>
            <CCol sm="12" style="font-size: 25px;"> إضافة حساب جديد</CCol>
            </CCHeader>
          <form id="createAccount" @submit="createAccount" >
          <CCardBody>
           <CRow>
               <CCol sm='12'>
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
                      <!-- <div v-if(errors.category_id) class="invalid-feedback">
                        {{errors.category_id}}
                      </div> -->
                    </div>
                  </div>
              </CCol>
              </CRow>
              <CRow>
              <CCol sm="12">
                <CInput label=" الاسم"
                  id="name"
                  v-model="account.name"
                  v-on:keypress="isLetter($event)"
                  class="required"
                 placeholder=" الاسم "
                  :invalidFeedback="errors.name_ar"
                  required
                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="12">
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
            <CButton type="submit" size="sm" color="primary" @click="showModal=false" >
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
import $ from 'jquery'
export default {
  name: 'createAccount',
  data: function () {
    return {
      showModal: false,
      account: {},
      accountTypes: [],
      selectedAccountType: '',
      errors: []
    }
  },
  created () {
    const accountTypes = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/account_types`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          accountTypes.push({ id: value.id, name: value.name })
        })
        this.accountTypes = accountTypes
      })
  },
  methods: {
    isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      // else e.preventDefault() // If not match, don't add to input text
    },
    createAccount: function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.account.name)
      formData.append('account_type_id', this.selectedAccountType.id)
      formData.append('description', this.account.description)

      this.postRequest(formData, this.$hostUrl + 'admin-dashboard/accounts', '/invoices/create')
    }
  }
}
</script>
