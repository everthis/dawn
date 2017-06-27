let f, fa, fd, tb, tbdString, tbd, tbt, tbtpd, postText, submitBtn, inputs, label, labelVal, fileName
let $micropost_picture
let doc = document
function setFocus (el) {
  var range = document.createRange()
  var sel = window.getSelection()
  range.setStart(el, 0)
  range.collapse(true)
  sel.removeAllRanges()
  sel.addRange(range)
}
function bindKeyDown () {
  if (tb.getElementsByTagName('div')[0] && tb.getElementsByTagName('div')[0].textContent) {
    tb.classList.remove('showPlaceholder')
  };
  if (tb.innerHTML === '<br>') {
    tb.innerHTML = tbdString
    setFocus(tb.getElementsByTagName('div')[0])
  }
}

function bindKeyUp () {
  if (tb.innerHTML) {
    if (tb.getElementsByTagName('div')[0] && tb.getElementsByTagName('div')[0].textContent) {
      tb.classList.remove('showPlaceholder')
    } else {};
  } else {
    tb.innerHTML = tbdString
    setTimeout(function () {
      setFocus(tb.getElementsByTagName('div')[0])
    }, 0)
  };
}

function bindFocus () {
  tb.classList.remove('condensed')
  if (tb.getElementsByTagName('div') && tb.getElementsByTagName('div')[0].innerText.trim().length) {
    tb.classList.remove('showPlaceholder')
  } else {
    tb.classList.add('showPlaceholder')
  }
  if (tbd.innerHTML === tbtpd) {
    tbd.innerHTML = '<br>'
  }
}

function bindImgInputChange () {
  let size_in_megabytes = this.files[0].size / 1024 / 1024
  if (size_in_megabytes > 5) {
    alert('Maximum file size is 5MB. Please choose a smaller file.')
  }
}

function bindSubmitBtn (ev) {
  ev.preventDefault()
  if (tbt.textContent.trim() === tbtpd) {
    postText.value = ''
  } else {
    postText.value = tbt.textContent.trim()
  }
  fa = f.action
  fd = new FormData(f)
  window.A.spf.load(fa, {
    method: 'POST',
    postData: fd,
    onProcess: function (evt) {
      exitTweetBox()
    },
    onDone: function (evt) {
      tweetBox()
    }
  })
}

function bindImgUpload (e) {
  fileName = ''
  if (this.files && this.files.length > 1) { fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length) } else { fileName = e.target.value.split('\\').pop() }

  if (fileName) { label.getElementsByTagName('span')[0].innerHTML = fileName } else { label.getElementsByTagName('span')[0].innerHTML = labelVal }
}

function changeSubmitBtnBehavior () {

}

export function tweetBox () {
  tb = doc.getElementsByClassName('tweet-box')[0]
  if (!tb) return null
  tbd = tb.getElementsByTagName('div')[0]
  tbdString = '<div><br></div>'
  f = doc.getElementById('new_micropost')
  $micropost_picture = doc.getElementById('micropost_picture')
  tbt = doc.getElementsByClassName('tweet-box-text')[0]
  tbtpd = tbt.dataset.placeholderDefault
  postText = doc.getElementsByClassName('new-post-text')[0]
  submitBtn = doc.getElementsByClassName('btn-submit')[0]
  inputs = doc.getElementsByClassName('micropost-input-file')[0]
  label = inputs.nextElementSibling,
  labelVal = label.innerHTML

  tb.addEventListener('focus', bindFocus)
  tb.addEventListener('keyup', bindKeyUp)
  tb.addEventListener('keydown', bindKeyDown)
  $micropost_picture.addEventListener('change', bindImgInputChange.bind($micropost_picture))
  submitBtn.addEventListener('click', bindSubmitBtn)
  inputs.addEventListener('change', bindImgUpload.bind(inputs))
}

export function exitTweetBox () {
  tb.removeEventListener('focus', bindFocus)
  tb.removeEventListener('keyup', bindKeyUp)
  tb.removeEventListener('keydown', bindKeyDown)
  $micropost_picture.removeEventListener('change', bindImgInputChange.bind(this))
  submitBtn.removeEventListener('click', bindSubmitBtn)
  inputs.removeEventListener('change', bindImgUpload.bind(this))
}
