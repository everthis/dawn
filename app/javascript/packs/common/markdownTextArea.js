import styles from 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror';
import md from 'codemirror/mode/markdown/markdown';
import al from 'codemirror/addon/selection/active-line';

/*
 * todo: add support for multiple textarea
 */
export default class  {
  constructor(options = {}) {
    this.formEle = options.formEle;
    this.textArea = options.textArea;
    this.submitEle = options.submitEle;
    this.formContainer = options.formContainer;
    this.cmInstance = null;
    this.fd = null;
    this.fa = '';
    this.cb = null;
  }

  clickBind(ev) {
    ev.preventDefault();
    this.textArea.value = this.cmInstance.getValue();
    this.fa = this.formEle.action;
    this.fd = new FormData(this.formEle);
    window.A.spf.load(this.fa, {
      method: "POST",
      postData: this.fd,
      onProcess: function(evt) {
      },
      onDone: function(evt) {
        if(evt.response.status && evt.response.status === 'success') {
          if (evt.response.url) A.spf.navigate(evt.response.url);
        }
      }
    });
  }

  init() {
    this.cmInstance = CodeMirror.fromTextArea(this.textArea, {
      lineWrapping: true,
      lineNumbers: true,
      mode: 'markdown',
      styleActiveLine: true,
      viewportMargin: Infinity,
      lineSeparator: "\n",
      matchBrackets: true
    });
    this.cmInstance.setSize('100%', '50%');
    this.cb = this.clickBind.bind(this);
    this.submitEle.addEventListener('click', this.cb);
  }

  destroy() {
    this.formContainer.classList.add('c-hidden')
    this.cmInstance.toTextArea();
    this.cmInstance = null;
    this.myTextArea = null;
  }

}


