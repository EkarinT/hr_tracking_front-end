import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, numeric, min, ext, size } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'username or password is incorrect'
})

extend('numeric', {
  ...numeric,
  message: 'ระบุเป็นตัวเลขเท่านั้น'
})

extend('min', {
  ...min,
  message: 'ต้องมีความยาวอย่างน้อย {length} ตัว'
})

extend('checkBirthDate', (value) => {
  const obj = value.split('-')
  // console.log(obj)

  if (+obj[0] > 31 || +obj[0] < 1) {
    return 'กรุณาระบุวันที่ให้ถูกต้อง'
  }

  if (+obj[1] > 12 || +obj[1] < 1) {
    return 'กรุณาระบุเดือนให้ถูกต้อง'
  }

  if (+obj[2] > 2057 || +obj[2] < 1857) {
    return 'กรุณาระบุปีให้ถูกต้อง'
  }

  return true
})

extend('checkIdCard', (value) => {
  const obj = value.split('')
  let sum = 0
  let m = 13
  let check = 0
  for (let i = 0; i < obj.length - 1; i++) {
    sum += obj[i] * m
    m--
  }
  // console.log(sum)

  check = (11 - (sum % 11)) % 10
  // console.log(check)
  if (+obj[12] !== check) {
    return 'กรุณาระบุเลขบัตรประชาชนให้ถูกต้อง'
  }
  return true
})

extend('extPng', {
  ...ext,
  message: 'select PNG only'
})

extend('extPdf', {
  ...ext,
  message: 'ต้องใช้นามสกุลไฟล์ pdf เท่านั้น'
})

extend('requiredFile', {
  ...required,
  message: 'ต้องการไฟล์'
})

extend('size2MB', {
  ...size,
  message: 'selected file must less than 2 MB'
})
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
