import Vue from 'vue'
import Router from 'vue-router'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import i18n from '../i18n'
// Containers
const TheContainer = () =>
  import('@/containers/TheContainer')

// Views
const Dashboard = () =>
  import('@/views/Dashboard')
const Loading = () =>
  import('@/views/Loading')

// Views - Pages
const Login = () =>
  import('@/views/Login')

// services
const Services = () =>
  import('@/views/services/Index')
const CreateService = () =>
  import('@/views/services/Create')
const EditService = () =>
  import('@/views/services/Edit')
const ShowService = () =>
  import('@/views/services/Show')

// reports
const ToBank = () =>
  import('@/views/reports/ToBank')
const FromBank = () =>
  import('@/views/reports/FromBank')
const ToSafe = () =>
  import('@/views/reports/ToSafe')
const FromSafe = () =>
  import('@/views/reports/FromSafe')
const CreditorReports = () =>
  import('@/views/reports/CreditorReports')
const ProfitsReports = () =>
  import('@/views/reports/ProfitsReports')
// service-providers
const ServiceProviders = () =>
  import('@/views/service-providers/Index')
const CreateServiceProvider = () =>
  import('@/views/service-providers/Create')
const EditServiceProvider = () =>
  import('@/views/service-providers/Edit')
const ShowServiceProvider = () =>
  import('@/views/service-providers/Show')

// Creditors
const Creditors = () =>
  import('@/views/creditors/Show')

// Accounts
const Accounts = () =>
  import('@/views/accounts/Index')
const CreateAccount = () =>
  import('@/views/accounts/Create')
const EditAccount = () =>
  import('@/views/accounts/Edit')
const ShowAccount = () =>
  import('@/views/accounts/Show')

// Invoices
const Invoices = () =>
  import('@/views/invoices/Index')
const CreateInvoice = () =>
  import('@/views/invoices/Create')
const EditInvoice = () =>
  import('@/views/invoices/Edit')
const ShowInvoice = () =>
  import('@/views/invoices/Show')

Vue.use(Router)
Vue.use(VueTabs)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [{

    path: '/',
    redirect: '/loading',
    name: i18n.t('message.main'),
    component: TheContainer,
    children: [{
      path: 'dashboard',
      name: i18n.t('message.dashboard'),
      component: Dashboard
    },
    // serviceProviders
    {
      path: 'service-providers',
      meta: {
        label: 'مُقدمي الخدمات'
      },
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [{
        path: '',
        name: 'مُقدمي الخدمات',
        component: ServiceProviders
      },
      {
        name: 'تعديل بيانات مُقدم الخدمة',
        path: ':id/edit',
        component: EditServiceProvider
      },
      {
        path: 'create',
        name: 'إضافة  مُقدم خدمة  جديد',
        component: CreateServiceProvider
      },
      {
        path: ':id/show',
        name: 'عرض  بيانات مُقدم الخدمة',
        component: ShowServiceProvider
      }
      ]
    },
    // services
    {
      path: 'services',
      meta: {
        label: 'الخدمات'
      },
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [{
        path: '',
        name: 'الخدمات',
        component: Services
      },
      {
        name: 'تعديل الخدمة',
        path: ':id/edit',
        component: EditService
      },
      {
        path: 'create',
        name: 'إضافة خدمة',
        component: CreateService
      },
      {
        path: ':id/show',
        name: 'عرض الخدمة',
        component: ShowService
      }
      ]
    },
    // Creditors
    {
      path: 'creditors',
      meta: {
        label: 'الدائنون'
      },
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [{
        path: '',
        name: 'الدائنون',
        component: Creditors
      }]
    },
    // Invoices
    {
      path: 'invoices',
      meta: {
        label: 'الفواتير'
      },
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [{
        path: '',
        name: 'الفواتير',
        component: Invoices
      },
      {
        path: 'create',
        name: 'إضافة فاتورة ',
        component: CreateInvoice
      },
      {
        name: 'تعديل  فاتورة',
        path: ':id/edit',
        component: EditInvoice
      },
      {
        name: 'عرض  فاتورة',
        path: ':id/show',
        component: ShowInvoice
      }
      ]
    },
    // Accounts
    {
      path: 'accounts',
      meta: {
        label: 'الحسابات'
      },
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [{
        path: '',
        name: 'الحسابات',
        component: Accounts
      },
      {
        path: 'create',
        name: 'إضافة حساب ',
        component: CreateAccount
      },
      {
        name: 'تعديل  حساب',
        path: ':id/edit',
        component: EditAccount
      },
      {
        name: 'عرض  حساب',
        path: ':id/show',
        component: ShowAccount
      }
      ]
    },
    // reports
    {
      path: 'reports',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'from-bank',
        name: 'تفاصيل المبالغ الصادرة من البنك',
        component: FromBank
      },
      {
        path: 'to-bank',
        name: 'تفاصيل المبالغ الواردة إلي البنك',
        component: ToBank
      },
      {
        path: 'from-safe',
        name: 'تفاصيل المبالغ الصادرة من الخزنة',
        component: FromSafe
      },
      {
        path: 'to-safe',
        name: 'تفاصيل المبالغ الواردة إلي الخزنة',
        component: ToSafe
      },
      {
        name: 'تقرير مٌفصل للمبالغ المستحقة للدائنين',
        path: 'creditors-report',
        component: CreditorReports
      },
      {
        name: 'تقرير مٌفصل بأرباح   مٌقدمي الخدمات ',
        path: 'provider-profits-report',
        component: ProfitsReports
      }
      ]
    }

    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/loading',
    component: Loading,
    name: 'Loading'
  }
  ]
}
