export default {
  content(h, conf, key) {
    let txt = conf.__slot__[key]
    txt = txt.replace(/[\r\n]/g, '<br/>')
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|#|-)+)/g
    const result = txt.replace(reg, item => `<a href=${item} target=_blank>${item}</a>`)
    return <p domPropsInnerHTML={result}></p>
  }
}
