import {handleMethod} from '../common/handleMethod';

export function dataLinks() {
  document.addEventListener('click', processDataLink, false);
}
function processDataLink(e) {
  var e = window.e || e;

  if (e.target.tagName !== 'A')
      return;

  // Do something
  if (e.target.dataset.method === 'delete') {
    e.preventDefault();
    handleMethod(e.target);
  }
  if (e.target.dataset.method === 'PATCH') {
    e.preventDefault();
    handleMethod(e.target);
  }
  // if (e.target.dataset.method === 'patch') {
  //   e.preventDefault();
  //   handleMethod(e.target, {
  //     ns: 'api',
  //     data: {
  //       section: 'wise',
  //       id: '2'
  //     }
  //   });
  // }
}

