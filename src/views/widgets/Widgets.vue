<template>
  <CRow>
    <CCol sm='6' lg='6'>
      <CWidgetProgressIcon
        class="widget"
        :header='services'
        text="عدد الخدمات"
        inverse
      >
      <CIcon name='cil-speedometer' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
    <CCol sm='6' lg='6'>
      <CWidgetProgressIcon
        class='widget'
        :header='bank'
        text="المبلغ المالي في البنك"
        inverse
      >
      <CIcon name='cil-basket' height='45'/>
      </CWidgetProgressIcon>
      </CCol>
    <CCol sm='6' lg='6'>
      <CWidgetProgressIcon
        class="widget"
        :header='accounts'
        text="عدد الحسابات "
        inverse
      >
        <CIcon name='cil-chartPie' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
    <CCol sm='6' lg='6'>
      <CWidgetProgressIcon
        class="widget"
        :header='safe'
        text=" المبلغ المالي في الخزينة"
        inverse
      >
        <CIcon name='cil-chartPie' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
  </CROW>
</template>

<script>

export default {
  name: 'Widgets',
  data () {
    return {
      services: '0',
      bank: '0',
      accounts: '0',
      safe: '0'
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/statistics`)
      .then((response) => {
        this.services = response.data.data.statistics_services.toString()
        this.bank = response.data.data.the_amount_of_money_in_the_bank.toString()
        this.accounts = response.data.data.statistics_accounts.toString()
        this.safe = response.data.data.the_amount_of_money_in_the_safe.toString()
      })
  }
}
</script>
<style>
  .widget
{
  background-color: #e8eaf1;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  border-radius: 20px;
  border-left: rgba(65.0, 75.0, 109.0, 1.0) 4px outset !important ;
  }
</style>
