import { debounce } from "../common/utilities";
import inViewport from "../common/inViewport";
import { disableScroll, enableScroll } from "../common/toggleScroll";
import { parseAndFlash } from "../common/flash";
const stack = [];

let listData = [];
let ptTasks = [];
let timer;
let remainingSeconds = 10;
let ptTaskCountDownEl;
function queryId(ev) {
  const searchInputEl = document.getElementById("pt-tasks-q");
  const q = searchInputEl.value;
  if (!q.length) {
    renderList([]);
    return;
  }
  stack.push(q);
  startCountDown();
  fetch(`/pt_task_search?q=${q}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      stopCountDown();
      shouldContinue(data, q);
    });
}

function getDetailContent({ id, source }) {
  if (id == null || source == null) {
    return;
  }
  return fetch(`/pt_task_torrent_detail?id=${id}&source=${source}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}

function startCountDown() {
  ptTaskCountDownEl = document.getElementById("pt-task-query-timer");
  initCountDown();
  countDown();
}
function stopCountDown() {
  initCountDown();
  ptTaskCountDownEl.innerHTML = "";
}
function initCountDown() {
  remainingSeconds = 10;
  clearTimeout(timer);
}
function countDown() {
  remainingSeconds -= 1;
  ptTaskCountDownEl.innerHTML = `查询Timeout倒计时：${remainingSeconds}秒`;
  if (remainingSeconds === 0) {
    clearTimeout(timer);
    stopCountDown();
  } else {
    timer = setTimeout(() => {
      countDown();
    }, 1000);
  }
}
function getTorrentDetail({ id, source }) {
  const torrentDetailEl = document.getElementsByClassName(
    "torrent-detail-popup"
  )[0];
  const torrentDetailWrapEl = document.getElementsByClassName(
    "torrent-detail-wrap"
  )[0];
  getDetailContent({ id, source }).then(data => {
    torrentDetailEl.innerHTML = data.detailHtml;
    torrentDetailWrapEl.classList.remove("c-hide");
  });
}

function getTorrentCover(el) {
  const id = el.dataset.id;
  const source = el.dataset.source;
  const coverEl = Array.prototype.slice
    .call(el.children)
    .filter(el => el.classList.contains("pt-task-cover"))[0];
  if (
    coverEl.style.backgroundImage.indexOf("ttg_logo") === -1 &&
    coverEl.style.backgroundImage.indexOf("logo_hdchina") === -1
  ) {
    return;
  }

  return fetch(`/pt_task_torrent_detail?id=${id}&source=${source}`, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.cover == null || data.cover === "null" || data.cover === "") {
        return;
      }
      coverEl.style.backgroundImage = `url(${data.cover})`;
    });
}
function shouldContinue(data, q) {
  if (stack.length > 0 && q === stack[stack.length - 1]) {
    listData = [];
    renderList(data);
  }
}
function renderList(arr) {
  const res = [];
  const summary = {
    hdchina: {},
    ttg: {},
    hdroute: {}
  };
  arr.forEach(ele => {
    if (ele._type === "timeout") {
      summary[ele.source]["status"] = ele._type;
    } else {
      summary[ele.source]["total"] = ele.total;
      listData = listData.concat(ele.list);
      ele.list.forEach(el => {
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
    }
  });
  const summaryHtmlStr = `<p>
    <span>hdchina: ${
      summary["hdchina"]["status"] === "timeout"
        ? "<b class='c-red c-bold'>Timeout</b>"
        : "<b class='c-green c-bold'>OK</b>(" +
          summary.hdchina.total +
          "条结果)"
    }</span>
    <span class='c-gap-left'>ttg: ${
      summary["ttg"]["status"] === "timeout"
        ? "<b class='c-red c-bold'>Timeout</b>"
        : "<b class='c-green c-bold'>OK</b>(" + summary.ttg.total + "条结果)"
    }</span>
    <span class='c-gap-left'>hdroute: ${
      summary["hdroute"]["status"] === "timeout"
        ? "<b class='c-red c-bold'>Timeout</b>"
        : "<b class='c-green c-bold'>OK</b>(" +
          summary.hdroute.total +
          "+条结果)"
    }</span>
  </p>`;
  res.unshift(summaryHtmlStr);
  resEle.innerHTML = res.join("");
  ptTasks = Array.prototype.slice
    .call(document.querySelectorAll(".per-pt-task.ttg"))
    .concat(
      Array.prototype.slice.call(
        document.querySelectorAll(".per-pt-task.hdchina")
      )
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
  if (
    el.peersCount > 0 &&
    validSize(el.torrentSize) &&
    validType(el.torrentCategory)
  ) {
    return true;
  } else {
    return false;
  }
}

function validType(str) {
  if (
    str.indexOf(720) !== -1 ||
    str.indexOf("1080") !== -1 ||
    str.toLowerCase().indexOf("ipad") !== -1
  ) {
    return true;
  } else {
    return false;
  }
}
function validSize(str) {
  const regex = /(\d*\.*\d*)\s*(.*)/;
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

async function addPtTask(el) {
  const { source, id } = el.dataset;
  const c = await getDetailContent({ id, source });
  return fetch(`/pt_task_add`, {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      source_id: `${source}_${id}`,
      torrent_detail: c.detailHtml,
      cover: c.cover,
      torrent_base_info: JSON.stringify(
        listData.filter(
          el => +el.torrentId === +id && el.torrentSource === source
        )[0]
      )
    })
  })
    .then(r => r.json())
    .then(r => {
      if (r.id) {
        parseAndFlash(
          JSON.stringify({
            message: "添加成功"
          })
        );
      }
    });
}

function goToTaskDetail(task_id) {
  A.spf.navigate(`${window.location.origin}/pt_tasks?id=${task_id}`);
}

function checkInViewport(ev) {
  for (let el of ptTasks) {
    if (inViewport(el)) {
      getTorrentCover(el);
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
