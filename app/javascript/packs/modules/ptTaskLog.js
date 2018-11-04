import { $http } from "../common/ajax";
import { disableScroll, enableScroll } from "../common/toggleScroll";
import Vue from "vue";
import { insertAfter, strToDom, debounce } from "../common/utilities";

let vueApp;
let App;
let payload = {};
let callback = {
  apiQuerySuccess: function(data) {
    let searchList = document.getElementsByClassName("api-search-result")[0];
    let dataObj = JSON.parse(data);
    let contentStr = "";
    let headStr = `
    <div class="result-head">
      <span class="per-result-column per-result-input">input</span>
      <span class="per-result-column per-result-packageVersion">packageVersion</span>
      <span class="per-result-column per-result-ciPackageName">ciPackageName</span>
      <span class="per-result-column per-result-ciPackageVersion">ciPackageVersion</span>
      <span class="per-result-column per-result-status">status</span>
    </div>
    `;
    contentStr += headStr;
    contentStr += '<div class="result-body">';
    for (let i = 0, Len = dataObj.length; i < Len; i++) {
      contentStr += `<div class='per-search-result'>
        <span class="per-result-column per-result-input">${
          dataObj[i].input
        }</span>
        <span class="per-result-column per-result-packageVersion">${
          dataObj[i].packageVersion
        }</span>
        <span class="per-result-column per-result-ciPackageName">${
          dataObj[i].ciPackageName
        }</span>
        <span class="per-result-column per-result-ciPackageVersion">${
          dataObj[i].ciPackageVersion
        }</span>
        <span class="per-result-column per-result-status">${
          dataObj[i].status
        }</span>
      </div>`;
    }
    contentStr += "</div>";
    searchList.innerHTML = contentStr;
    dataObj.length > 0
      ? searchList.classList.remove("hide")
      : searchList.classList.add("hide");
  }
};

let debouncedApiQueryInput = debounce(apiQuery, 100, false);
function listenApiQuery() {
  let apiQueryInput = document.getElementsByClassName("search-input")[0];
  let inWrapper = false;
  apiQueryInput.addEventListener("keyup", debouncedApiQueryInput);
  apiQueryInput.parentElement.addEventListener("mouseleave", function(ev) {
    if (!checkIfFocus.apply(apiQueryInput, ev)) {
      clearSearchResult();
    }
    inWrapper = false;
  });
  apiQueryInput.parentElement.addEventListener("mouseenter", function(ev) {
    inWrapper = true;
    disableScroll();
  });
  apiQueryInput.addEventListener("blur", function(ev) {
    if (!inWrapper) clearSearchResult();
  });
  apiQueryInput.addEventListener("focus", apiQuery);
}
function checkIfFocus(ev) {
  return this === document.activeElement;
}
function apiQuery(ev) {
  if (ev.target.value.length <= 0) {
    clearSearchResult();
    return;
  }
  payload = { q: ev.target.value };
  $http(window.location.origin + "/plugins_instantsearch")
    .get(payload)
    .then(callback.apiQuerySuccess.bind(ev))
    .catch(callback.error);
}
function clearSearchResult() {
  let apiSearchResultEle = document.getElementsByClassName(
    "api-search-result"
  )[0];
  apiSearchResultEle.innerHTML = "";
  apiSearchResultEle.classList.add("hide");
  enableScroll();
}

