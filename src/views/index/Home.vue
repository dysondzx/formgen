<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
          <i class="el-icon-back" /> <span class="textlogo">组团计划申请</span> <i class="el-icon-setting" />
        </div>
      </div>
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div class="components-top"
               v-for="(item, listIndex) in leftComponents"
               :key="listIndex">
            <div class="components-title">
              {{ item.title }}
            </div>
            <draggable class="components-draggable"
                       :list="item.list"
                       :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
                       :clone="cloneComponent"
                       draggable=".components-item"
                       :sort="false"
                       @end="onEnd">
              <div v-for="(element, index) in item.list"
                   :key="index"
                   class="components-item"
                   @click="addComponent(element)">
                <div class="components-body">
                  <svg-icon :icon-class="element.__config__.tagIcon" />
                  {{ element.__config__.label }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <el-tabs v-model="currentTab"
             class="center-tabs">
          <el-tab-pane label="组件属性"
                      name="field" />
          <el-tab-pane label="表单属性"
                      name="form" />
        </el-tabs>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row"
                :gutter="formConf.gutter">
          <el-form :size="formConf.size"
                    v-show="currentTab==='field'"
                   :label-position="formConf.labelPosition"
                   :disabled="formConf.disabled"
                   :label-width="formConf.labelWidth + 'px'">
            <draggable class="drawing-board"
                       :list="drawingList"
                       group="componentsGroup">
              <draggable-item v-for="(item, index) in drawingList"
                              :key="item.renderKey"
                              :drawing-list="drawingList"
                              :current-item="item"
                              :index="index"
                              :active-id="activeId"
                              :form-conf="formConf"
                              @activeItem="activeFormItem"
                              @copyItem="drawingItemCopy"
                              @deleteItem="drawingItemDelete" />
            </draggable>
            <div v-show="!drawingList.length"
                 class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
          <el-form :size="formConf.size"
                    v-show="currentTab==='form'"
                   :label-position="formConf.labelPosition"
                   :disabled="formConf.disabled"
                   :label-width="formConf.labelWidth + 'px'">
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>

    <right-panel :active-data="activeData"
                 :form-conf="formConf"
                 :drawing-list="drawingList"
                 :show-field="!!drawingList.length"
                 @fetch-data="fetchData" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import render from '@/components/render/render'
import RightPanel from './RightPanel'
import {
  basicComponents, layoutComponents, systemComponents, formConf
} from '@/components/generator/config'
import { deepClone } from '@/utils/index'
import logo from '@/assets/logo.png'
import DraggableItem from './DraggableItem'

let oldActiveId
let tempActiveData

export default {
  components: {
    draggable,
    render,
    RightPanel,
    DraggableItem
  },
  data() {
    return {
      logo,
      idGlobal: 100,
      formConf,
      currentTab: 'field',
      basicComponents,
      layoutComponents,
      systemComponents,
      labelWidth: 100,
      drawingList: [],
      drawingData: {},
      activeId: null,
      activeData: null,
      leftComponents: [
        {
          title: '基础控件',
          list: basicComponents
        },
        {
          title: '布局控件',
          list: layoutComponents
        },
        {
          title: '系统控件',
          list: systemComponents
        }
      ]
    }
  },
  computed: {
  },
  watch: {
    activeId: {
      handler(val) {
        oldActiveId = val
      },
      immediate: true
    },
    drawingList: {
      handler(val) {
        if (val.length === 0) this.idGlobal = 100
      },
      deep: true
    }
  },
  methods: {
    setObjectValueByStringKeys(obj, strKeys, val) {
      const arr = strKeys.split('.')
      arr.reduce((pre, item, i) => {
        if (arr.length === i + 1) {
          pre[item] = val
        } else if (Object.prototype.toString.call(pre[item]) !== '[Object Object]') {
          pre[item] = {}
        }
        return pre[item]
      }, obj)
    },
    setRespData(component, respData) {
      const { dataPath, renderKey, dataConsumer } = component.__config__
      if (!dataPath || !dataConsumer) return
      const data = dataPath.split('.').reduce((pre, item) => pre[item], respData)
      this.setObjectValueByStringKeys(component, dataConsumer, data)
      const i = this.drawingList.findIndex(item => item.__config__.renderKey === renderKey)
      if (i > -1) this.$set(this.drawingList, i, component)
    },
    fetchData(component) {
      const { dataType, method, url } = component.__config__
      if (dataType === 'dynamic' && method && url) {
        this.setLoading(component, true)
        this.$axios({
          method,
          url
        }).then(resp => {
          this.setLoading(component, false)
          this.setRespData(component, resp.data)
        })
      }
    },
    setLoading(component, val) {
      const { directives } = component
      if (Array.isArray(directives)) {
        const t = directives.find(d => d.name === 'loading')
        if (t) t.value = val
      }
    },
    activeFormItem(currentItem) {
      this.activeData = currentItem
      this.activeId = currentItem.__config__.formId
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.fetchData(tempActiveData)
        this.activeData = tempActiveData
        this.activeId = this.idGlobal
      }
    },
    addComponent(item) {
      const clone = this.cloneComponent(item)
      this.fetchData(clone)
      this.drawingList.push(clone)
      this.activeFormItem(clone)
    },
    cloneComponent(origin) {
      const clone = deepClone(origin)
      const config = clone.__config__
      config.span = this.formConf.span // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone)
      tempActiveData = clone
      return tempActiveData
    },
    createIdAndKey(item) {
      const config = item.__config__
      config.formId = ++this.idGlobal
      config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        // item.__vModel__ = `field${this.idGlobal}`
        item.__vModelTemp__ = `field${this.idGlobal}` // __vModel__需要由后台保存时生成，因此刚添加的控件，没有__vModel__
      }
      if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`
        !Array.isArray(config.children) && (config.children = [])
        delete config.label // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem))
      }
      return item
    },
    drawingItemCopy(item, list) {
      let clone = deepClone(item)
      clone = this.createIdAndKey(clone)
      list.push(clone)
      this.activeFormItem(clone)
    },
    drawingItemDelete(index, list) {
      list.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(item => item.__config__.formId === this.activeId)
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach(item => {
          if (Array.isArray(item.__config__.children)) this.updateDrawingList(newTag, item.__config__.children)
        })
      }
    }
  }
}
</script>

<style lang='scss'>
@import "@/styles/home";
</style>
