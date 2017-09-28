import { debounce } from '../common/utilities'
import { disableScroll, enableScroll } from '../common/toggleScroll'
function queryId(ev) {
  const q = ev.target.value
  if (!q.length) {
    renderList([])
    return
  }
  fetch(`/queryInstagramUserId?q=${q}`, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(renderList)
}
function renderList(arr) {
  const res = []
  maskEle.classList.remove('c-hide')
  arr.forEach(el => {
    res.push(`
      <div class="instagram_user c-border c-center c-padding">
        <div class="avatar" style="background-image: url('${el.profile_pic_url}'); background-size: cover;"></div>
        <div class="user_name">${el.user_name}</div>
        <div class="type">
        </div>
        <div class="media_count">user_id: ${el.user_id}</div>
      </div>
    `)
  })
  resEle.innerHTML = res.join('')
  disableScroll()
}
function hideMask(ev) {
  renderList([])
  maskEle.classList.add('c-hide')
  enableScroll()
}
let ele
let resEle
let maskEle
let searchEle
const debouncedQueryId = debounce(queryId, 100, false)
export function initInstagramUser() {
  ele = document.getElementById('ins_user_q')
  resEle = document.getElementsByClassName('ins-search-result')[0]
  searchEle = document.getElementsByClassName('ins-search')[0]
  maskEle = document.getElementsByClassName('ins-mask')[0]
  ele.addEventListener('keyup', debouncedQueryId)
  maskEle.addEventListener('click', hideMask)
}
export function disposeInstagramUser() {
  ele.removeEventListener('keyup', debouncedQueryId)
  maskEle.removeEventListener('click', hideMask)
}
