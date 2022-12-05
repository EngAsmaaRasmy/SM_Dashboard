<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="12" style="font-size: 25px;">  عرض بيانات الحساب</CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>الاسم </th>
                    <td>{{ account.name }}</td>
                  </tr>
                  <tr>
                    <th>نوع الحساب</th>
                    <td>{{ account.type.name }}</td>
                  </tr>
                   <tr>
                    <th>الوصف </th>
                    <td v-if="account.description !='undefined'">{{ account.description }}</td>
                  </tr>
                </table>
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
  name: 'ShowCategory',
  data () {
    return {
      account: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/accounts/${this.$route.params.id}`)
      .then((response) => {
        this.account = response.data.data.account
      })
  },
  methods: {
    goBack () {
      this.servicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/accounts' })
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
