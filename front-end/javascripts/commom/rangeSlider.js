var range_els = document.querySelectorAll('input[id]'), 
    n_els = range_els.length, 
    style_el = document.createElement('style'), 
    track_sel = '::-webkit-slider-runnable-track', 
    styles = [];

document.body.appendChild(style_el); 

for(var i = 0; i < n_els; i++) {
  styles.push('');
  
  range_els[i].addEventListener('input', function() {
    var base_sel = '.js #' + this.id, 
        idx = ~~this.id.split('rf')[1], 
        str = base_sel + track_sel + '{background-size:' + this.value + '% 100%}';
    styles[idx] = str;
    style_el.textContent = styles.join('');
  }, false);
}