import {flash, parseAndFlash} from './flash';
export let callbacks = {
  deleteSuccess: function(data) {
    function destoryApiLi() {
      this.target.closest('.api-ul').removeChild(this.target.closest('.api-li'));
    }
    parseAndFlash(data, destoryApiLi.bind(this));
  },
  success: function(data) {
  },
  error: function(data) {
    parseAndFlash(data);
  }
};