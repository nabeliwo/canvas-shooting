class Canvas2DUtility {
  constructor(canvas) {
    this.canvasElement = canvas
    this.context2D = canvas.getContext('2d')
  }

  get canvas() {
    return this.canvasElement
  }

  get context() {
    return this.context2D
  }

  imageLoader(path, callback) {
    let target = new Image()

    target.addEventListener('load', () => {
      if (callback != null) {
        callback(target)
      }
    })

    target.src = path
  }

  drawRect(x, y, width, height, color) {
    if (color != null) {
      this.context2D.fillStyle = color
    }

    this.context2D.fillRect(x, y, width, height)
  }
}
