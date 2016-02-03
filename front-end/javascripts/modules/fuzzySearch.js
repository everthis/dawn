  // Iterates each element through a function
  function each(elems, func) {
    if (!elems instanceof Array) { elems = [elems]; }
    for (var i = 0, len = elems.length; i < len; i++) {
      func(elems[i]);
    }
  }

  // Sets innerHTML for an element
  function setContent(elem, text) {
    elem.innerHTML = text;
  }

  // Enables path search functionality
  function setupMatchPaths() {
    // Check if the user input (sanitized as a path) matches the regexp data attribute
    function checkExactMatch(section, elem, value) {
      var string = sanitizePath(value),
          regexp = elem.getAttribute("data-regexp");

      showMatch(string, regexp, section, elem);
    }

    // Check if the route path data attribute contains the user input
    function checkFuzzyMatch(section, elem, value) {
      var string = elem.getAttribute("data-route-path"),
          regexp = value;

      showMatch(string, regexp, section, elem);
    }

    // Display the parent <tr> element in the appropriate section when there's a match
    function showMatch(string, regexp, section, elem) {
      if(string.match(RegExp(regexp))) {
        section.appendChild(elem.parentNode.cloneNode(true));
      }
    }

    // Check if there are any matched results in a section
    function checkNoMatch(section, defaultText, noMatchText) {
      if (section.innerHTML === defaultText) {
        setContent(section, defaultText + noMatchText);
      }
    }

    // Ensure path always starts with a slash "/" and remove params or fragments
    function sanitizePath(path) {
      var path = path.charAt(0) == '/' ? path : "/" + path;
      return path.replace(/\#.*|\?.*/, '');
    }

    var regexpElems     = document.querySelectorAll('#route_table [data-regexp]'),
        searchElem      = document.querySelector('#search'),
        exactMatches    = document.querySelector('#exact_matches'),
        fuzzyMatches    = document.querySelector('#fuzzy_matches');

    // Remove matches when no search value is present
    searchElem.onblur = function(e) {
      if (searchElem.value === "") {
        setContent(exactMatches, "");
        setContent(fuzzyMatches, "");
      }
    }

    // On key press perform a search for matching paths
    searchElem.onkeyup = function(e){
      var userInput         = searchElem.value,
          defaultExactMatch = '<tr><th colspan="4">Paths Matching (' + escape(sanitizePath(userInput)) +'):</th></tr>',
          defaultFuzzyMatch = '<tr><th colspan="4">Paths Containing (' + escape(userInput) +'):</th></tr>',
          noExactMatch      = '<tr><th colspan="4">No Exact Matches Found</th></tr>',
          noFuzzyMatch      = '<tr><th colspan="4">No Fuzzy Matches Found</th></tr>';

      // Clear out results section
      setContent(exactMatches, defaultExactMatch);
      setContent(fuzzyMatches, defaultFuzzyMatch);

      // Display exact matches and fuzzy matches
      each(regexpElems, function(elem) {
        checkExactMatch(exactMatches, elem, userInput);
        checkFuzzyMatch(fuzzyMatches, elem, userInput);
      })

      // Display 'No Matches' message when no matches are found
      checkNoMatch(exactMatches, defaultExactMatch, noExactMatch);
      checkNoMatch(fuzzyMatches, defaultFuzzyMatch, noFuzzyMatch);
    }
  }

  // Enables functionality to toggle between `_path` and `_url` helper suffixes
  function setupRouteToggleHelperLinks() {

    // Sets content for each element
    function setValOn(elems, val) {
      each(elems, function(elem) {
        setContent(elem, val);
      });
    }

    // Sets onClick event for each element
    function onClick(elems, func) {
      each(elems, function(elem) {
        elem.onclick = func;
      });
    }

    var toggleLinks = document.querySelectorAll('#route_table [data-route-helper]');
    onClick(toggleLinks, function(){
      var helperTxt   = this.getAttribute("data-route-helper"),
          helperElems = document.querySelectorAll('[data-route-name] span.helper');

      setValOn(helperElems, helperTxt);
    });
  }

  setupMatchPaths();
  setupRouteToggleHelperLinks();