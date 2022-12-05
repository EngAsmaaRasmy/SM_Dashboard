<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="12 " style="font-size: 25px;">عرض تفاصيل الخدمة </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th> الخدمة </th>
                    <td>{{ service.name }}</td>
                  </tr>
                   <tr>
                    <th>مٌقدم الخدمة </th>
                    <td>{{ service.provider.name }}</td>
                  </tr>
                  <tr>
                    <th>سعر الإشتراك في الخدمة </th>
                    <td>{{ service.subscription_price | number }}</td>
                  </tr>
                  <tr>
                    <th>عدد مستخدمين الخدمة </th>
                    <td>{{ service.users_number }}</td>
                  </tr>
                   <tr v-if="service.price">
                    <th> السعر</th>
                    <td>{{ service.price }}</td>
                  </tr>
                   <tr v-if="service.precentage">
                    <th> النسبة</th>
                    <td>{{ service.precentage }} %</td>
                  </tr>
                </table>
            </div>
        </div>
        <hr>
        <div class="row mt-5" v-if="accountProviders[0]">
            <div class="col-md-10 m-auto">
            <h2>تفاصيل الأرباح</h2>
            </div>
          <br>
            <div class="col-md-10 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th> #  </th>
                    <th>نسبة مُقدم الخدمة</th>
                    <th> ربح مُقدم الخدمة</th>
                    <th>ربح <span>SM</span></th>
                  </tr>
                   <tr v-for=" account in accountProviders" :key="account.id">
                    <td >{{ account.id }}</td>
                     <td>{{service.precentage}} %</td>
                    <td>{{ account.amount | number }}</td>
                    <td>{{ account.smcommision }}</td>
                  </tr>
                </table>
            </div>
        </div>
         <div class="row" v-else>
           <div class="col-md-10 m-auto alert-primary py-4 text-center">
            لم  تتم أي مُعاملات  حتي الآن
        </div>
        </div>
        <CButton color="warning" @click="goBack">{{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowProduct',
  data () {
    return {
      service: [],
      accountProviders: [],
      providerCommission: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/serviecs/${this.$route.params.id}`)
      .then((response) => {
        this.service = response.data.data.services
        this.accountProviders = response.data.data.accountProvider
      })
  },
  methods: {
    goBack () {
      this.servicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/services' })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: rgb(25, 36, 68);
    color: #f5f3f3;
  }
</style>
