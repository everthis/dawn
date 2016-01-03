/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _modulesDataLinks = __webpack_require__(7);
	
	(0, _modulesDataLinks.dataLinks)();
	// apiTree();
	// var p = new dawnSVG();
	// p.init(document.getElementById('painter-target'));
	// p.start();

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.dataLinks = dataLinks;
	
	var _commomCsrf = __webpack_require__(8);
	
	function dataLinks() {
	  document.addEventListener('click', processDataLink, false);
	}
	
	function processDataLink(e) {
	  var e = window.e || e;
	
	  if (e.target.tagName !== 'A') return;
	
	  // Do something
	  if (e.target.dataset.method) {
	    e.preventDefault();
	    handleMethod(e.target);
	  }
	}
	// Handles "data-method" on links such as:
	// <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
	function handleMethod(link) {
	  var href = link.getAttribute('href'),
	      method = link.dataset.method,
	      target = link.getAttribute('target'),
	      csrfToken = _commomCsrf.rorParams.csrfToken(),
	      csrfParam = _commomCsrf.rorParams.csrfParam();
	  var paramsObj = {
	    href: href,
	    method: method,
	    target: target,
	    csrfToken: csrfToken,
	    csrfParam: csrfParam
	  };
	  var formEle = createForm(paramsObj);
	  appendFormToDom(formEle);
	  submitForm(formEle);
	}
	function createForm(params) {
	  var f = document.createElement('form');
	  f.style.display = 'none';
	  f.setAttribute('method', 'post');
	  f.setAttribute('action', params.href);
	  if (params.target) {
	    f.setAttribute('target', params.target);
	  };
	
	  var i = document.createElement('input');
	  i.setAttribute('type', 'hidden');
	  i.setAttribute('name', '_method');
	  i.setAttribute('value', params.method);
	
	  var s;
	  if (params.csrfParam !== undefined && params.csrfToken !== undefined && !_commomCsrf.rorParams.isCrossDomain(params.href)) {
	    s = document.createElement('input');
	    s.setAttribute('type', 'hidden');
	    s.setAttribute('name', params.csrfParam);
	    s.setAttribute('value', params.csrfToken);
	  }
	  f.appendChild(i);
	  if (s) {
	    f.appendChild(s);
	  };
	  return f;
	}
	
	function appendFormToDom(form) {
	  document.body.appendChild(form);
	}
	function submitForm(form) {
	  form.submit();
	}

/***/ },

