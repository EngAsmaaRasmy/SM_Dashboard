<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <CCardHeader>
        <CCol col="12" style="font-size: 25px;">  عرض بيانات مُقدم الخدمة</CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th> اسم مُقدم الخدمة </th>
                    <td>{{ serviceProvider.name }}</td>
                  </tr>
                  <tr>
                    <th> البريد الإلكتروني </th>
                    <td>{{ serviceProvider.email }}</td>
                  </tr>
                  <tr>
                    <th> رقم الهاتف  </th>
                    <td>{{ serviceProvider.phone}}</td>
                  </tr>
                  <tr>
                    <th>الرصيد</th>
                    <td>{{balance | number}}</td>
                  </tr>
                </table>
            </div>
          </div>
          <hr>
        <div class="row" v-if="serviceProfit.length">
          <h2 class="col-md-4">أرباح الخدمات</h2>
            <div class="col-md-12" style="border:none">
                <table class="table table-bordered table-responsive">
                  <tr>
                    <th> الخدمة  </th>
                    <th>سعر الخدمة</th>
                      <th> نسبة الربح من الخدمة  </th>
                      <th> الربح </th>
                      <th>عمولة SM</th>
                      <th>تاريخ الانشاء</th>
                  </tr>
                   <tr v-for=" service in serviceProfit" :key="service.id">
                    <td >{{ service.serviceName }}</td>
                    <td>{{ service.servicePrice | number }}</td>
                    <td>{{ service.servicePercentage }}</td>
                    <td v-if="service.servicePercentage">{{ service.amount | number}}</td>
                    <td v-if="service.servicePercentage">{{ service.smCommission }}</td>
                    <td>{{ service.createdAt }}</td>
                  </tr>
                </table>
            </div>
        </div>
        <div class="row" v-else>
          <div class="col-md-10 m-auto alert-primary py-4 text-center">
            لم  تتم أي مُعاملات  حتي الآن
          </div>
        </div>
          <hr>
        <div class="row" v-if="delivered.length">
          <h2 class="col-md-4">المبالغ المستلمة</h2>
            <div class="col-md-12">
                <table class="table table-bordered table-responsive">
                  <tr>
                    <th>رقم الفاتورة</th>
                    <th>المبلغ </th>
                    <th>تاريخ الانشاء</th>
                  </tr>
                   <tr v-for="transaction in delivered" :key="transaction.id">
                    <td >{{ transaction.transactionId }}</td>
                    <td>{{ transaction.amount | number }}</td>
                    <td>{{ transaction.createdAt }}</td>
                  </tr>
                </table>
            </div>
        </div>
        <div class="row" v-else>
          <div class="col-md-10 m-auto alert-primary py-4 text-center">
            لم  تتم أي مُعاملات  حتي الآن
          </div>
        </div>
        <CButton color="warning" @click="goBack"> {{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'ShowServiceProvider',
  data () {
    return {
      serviceProvider: [],
      accountProviders: [],
      serviceProfit: [],
      delivered: [],
      balance: 0
    }
  },
  created () {
    const current = this
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/serviecs-providers/${this.$route.params.id}`)
      .then((response) => {
        this.serviceProvider = response.data.data.serviceProvider
        this.accountProviders = response.data.data.accountProvider
        $.each(this.accountProviders, function (key, value) {
          if (value.service_id) {
            current.balance = parseFloat(current.balance) + parseFloat(value.amount)
            current.serviceProfit.push({
              serviceName: value.services.name,
              servicePrice: value.services.price,
              servicePercentage: value.services.precentage,
              amount: value.amount,
              smCommission: value.smcommision,
              createdAt: value.formatted_created_at
            })
          } else {
            current.balance = parseFloat(current.balance) - parseFloat(value.amount)
            current.delivered.push({
              transactionId: value.transaction_id,
              amount: value.amount,
              createdAt: value.formatted_created_at
            })
          }
        })
      })
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/service-providers' })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: #0a1438d7;
    color: #f5f3f3;
  }
  .table-bordered {
    border: none;
    width: 100%;
  }
</style>
