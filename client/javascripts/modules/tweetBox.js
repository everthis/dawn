function setFocus(el) {
  var range = document.createRange();
  var sel = window.getSelection();
  range.setStart(el, 0);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}
export function tweetBox() {
  var doc = document;
  var tb = doc.getElementsByClassName('tweet-box')[0];
  if (!tb) return null;
  var tbd = tb.getElementsByTagName('div')[0];
  var tbdString = '<div><br></div>';

  tb.addEventListener('focus', function(ev) {
    tb.classList.remove('condensed');
    if (tb.getElementsByTagName('div') && tb.getElementsByTagName('div')[0].innerText.trim().length) {

      tb.classList.remove('showPlaceholder');
    } else {
      tb.classList.add('showPlaceholder');
    }
    if (tbd.innerHTML === 'What\'s happening?') {

      tbd.innerHTML = '<br>';
    }
  });
  tb.addEventListener('keyup', function(ev) {
    if (tb.innerHTML) {
      if (tb.getElementsByTagName('div')[0] && tb.getElementsByTagName('div')[0].textContent) {
        tb.classList.remove('showPlaceholder');
      } else {};
    } else {
      tb.innerHTML = tbdString;
      setTimeout(function() {

        setFocus(tb.getElementsByTagName('div')[0]);

      }, 0);
    };
  });

  tb.addEventListener('keydown', function(ev) {
    if (tb.getElementsByTagName('div')[0] && tb.getElementsByTagName('div')[0].textContent) {
      tb.classList.remove('showPlaceholder');
    };
    if (tb.innerHTML === '<br>') {
      tb.innerHTML = tbdString;
      setFocus(tb.getElementsByTagName('div')[0]);
    }
  });
}

