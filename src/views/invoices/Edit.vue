<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <form id="UpdateJob" @submit.prevent="UpdateJob" >
        <CCardHeader>
            <CCol col="12" style="font-size: 25px;">تعديل الفاتورة</CCol>
        </CCardHeader>
       <CCardBody>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='accountType'>
                        من حساب
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedAccountFrom'
                        id='from_account'
                        :options='accounts'
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
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='accountType'>
                        إلي حساب
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedAccountTo'
                        id='to_account'
                        :options='accounts'
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
              <CCol sm="6">
                <CInput label="الحساب الكٌلي "
                  id="price"
                  v-model="invoice.amount"
                  class="required"
                  v-on:keypress="onlyNumbers($event)"
                  placeholder=" الحساب الكٌلي "
                  :invalidFeedback="errors.amount"
                  required
                />
              </CCol>
               <CCol sm="6">
                <CTextarea label=" الوصف"
                  id="description"
                  v-model="invoice.description"
                  v-on:keypress="isLetter($event)"
                  placeholder=" الوصف "
                  :invalidFeedback="errors.description"
                ></CTextarea>
              </CCol>
              </CRow>
          </CCardBody>
            <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }} </CButton>
              &emsp;
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> {{ $t('message.back') }}  </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'EditJob',
  data () {
    return {
      invoice: {},
      accounts: [],
      selectedAccountFrom: '',
      selectedAccountTo: '',
      errors: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/transactions/${this.$route.params.id}`)
      .then((response) => {
        this.invoice = response.data.data.transactions
        this.selectedAccountFrom = {
          id: this.invoice.account.id,
          name: this.invoice.account.name
        }
        this.selectedAccountTo = {
          id: this.invoice.account.id,
          name: this.invoice.account.name
        }
      })
    const accounts = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/accounts`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          accounts.push({ id: value.id, name: value.name })
        })
        this.accounts = accounts
      })
  },
  methods: {
    async UpdateJob () {
      const formData = new FormData()
      formData.append('amount', this.invoice.amount)
      formData.append('from_account', this.selectedAccountFrom.id)
      formData.append('to_account', this.selectedAccountTo.id)
      formData.append('description', this.invoice.description)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}admin-dashboard/transactions/${this.$route.params.id}`, '/invoices')
    },
    goBack () {
      this.citiesOpened ? this.$router.go(-1) : this.$router.push({ path: '/invoices' })
    }
  }
}
</script>
