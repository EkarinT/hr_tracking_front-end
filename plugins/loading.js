import { Loading } from 'notiflix'

const Notiflix = {
  loading () {
    Loading.pulse()
  },
  remove () {
    Loading.remove()
  }
}

export default ({ app }, inject) => {
  inject('Notiflix', Notiflix)
}
