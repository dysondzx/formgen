<template>
  <div class="form-drawer-container">
    <el-dialog v-bind="$attrs" title="预览" v-on="$listeners" width="50%" @close="onClose" class="drawer-dialog">
      <div style="height:100%">
        <el-row style="height:100%;overflow:auto">
          <el-col class="right-preview">
            <iframe
              v-show="isIframeLoaded"
              ref="previewPage"
              class="result-wrapper"
              frameborder="0"
              src="preview.html"
              @load="iframeLoad"
            />
            <div v-show="!isIframeLoaded" v-loading="true" class="result-wrapper" />
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { parse } from '@babel/parser'
import ClipboardJS from 'clipboard'
import { saveAs } from 'file-saver'
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/html'
import { makeUpJs } from '@/components/generator/js'
import { makeUpCss } from '@/components/generator/css'
import { exportDefault, beautifierConf, titleCase } from '@/utils/index'
import ResourceDialog from './ResourceDialog'
import loadMonaco from '@/utils/loadMonaco'
import loadBeautifier from '@/utils/loadBeautifier'

const editorObj = {
  html: null,
  js: null,
  css: null
}
const mode = {
  html: 'html',
  js: 'javascript',
  css: 'css'
}
let beautifier
let monaco

export default {
  components: { ResourceDialog },
  props: ['formData'],
  data() {
    return {
      activeTab: 'html',
      htmlCode: '',
      jsCode: '',
      cssCode: '',
      codeFrame: '',
      isIframeLoaded: false,
      isInitcode: false, // 保证open后两个异步只执行一次runcode
      isRefreshCode: false, // 每次打开都需要重新刷新代码
      scripts: [],
      links: [],
      monaco: null,
      formDataLocal: this.formData
    }
  },
  computed: {
    resources() {
      return this.scripts.concat(this.links)
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    window.addEventListener('keydown', this.preventDefaultSave)
    const clipboard = new ClipboardJS('.copy-btn', {
      text: trigger => {
        const codeStr = this.generateCode()
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success'
        })
        return codeStr
      }
    })
    clipboard.on('error', e => {
      this.$message.error('代码复制失败')
    })
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.preventDefaultSave)
  },
  methods: {
    preventDefaultSave(e) {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    },
    onOpen(data) {
      const type = 'file'
      this.formDataLocal = data
      this.htmlCode = makeUpHtml(this.formDataLocal, type)
      this.jsCode = makeUpJs(this.formDataLocal, type)
      this.cssCode = makeUpCss(this.formDataLocal)

      if (!this.isInitcode) {
        this.isRefreshCode = true
        this.isIframeLoaded && (this.isInitcode = true) && this.runCode()
      }

      // loadBeautifier(btf => {
      //   beautifier = btf
      //   this.htmlCode = beautifier.html(this.htmlCode, beautifierConf.html)
      //   this.jsCode = beautifier.js(this.jsCode, beautifierConf.js)
      //   this.cssCode = beautifier.css(this.cssCode, beautifierConf.html)

      //   loadMonaco(val => {
      //     monaco = val
      //     this.setEditorValue('editorHtml', 'html', this.htmlCode)
      //     this.setEditorValue('editorJs', 'js', this.jsCode)
      //     this.setEditorValue('editorCss', 'css', this.cssCode)
      //     if (!this.isInitcode) {
      //       this.isRefreshCode = true
      //       this.isIframeLoaded && (this.isInitcode = true) && this.runCode()
      //     }
      //   })
      // })
    },
    onClose() {
      this.isInitcode = false
      this.isRefreshCode = false
    },
    iframeLoad() {
      if (!this.isInitcode) {
        this.isIframeLoaded = true
        this.isRefreshCode && (this.isInitcode = true) && this.runCode()
      }
    },
    setEditorValue(id, type, codeStr) {
      if (editorObj[type]) {
        editorObj[type].setValue(codeStr)
      } else {
        editorObj[type] = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: 'vs-dark',
          language: mode[type],
          automaticLayout: true
        })
      }
      // ctrl + s 刷新
      editorObj[type].onKeyDown(e => {
        if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
          this.runCode()
        }
      })
    },
    runCode() {
      const jsCodeStr = this.jsCode
      try {
        const ast = parse(jsCodeStr, { sourceType: 'module' })
        const astBody = ast.program.body
        if (astBody.length > 1) {
          this.$confirm(
            'js格式不能识别，仅支持修改export default的对象内容',
            '提示',
            {
              type: 'warning'
            }
          )
          return
        }
        if (astBody[0].type === 'ExportDefaultDeclaration') {
          const postData = {
            type: 'refreshFrame',
            data: {
              generateConf: { type: 'file' },
              html: this.htmlCode,
              js: jsCodeStr.replace(exportDefault, ''),
              css: this.cssCode,
              scripts: this.scripts,
              links: this.links
            }
          }
          this.$refs.previewPage.contentWindow.postMessage(
            postData,
            location.origin
          )
        } else {
          this.$message.error('请使用export default')
        }
      } catch (err) {
        this.$message.error(`js错误：${err}`)
        console.error(err)
      }
    },
    generateCode() {
      const html = vueTemplate(this.htmlCode)
      const script = vueScript(this.jsCode)
      const css = cssStyle(this.cssCode)
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    exportFile() {
      this.$prompt('文件名:', '导出文件', {
        inputValue: `${+new Date()}.vue`,
        closeOnClickModal: false,
        inputPlaceholder: '请输入文件名'
      }).then(({ value }) => {
        if (!value) value = `${+new Date()}.vue`
        const codeStr = this.generateCode()
        const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, value)
      })
    }
  }
}
</script>

<style lang="scss">
.form-drawer-container {
  .drawer-dialog .el-dialog .el-dialog__body {
    padding: 0px;
  }
  .tab-editor {
    position: absolute;
    top: 33px;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 14px;
  }
  .left-editor {
    position: relative;
    height: 100%;
    background: #1e1e1e;
    overflow: hidden;
  }
  .setting{
    position: absolute;
    right: 15px;
    top: 3px;
    color: #a9f122;
    font-size: 18px;
    cursor: pointer;
    z-index: 1;
  }
  .right-preview {
    height: 100%;
    .result-wrapper {
      height: 100vh;
      width: 100%;
      overflow: auto;
      box-sizing: border-box;
    }
    .close-div {
      position: fixed;
      top: 0;
      right: 50px;
      opacity: 0.5;
      filter: alpha(opacity=50);
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      .close-btn {
        color: #f56c6c;
      }
    }
  }
}

</style>
