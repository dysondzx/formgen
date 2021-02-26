// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

// 基础型组件 【左面板】
export const basicComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: '单行输入框',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: null,
      required: true,
      layout: 'colFormItem',
      span: 24,
      // 正则校验规则
      regList: [],
      remark: null
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    maxlength: null,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '多行输入框',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'textarea',
      defaultValue: null,
      required: true,
      layout: 'colFormItem',
      span: 24,
      regList: [],
      remark: null
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 3
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  // {
  //   __config__: {
  //     label: '密码',
  //     showLabel: true,
  //     labelWidth: null,
  //     tag: 'el-input',
  //     tagIcon: 'password',
  //     defaultValue: null,
  //     layout: 'colFormItem',
  //     span: 24,
  //     required: true,
  //     regList: []
  //   },
  //   placeholder: '请输入',
  //   'show-password': true,
  //   style: { width: '100%' },
  //   clearable: true,
  //   maxlength: null,
  //   readonly: false,
  //   disabled: false
  // },
  // {
  //   __config__: {
  //     label: '数字',
  //     showLabel: true,
  //     labelWidth: null,
  //     tag: 'el-input-number',
  //     tagIcon: 'number',
  //     defaultValue: null,
  //     span: 24,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: []
  //   },
  //   placeholder: '',
  //   min: undefined,
  //   max: undefined,
  //   step: 1,
  //   'step-strictly': false,
  //   precision: undefined,
  //   'controls-position': '',
  //   disabled: false
  // },
  {
    __config__: {
      label: '单选框',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      defaultValue: null,
      layout: 'colFormItem',
      span: 24,
      regList: [],
      required: true,
      border: false,
      remark: null
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }, {
        label: '选项三',
        value: 3
      }]
    },
    style: {},
    // size: 'medium',
    disabled: false
  },
  {
    __config__: {
      label: '多选框',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      border: false,
      remark: null
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }, {
        label: '选项三',
        value: 3
      }]
    },
    style: {},
    // size: 'medium',
    min: null,
    max: null,
    disabled: false
  },
  {
    __config__: {
      label: '附件',
      tag: 'el-upload',
      tagIcon: 'upload',
      layout: 'colFormItem',
      showLabel: true,
      labelWidth: null,
      required: true,
      span: 24,
      showTip: false,
      buttonText: '点击上传',
      regList: [],
      fileSize: 2,
      sizeUnit: 'MB'
    },
    __slot__: {
      'list-type': true
    },
    action: '/posts/',
    disabled: false,
    accept: '',
    name: 'file',
    'auto-upload': true,
    'list-type': 'text',
    multiple: false
  }
  // {
  //   __config__: {
  //     label: '编辑器',
  //     showLabel: true,
  //     labelWidth: null,
  //     tag: 'tinymce',
  //     tagIcon: 'rich-text',
  //     defaultValue: null,
  //     span: 24,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: []
  //   },
  //   placeholder: '请输入',
  //   height: 300, // 编辑器高度
  //   branding: false // 隐藏右下角品牌烙印
  // }
  // {
  //   __config__: {
  //     label: '下拉选择',
  //     showLabel: true,
  //     labelWidth: null,
  //     tag: 'el-select',
  //     tagIcon: 'select',
  //     layout: 'colFormItem',
  //     span: 24,
  //     required: true,
  //     regList: []
  //   },
  //   __slot__: {
  //     options: [{
  //       label: '选项一',
  //       value: 1
  //     }, {
  //       label: '选项二',
  //       value: 2
  //     }]
  //   },
  //   placeholder: '请选择',
  //   style: { width: '100%' },
  //   clearable: true,
  //   disabled: false,
  //   filterable: false,
  //   multiple: false
  // },
  // {
  //   __config__: {
  //     label: '级联选择',
  //     url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
  //     method: 'get',
  //     dataPath: 'list',
  //     dataConsumer: 'options',
  //     showLabel: true,
  //     labelWidth: null,
  //     tag: 'el-cascader',
  //     tagIcon: 'cascader',
  //     layout: 'colFormItem',
  //     defaultValue: [],
  //     dataType: 'dynamic',
  //     span: 24,
  //     required: true,
  //     regList: []
  //   },
  //   options: [{
  //     id: 1,
  //     value: 1,
  //     label: '选项1',
  //     children: [{
  //       id: 2,
  //       value: 2,
  //       label: '选项1-1'
  //     }]
  //   }],
  //   placeholder: '请选择',
  //   style: { width: '100%' },
  //   props: {
  //     props: {
  //       multiple: false,
  //       label: 'label',
  //       value: 'value',
  //       children: 'children'
  //     }
  //   },
  //   'show-all-levels': true,
  //   disabled: false,
  //   clearable: true,
  //   filterable: false,
  //   separator: '/'
  // },
  // {
  //   __config__: {
  //     label: '开关',
  //     tag: 'el-switch',
  //     tagIcon: 'switch',
  //     defaultValue: false,
  //     span: 24,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: []
  //   },
  //   style: {},
  //   disabled: false,
  //   'active-text': '',
  //   'inactive-text': '',
  //   'active-color': null,
  //   'inactive-color': null,
  //   'active-value': true,
  //   'inactive-value': false
  // },
  // {
  //   __config__: {
  //     label: '滑块',
  //     tag: 'el-slider',
  //     tagIcon: 'slider',
  //     defaultValue: null,
  //     span: 24,
  //     showLabel: true,
  //     layout: 'colFormItem',
  //     labelWidth: null,
  //     required: true,
  //     regList: []
  //   },
  //   disabled: false,
  //   min: 0,
  //   max: 100,
  //   step: 1,
  //   'show-stops': false,
  //   range: false
  // },
  // {
  //   __config__: {
  //     label: '时间选择',
  //     tag: 'el-time-picker',
  //     tagIcon: 'time',
  //     defaultValue: null,
  //     span: 24,
  //     showLabel: true,
  //     layout: 'colFormItem',
  //     labelWidth: null,
  //     required: true,
  //     regList: []
  //   },
  //   placeholder: '请选择',
  //   style: { width: '100%' },
  //   disabled: false,
  //   clearable: true,
  //   'picker-options': {
  //     selectableRange: '00:00:00-23:59:59'
  //   },
  //   format: 'HH:mm:ss',
  //   'value-format': 'HH:mm:ss'
  // },
  // {
  //   __config__: {
  //     label: '时间范围',
  //     tag: 'el-time-picker',
  //     tagIcon: 'time-range',
  //     span: 24,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     defaultValue: null,
  //     required: true,
  //     regList: []
  //   },
  //   style: { width: '100%' },
  //   disabled: false,
  //   clearable: true,
  //   'is-range': true,
  //   'range-separator': '至',
  //   'start-placeholder': '开始时间',
  //   'end-placeholder': '结束时间',
  //   format: 'HH:mm:ss',
  //   'value-format': 'HH:mm:ss'
  // },
  // {
  //   __config__: {
  //     label: '日期选择',
  //     tag: 'el-date-picker',
  //     tagIcon: 'date',
  //     defaultValue: null,
  //     showLabel: true,
  //     labelWidth: null,
  //     span: 24,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: []
  //   },
  //   placeholder: '请选择',
  //   type: 'date',
  //   style: { width: '100%' },
  //   disabled: false,
  //   clearable: true,
  //   format: 'yyyy-MM-dd',
  //   'value-format': 'yyyy-MM-dd',
  //   readonly: false
  // },
  // {
  //   __config__: {
  //     label: '日期范围',
  //     tag: 'el-date-picker',
  //     tagIcon: 'date-range',
  //     defaultValue: null,
  //     span: 24,
  //     showLabel: true,
  //     labelWidth: null,
  //     required: true,
  //     layout: 'colFormItem',
  //     regList: []
  //   },
  //   style: { width: '100%' },
  //   type: 'daterange',
  //   'range-separator': '至',
  //   'start-placeholder': '开始日期',
  //   'end-placeholder': '结束日期',
  //   disabled: false,
  //   clearable: true,
  //   format: 'yyyy-MM-dd',
  //   'value-format': 'yyyy-MM-dd',
  //   readonly: false
  // },
  // {
  //   __config__: {
  //     label: '评分',
  //     tag: 'el-rate',
  //     tagIcon: 'rate',
  //     defaultValue: 0,
  //     span: 24,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: []
  //   },
  //   style: {},
  //   max: 5,
  //   'allow-half': false,
  //   'show-text': false,
  //   'show-score': false,
  //   disabled: false
  // },
  // {
  //   __config__: {
  //     label: '颜色选择',
  //     tag: 'el-color-picker',
  //     tagIcon: 'color',
  //     span: 24,
  //     defaultValue: null,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: []
  //   },
  //   'show-alpha': false,
  //   'color-format': '',
  //   disabled: false,
  //   size: 'medium'
  // },
]

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    __config__: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '一行两列',
      layoutTree: true
    },
    align: 'top'
  },
  {
    __config__: {
      label: '说明文字',
      showLabel: false,
      tag: 'remark-text',
      tagIcon: 'input',
      required: true,
      layout: 'colFormItem',
      span: 24
    },
    __slot__: {
      content: ''
    },
    value: null,
    placeholder: '请输入说明文字',
    clearable: false,
    maxlength: 50,
    readonly: true,
    disabled: false
  },
  {
    __config__: {
      label: '描述文件',
      showLabel: false,
      // eleType: 'remark-upload',
      tag: 'remark-upload',
      tagIcon: 'upload',
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      span: 24,
      showTip: false,
      buttonText: '点击附件上传',
      regList: [],
      fileSize: 2,
      sizeUnit: 'MB'
    },
    __slot__: {
      'list-type': true,
      fileList: []
    },
    action: '/posts/',
    disabled: false,
    accept: '',
    name: 'file',
    'auto-upload': true,
    'list-type': 'text',
    multiple: true
  }
]

// 系统组件 【左面板】
export const systemComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: '申请单号',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: null,
      required: true,
      layout: 'colFormItem',
      span: 24,
      // 正则校验规则
      regList: []
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    maxlength: null,
    readonly: false,
    disabled: false
  },
  {
    // 组件的自定义配置
    __config__: {
      label: '创建人',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: null,
      required: true,
      layout: 'colFormItem',
      span: 24,
      // 正则校验规则
      regList: []
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    maxlength: null,
    readonly: false,
    disabled: false
  },
  {
    // 组件的自定义配置
    __config__: {
      label: '所属部门',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: null,
      required: true,
      layout: 'colFormItem',
      span: 24,
      // 正则校验规则
      regList: []
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    maxlength: null,
    readonly: false,
    disabled: false
  },
  {
    // 组件的自定义配置
    __config__: {
      label: '创建时间',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: null,
      required: true,
      layout: 'colFormItem',
      span: 24,
      // 正则校验规则
      regList: []
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    maxlength: null,
    readonly: false,
    disabled: false
  }
]
