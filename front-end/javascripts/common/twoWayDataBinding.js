export function twoWayDataBinding(data, domContext) {
  /* Instatiate an empty `model` object. */
  var model = {};
  /* Iterate over the keys of the supplied `data` object. */
  Object.keys(data).forEach(function(key) {
    /* Store our value inside the `forEach` closure. */
    var value = data[key];
    Object.defineProperty(model, key, {
      /* We want our property to appear in `for..in` loops. */
      enumerable: true,
      get: function() {
        /* This doesn't need to do much, only return the `value` from our closure. */
        return value;
      },
      set: function(val) {
        /* Overwrite our closures `value` with the new `val`. */
        value = val;
        /* Select all nodes with `bind` and `model` attributes. */
        selectorToArray('[bind=' + key + ']', domContext).concat(selectorToArray('[model=' + key + ']', domContext)).forEach(function(el) {
          /* If element has `bind` attribute, set it's `textContent`. */
          if (el.getAttribute('bind') && !el.hasAttribute('bind-toggle-class') ) el.textContent = value;
          if (el.hasAttribute('bind-toggle-class')) {
            if (value === true || value === "true") {
              el.classList.add('leaf-has-child'); 
            }else if(value === false || value === "false") {
              el.classList.remove('leaf-has-child');
            }
          }
          if (el.hasAttribute('bind-attr-href')) {
            el.setAttribute('href', value);
          }
          /* If element has `model` attribute, set it's `value`. */

          if (el.getAttribute('model') && el !== document.activeElement) {
            el.value = value;
          }
        });
      }
    });
    /* Set our model objects property value to the same value. */
    model[key] = value;
    /* Add change handlers to inputs on the page. */
    selectorToArray('[model=' + key + ']', domContext).forEach(function(el) {
      /* Our handler simply sets our models `key` to the element's value. */
      function handler() {
        model[key] = el.value;
      }
      /* Bind a `keyup` handler so we get live feedback on each key press. */
      // el.addEventListener('keyup', handler);
      /* Bind a `change` handler which is fired when the element is blurred. */
      el.addEventListener('input', handler);
    });
  });
  /* Return our new model object. */
  return model;
}

/* include domContext itsself */
function selectorToArray(selector, domContext) {
  let arr = Array.prototype.slice.call(domContext.querySelectorAll(selector));
  if (domContext.matches(selector)) {
    arr.push(domContext);
  }
  return arr;
}
