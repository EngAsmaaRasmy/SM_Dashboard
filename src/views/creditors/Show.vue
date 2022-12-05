<template>
<div>

           <CCard class="cards">
            <CCardHeader>
                <CCol col="6" style="font-size: 25px;">الدائنون </CCol>
            </CCardHeader>
            <div class="body mt-3">
                <div>
       <div class="row">
        <div class="col-md-6">
         <div style="background-color: white; display:flex;flex-direction:row;">
          </div>
         </div>
      </div>
                </div>
                <div class="row">
            <div class="col-md-10 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th>اسم الدائن  </th>
                      <th>  النوع  </th>
                       <th> الوصف  </th>
                  </tr>
                   <tr v-for=" creditor in creditors" :key="creditor.id">
                    <td>{{ creditor.name }}</td>
                    <td>{{ creditor.account_type_id }}</td>
                    <td>{{ creditor.description }}</td>
                  </tr>
                </table>
            </div>
        </div>
            </div>
        </CCard>
</div>
</template>

<script>
export default {
  name: 'ShowEmployee',
  data () {
    return {
      creditors: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/creditors-list`)
      .then((response) => {
        this.creditors = response.data.data.creditors
      })
  },
  methods: {
    goBack () {
      this.customersOpened ? this.$router.go(-1) : this.$router.push({ path: '/employees' })
    }
  }
}
</script>
<style scoped>
span{
  font-size: 20px;
  margin-top: 10px;
}
table,td ,th{
    border: 1px solid #ddd;
  text-align: right;
}

th, td {
  padding: 15px;
}
  th {
    background-color: #0a1438d7;
    color: #f5f3f3;
  }
  .cont{
    display: inline;
    margin: 20px;
  }
  button{
    margin: 30px;
  }
  .left{
    margin: 30px;
  }
</style>
