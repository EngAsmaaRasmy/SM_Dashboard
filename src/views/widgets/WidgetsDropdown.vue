<template>
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" :header="cities" text="المدن">
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height:70px"
            :data-points="[65, 59, 84, 84, 51, 55, 40]"
            point-hover-background-color="primary"
            label="طلبات"
            labels="شهور"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" :header="users" text="الأحياء">
        <!-- <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
            :caret="false"
          >
            <template #toggler-content>
              <CIcon name="cil-location-pin"/>
            </template>
            <CDropdownItem>العمليات</CDropdownItem>
            <CDropdownItem>عمليات اخرى</CDropdownItem>
            <CDropdownItem>شيء اخر</CDropdownItem>
            <CDropdownItem disabled>تعطيل العملية</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height:70px"
            :data-points="[1, 18, 9, 17, 34, 22, 11]"
            point-hover-background-color="info"
            :options="{ elements: { line: { tension: 0.00001 }}}"
            label="طلبات"
            labels="شهور"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="warning"
        :header="cities"
        text="نوع العقار"
      >
        <!-- <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-settings"/>
            </template>
            <CDropdownItem>العمليات</CDropdownItem>
            <CDropdownItem>عمليات اخرى</CDropdownItem>
            <CDropdownItem>شيء اخر</CDropdownItem>
            <CDropdownItem disabled>تعطيل العملية</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartLineSimple
            class="mt-3"
            style="height:70px"
            background-color="rgba(255,255,255,.2)"
            :data-points="[78, 81, 80, 45, 34, 12, 40]"
            :options="{ elements: { line: { borderWidth: 2.5 }}}"
            point-hover-background-color="warning"
            label="طلبات"
            labels="شهور"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="danger"
        :header="sub_cities"
        text="الطلبات "
      >
        <!-- <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
             <CIcon name="cil-settings"/>
            </template>
            <CDropdownItem>العمليات</CDropdownItem>
            <CDropdownItem>عمليات اخرى</CDropdownItem>
            <CDropdownItem>شيء اخر</CDropdownItem>
            <CDropdownItem disabled>تعطيل العملية</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartBarSimple
            class="mt-3 mx-3"
            style="height:70px"
            background-color="rgb(250, 152, 152)"
            label="طلبات"
            labels="شهور"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js'

export default {
  name: 'WidgetsDropdown',
  data () {
    return {
      servicesCount: '0',
      customersCount: '0',
      total: '0',
      workersCount: '0'
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}statistics`)
      .then((response) => {
        this.workersCount = response.data.data.workers.toString()
        this.customersCount = response.data.data.customers.toString()
        this.total = response.data.data.orders.toString()
        this.servicesCount = response.data.data.servcices.toString()
      })
  },
  components: { CChartLineSimple, CChartBarSimple }
}
</script>
