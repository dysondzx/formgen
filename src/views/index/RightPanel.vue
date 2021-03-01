<template>
  <div class="right-board">
    <div class="right-bu">
    <el-button class="run-btn" type="text" @click="run">
      预览
    </el-button>
    <el-button class="copy-btn-main" type="text" @click="save">
      保存
    </el-button>
    </div>
    <div class="field-box">
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <el-form v-show="showField"
                 v-if="activeData"
                 size="small"
                 label-width="90px">
          <el-form-item v-if="activeData.__config__.componentName!==undefined"
                        label="组件名">
            {{ activeData.__config__.componentName }}
          </el-form-item>
          <el-form-item v-if="activeData.__config__.label!==undefined"
                        label="">
            <div>
              <span class="st-headline">标题</span>
              <span class="st-hint">最多50字</span>
            </div>
            <el-input v-model="activeData.__config__.label"
                      placeholder="请输入标题"
                      oninput="if(value.length > 50)value = value.slice(0, 50)"
                      @input="changeRenderKey" />
          </el-form-item>
          <el-form-item v-if="activeData.placeholder!==undefined"
                        label="">
            <div>
              <span class="st-headline">提示文字</span>
              <span class="st-hint">最多50字</span>
            </div>            
            <el-input v-model="activeData.placeholder"
                      placeholder="请输入"
                      oninput="if(value.length > 50)value = value.slice(0, 50)"
                      @input="changeRenderKey" />
          </el-form-item>
          <el-form-item v-if="activeData['start-placeholder']!==undefined"
                        label="开始占位">
            <el-input v-model="activeData['start-placeholder']"
                      placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="activeData['end-placeholder']!==undefined"
                        label="结束占位">
            <el-input v-model="activeData['end-placeholder']"
                      placeholder="请输入占位提示" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.defaultValue!==undefined && activeData.__config__.tag === 'el-input'"
                        label="默认值">
            <el-input :value="setDefaultValue(activeData.__config__.defaultValue)"
                      placeholder="请输入默认值"
                      @input="onDefaultValueInput" />
          </el-form-item>
          <el-form-item v-if="activeData.autosize !== undefined"
                        label="可见行数">
            <el-input-number v-model="activeData.autosize.minRows"
                             :min="1"
                             placeholder="可见行数" />
          </el-form-item>
          <el-form-item v-if="isShowStep"
                        label="步长">
            <el-input-number v-model="activeData.step"
                             placeholder="步数" />
          </el-form-item>
          <el-form-item v-if="activeData.maxlength !== undefined"
                        label="最多输入">
            <el-input v-model="activeData.maxlength"
                      placeholder="请输入字符长度">
              <template slot="append">
                个字符
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="activeData.type !== undefined && 'el-date-picker' === activeData.__config__.tag"
                        label="时间类型">
            <el-select v-model="activeData.type"
                       placeholder="请选择时间类型"
                       :style="{ width: '100%' }"
                       @change="dateTypeChange">
              <el-option v-for="(item, index) in dateOptions"
                         :key="index"
                         :label="item.label"
                         :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.name !== undefined"
                        label="文件字段名">
            <el-input v-model="activeData.name"
                      placeholder="请输入上传文件字段名" />
          </el-form-item>
          <el-form-item v-if="activeData.accept !== undefined"
                        label="文件类型">
            <el-select v-model="activeData.accept"
                       placeholder="请选择文件类型"
                       :style="{ width: '100%' }"
                       clearable>
              <el-option label="图片"
                         value="image/*" />
              <el-option label="视频"
                         value="video/*" />
              <el-option label="音频"
                         value="audio/*" />
              <el-option label="excel"
                         value=".xls,.xlsx" />
              <el-option label="word"
                         value=".doc,.docx" />
              <el-option label="pdf"
                         value=".pdf" />
              <el-option label="txt"
                         value=".txt" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.fileSize !== undefined" label="文件大小限制">
              <el-select v-model="activeData.__config__.fileSize" :style="{ width: '66px' }">
                <el-option label="1" value="1" />
                <el-option label="2" value="2" />
                <el-option label="5" value="5" />
              </el-select>
              <span :style="{ 'margin-left': '10px' }">{{activeData.__config__.sizeUnit}}</span>
          </el-form-item>
          <!-- <el-form-item v-if="activeData.action !== undefined"
                        label="上传地址">
            <el-input v-model="activeData.action"
                      placeholder="请输入上传地址"
                      clearable />
          </el-form-item> -->
          <!-- <el-form-item v-if="activeData['list-type'] !== undefined"
                        label="列表类型">
            <el-radio-group v-model="activeData['list-type']"
                            size="small">
              <el-radio-button label="text">
                text
              </el-radio-button>
              <el-radio-button label="picture">
                picture
              </el-radio-button>
              <el-radio-button label="picture-card">
                picture-card
              </el-radio-button>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item v-if="activeData.__config__.buttonText !== undefined"
                        v-show="'picture-card' !== activeData['list-type']"
                        label="按钮文字">
            <el-input v-model="activeData.__config__.buttonText"
                      placeholder="请输入按钮文字" />
          </el-form-item>
          <el-form-item v-if="activeData['range-separator'] !== undefined"
                        label="分隔符">
            <el-input v-model="activeData['range-separator']"
                      placeholder="请输入分隔符" />
          </el-form-item>
          <el-form-item v-if="activeData['picker-options'] !== undefined"
                        label="时间段">
            <el-input v-model="activeData['picker-options'].selectableRange"
                      placeholder="请输入时间段" />
          </el-form-item>
          <el-form-item v-if="activeData.format !== undefined"
                        label="时间格式">
            <el-input :value="activeData.format"
                      placeholder="请输入时间格式"
                      @input="setTimeValue($event)" />
          </el-form-item>
          <template v-if="['el-checkbox-group', 'el-select'].indexOf(activeData.__config__.tag) > -1">
            <el-divider>选项</el-divider>
            <draggable :list="activeData.__slot__.options"
                       :animation="340"
                       group="selectItem"
                       handle=".option-drag">
              <div v-for="(item, index) in activeData.__slot__.options"
                   :key="index"
                   class="select-item">
                <div class="select-line-icon option-drag">
                  <i class="el-icon-s-operation" />
                </div>
                <el-checkbox :key="activeData.__config__.tag + index" :checked="activeData.__config__.defaultValue.indexOf(item.value)>-1" @change="flag => checkChange(flag, item, true)"></el-checkbox>
                <el-input v-model="item.label"
                          placeholder="选项名"
                          size="small" />
                <el-input placeholder="选项值"
                          size="small"
                          :value="item.value"
                          @input="setOptionValue(item, $event)" />
                <div class="close-btn select-line-icon"
                     @click="activeData.__slot__.options.splice(index, 1)">
                  <i class="el-icon-remove-outline" />
                </div>
              </div>
            </draggable>
            <div style="margin-left: 20px;">
              <el-button style="padding-bottom: 0"
                         icon="el-icon-circle-plus-outline"
                         type="text"
                         @click="addSelectItem">
                添加选项
              </el-button>
            </div>
            <el-divider />
          </template>

          <template v-if="['el-radio-group'].indexOf(activeData.__config__.tag) > -1">
            <el-divider>选项</el-divider>
            <draggable :list="activeData.__slot__.options"
                       :animation="340"
                       group="selectItem"
                       handle=".option-drag">
              <div v-for="(item, index) in activeData.__slot__.options"
                   :key="index"
                   class="select-item">
                <div class="select-line-icon option-drag">
                  <i class="el-icon-s-operation" />
                </div>
                <el-radio :key="activeData.__config__.tag + index" v-model="activeData.__config__.defaultValue" :label="item.value"><span></span></el-radio>
                <el-input v-model="item.label"
                          placeholder="选项名"
                          size="small" />
                <el-input placeholder="选项值"
                          size="small"
                          :value="item.value"
                          @input="setOptionValue(item, $event)" />
                <div class="close-btn select-line-icon"
                     @click="activeData.__slot__.options.splice(index, 1)">
                  <i class="el-icon-remove-outline" />
                </div>
              </div>
            </draggable>
            <div style="margin-left: 20px;">
              <el-button style="padding-bottom: 0"
                         icon="el-icon-circle-plus-outline"
                         type="text"
                         @click="addSelectItem">
                添加选项
              </el-button>
            </div>
            <el-divider />
          </template>

          <el-form-item v-if="activeData.__config__.showLabel !== undefined
            && activeData.__config__.labelWidth !== undefined"
                        label="显示标签">
            <el-switch v-model="activeData.__config__.showLabel" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.border !== undefined"
                        label="是否带边框">
            <el-switch v-model="activeData.__config__.border" />
          </el-form-item>
          <el-form-item v-if="activeData['show-word-limit'] !== undefined"
                        label="输入统计">
            <el-switch v-model="activeData['show-word-limit']" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-input-number'"
                        label="严格步数">
            <el-switch v-model="activeData['step-strictly']" />
          </el-form-item>
          <el-form-item v-if="activeData.clearable !== undefined"
                        label="能否清空">
            <el-switch v-model="activeData.clearable" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.showTip !== undefined"
                        label="显示提示">
            <el-switch v-model="activeData.__config__.showTip" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-upload'"
                        label="多选文件">
            <el-switch v-model="activeData.multiple" />
          </el-form-item>
          <el-form-item v-if="activeData['auto-upload'] !== undefined"
                        label="自动上传">
            <el-switch v-model="activeData['auto-upload']" />
          </el-form-item>
          <el-form-item v-if="activeData.readonly !== undefined"
                        label="是否只读">
            <el-switch v-model="activeData.readonly" />
          </el-form-item>
          <el-form-item v-if="activeData.disabled !== undefined"
                        label="是否禁用">
            <el-switch v-model="activeData.disabled" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-select'"
                        label="能否搜索">
            <el-switch v-model="activeData.filterable" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'el-select'"
                        label="是否多选">
            <el-switch v-model="activeData.multiple"
                       @change="multipleChange" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.required !== undefined"
                        label="是否必填">
            <el-switch v-model="activeData.__config__.required" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'remark-text'"
                        class="remark-item"
                        label="说明文字">
            <span class="remark-tip">最多{{ activeData.maxlength?activeData.maxlength:50 }}字</span>
            <el-input v-model="activeData.__slot__.content"
                      type="textarea"
                      :maxlength="activeData.maxlength"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入说明文字" />
          </el-form-item>
          <el-form-item v-if="activeData.__config__.tag === 'remark-upload'"
                        class="remark-item"
                        label="描述文件">
            <el-upload class="upload-demo"
                       :action="activeData.action"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :before-remove="beforeRemove"
                       :on-success="handleSuccess"
                       :on-error="hanldeError"
                       :before-upload="handleBeforeUpload"
                       multiple
                       :limit="3"
                       :on-exceed="handleExceed"
                       :file-list="activeData.__slot__.fileList">
              <el-button size="small"
                         type="primary">
                点击上传
              </el-button>
              <div slot="tip"
                   class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item v-if="activeData.__config__.remark !== undefined" class="remark-item" label="描述">
            <span class="remark-tip">最多50字</span>
            <el-input v-model="activeData.__config__.remark"
                      type="textarea"
                      maxlength="50"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入描述" />
          </el-form-item>
          <template v-if="activeData.__config__.layoutTree">
            <el-divider>布局结构树</el-divider>
            <el-tree :data="[activeData.__config__]"
                     :props="layoutTreeProps"
                     node-key="renderKey"
                     default-expand-all
                     draggable>
              <span slot-scope="{ node, data }">
                <span class="node-label">
                  <svg-icon class="node-icon"
                            :icon-class="data.__config__?data.__config__.tagIcon:data.tagIcon" />
                  {{ node.label }}
                </span>
              </span>
            </el-tree>
          </template>

          <template v-if="Array.isArray(activeData.__config__.regList)">
            <el-divider>正则校验</el-divider>
            <div v-for="(item, index) in activeData.__config__.regList"
                 :key="index"
                 class="reg-item">
              <span class="close-btn"
                    @click="activeData.__config__.regList.splice(index, 1)">
                <i class="el-icon-close" />
              </span>
              <el-form-item label="表达式">
                <el-input v-model="item.pattern"
                          placeholder="请输入正则" />
              </el-form-item>
              <el-form-item label="错误提示"
                            style="margin-bottom:0">
                <el-input v-model="item.message"
                          placeholder="请输入错误提示" />
              </el-form-item>
            </div>
            <div style="margin-left: 20px">
              <el-button icon="el-icon-circle-plus-outline"
                         type="text"
                         @click="addReg">
                添加规则
              </el-button>
            </div>
          </template>
        </el-form>
      </el-scrollbar>
    </div>

    <treeNode-dialog :visible.sync="dialogVisible"
                     title="添加选项"
                     @commit="addNode" />
    <form-drawer :visible.sync="drawerVisible"
                 :generate-conf="generateConf"
                 :form-data="formData"
                 ref="formDrawerRef"
                 size="100%" />
    <code-type-dialog :visible.sync="geneTypeVisible"
                      title="选择生成类型"
                      @confirm="generate" />
    <input id="copyNode"
           type="hidden">
  </div>
