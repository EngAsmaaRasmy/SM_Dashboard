
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="12">
              تفاصيل المبالغ المٌستحقة للدائنين
              <br>
                 <small>{{"مِن"+ ': ' + fromDate + ' - ' + "إلي" + ': ' + toDate}}</small>
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
            @show="doAlertShow"
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
let fromDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
let toDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
export default {
  name: 'creditor',
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
          url: this.$hostUrl + 'admin-dashboard/report/creditor/amount',
          data: function (d) {
            d.start_date = fromDate
            d.end_date = toDate
          },
          dataSrc: (json) => {
            return json.data
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
        name: {
          label: 'الدائن',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        deserved_amount: {
          label: 'المبلغ المستحق ',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        paid_amount: {
          label: ' المبلغ المدفوع',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        remaining_amount: {
          label: ' المبلغ المتبقي',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        }
      },
      quickSearch: '',
      details: {}
    }
  },
  methods: {
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'admin-dashboard/report/creditor/amount',
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
    doAlertShow (data) {
      this.$router.push({ path: `/accounts/${data.id}/show`, params: { id: data.id } })
    },
    doSearch () {
      this.$refs.table.search(this.quickSearch)
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