Vue.component("ptTaskLog", {
  data: function() {
    return {
      tasksInput: gc.map(el => {
        el.torrent_base_info = JSON.parse(el.torrent_base_info);
        el.log = {};
        el.showLogs = false;
        el.logDetail = {};
        return el;
      }),
      showLogs: false,
      steps: [
        "downloadTorrent",
        "addToTransmission",
        "downloadFiles",
        "convert",
        "upload"
      ]
    };
  },
  template: `
    <div class="pt-task-log-wrap">
      <div class="pt-tasks-container pt-tasks-wrap" v-for="(task, idx) in tasksInput">
        <div :class="['c-border', 'c-center', 'c-padding', task.torrentSource ? task.torrentSource : '']"
        :data-id="task.torrent_base_info['torrentId']"
        :data-source="task.torrent_base_info['torrentSource']"
        :data-user-id="task.user_id"
        :data-source-id="task.source_id"
        :data-transmission-hash="task.transmission_hash"
        >
          <div class="per-pt-task">
            <div class="pt-task-cover" :style="{ backgroundImage: 'url(' + task.torrent_base_info['coverPic'] + ')' }">
            </div>
            <div class="pt-task-info">
              <h3>{{ task.torrent_base_info['chsTitle'] }}</h3>
              <h3>{{ task.torrent_base_info['engTitle'] }}</h3>
              <div class="torrent-status-info">
                <span class="torrent-category c-pad-sm">种子类型: {{ task.torrent_base_info['torrentCategory'] }}</span>
                <span class="torrent-size c-pad-sm">文件大小: <b>{{ task.torrent_base_info['torrentSize'] }}</b></span>
                <span class="torrent-seeders c-pad-sm">做种数量: <b>{{ task.torrent_base_info['peersCount'] }}</b></span>
                <span class="torrent-downloading c-pad-sm">正在下载数量: <b>{{ task.torrent_base_info['downloadingCount'] }}</b></span>
              </div>
            </div>
            <div class="pt-source-op">
              <span class="pt-source c-pad-sm c-center">种子来源: {{ task.torrent_base_info['torrentSource'] }}</span>
              <span class="c-center c-gap-top c-pad-sm pt-torrent-detail c-pointer"
              :data-source="task.torrent_base_info['torrentSource']"
              :data-id="task.torrent_base_info['torrentId']">种子详情</span>

              <span class="c-center c-gap-top c-pad-sm c-pointer pt-task-progress"
              @click="toggleLog(task)">任务进度</span>
            </div>
          </div>

          <template v-for="(el, idx) in steps" v-if="task.showLogs">
            <div v-if="task.logDetail && task.logDetail.hasOwnProperty(el)">
              <div >{{ el }}: {{ task.logDetail[el].progress }}%</div>
            </div>
          </template>
        </div>
      </div>
    </div>`,
  methods: {
    toggleLog: function(item) {
      if (!item.showLogs) {
        item.gc = App.cable.subscriptions.create(
          {
            channel: "PtTaskLogChannel",
            hash: item.transmission_hash
          },
          {
            connected: function() {
              this.perform("send_current_log", {
                hash: item.transmission_hash
              });
            },
            received: function(data) {
              item.log = data;
              item.logDetail = data.detail;
              if (item.status === "failed" || item.status === "success") {
                item.gc.unsubscribe();
              }
            }
          }
        );
      } else {
        if (item.status === "failed" || item.status === "success") {
        } else {
          item.gc.unsubscribe();
        }
      }
      item.showLogs = !item.showLogs;
    },
    subscribe: function(id) {}
  }
});

export function PtTaskLog() {
  App = {};

  App.cable = ActionCable.createConsumer();

  vueApp = new Vue({
    el: "#app"
  });

  /* use ActionCable to update status of pending plugin */

  if (gc.length > 0) {
    for (let i = 0, length1 = gc.length; i < length1; i++) {
      if (gc[i]["status"] !== "failed" && gc[i]["status"] !== "success") {
        gc[i]["gcp"] = App.cable.subscriptions.create(
          {
            channel: "PtTaskStatusChannel",
            hash: gc[i]["transmission_hash"]
          },
          {
            connected: function() {
              this.perform("send_current_status", {
                hash: gc[i]["transmission_hash"]
              });
            },
            received: function(data) {
              gc[i]["status"] = data.pt_task_status;
              if (
                data.pt_task_status === "failed" ||
                data.pt_task_status === "success"
              ) {
                gc[i]["gcp"].unsubscribe();
              }
            }
          }
        );
      }
    }
  }

  // listenApiQuery();
}

export function exitPtTaskLog() {
  if (vueApp) vueApp.$destroy();
  App.cable.disconnect();
}
