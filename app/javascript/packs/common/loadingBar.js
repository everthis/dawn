export default class LoadingBar {
  constructor (options) {
  	options = options || {}
    this.height = options.height
    this.width = options.width
    this.type = options.type || 'normal'
    this.percent = options.percent || 0
    this.show = false
    this.timer = null
    this.loadingEle = null
  }

  init (options) {
  	let container = document.getElementById('loadingBar-container')
  	let bar = document.createElement('div')
  	bar.id = 'loadingBar'
  	bar.className = 'app-loading-bar'

  	let inner = document.createElement('span')
  	inner.className = 'app-loading-bar-inner app-loading-bar-inner-color-primary'

  	this.loadingEle = inner
  	bar.appendChild(inner)

  	container.appendChild(bar)
  }

  start () {
  	if (this.timer) return
  	this.percent = 0
  	this.init()
  	this.timer = setInterval(() => {
    this.percent += Math.floor(Math.random() * 3 + 5)
    if (this.percent > 95) {
        	clearInterval(this.timer)
    }
    this.update({
      percent: this.percent,
      type: 'normal',
      show: true
    })
  }, 200)
  }

  update (options) {
  	this.percent = options.percent
  	this.type = options.type
  	this.show = options.show
  	if (this.type === 'error') this.loadingEle.style.backgroundColor = 'red'
  	this.loadingEle.style.width = this.percent + '%'
  }

  finish () {
  	this.update({
  		percent: 100,
  		type: 'normal',
  		show: true
  	})
  }

  error () {
  	this.update({
  		percent: 100,
  		type: 'error',
  		show: true
  	})
  }

  destroy () {
  	clearInterval(this.timer)
  	let loadingBarEle = document.getElementById('loadingBar')
  	loadingBarEle.parentElement.removeChild(loadingBarEle)
  }
}
