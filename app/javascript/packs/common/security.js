// Make sure that every Ajax request sends the CSRF token
CSRFProtection: function(xhr) {
  var token = rails.csrfToken();
  if (token) xhr.setRequestHeader('X-CSRF-Token', token);
},
// Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
refreshCSRFTokens: function(){
  $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
},