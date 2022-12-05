/* eslint-disable no-undef */
<template>
<div id="app" :class='$i18n.locale'>
  <router-view ></router-view>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// Import Main styles for this application
.en {
 direction: ltr;
  text-align:left;
.c-sidebar{
direction: ltr;
}
.cardButton{
margin-left:820px;
 text-align:left;

 }
 .cards{

 direction: ltr;
 button{
  direction: ltr;
 }
 }
// Here you can add other styles
.c-icon[data-v-7983366c] {
    margin-right: 0.3rem;
    margin-left: 6px;
}
.mr-4, .mx-4 {
    margin-right: 1.5rem !important;
    margin-left: 20px;
}
.vdtnet-footer .dataTables_length, .vdtnet-footer .dataTables_paginate {
    float: left !important;
}
.vdtnet-footer .dataTables_length {
    padding-top: 9px;
    padding-left: 20px;
}
body{
    font-family: 'DroidArabicKufiRegular' !important;
    font-weight: 600 !important;
    font-size: 15px;
}
.btn-block {
    display: block;
    width: 100%;
    // padding: 10px;
    padding-left: 3px;
    padding-right: 3px;
}
.btn-primaryadd {
    padding: 10px 20px 10px 20px;
    color: #fff;
    background-color: rgb(114, 37, 76);
    border-color: rgb(114, 37, 76);
}
.btn-group > .btn, .btn-group-vertical > .btn {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    padding: 13px;
    flex: 1 1 auto;
}
.dataTables_length {
    direction: rtl !important;
    text-align: left;
}
.dataTables{text-align: center;}
.col-md-7 {
    -webkit-box-flex: 0;
    text-align: left;
    -ms-flex: 0 0 58.33333%;
    flex: 0 0 58.33333%;
    max-width: 58.33333%;
}
.titel-style{
    background: #ad80a6;
    font-size: 18px;
    width: 100%;
}

.dataTables_info {
    color: #ad80a6;
    padding: 6px;
    font-size: 18px;
    align-items: right;
}
label {
    display: inline-flex;
    margin-bottom: 0.5rem;
    font-size: 17px;
    font-weight: bold;
}
.form-control-sm {
    height: calc(1.5em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
    font-size: 0.76563rem;
    line-height: 1.5;
    margin: 0px 5px 0px 5px;
    border-radius: 0.2rem;
}
*[dir="rtl"] .custom-select-sm {
    padding-right: 0.5rem;
    direction: ltr;
}
.ps--active-x>.ps__rail-x, .ps--active-y>.ps__rail-y {
    display: block;
    background-color: transparent;
    left: 0px;
}
.ps__rail-y{
    left: 0px!important;
}
.swal-footer {
    text-align: left;
    padding-top: 13px;
    margin-top: 13px;
    padding: 13px 16px;
    border-radius: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
}

.ar {
 .my-div {
    height: 250px;
  }
  // all the style for ar lang
}
@import "assets/scss/style";
</style>
<style>
@import "assets/css/switch.css";
</style>
<style>
@import url('https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css');
</style>
<style>
#app{
 direction: 'localStorge.dir';
 }
.table thead th {
  text-align: center;
}
.custom-select-sm{
      width: 4.5em;
}
div.dataTables_wrapper {
    direction: rtl;
}
.dataTables_length > label{
  align-items: center;
}
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #643c53; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    top: 20%;
    right: 50%;
    position: absolute;
}
.cover{
    top:0;
    right:0;
    background-color: rgba(255,255,255,0.7);
    position: absolute;
    z-index: +100 !important;
    width: 100%;
    height: 100%;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.btn-primary {
  color: #fff;
  background-color: rgb(114, 37, 76);
  border-color: rgb(114, 37, 76);
  border-radius: 3px;
}
.btn-warning {
  color: #4f5d73;
  background-color: #f9b115;
  border-color: #f9b115;
  border-radius: 3px;
}
</style>

<style>
@import url("https://fontlibrary.org/face/droid-arabic-kufi");
</style>
