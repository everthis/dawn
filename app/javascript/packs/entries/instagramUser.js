import {
  initInstagramUser,
  disposeInstagramUser
} from '../modules/instagramUser'
;(function() {
  A.init[A.gc.currentName] = initInstagramUser
  A.destroy[A.gc.currentName] = disposeInstagramUser
})()
