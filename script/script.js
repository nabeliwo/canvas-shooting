(() => {
  window.isKeyDown = {}

  const CANVAS_WIDTH = 640
  const CANVAS_HEIGHT = 480
  const SHOT_MAX_COUNT = 10

  let util = null
  let canvas = null
  let ctx = null
  let image = null
  let startTime = null
  let viper = null
  let shotArray = []
  let singleShotArray = []

  window.addEventListener('load', () => {
    util = new Canvas2DUtility(document.body.querySelector('#canvas'))
    canvas = util.canvas
    ctx = util.context

    initialize()
    loadCheck()
  })

  function initialize() {
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    viper = new Viper(ctx, 0, 0, 64, 64, './image/viper.png')
    viper.setComing(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT + 50,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 100,
    )

    for (let i = 0; i < SHOT_MAX_COUNT; ++i) {
      shotArray[i] = new Shot(ctx, 0, 0, 32, 32, './image/viper_shot.png')
      singleShotArray[i * 2] = new Shot(ctx, 0, 0, 32, 32, './image/viper_single_shot.png')
      singleShotArray[i * 2 + 1] = new Shot(ctx, 0, 0, 32, 32, './image/viper_single_shot.png')
    }

    viper.setShotArray(shotArray, singleShotArray)
  }

  function loadCheck() {
    let ready = true

    ready = ready && viper.ready

    shotArray.map(v => {
      ready = ready && v.ready
    })

    singleShotArray.map(v => {
      ready = ready && v.ready
    })

    if (ready === true) {
      eventSetting()
      startTime = Date.now()
      render()
    } else {
      setTimeout(loadCheck, 100)
    }
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

    shotArray.map(v => {
      v.update()
    })

    singleShotArray.map(v => {
      v.update()
    })

    requestAnimationFrame(render)
  }

  function generateRandomInt() {

  }
})()
