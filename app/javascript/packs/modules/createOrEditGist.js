import mdTextArea from '../common/markdownTextArea'

let mdIns;
export function cn() {
	mdIns = new mdTextArea({
		formEle: document.getElementsByClassName('gist_form')[0],
		textAreas: [document.getElementById('gist_content'), document.getElementById('gist_answer')],
		submitEle: document.getElementsByClassName('c-form-submit')[0],
		formContainer: document.getElementsByClassName('gist-container')[0]
	})
	mdIns.init()
}

export function en() {
	mdIns.destroy()
}