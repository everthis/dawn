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

  createCMInstance(ta) {
    let cmIns = CodeMirror.fromTextArea(ta, {
      lineWrapping: true,
      lineNumbers: true,
      mode: 'markdown',
      styleActiveLine: true,
      lineSeparator: "\n",
      matchBrackets: true,
      viewportMargin: Infinity,
      scrollbarStyle: 'null'
    });
    // cmIns.setSize('100%', '50%');
    // cmIns.refresh()
    return cmIns;
  }

  init() {
    for (let i = 0; i < this.textAreas.length; i++) {
      this.cmInstances.push({
        cmInstance: this.createCMInstance(this.textAreas[i]),
        textAreaEle: this.textAreas[i]
      })
    }
    this.cb = this.clickBind.bind(this);
    this.submitEle.addEventListener('click', this.cb);
  }

  destroy() {
    console.log('leave')
    this.formContainer.classList.add('c-hidden')
    for (let i = 0; i < this.cmInstances.length; i++) {
      this.cmInstances[i].cmInstance.toTextArea()
      this.cmInstances[i].cmInstance = null
    }
    this.submitEle.removeEventListener('click', this.cb);
  }

}


