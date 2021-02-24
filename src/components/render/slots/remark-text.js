export default {
  content(h, conf, key) {
    return <p>{conf.__slot__[key]}</p>
  }
}
