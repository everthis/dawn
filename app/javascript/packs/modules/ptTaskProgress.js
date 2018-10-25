import { debounce } from "../common/utilities";
import inViewport from "../common/inViewport";
import { disableScroll, enableScroll } from "../common/toggleScroll";

let ptTasks = Array.prototype.slice.call(
  document.querySelectorAll(".per-pt-task.ttg")
);

const ptTasksWrapEl = document.getElementsByClassName("pt-tasks-wrap")[0];
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
function checkInViewport(ev) {
  for (let el of ptTasks) {
    if (inViewport(el)) {
      getTtgCover(el);
    }
  }
}
function delegateClick(ev) {
  console.log("clickclick");
  const evt = ev.target;
  let ptp;
  // add pt task
  if (evt.classList.contains("pt-task-progress")) {
    ptp = evt;
  } else {
    ptp = evt.closest(".pt-task-progress");
  }
  if (ptp) {
    checkTaskProgress(ptp.closest(".per-pt-task"));
    return;
  }

  // disable link in popup
  if (evt.tagName === "A" && evt.closest(".torrent-detail-popup")) {
    forbidExtLink(ev);
    return;
  }
}

function checkTaskProgress(el) {
  const { id, source, transmissionHash: hash } = el.dataset;
  return fetch(`/check_task_progress?id=${id}&source=${source}&hash=${hash}`, {
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
    });
}
const debouncedCheckInViewport = debounce(checkInViewport, 300, false);

export function initPtTaskProgress() {
  checkInViewport();
  ptTasksWrapEl.addEventListener("click", delegateClick);
  window.addEventListener("scroll", debouncedCheckInViewport);
}
export function disposePtTaskProgress() {
  window.removeEventListener("scroll", debouncedCheckInViewport);
}
