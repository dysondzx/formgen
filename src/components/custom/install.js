import RemarkUpload from './RemarkUpload'
import RemarkText from './RemarkText'

const component = {
  install: Vue => {
    Vue.component('remark-upload', RemarkUpload)
    Vue.component('remark-text', RemarkText)
  }
}

export default component
