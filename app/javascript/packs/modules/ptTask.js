import { debounce } from "../common/utilities";
import { disableScroll, enableScroll } from "../common/toggleScroll";
function queryId(ev) {
  const q = ev.target.value;
  if (!q.length) {
    renderList([]);
    return;
  }
  fetch(`/pt_task_search?q=${q}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(renderList);
}
function renderList(arr) {
  const res = [];
  maskEle.classList.remove("c-hide");
  arr.forEach(el => {
    res.push(`
      <div class="per-pt-task c-border c-center c-padding" data-id="${
        el.torrentId
      }">
        <div class="pt-task-cover" style="background-image: url(${
          el.coverPic
        }); ">
        </div>
        <div class="pt-task-info">
            <h3>${el.chsTitle}</h3>
            <h3>${el.engTitle}</h3>
            <div>
                <span>文件大小: ${el.torrentSize}</span>
                <span>做种数量: ${el.peersCount}</span>
                <span>正在下载数量: ${el.downloadingCount}</span>
            </div>
        </div>
      </div>
    `);
  });
  resEle.innerHTML = res.join("");
  disableScroll();
}
function hideMask(ev) {
  renderList([]);
  maskEle.classList.add("c-hide");
  enableScroll();
}
function delegateClick(ev) {
  const evt = ev.target;
  let te;
  if (evt.classList.contains("per-pt-task")) {
    te = evt;
  } else {
    te = evt.closest(".per-pt-task");
  }
  if (!te) return;
  const task_id = +te.dataset.id;
  A.spf.navigate(`${window.location.origin}/pt_tasks?id=${task_id}`);
}

let ele;
let resEle;
let maskEle;
let searchEle;
let insWrap;
const debouncedQueryId = debounce(queryId, 100, false);

export function initPtTask() {
  ele = document.getElementById("pt-tasks-q");
  resEle = document.getElementsByClassName("pt-tasks-search-result")[0];
  searchEle = document.getElementsByClassName("pt-tasks-search")[0];
  maskEle = document.getElementsByClassName("pt-tasks-mask")[0];
  insWrap = document.getElementsByClassName("pt-tasks-wrap")[0];
  ele.addEventListener("keyup", debouncedQueryId);
  ele.addEventListener("focus", debouncedQueryId);
  maskEle.addEventListener("click", hideMask);
  resEle.addEventListener("click", delegateClick);
  insWrap.addEventListener("click", delegateClick);
}
export function disposePtTask() {
  ele.removeEventListener("keyup", debouncedQueryId);
  ele.removeEventListener("focus", debouncedQueryId);
  maskEle.removeEventListener("click", hideMask);
  resEle.removeEventListener("click", delegateClick);
  insWrap.removeEventListener("click", delegateClick);
  enableScroll();
}
