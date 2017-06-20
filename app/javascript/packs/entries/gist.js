(function() {
	let el = document.getElementsByClassName('collapse-trigger')[0]
	function initFn() {
		el.addEventListener('click', bindEv, false)
	}
	function bindEv(ev) {
		ev.target.nextElementSibling.classList.toggle('c-hide')
		el.classList.toggle('collapsed')
	}

	function destroyFn() {
		el.removeEventListener('click', bindEv, false)
	}

  A.init[A.gc.currentName] = initFn;
  A.destroy[A.gc.currentName] = destroyFn;
})();