import mdTextArea from '../common/markdownTextArea'

let mdIns;
let gistExtensionEle;

function changeOption(ev) {
	mdIns.changeOption('mode', ev.target.value)
}

export function cn() {
	mdIns = new mdTextArea({
		formEle: document.getElementsByClassName('gist_form')[0],
		textAreas: [document.getElementById('gist_content'), document.getElementById('gist_answer')],
		submitEle: document.getElementsByClassName('c-form-submit')[0],
		formContainer: document.getElementsByClassName('gist-container')[0]
	})
	gistExtensionEle = document.getElementById('gist_extension')
	console.log(gistExtensionEle.value)
	mdIns.init({language: gistExtensionEle.value})
	gistExtensionEle.addEventListener('change', changeOption)
}


export function en() {
	mdIns.destroy()
	gistExtensionEle.removeEventListener('change', changeOption)
}