</template>

<script>
import { isArray } from 'util'
import TreeNodeDialog from '@/views/index/TreeNodeDialog'
import {
  isNumberStr, beautifierConf, titleCase, deepClone
} from '@/utils/index'
import IconsDialog from './IconsDialog'
// import { saveFormConf } from '@/utils/db'
import FormDrawer from './FormDrawer'
import CodeTypeDialog from './CodeTypeDialog'
import loadBeautifier from '@/utils/loadBeautifier'
import ClipboardJS from 'clipboard'
import {
  makeUpHtml, vueTemplate, vueScript, cssStyle
} from '@/components/generator/html'
import { makeUpJs } from '@/components/generator/js'
import { makeUpCss } from '@/components/generator/css'

const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

let beautifier

export default {
  components: {
    TreeNodeDialog,
    IconsDialog,
    FormDrawer,
    CodeTypeDialog
  },
  props: ['showField', 'activeData', 'formConf', 'drawingList'],
  data() {
    return {
      currentNode: null,
      dialogVisible: false,
      currentIconModel: null,
      drawerVisible: false,
      geneTypeVisible: false,
      formData: {},
      generateConf: null,
      dateTypeOptions: [
        {
          label: '日(date)',
          value: 'date'
        },
        {
          label: '周(week)',
          value: 'week'
        },
        {
          label: '月(month)',
          value: 'month'
        },
        {
          label: '年(year)',
          value: 'year'
        },
        {
          label: '日期时间(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '日期范围(daterange)',
          value: 'daterange'
        },
        {
          label: '月范围(monthrange)',
          value: 'monthrange'
        },
        {
          label: '日期时间范围(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      layoutTreeProps: {
        label(data, node) {
          const config = data.__config__
          return data.componentName || `${config.label}`
        }
      }
    }
  },
  computed: {
    dateOptions() {
      if (
        this.activeData.type !== undefined
        && this.activeData.__config__.tag === 'el-date-picker'
      ) {
        if (this.activeData['start-placeholder'] === undefined) {
          return this.dateTypeOptions
        }
        return this.dateRangeTypeOptions
      }
      return []
    },
    activeTag() {
      return this.activeData.__config__.tag
    }
  },
  mounted() {
    loadBeautifier(btf => {
      beautifier = btf
    })
    const clipboard = new ClipboardJS('#copyNode', {
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
  methods: {
    run() {
      this.geneTypeVisible = true
      this.operationType = 'run'
    },
    save() {
      this.AssembleFormData() //组合form的JSON和drawingList的JSON
      console.log('调用保存接口:', this.formData)
    },
    generate(data) {
      const func = this[`exec${titleCase(this.operationType)}`]
      this.generateConf = data
      func && func(data)
    },
    execRun(data) {
      this.AssembleFormData()
      this.drawerVisible = true
    },
    generateCode() {
      const { type } = this.generateConf
      this.AssembleFormData()
      const script = vueScript(makeUpJs(this.formData, type))
      const html = vueTemplate(makeUpHtml(this.formData, type))
      const css = cssStyle(makeUpCss(this.formData))
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    AssembleFormData() {
      this.formData = {
        fields: deepClone(this.drawingList),
        ...this.formConf
      }
    },
    addReg() {
      this.activeData.__config__.regList.push({
        pattern: '',
        message: ''
      })
    },
    addSelectItem() {
      this.activeData.__slot__.options.push({
        label: '',
        value: ''
      })
    },
    addTreeItem() {
      ++this.idGlobal
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      )
    },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove(node, data) {
      this.activeData.__config__.defaultValue = [] // 避免删除时报错
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addNode(data) {
      this.currentNode.push(data)
    },
    checkChange(flag, item, isMultiple) {
      if (flag) {
        if (this.activeData.__config__.defaultValue.indexOf(item.value) === -1) {
          this.activeData.__config__.defaultValue.push(item.value)
        }
      } else {
        const idx = this.activeData.__config__.defaultValue.indexOf(item.value)
        if (idx > -1) {
          this.activeData.__config__.defaultValue.splice(idx, 1)
        }
      }
    },
    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? +val : val
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },
    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val))
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val)
      }
    },
    setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData.__config__, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', valueFormat)
      this.$set(this.activeData, 'format', val)
    },
    spanChange(val) {
      this.formConf.span = val
    },
    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(response, file, fileList) {
      this.activeData.__slot__.fileList.push({ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' })
    },
    hanldeError(err, file, fileList) {
      this.activeData.__slot__.fileList.push({ name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' })
    },
    handleBeforeUpload(file) {
    }
  }
}
</script>

<style lang="scss">
.right-board {
  width: 272px;
  position: absolute;
  right: 0;
  top: 0;
  .right-bu{
    background: #fff;
    text-align: right;
    font-size: 16px;
   .run-btn{
    color: #ff4384;
   }
   .copy-btn-main{
     width: 128px;
     height: 50px;
     background: #d9534f;
     margin-left: 47px;
     color: #fff;
     border-radius: 0px;
   }
  }
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    border-radius: 3px;
    top: 12px;
    left: 10px;
  }
  .el-scrollbar {
    height: 100%;
  }
  .el-form-item.remark-item {
    .el-form-item__content {
      margin-left: 24px !important;
    }
    .remark-tip {
      color: #dcdfe6;
      .el-form-item__content {
        margin-left: 24px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label {
  font-size: 14px;
}
.node-icon {
  color: #bebfc3;
}
</style>
