// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var dropdown = document.getElementsByClassName('dropdown')[0];
function showDropdowns(ev) {
  if (ev.target === ev.currentTarget) {
    ev.target.getElementsByClassName('dropdown-menu')[0].classList.add('show');
  }
}
function hideDropdowns(ev) {
  if (ev.target === ev.currentTarget) {
    ev.target.getElementsByClassName('dropdown-menu')[0].classList.remove('show');
  }
}
if (dropdown) {
  dropdown.addEventListener('mouseenter', showDropdowns);
  dropdown.addEventListener('mouseleave', hideDropdowns);

}
