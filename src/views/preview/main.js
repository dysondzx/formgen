import Vue from 'vue'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { loadScriptQueue } from '@/utils/loadScript'
import axios from 'axios'
import install from '@/components/custom/install'
import Preview from '@/views/preview/Preview.vue'

Vue.use(elementUI)
Vue.use(install)
Vue.prototype.$axios = axios

const $previewApp = document.getElementById('previewApp')

window.addEventListener('message', init, false)

function buildLinks(links) {
  let strs = ''
  links.forEach(url => {
    strs += `<link href="${url}" rel="stylesheet">`
  })
  return strs
}

function init(event) {
  if (event.data.type === 'refreshFrame') {
    const code = event.data.data
    let links = ''
    if (Array.isArray(code.links) && code.links.length > 0) {
      links = buildLinks(code.links)
    }

    $previewApp.innerHTML = `${links}<style>${code.css}</style><div id="app"></div>`
    if (Array.isArray(code.scripts) && code.scripts.length > 0) {
      loadScriptQueue(code.scripts, () => {
        newVue(code.js, code.html)
      })
    } else {
      newVue(code.js, code.html)
    }
  }
}

function newVue(main, html) {

  main = `<template>
  <div>
    ${html}
  </div>
  </template>
  <script>
  ${main}
  </script>` 
  axios.post("http://127.0.0.1:3000/parserEval", main, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  }).then(res=>{
    new Vue({
      components: {
        child: Preview
      },
      data() {
        return {
          visible: true
        }
      },
      template: '<div><child/></div>'
    }).$mount('#app')
  })
}
