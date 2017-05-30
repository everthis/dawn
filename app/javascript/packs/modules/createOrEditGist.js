import mdTextArea from '../common/markdownTextArea'

export function cn() {
	console.log('oop')
	let contentIns = new mdTextArea({
		formEle: document.getElementsByClassName('gist_form')[0],
		textArea: document.getElementById('gist_content'),
		submitEle: document.getElementsByClassName('c-form-submit')[0],
		formContainer: document.getElementsByClassName('gist-container')[0]
	})
	contentIns.init()
}

export function en() {

}