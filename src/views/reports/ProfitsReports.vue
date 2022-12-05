
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="6">
              تفاصيل الأرباح  لمٌقدمي  الخدمات
          <br>
                 <small>{{"مِن"+ ': ' + fromDate + ' - ' + "إلي" + ': ' + toDate}}</small>
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
            @reloaded="doAfterReload"
          >
          </vdtnet-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
// import swal from 'sweetalert'
import VdtnetTable from '../VdtnetTable.vue'
const date = new Date()
let fromDate = (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
let toDate = (date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
export default {
  name: 'payments',
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
          url: this.$hostUrl + 'admin-dashboard/service/provider/profist',
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
        id: {
          label: 'الرقم',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        provider: {
          label: '  مٌقدم الخدمة',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        services: {
          label: '   الخدمة',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        amount: {
          label: 'السعر ',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        precentage: {
          label: ' نسبة ربح مٌقدم الخدمة ',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        smcommision: {
          label: '    عمولة SM ',
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },

        created_at: {
          label: this.$t('message.date'),
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
        this.$hostUrl + 'admin-dashboard/service/provider/profist',
        function (data) {
          cb(data.data)
        }
      )
    },
    doAfterReload (data, table) {
      console.log('data reloaded')
    },
    filter ($event) {
      console.log($event)
      fromDate = this.fromDate
      toDate = this.toDate
      const table = this.$refs.table
      table.reload()
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
