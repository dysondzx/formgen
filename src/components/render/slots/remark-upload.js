export default {
  fileList(h, conf, key) {
    const list = []
    conf.__slot__[key].forEach((item, index) => {
      list.push(
        <div class="file-list-container">
        <span>{(index + 1)}.&nbsp;<a>{item.name}</a></span>
        </div>
      )
    })
    return list
  }
}
