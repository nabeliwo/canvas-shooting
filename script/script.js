(() => {
  window.isKeyDown = {}

  const CANVAS_WIDTH = 640
  const CANVAS_HEIGHT = 480

  let util = null
  let canvas = null
  let ctx = null
  let image = null
  let startTime = null
  let viper = null

  window.addEventListener('load', () => {
    util = new Canvas2DUtility(document.body.querySelector('#canvas'))
    canvas = util.canvas
    ctx = util.context

    util.imageLoader('./image/viper.png', loadImage => {
      image = loadImage
      initialize()
      eventSetting()
      startTime = Date.now()
      render()
    })
  })

  function initialize() {
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    viper = new Viper(ctx, 0, 0, 64, 64, image)
    viper.setComing(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT + 50,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 100,
    )
  }

  function eventSetting() {
    window.addEventListener('keydown', event => {
      isKeyDown[`key_${event.key}`] = true
    })

    window.addEventListener('keyup', event => {
      isKeyDown[`key_${event.key}`] = false
    })
  }

  function render() {
    ctx.globalAlpha = 1.0
    util.drawRect(0, 0, canvas.width, canvas.height, '#eee')
    let nowTime = (Date.now() - startTime) / 1000

    viper.update()

    requestAnimationFrame(render)
  }

  function generateRandomInt() {

  }
})()
