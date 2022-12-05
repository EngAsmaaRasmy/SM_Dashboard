<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <CCardBody>
        <div class="container flex-col col-md-12">
            <div class="inner-container flex-col">
                  <div class="title flex-row center">
                      <h2>الفاتورة</h2>
                  </div>
                  <table class="mb-4">
                      <thead>
                          <tr class="row-heading center">
                              <th> رقم الفاتورة </th>
                              <th> من حِساب </th>
                              <th> إلي حِساب </th>
                              <th>   الوصف </th>
                          </tr>
                      </thead>
                      <tbody class="text-center">
                          <tr class="row-data">
                              <td > {{ invoice.id }} </td>
                              <td > {{ invoice.from_account.name}} </td>
                              <td > {{ invoice.to_account.name }} </td>
                              <td v-if="invoice.description !='undefined'"> {{ invoice.description}} </td>
                          </tr>
                      </tbody>
                  </table>
                   <tfoot class="m-auto">
                          <tr class="mt-3">
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <th>الحِساب الكٌلي : </th>
                              <td class="total"> {{ invoice.amount | toCurrency}} {{ $t('message.sdg')}} </td>
                          </tr>
                      </tfoot>
              </div>

         </div>
          <div class="m-auto">
                      <CButton color="warning" @click="goBack" > {{ $t('message.back')}}</CButton>
                    </div>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowInvoice',
  data () {
    return {
      invoice: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/transactions/${this.$route.params.id}`)
      .then((response) => {
        this.invoice = response.data.data.transaction
      })
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/invoices' })
    }
  }
}
</script>
<style scoped>
 /* general styling */

* {
    box-sizing: border-box;
}

a {
    text-decoration: none;
}

button {
    color: #fff;
    letter-spacing: .8px;
    text-transform: uppercase;
    border-radius: 16px;
    padding: 5px;
    font-size: 1.2rem;
    background-color: #0a1438d7;
    width: 12rem;
    height: 3rem;
    /* border-width: 0px 2px 4px; */
    border-style: solid;
    border-color: #0a1438d7;
    transition: .1s;
    margin-top:20px ;
}

button:hover {
    background-color: #347A1E;
    border-color: #347A1E;
    cursor: pointer;
}

button:focus {
    outline: 0;
}

button:active {
    transition: .2s;
    /* border-width: 2px; */
}

h2 {
    color: #0a1438d7;
    font-size: 1.5rem;
}
/* utility */

.flex-row {
    display: flex;
    flex-direction: row;
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.center {
    justify-content: center;
    align-items: center;
}
/* structure */

.container {
    background-color: #fff;
    border: thick dashed #347A1E;
    padding: 4rem;
}

.title {
    text-align: center;
    padding: 1rem 0;
}

.container table {
    width: 100%;
    color: #0a1438d7 !important;
    font-weight: 300;
}

.row-data td {
    /* width: 25%; */
    text-align: center;
    padding: 1rem;
    color:#0a1438d7 !important ;
}
.row-heading {
  background-color: #0a1438d7 !important;
  color:#fff !important;

}

tfoot {
    text-align: center;
    margin-bottom: 20px !important;
}
tfoot th  {
     background-color: #0a1438d7 !important;
  color:#fff !important;
}

tfoot tr * {
    padding: 1rem;
}

.row-data {
    border-bottom: .7px dashed #354728;
}

.row-heading th {
    color: #fff;
    /* width: 25%; */
    text-align: center !important;
    padding: 1rem;
    text-transform: uppercase;
    font-size: 0.9rem;
}
.item-total,
.total {
    font-weight: 400;
}

.btn-container {
    padding: 1rem 0 0;
}
/* footer */
</style>
