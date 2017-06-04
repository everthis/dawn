import styles from 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror';
import md from 'codemirror/mode/markdown/markdown';
import css from 'codemirror/mode/css/css';
import sass from 'codemirror/mode/sass/sass';
import ruby from 'codemirror/mode/ruby/ruby';
import js from 'codemirror/mode/javascript/javascript';
import al from 'codemirror/addon/selection/active-line';

/*
 * todo: add support for multiple textarea
 */
export default class  {
  constructor(options = {}) {
    this.formEle = options.formEle;
    this.textAreas = options.textAreas;
    this.submitEle = options.submitEle;
    this.formContainer = options.formContainer;
    this.cmInstances = [];
    this.fd = null;
    this.fa = '';
    this.cb = null;
  }

  clickBind(ev) {
    ev.preventDefault();
    for (let i = 0; i < this.cmInstances.length; i++) {
      this.cmInstances[i].textAreaEle.value = this.cmInstances[i].cmInstance.getValue()
    }
    // this.fa = this.formEle.action;
    // this.fd = new FormData(this.formEle);
    // console.log(this)
    // window.A.spf.load(this.fa, {
    //   method: "POST",
    //   postData: this.fd,
    //   onProcess: function(evt) {
    //   },
    //   onDone: function(evt) {
    //     if(evt.response.status && evt.response.status === 'success') {
    //       if (evt.response.url) A.spf.navigate(evt.response.url);
    //     }
    //   }
    // });
  }

  createCMInstance(ta, language = 'markdown') {
    let cmIns = CodeMirror.fromTextArea(ta, {
      lineWrapping: true,
      lineNumbers: true,
      mode: language,
      styleActiveLine: true,
      lineSeparator: "\n",
      matchBrackets: true,
      viewportMargin: Infinity,
      scrollbarStyle: 'null',
      extraKeys: {
        'Tab': function() {
          return cmIns.execCommand('insertSoftTab');
        }
      }
    });
    // cmIns.setSize('100%', '50%');
    // cmIns.refresh()
    return cmIns;
  }

  init(opts) {
    for (let i = 0; i < this.textAreas.length; i++) {
      this.cmInstances.push({
        cmInstance: this.createCMInstance(this.textAreas[i], opts.language),
        textAreaEle: this.textAreas[i]
      })
    }
    this.cb = this.clickBind.bind(this);
    this.submitEle.addEventListener('click', this.cb);
  }

  changeOption(field, val) {
    for (let i = 0; i < this.cmInstances.length; i++) {
      this.cmInstances[i].cmInstance.setOption(field, val)
    }
  }

  destroy() {
    this.formContainer.classList.add('c-hidden')
    for (let i = 0; i < this.cmInstances.length; i++) {
      this.cmInstances[i].cmInstance.toTextArea()
      this.cmInstances[i].cmInstance = null
    }
    this.submitEle.removeEventListener('click', this.cb);
  }

}


