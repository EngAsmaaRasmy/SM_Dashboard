
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="8">
            تفاصيل المبالغ الواردة إلي الخزنة
                <br>
                 <small>{{"مِن"+ ': ' + fromDate + ' - ' + "إلي" + ': ' + toDate}}</small>
            </CCol>
             <CCol style="font-size: 25px;" col="4">
             الرصيد  في الخزنة : {{balance}}
            </CCol>
        </CRow>
        </CCardHeader>
        <CCardBody>
            <div class="row">
            <div class="col-md-4">
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
            <div class="col-md-4">
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
            <div class="col-md-2">
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
console.log(fromDate, toDate)
export default {
  name: 'safe',
  components: { VdtnetTable },
  data () {
    return {
      fromDate: fromDate,
      toDate: toDate,
      customUrl: 'sdfghu',
      options: {
        ajax: {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              'Authorization',
              'Bearer ' + localStorage.token
            )
          },
          url: `${this.$hostUrl}admin-dashboard/report/transaction/to/safe`,
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
          label: 'المبلغ',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        from_account: {
          label: '  من',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        to_account: {
          label: '  إلي',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        description: {
          label: '  الوصف',
          sortable: true,
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
      .get(`${this.$hostUrl}admin-dashboard/report/transaction/to/safe`)
      .then((response) => {
        this.balance = response.data.blanceSafe
      })
  },
  methods: {
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'admin-dashboard/report/transaction/to/safe',
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
    doSearch () {
      this.$refs.table.search(this.quickSearch)
    },
    doExport (type) {
      const parms = this.$refs.table.getServerParams()
      parms.export = type
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
