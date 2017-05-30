import styles from 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror';
import md from 'codemirror/mode/markdown/markdown';
import al from 'codemirror/addon/selection/active-line';

let cmInstance;
let f, fa, fd;
let myTextArea;
let timer;

function clickBind(ev) {
  ev.preventDefault();
  // document.doc_form.submit();
  f = document.forms.doc_form;
  document.getElementById('doc_content').value = cmInstance.getValue();
  fa = f.action;
  fd = new FormData(f);
  window.A.spf.load(fa, {
    method: "POST",
    postData: fd,
    onProcess: function(evt) {
    },
    onDone: function(evt) {
      if(evt.response.status && evt.response.status === 'success') {
        if (evt.response.url) A.spf.navigate(evt.response.url);
      }
    }
  });
}

function createCmInstance() {
  cmInstance = CodeMirror.fromTextArea(myTextArea, {
    lineWrapping: true,
    lineNumbers: true,
    mode: 'markdown',
    styleActiveLine: true,
    matchBrackets: true
  });
  cmInstance.setSize('100%', '50%');
}

export function newDocumentation() {
	let myTextArea = document.getElementById('doc_content');
  let f, fa, fd;
	cmInstance = CodeMirror.fromTextArea(myTextArea, {
		lineWrapping: true,
		lineNumbers: true,
		mode: 'markdown',
		styleActiveLine: true,
    viewportMargin: Infinity,
    lineSeparator: "\n",
		matchBrackets: true
	});
  cmInstance.setSize('100%', '50%');
	document.getElementsByClassName('save-document')[0].addEventListener('click', function(ev) {
	    ev.preventDefault();
	    // document.doc_form.submit();
      f = document.forms.doc_form;
      document.getElementById('doc_content').value = cmInstance.getValue();
      fa = f.action;
      fd = new FormData(f);
      window.A.spf.load(fa, {
        method: "POST",
        postData: fd,
        onProcess: function(evt) {
        },
        onDone: function(evt) {
          // exitNewDocumentation();
          if(evt.response.status && evt.response.status === 'success') {
            if (evt.response.url) A.spf.navigate(evt.response.url);
          }
        }
      });
	});
}

export function exitNewDocumentation() {
  // debugger;
  document.getElementsByClassName('document-container')[0].classList.add('c-hidden')
  cmInstance.toTextArea();
  cmInstance = null;
  myTextArea = null;
}

