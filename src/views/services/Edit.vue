<template>
<CRow>
  <CCol col="12" xl="12">
      <CCard class="cards">
      <form id="UpdateService" @submit.prevent="UpdateService" >
        <CCardHeader>
            <CCol col="12" style="font-size: 25px">تعديل الخدمة</CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
              <CCol sm='6'>
                <div class='form-group'>
                    <label for='category'>
                      مٌقدم الخدمة
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedServiceProvider'
                        id='category_id'
                        :options='serviceProviders'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='name'
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
                <CInput :label=" $t('message.name')"
                  id="name"
                  v-model="service.name"
                  class="required"
                  v-on:keypress="isLetter($event)"
                  :placeholder=" $t('message.name') "
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput label=" سعر الاشتراك في الخدمة"
                  id="subscription_price"
                  v-model="service.subscription_price"
                  class="required"
                  type="number"
                  placeholder=" ادخل سعر الاشتراك "
                  :invalidFeedback="errors.subscription_price"
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput label=" عدد المستخدمين"
                  id="users_number"
                  v-model="service.users_number"
                  class="required"
                  type="number"
                  placeholder=" ادخل عدد المستخدمين"
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
            </CRow>
        <CRow>
              <CCOL sm="12" v-if="service.price  || service.price ==''" >
                <ul class="ul" v-if="showtwo">
                      <input type="checkbox" id="collapse" v-model="showone"/>
                      <label for="collapse" class="label">السعر</label>
                        <CInput
                        id="price"
                        type="number"
                        min="1"
                        v-model="service.price"
                        class=" li"
                        :placeholder=" $t('message.price') "
                        :invalidFeedback="errors.price"
                      />
                </ul>
              </CCOL>
              <CCOL sm="12" v-if="service.precentage || service.precentage =='' ">
                <ul class="ul2" v-if="showone">
                      <input type="checkbox" id="collapse2" class="input2" v-model="showtwo"/>
                      <label for="collapse2" class="label2">الربح من الخدمة</label>
                      <CInput
                        id="percentage"
                        v-model="service.precentage"
                        class=" li"
                        type="number"
                        min="1"
                        max="100"
                        placeholder=" الربح الشهري من الخِدمة"
                        :invalidFeedback="errors.price"
                      />
                </ul>
              </CCOL>
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
import swal from 'sweetalert'
export default {
  name: 'EditService',
  data () {
    return {
      service: {},
      showone: true,
      showtwo: true,
      serviceProviders: [],
      selectedServiceProvider: '',
      errors: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/serviecs/${this.$route.params.id}`)
      .then((response) => {
        this.service = response.data.data.services
        this.selectedServiceProvider = {
          id: this.service.provider.id,
          name: this.service.provider.name
        }
      })
    console.log(this.service)
    const serviceProviders = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/serviecs-providers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          serviceProviders.push({ id: value.id, name: value.name })
        })
        this.serviceProviders = serviceProviders
      })
  },
  methods: {
    async UpdateService () {
      const formData = new FormData()
      formData.append('name', this.service.name)
      formData.append('service_provider_id', this.selectedServiceProvider.id)
      formData.append('subscription_price', this.service.subscription_price)
      formData.append('users_number', this.service.users_number)
      if (this.service.price <= 0) {
        swal({ title: 'السعر  لابد أن يكون أكبر من الصفر' })
      } else if (this.service.precentage > 100) {
        swal({ title: 'الربح  لابد أن يكون أقل من 100' })
      }
      if (this.service.price !== undefined) {
        formData.append('price', this.service.price)
      }
      if (this.service.precentage !== undefined) {
        formData.append('precentage', this.service.precentage)
      }
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}admin-dashboard/serviecs/${this.$route.params.id}`, '/services')
    },
    goBack () {
      this.productsOpened ? this.$router.go(-1) : this.$router.push({ path: '/services' })
    }
  }
}
</script>
<style scoped>
.ul, .ul2{
  list-style:none;
  margin:0;
  padding:0;
  width:550px;
  box-shadow:0 0 3px rgba(100,100,100,.9),
             0 0 0 5px rgba(100,100,100,.3);
  border-radius:5px;
  margin:20px;
}
.label, .label2{
  display:block;
  background:#347A1E ;
  padding:10px;
  color:white;
  cursor:pointer;
}
input[type="checkbox"]{
  visibility:hidden;
  position:absolute;
}
.ul2 input[type="checkbox"]{
  visibility:hidden;
  position:absolute;
}
#collapse:checked ~.li {
  display:block;
  margin-top:0;
}
#collapse:not(:checked) ~.li,#collapse2 {
  display:block;
  margin-top:0;
}
#collapse:not(:checked) ~#collapse2 .li {
  display:none;
}
#collapse2:checked ~.li  {
  display:block;
  margin-top:0;
}
#collapse2:not(:checked) ~.li  {
  display:block;
  margin-top:0;
}
#collapse2:checked + .label2:before{
  position:relative;
  left:calc(-160px);
  opacity:1;
}
</style>
