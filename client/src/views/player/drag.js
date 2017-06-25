class Drag {
  constructor (options) {
    this.el = options.el
    this.halfPointWidth = Math.round(this.el.offsetWidth / 2)
    this.offset = Math.round((320 - options.parentNodeWidth) / 2)
    this.boundary = options.boundary
    this.init()
  }

  init () {
    this.addEvent('touchmove', this.drag)
  }

  addEvent (type, fn) {
    this.el.addEventListener(type, fn.bind(this), false)
  }

  start (fn) {
    this.addEvent('touchstart', fn)
  }

  drag (e) {
    e.preventDefault()
    let position = e.touches[0]
    if (position.clientX > this.boundary.max) {
      this.el.style.left = this.boundary.max - this.offset - this.halfPointWidth + 'px'
      return;
    } else if (position.clientX < this.boundary.min) {
      this.el.style.left = this.boundary.min - this.offset - this.halfPointWidth + 'px'
      return;
    }

    this.el.style.left = position.clientX.toFixed(2) - this.offset - this.halfPointWidth + 'px'
  }

  end (fn) {
    this.addEvent('touchend', fn)
  }
}

export default Drag
