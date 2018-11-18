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
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Vue.component("pt-task-log", {
  data: function() {
    return {
      tasksInput: [],
      showLogs: false,
      showDetail: false,
      currentTask: {},
      steps: [
        "downloadTorrent",
        "addToTransmission",
        "downloadFiles",
        "findTargetFile",
        "convert",
        "upload",
        "removeTorrentAndData"
      ]
    };
  },
  template: `
    <div class="pt-task-log-wrap">
      <div class="pt-tasks-container pt-tasks-wrap c-gap-top" v-for="(task, idx) in tasksInput">
        <div :class="['c-border', 'c-center', 'c-padding', task.torrentSource ? task.torrentSource : '']"
        :data-id="task.torrent_base_info['torrentId']"
        :data-source="task.torrent_base_info['torrentSource']"
        :data-user-id="task.user_id"
        :data-source-id="task.source_id"
        :data-transmission-hash="task.transmission_hash"
        >
          <div class="per-pt-task">
            <div class="pt-task-cover" :style="{ backgroundImage: 'url(' + coverAddress(task) + ')' }">
            </div>
            <div class="pt-task-info">
              <h3>{{ task.torrent_base_info['chsTitle'] }}</h3>
              <h3>{{ task.torrent_base_info['engTitle'] }}</h3>
              <div class="torrent-status-info">
                <span class="torrent-category c-pad-sm">种子类型: {{ task.torrent_base_info['torrentCategory'] }}</span>
                <span class="torrent-size c-pad-sm">文件大小: <b>{{ task.torrent_base_info['torrentSize'] }}</b></span>
                <span class="torrent-seeders c-pad-sm">做种数量: <b>{{ task.torrent_base_info['peersCount'] }}</b></span>
                <span class="torrent-downloading c-pad-sm">正在下载数量: <b>{{ task.torrent_base_info['downloadingCount'] }}</b></span>
                <span class="torrent-status c-pad-sm"><b>{{ task.status }}</b></span>
              </div>
            </div>
            <div class="pt-source-op">
              <span class="pt-source c-pad-sm c-center">种子来源: {{ task.torrent_base_info['torrentSource'] }}</span>
              <span class="c-center c-gap-top c-pad-sm pt-torrent-detail c-pointer"
              :data-source="task.torrent_base_info['torrentSource']"
              :data-id="task.torrent_base_info['torrentId']"
              @click="showTorrentDetail(task)">{{ task.showTorrentDetail ? '关闭种子详情' : '显示种子详情' }}</span>

              <span class="c-center c-gap-top c-pad-sm c-pointer pt-task-progress"
              @click="toggleLog(task)">{{ task.showLogs ? taskLogUnfoldedText : taskLogFoldedText }}</span>
            </div>
          </div>

          <div v-if="task.showLogs && taskType === 'completed' " class="pt-task-qrcode">
            <img :src="qrcodeSrc(task)" v-if="task.signUrl.length > 0" />
          </div>

          <div v-if="task.showLogs && task.signUrl.length > 0" class="pt-task-play-online c-gap-bottom">
            <a href="javascript:;" @click="togglePlay(task)">{{ task.playVideoOnline ? '关闭在线播放' : '在线播放(自动播放)' }}</a>
          </div>
          <div v-if="task.signUrl.length > 0 && task.showLogs && task.playVideoOnline" class="pt-task-video c-gap-bottom">
            <video class="c-full-width" :src="task.signUrl" controls autoplay />
          </div>

          <template v-for="(el, idx) in steps" v-if="task.showLogs">
            <div v-if="task.logDetail && task.logDetail.hasOwnProperty(el)" class="pt-task-step-log">
              <div v-if="el === 'downloadFiles'">
                <span><b>耗时:</b> {{ duration(task.logDetail[el]) }}</span>
                <span><b>种子名</b>: {{ task.logDetail[el].name }}</span>
                <span><b>平均下载速度：</b>{{ task.logDetail[el].avg_speed }}</span>
                <span><b>体积大小：</b>{{ task.logDetail[el].total_size }}</span>
                <span><b>下载耗时：</b>{{ task.logDetail[el].time_taken }}</span>
                <span><b>进度：</b>{{ task.logDetail[el].progress }}%</span>
              </div>
              <div v-else-if="el === 'findTargetFile'">
                <span><b>目标文件路径：</b>{{ task.logDetail[el].fpath }}</span>
                <span><b>进度：</b>{{ task.logDetail[el].progress }}%</span>
              </div>
              <div v-else-if="el === 'convert'">
                <span><b>耗时:</b> {{ duration(task.logDetail[el]) }}</span>
                <span><b>转码输出文件路径：</b>{{ task.logDetail[el].fpath }}</span>
                <span><b>进度：</b>{{ task.logDetail[el].progress }}%</span>
              </div>
              <div v-else-if="el === 'upload'">
                <span><b>耗时:</b> {{ duration(task.logDetail[el]) }}</span>
                <span><b>上传阿里云OSS文件名：</b>{{ task.logDetail[el].fileName }}</span>
                <span><b>进度：</b>{{ task.logDetail[el].progress }}%</span>
              </div>
              <div v-else-if="el === 'removeTorrentAndData'">
                <span><b>上传完成后从transmission移除种子及数据进度：</b>{{ task.logDetail[el].progress }}%</span>
              </div>
              <div v-else>
                <b>{{ el }}:</b> {{ task.logDetail[el].progress }}%
              </div>
            </div>
          </template>
        </div>
      </div>
      <div :class="['torrent-detail-wrap', showDetail ? '' : 'c-hide']" ref="popupWrap">
        <div class="torrent-detail-bg"></div>
        <div class="torrent-detail-popup-wrap">
          <div class="torrent-detail-popup-inner-wrap">
            <div class="torrent-detail-popup" ref="popup"></div>
          </div>
          <span class="torrent-detail-popup-close c-center c-pointer" @click="closeTorrentDetail">关闭详情</span>
        </div>
      </div>
    </div>`,
  computed: {
    taskLogFoldedText() {
      return this.taskType === "completed" ? "显示任务结果" : "显示任务进度";
    },
    taskLogUnfoldedText() {
      return this.taskType === "completed" ? "关闭任务结果" : "关闭任务进度";
    },
    taskType() {
      const wlp = window.location.pathname;
      if (wlp.indexOf("pending_pt_task") !== -1) {
        return "pending";
      } else if (wlp.indexOf("completed_pt_task") !== -1) {
        return "completed";
      }
    }
  },
  methods: {
    duration(el) {
      return `${((el.end_ts - el.start_ts) / (1000 * 60 * 60)).toFixed(
        3
      )} 小时`;
    },
    coverAddress(task) {
      return (
        task.cover ||
        (task.torrent_base_info && task.torrent_base_info["coverPic"])
      );
    },
    closeTorrentDetail(el) {
      this.showDetail = false;
      this.$refs.popup.innerHTML = "";
      this.currentTask.showTorrentDetail = false;
    },
    showTorrentDetail(el) {
      this.currentTask = el;
      el.showTorrentDetail = true;
      this.$refs.popup.innerHTML = el.torrent_detail;
      this.showDetail = true;
    },
    togglePlay(el) {
      el.playVideoOnline = !el.playVideoOnline;
    },
    qrcodeSrc(el) {
      return `data:image/png;base64,${el.qrCode}`;
    },
    toggleLog: function(item) {
      if (!item.showLogs) {
        if (this.taskType === "completed") {
          const payload = {
            hash: item.transmission_hash
          };
          $http(window.location.origin + "/pt_task_sign_url")
            .get(payload)
            .then(res => {
              let obj = JSON.parse(res);
              item.signUrl = obj.signUrl;
              item.qrCode = obj.encodeImg;
            });
        }
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
              if (
                data.detail["removeTorrentAndData"] &&
                data.detail.removeTorrentAndData.progress === 100
              ) {
                item.status = "completed";
              }
              if (item.status === "failed" || item.status === "completed") {
                item.gc.unsubscribe();
              }
            }
          }
        );
      } else {
        if (item.status === "failed" || item.status === "completed") {
        } else {
          item.gc.unsubscribe();
        }
      }
      item.showLogs = !item.showLogs;
    },
    subscribe: function(id) {}
  },
  mounted() {
    const payload = {};
    const wlp = window.location.pathname;
    let apiPath = "";
    const pageFromQuery = getParameterByName("page");
    const queryPage = pageFromQuery ? pageFromQuery : 1;
    payload.page = queryPage;
    if (wlp.indexOf("pending_pt_task") !== -1) {
      apiPath = "/pending_pt_task_data";
    } else if (wlp.indexOf("completed_pt_task") !== -1) {
      apiPath = "/completed_pt_task_data";
    }
    $http(window.location.origin + apiPath)
      .get(payload)
      .then(res => {
        const arr = JSON.parse(res);
        this.tasksInput = arr.map(el => {
          el.torrent_base_info = JSON.parse(el.torrent_base_info);
          el.log = {};
          el.cover = el.cover == null ? "" : el.cover;
          el.showLogs = false;
          el.playVideoOnline = false;
          el.showTorrentDetail = false;
          el.qrCode = "";
          el.signUrl = "";
          el.logDetail = {};
          return el;
        });
        /* use ActionCable to update status of pending plugin */
        let gc = this.tasksInput;
        if (gc.length > 0) {
          for (let i = 0, length1 = gc.length; i < length1; i++) {
            if (
              gc[i]["status"] !== "failed" &&
              gc[i]["status"] !== "completed"
            ) {
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
                    gc[i]["status"] = data.status;
                    if (
                      data.status === "failed" ||
                      data.status === "completed"
                    ) {
                      gc[i]["gcp"].unsubscribe();
                    }
                  }
                }
              );
            }
          }
        }
      })
      .catch(err => console.log(err));
  }
});

export function PtTaskLog() {
  console.log("init");
  App = {};

  App.cable = ActionCable.createConsumer();
  vueApp = new Vue({
    el: "#app"
  });

  // listenApiQuery();
}

export function exitPtTaskLog() {
  console.log("exit");
  if (vueApp) vueApp.$destroy();
  vueApp = null;
  App.cable.disconnect();
}
