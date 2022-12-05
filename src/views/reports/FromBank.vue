
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="8">
             تفاصيل المبالغ الصادرة إلي البنك
             <br>
                 <small>{{"مِن"+ ': ' + fromDate + ' - ' + "إلي" + ': ' + toDate}}</small>
            </CCol>
             <CCol style="font-size: 25px;" col="4">
             الرصيد  في البنك : {{balance}}
            </CCol>
        </CRow>
        </CCardHeader>
        <CCardBody>
             <div class="row d-flex justify-content-center">
            <div class="col-md-4 col-sm-6">
              <CFormText>
                 مِن :
                </CFormText>
                <input
                  id="name"
                  v-model="fromDate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  type="date"
                  class="filter"
                  :placeholder="$t('message.fromDate')"
                />
            </div>
            <br>
            <div class="col-md-4 col-sm-6">
              <CFormText>
                   إلي :
                </CFormText>
                <input
                  id="name"
                  v-model="toDate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  type="date"
                  class="filter"
                  :placeholder=" $t('message.toDate')"
                />
            </div>
            <br>
            <div class="col-md-4 col-sm-6">
              <CButton square  v-on:click="filter" class="sub">
                    <CIcon class="c-icon" name="cil-chevron-top" /> &emsp;  تصفية
                </CButton>
            </div>
          </div>
          <hr/>
          <!-- Using the VdtnetTable component -->
          <vdtnet-table
            ref="table"
            :fields="fields"
            :opts="options"
          >
          </vdtnet-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import VdtnetTable from '../VdtnetTable.vue'

const date = new Date()
let fromDate = (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
let toDate = (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
export default {
  name: 'bank',
  components: { VdtnetTable },
  data () {
    return {
      fromDate: fromDate,
      toDate: toDate,
      options: {
        ajax: {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              'Authorization',
              'Bearer ' + localStorage.token
            )
          },
          url: this.$hostUrl + 'admin-dashboard/report/transaction/from/bank',
          data: function (d) {
            d.start_date = fromDate
            d.end_date = toDate
          },
          dataSrc: (json) => {
            return json[0].original.data
          }
        },
        buttons: [
          {
            extend: 'print',
            text: this.$t('message.print'),
            titleAttr: '',
            className: 'print',
            exportOptions: {
              columns: 'th:not(:last-child)'
            }
          },
          {
            extend: 'copy',
            text: this.$t('message.copy'),
            className: 'copy',
            titleAttr: ''
          },
          {
            extend: 'excel',
            text: '',
            titleAttr: 'إكسل',
            className: 'fa fa-table btn-success',
            exportOptions: {
              columns: 'th:not(:last-child)'
            }
          }
        ],
        dom:
          "<'row'<'col-sm-6 col-md-6'f><'col-sm-6 col-md-6 added'l>>" +
          "<'row'<'col-sm-12'Btr>>" +
          "<'row'<'col-sm-12 col-md-5'p><'col-sm-12 col-md-7'i>>",
        paging: true,
        language: {
          url: this.$t('message.url')
        },
        responsive: false,
        processing: true,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: false,
        fixedHeader: true,
        saveState: true,
        select: {
          style: 'multi'
        }
      },
      fields: {
        id: {
          label: 'رقم العملية',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        amount: {
          label: 'المبلغ ',
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        from_account: {
          label: ' من',
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        to_account: {
          label: ' إلي',
          isLocal: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        description: {
          label: ' الوصف',
          isLocal: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        created_at: {
          label: 'تاريخ التحويل',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        }
      },
      quickSearch: '',
      details: {},
      balance: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/report/transaction/from/bank`)
      .then((response) => {
        this.balance = response.data.blanceBank
      })
  },
  methods: {
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'admin-dashboard/report/transaction/from/bank',
        function (data) {
          cb(data.data)
        }
      )
    },
    filter ($event) {
      console.log($event)
      fromDate = this.fromDate
      toDate = this.toDate
      const table = this.$refs.table
      table.reload()
    },
    doAfterReload (data, table) {
      console.log('data reloaded')
    },
    doCreating (comp, el) {
      console.log('creating')
    },
    doCreated (comp) {
      console.log('created')
    },
    doSearch () {
      this.$refs.table.search(this.quickSearch)
    },
    doExport (type) {
      const parms = this.$refs.table.getServerParams()
      parms.export = type
    },
    formatCode (zipcode) {
      return zipcode.split('-')[0]
    }
  }
}
</script>
<style scoped>
.sub {
  border-color: #347A1E !important ;
  border-radius: 30px;
  color: #fff !important;
  font-size: 20px !important;
  padding: 5px 30px !important;
}
</style>
