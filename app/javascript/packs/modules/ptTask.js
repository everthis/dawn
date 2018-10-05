import { debounce } from "../common/utilities";
import { disableScroll, enableScroll } from "../common/toggleScroll";
const stack = [];
function queryId(ev) {
  const q = ev.target.value;
  if (!q.length) {
    renderList([]);
    return;
  }
  stack.push(q);
  fetch(`/pt_task_search?q=${q}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      shouldContinue(data, q);
    });
}
function shouldContinue(data, q) {
  if (stack.length > 0 && q === stack[stack.length - 1]) {
    renderList(data);
  }
}
function renderList(arr) {
  const res = [];
  arr.forEach(el => {
    res.push(`
      <div class="per-pt-task c-border c-center c-padding ${
        checkAvailability(el) ? "" : "not-available"
      }" data-id="${el.torrentId}">
        <div class="pt-task-cover" style="background-image: url(${
          el.coverPic
        }); ">
        </div>
        <div class="pt-task-info">
            <h3>${el.chsTitle}</h3>
            <h3>${el.engTitle}</h3>
            <div class="torrent-status-info">
                <span class="torrent-category c-pad-sm">种子类型: ${
                  el.torrentCategory
                }</span>
                <span class="torrent-size c-pad-sm">文件大小: <b>${
                  el.torrentSize
                }</b></span>
                <span class="torrent-seeders c-pad-sm">做种数量: <b>${
                  el.peersCount
                }</b></span>
                <span class="torrent-downloading c-pad-sm">正在下载数量: <b>${
                  el.downloadingCount
                }</b></span>
            </div>
        </div>
        <div class="pt-source-op">
          <span class="pt-source c-pad">种子来源: ${el.torrentSource}</span>
          ${checkAvailability(el) ? addTaskHtml(el) : ""}
        </div>
      </div>
    `);
  });
  resEle.innerHTML = res.join("");
  //   disableScroll();
}

function addTaskHtml(el) {
  return `<div class="add-pt-task c-pad c-center c-gap-top c-pointer" data-id='${
    el.torrentId
  }' data-source="${el.torrentSource}">添加到任务</div>`;
}

function checkAvailability(el) {
  if (el.peersCount > 0) {
    return true;
  } else {
    return false;
  }
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
let searchEle;
let insWrap;
const debouncedQueryId = debounce(queryId, 100, false);

export function initPtTask() {
  ele = document.getElementById("pt-tasks-q");
  resEle = document.getElementsByClassName("pt-tasks-search-result")[0];
  searchEle = document.getElementsByClassName("pt-tasks-search")[0];
  insWrap = document.getElementsByClassName("pt-tasks-wrap")[0];
  ele.addEventListener("keyup", debouncedQueryId);
  ele.addEventListener("focus", debouncedQueryId);
  resEle.addEventListener("click", delegateClick);
  insWrap.addEventListener("click", delegateClick);
}
export function disposePtTask() {
  ele.removeEventListener("keyup", debouncedQueryId);
  ele.removeEventListener("focus", debouncedQueryId);
  resEle.removeEventListener("click", delegateClick);
  insWrap.removeEventListener("click", delegateClick);
  enableScroll();
}
