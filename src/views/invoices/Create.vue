<template>
  <div>
    <CRow>
      <CCol col="12">
        <CCard>
          <form id="createInvoice" @submit="createInvoice" >
          <CCardHeader>
            <CCol col="12" style="font-size: 25px;">إضافة فاتورة   </CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol col="6" sm='12'>
                <div class='form-group'>
                    <label for='accountType'>
                        من حساب
                      <span class='star'>*</span>
                    </label>
                    <CButton type="button" @click="showModal=true"  class="add m-3">
                               +
                               </CButton>
                      <Modal v-model="showModal">
                       <NewAccount />
                          </Modal>
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
              <CCol col='6' sm="12">
                <div class='form-group'>
                    <label for='accountType'>
                        إلي حساب
                      <span class='star'>*</span>
                    </label>
                    <CButton type="button" @click="showModal=true"  class="add2 m-3">
                               +
                               </CButton>
                      <Modal v-model="showModal">
                       <NewAccount />
                          </Modal>
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
                <CInput label=" إجمالي الفاتورة "
                  id="amount"
                  v-model="invoice.amount"
                  class="required"
                  v-on:keypress="onlyNumbers($event)"
                  placeholder="  إجمالي الفاتورة "
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
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear') }}  </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import NewAccount from '@/components/NewAccount.vue'
import $ from 'jquery'
import swal from 'sweetalert'
export default {
  name: 'createInvoice',
  data: function () {
    return {
      showModal: false,
      invoice: {},
      accounts: [],
      selectedAccountFrom: '',
      selectedAccountTo: '',
      errors: []
    }
  },
  components: {
    NewAccount
  },
  created () {
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
    isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]+s.?$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      // else e.preventDefault() // If not match, don't add to input text
    },
    createInvoice: function (e) {
      e.preventDefault()
      const formData = new FormData()
      if (this.invoice.amount > 0) {
        formData.append('amount', this.invoice.amount)
      } else {
        swal('  الحساب الكُلي للفاتورة   يجب ان يكون اكبر من الصفر ')
        $('#amount').addClass('redborder')
        return 0
      }
      formData.append('from_account', this.selectedAccountFrom.id)
      formData.append('to_account', this.selectedAccountTo.id)
      formData.append('description', this.invoice.description)
      this.postRequest(formData, `${this.$hostUrl}admin-dashboard/transactions`, '/invoices')
    }
  }
}

</script>
<style scoped>
.add{
    background-color: #347A1E !important;
  color: #fff !important;
  font-size: 20px !important;
  font-weight :500 !important;
}
.add2{
    background-color: rgba(65.0, 75.0, 109.0, 1.0) !important;
  color: #fff !important;
  font-size: 20px !important;
  font-weight :500 !important;
}
.redborder{
  border-color:red !important
}
</style>
