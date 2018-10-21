import { debounce } from "../common/utilities";
import inViewport from "../common/inViewport";
import { disableScroll, enableScroll } from "../common/toggleScroll";
const stack = [];
const torrentDetailEl = document.getElementsByClassName(
  "torrent-detail-popup"
)[0];
const torrentDetailWrapEl = document.getElementsByClassName(
  "torrent-detail-wrap"
)[0];
const searchInputEl = document.getElementById("pt-tasks-q");

let ptTasks = [];
function queryId(ev) {
  const q = searchInputEl.value;
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

function getTorrentDetail({ id, source }) {
  if (id == null || source == null) {
    return;
  }
  fetch(`/pt_task_torrent_detail?id=${id}&source=${source}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(data => {
      torrentDetailEl.innerHTML = data;
      torrentDetailWrapEl.classList.remove("c-hide");
    });
}

function getTtgCover(el) {
  const id = el.dataset.id;
  const source = el.dataset.source;
  const coverEl = Array.prototype.slice
    .call(el.children)
    .filter(el => el.classList.contains("pt-task-cover"))[0];
  if (coverEl.style.backgroundImage.indexOf("ttg_logo") === -1) {
    return;
  }
  return fetch(`/pt_task_ttg_cover?id=${id}&source=${source}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(data => {
      if (data == null || data === "null" || data === "") {
        return;
      }
      coverEl.style.backgroundImage = `url(${data})`;
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
        el.torrentSource ? el.torrentSource : ""
      } ${checkAvailability(el) ? "" : "not-available"}" data-id="${
      el.torrentId
    }" data-source="${el.torrentSource}">
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
          <span class="pt-source c-pad-sm c-center">种子来源: ${
            el.torrentSource
          }</span>
          <span class="c-center c-gap-top c-pad-sm pt-torrent-detail c-pointer"
          data-source="${el.torrentSource}"
          data-id="${el.torrentId}">种子详情</span>
          ${checkAvailability(el) ? addTaskHtml(el) : ""}
        </div>
      </div>
    `);
  });
  resEle.innerHTML = res.join("");
  ptTasks = Array.prototype.slice.call(
    document.querySelectorAll(".per-pt-task.ttg")
  );
  checkInViewport();
  //   disableScroll();
}

function addTaskHtml(el) {
  return `<div class="add-pt-task c-pad-sm c-center c-gap-top c-pointer" data-id='${
    el.torrentId
  }' data-source="${el.torrentSource}">添加到任务</div>`;
}

function checkAvailability(el) {
  if (el.peersCount > 0 && validSize(el.torrentSize)) {
    return true;
  } else {
    return false;
  }
}

function validSize(str) {
  const regex = /(\d*\.*\d*)(.*)/;
  const res = regex.exec(str);
  if (res[2] === "GB") {
    if (+res[1] > 10) {
      return false;
    }
  }
  return true;
}

function delegateClick(ev) {
  const evt = ev.target;
  let apt, ptd, tdpc;
  // add pt task
  if (evt.classList.contains("add-pt-task")) {
    apt = evt;
  } else {
    apt = evt.closest(".add-pt-task");
  }
  if (apt) {
    addPtTask(apt);
    return;
  }

  // torrentDetail
  if (evt.classList.contains("pt-torrent-detail")) {
    ptd = evt;
  } else {
    ptd = evt.closest(".pt-torrent-detail");
  }
  if (ptd) {
    showTorrentDetail(ptd);
    return;
  }

  // popup
  if (evt.classList.contains("torrent-detail-popup-close")) {
    tdpc = evt;
  } else {
    tdpc = evt.closest(".torrent-detail-popup-close");
  }
  if (tdpc) {
    closePopup(tdpc);
    return;
  }

  // disable link in popup
  if (evt.tagName === "A" && evt.closest(".torrent-detail-popup")) {
    forbidExtLink(ev);
    return;
  }
}

function forbidExtLink(ev) {
  ev.preventDefault();
  alert("external link disabled.");
}

function closePopup(el) {
  const wrapEl = el.closest(".torrent-detail-wrap");
  wrapEl.classList.add("c-hide");
}

function showTorrentDetail(el) {
  const { id, source } = el.dataset;
  getTorrentDetail({ id, source });
}

function addPtTask(el) {
  const { source, id } = el.dataset;
  return fetch(`/pt_task_add?sourceId=${source}_${id}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function goToTaskDetail(task_id) {
  A.spf.navigate(`${window.location.origin}/pt_tasks?id=${task_id}`);
}

function checkInViewport(ev) {
  for (let el of ptTasks) {
    if (inViewport(el)) {
      getTtgCover(el);
    }
  }
}

let ele;
let resEle;
let tdWrap;
const debouncedQueryId = debounce(queryId, 400, true);
const debouncedCheckInViewport = debounce(checkInViewport, 300, false);

export function initPtTask() {
  ele = document.getElementById("pt-task-search-btn");
  resEle = document.getElementsByClassName("pt-tasks-search-result")[0];
  tdWrap = document.getElementsByClassName("torrent-detail-wrap")[0];
  ele.addEventListener("click", debouncedQueryId);
  resEle.addEventListener("click", delegateClick);
  tdWrap.addEventListener("click", delegateClick);
  window.addEventListener("scroll", debouncedCheckInViewport);
}
export function disposePtTask() {
  ele.removeEventListener("click", debouncedQueryId);
  resEle.removeEventListener("click", delegateClick);
  tdWrap.removeEventListener("click", delegateClick);
  window.removeEventListener("scroll", debouncedCheckInViewport);
  enableScroll();
}