/***/ 8:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var rorParams = {
	  // Up-to-date Cross-Site Request Forgery token
	  csrfToken: function csrfToken() {
	    return document.querySelector('meta[name=csrf-token]').getAttribute('content');
	  },
	  // URL param that must contain the CSRF token
	  csrfParam: function csrfParam() {
	    return document.querySelector('meta[name=csrf-param]').getAttribute('content');
	  },
	  // Determines if the request is a cross domain request.
	  isCrossDomain: function isCrossDomain(url) {
	    var originAnchor = document.createElement('a');
	    originAnchor.href = location.href;
	    var urlAnchor = document.createElement('a');
	
	    try {
	      urlAnchor.href = url;
	      // This is a workaround to a IE bug.
	      urlAnchor.href = urlAnchor.href;
	
	      // If URL protocol is false or is a string containing a single colon
	      // *and* host are false, assume it is not a cross-domain request
	      // (should only be the case for IE7 and IE compatibility mode).
	      // Otherwise, evaluate protocol and host of the URL against the origin
	      // protocol and host.
	      return !((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host || originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host);
	    } catch (e) {
	      // If there is an error parsing the URL, assume it is crossDomain.
	      return true;
	    }
	  }
	};
	exports.rorParams = rorParams;

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmNhZjc3NzlkZmQ4NmM2NzIwMTciLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9tL2NzcmYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7NkNDdEN3QixDQUFxQjs7QUFDN0MsbUNBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQ0RtQixDQUFnQjs7QUFFeEMsVUFBUyxTQUFTLEdBQUc7QUFDMUIsV0FBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDNUQ7O0FBQ0QsVUFBUyxlQUFlLENBQUMsQ0FBQyxFQUFFO0FBQzFCLE9BQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV0QixPQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFDeEIsT0FBTzs7O0FBR1gsT0FBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDM0IsTUFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLGlCQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCO0VBQ0Y7OztBQUdELFVBQVMsWUFBWSxDQUFDLElBQUksRUFBRTtBQUMxQixPQUFJ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QU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7SUFBQTs7QUFFeEYsZ0JBQWEsRUFBRSwwQkFBRyxFQUFJO0FBQ3BCLFNBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0MsaUJBQVksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztBQUNsQyxTQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU1QyxTQUFJO0FBQ0YsZ0JBQVMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDOztBQUVyQixnQkFBUyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0FBT2hDLGNBQU8sRUFBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQzdFLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLEtBQy9DLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUUsQ0FBQztNQUNsRCxDQUFDLE9BQU8sQ0FBQyxFQUFFOztBQUVWLGNBQU8sSUFBSSxDQUFDO01BQ2I7SUFDRjtFQUNGLENBQUMiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDJjYWY3Nzc5ZGZkODZjNjcyMDE3XG4gKiovIiwiaW1wb3J0IHtkYXRhTGlua3N9IGZyb20gJy4vbW9kdWxlcy9kYXRhTGlua3MnO1xuZGF0YUxpbmtzKCk7XG4vLyBhcGlUcmVlKCk7XG4vLyB2YXIgcCA9IG5ldyBkYXduU1ZHKCk7XG4vLyBwLmluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhaW50ZXItdGFyZ2V0JykpO1xuLy8gcC5zdGFydCgpO1xuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzXG4gKiovIiwiaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuLi9jb21tb20vY3NyZic7XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhTGlua3MoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc0RhdGFMaW5rLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzRGF0YUxpbmsoZSkge1xuICB2YXIgZSA9IHdpbmRvdy5lIHx8IGU7XG5cbiAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgIT09ICdBJylcbiAgICAgIHJldHVybjtcblxuICAvLyBEbyBzb21ldGhpbmdcbiAgaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbn1cbi8vIEhhbmRsZXMgXCJkYXRhLW1ldGhvZFwiIG9uIGxpbmtzIHN1Y2ggYXM6XG4vLyA8YSBocmVmPVwiL3VzZXJzLzVcIiBkYXRhLW1ldGhvZD1cImRlbGV0ZVwiIHJlbD1cIm5vZm9sbG93XCIgZGF0YS1jb25maXJtPVwiQXJlIHlvdSBzdXJlP1wiPkRlbGV0ZTwvYT5cbmZ1bmN0aW9uIGhhbmRsZU1ldGhvZChsaW5rKSB7XG4gIHZhciBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICBtZXRob2QgPSBsaW5rLmRhdGFzZXQubWV0aG9kLFxuICAgIHRhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSxcbiAgICBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCksXG4gICAgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICB2YXIgcGFyYW1zT2JqID0ge1xuICAgIGhyZWY6IGhyZWYsXG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgY3NyZlRva2VuOiBjc3JmVG9rZW4sXG4gICAgY3NyZlBhcmFtOiBjc3JmUGFyYW1cbiAgfTtcbiAgdmFyIGZvcm1FbGUgPSBjcmVhdGVGb3JtKHBhcmFtc09iaik7XG4gIGFwcGVuZEZvcm1Ub0RvbShmb3JtRWxlKTtcbiAgc3VibWl0Rm9ybShmb3JtRWxlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0ocGFyYW1zKSB7XG4gIHZhciBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICBmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGYuc2V0QXR0cmlidXRlKCdtZXRob2QnLCdwb3N0Jyk7XG4gIGYuc2V0QXR0cmlidXRlKCdhY3Rpb24nLHBhcmFtcy5ocmVmKTtcbiAgaWYgKHBhcmFtcy50YXJnZXQpIHtcbiAgICBmLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgcGFyYW1zLnRhcmdldCk7XG4gIH07XG5cbiAgdmFyIGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICBpLnNldEF0dHJpYnV0ZSgnbmFtZScsJ19tZXRob2QnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMubWV0aG9kKTtcblxuICB2YXIgcztcbiAgaWYgKHBhcmFtcy5jc3JmUGFyYW0gIT09IHVuZGVmaW5lZCAmJiBwYXJhbXMuY3NyZlRva2VuICE9PSB1bmRlZmluZWQgJiYgIVJQcy5pc0Nyb3NzRG9tYWluKHBhcmFtcy5ocmVmKSkge1xuICAgIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHMuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBwYXJhbXMuY3NyZlBhcmFtKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5jc3JmVG9rZW4pO1xuICB9XG4gIGYuYXBwZW5kQ2hpbGQoaSk7XG4gIGlmIChzKSB7XG4gICAgZi5hcHBlbmRDaGlsZChzKTtcbiAgfTtcbiAgcmV0dXJuIGY7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEZvcm1Ub0RvbShmb3JtKSB7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG59XG5mdW5jdGlvbiBzdWJtaXRGb3JtKGZvcm0pIHtcbiAgZm9ybS5zdWJtaXQoKTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9kYXRhTGlua3MuanNcbiAqKi8iLCJleHBvcnQgbGV0IHJvclBhcmFtcyA9IHtcbiAgLy8gVXAtdG8tZGF0ZSBDcm9zcy1TaXRlIFJlcXVlc3QgRm9yZ2VyeSB0b2tlblxuICBjc3JmVG9rZW46ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXRva2VuXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBVUkwgcGFyYW0gdGhhdCBtdXN0IGNvbnRhaW4gdGhlIENTUkYgdG9rZW5cbiAgY3NyZlBhcmFtOiAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9Y3NyZi1wYXJhbV0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSxcbiAgLy8gRGV0ZXJtaW5lcyBpZiB0aGUgcmVxdWVzdCBpcyBhIGNyb3NzIGRvbWFpbiByZXF1ZXN0LlxuICBpc0Nyb3NzRG9tYWluOiB1cmwgPT4ge1xuICAgIGxldCBvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgb3JpZ2luQW5jaG9yLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuICAgIGxldCB1cmxBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICB0cnkge1xuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmw7XG4gICAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCB0byBhIElFIGJ1Zy5cbiAgICAgIHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWY7XG5cbiAgICAgIC8vIElmIFVSTCBwcm90b2NvbCBpcyBmYWxzZSBvciBpcyBhIHN0cmluZyBjb250YWluaW5nIGEgc2luZ2xlIGNvbG9uXG4gICAgICAvLyAqYW5kKiBob3N0IGFyZSBmYWxzZSwgYXNzdW1lIGl0IGlzIG5vdCBhIGNyb3NzLWRvbWFpbiByZXF1ZXN0XG4gICAgICAvLyAoc2hvdWxkIG9ubHkgYmUgdGhlIGNhc2UgZm9yIElFNyBhbmQgSUUgY29tcGF0aWJpbGl0eSBtb2RlKS5cbiAgICAgIC8vIE90aGVyd2lzZSwgZXZhbHVhdGUgcHJvdG9jb2wgYW5kIGhvc3Qgb2YgdGhlIFVSTCBhZ2FpbnN0IHRoZSBvcmlnaW5cbiAgICAgIC8vIHByb3RvY29sIGFuZCBob3N0LlxuICAgICAgcmV0dXJuICEoKCghdXJsQW5jaG9yLnByb3RvY29sIHx8IHVybEFuY2hvci5wcm90b2NvbCA9PT0gJzonKSAmJiAhdXJsQW5jaG9yLmhvc3QpIHx8XG4gICAgICAgIChvcmlnaW5BbmNob3IucHJvdG9jb2wgKyAnLy8nICsgb3JpZ2luQW5jaG9yLmhvc3QgPT09XG4gICAgICAgICAgdXJsQW5jaG9yLnByb3RvY29sICsgJy8vJyArIHVybEFuY2hvci5ob3N0KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXJyb3IgcGFyc2luZyB0aGUgVVJMLCBhc3N1bWUgaXQgaXMgY3Jvc3NEb21haW4uXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb20vY3NyZi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=