<template>
<section class="vh-100 sky">
  <div class='stars'></div>
  <div class="container py-3 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-7 col-xl-7">
        <div class="card bg-dark text-white" style="border-radius: 1rem; background-color: transparent!important; border-color:  #fff; font-size: 18px;">
          <div class="card-body p-4 text-center">
             <CForm @submit.prevent='UserLogin'>
            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">تسجيل الدخول</h2>
              <p class="text-white-50 mb-5">برجاء إدخال البريد الإلكتروني وكلمة السر</p>

              <div class="form-outline form-white mb-2">
                <label class="form-label" style="font-size: 22px;"  for="typeEmailX">البريد الإلكتروني</label>
                 <input type="email" id="email" class="form-control form-control-lg"  v-model='user.email'/>
              </div>

              <div class="form-outline form-white mb-2">
                <label class="form-label" style="font-size: 22px;" for="typePasswordX">كلمة السر</label>
                 <input type="password" id="password" class="form-control form-control-lg" v-model='user.password'/>
              </div>
              <button class="btn btn-outline-light btn-lg login" type="submit">تسجيل الدخول</button>
            </div>
         </CForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'Login',
  data () {
    return {
      user: [],
      permissions: []
    }
  },
  methods: {
    UserLogin: function () {
      const formData = new FormData()
      formData.append('email', this.user.email)
      formData.append('password', this.user.password)
      this.$http.post(`${this.$hostUrl}admin-dashboard/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          if (!response.data.error) {
            localStorage.token = response.data.data.token
            this.$router.push({ path: '/dashboard' })
          } else {
            swal({ title: response.data.message, buttons: 'تم' })
          }
        })
        .catch(function (error) {
          if (Object.prototype.hasOwnProperty.call(error, 'response')) {
            const data = (error.response || {}).data
            if (data.error) {
              swal({ title: data.message, buttons: 'تم' })
            } else {
              swal({
                title: 'حدث خطـأ اثناء معالجة الطلب الرجاء المحاولة لاحقا  ',
                buttons: 'تم'
              })
            }
          } else {
            swal({
              title: 'حدث خطـأ اثناء معالجة الطلب الرجاء المحاولة لاحقا  ',
              buttons: 'تم'
            })
          }
        })
    }
  }
}
</script>
<style scoped>
.sky {
  background: linear-gradient(rgba(22,22,22,0.65), rgba(22,22,22,0.65)), url(https://almoasherbiz.com/landingpage/erp-modules/images/bg-image/hero-bg3.jpg);
}
.form-outline.form-white .form-control {
    color: #fff;
    background-color: inherit;
}
.login{
  padding: 10px 50px;
  margin-top: 10px;
}
.login:hover{
   background-color: #0A2342 !important;
   border-color:#0A2342 !important;
}
.form-outline .form-control {
  padding : 2rem;
}

</style>
