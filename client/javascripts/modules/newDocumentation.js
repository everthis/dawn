import styles from 'codemirror/lib/codemirror.css';
import CodeMirror from 'codemirror';
import md from 'codemirror/mode/markdown/markdown';
import al from 'codemirror/addon/selection/active-line';

let cmInstance;

export function newDocumentation() {
	let myTextArea = document.getElementById('doc_content');
	cmInstance = CodeMirror.fromTextArea(myTextArea, {
		lineWrapping: true,
		lineNumbers: true,
		mode: 'markdown',
		styleActiveLine: true,
		matchBrackets: true
	});
	document.getElementsByClassName('save-document')[0].addEventListener('click', function(ev) {
	    ev.preventDefault();
	    document.doc_form.submit();
	});
}

export function exitNewDocumentation() {
	cmInstance.toTextArea();
}
