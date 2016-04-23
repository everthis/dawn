let WebInspector = {};
WebInspector.createShadowRootWithCoreStyles = function(element, cssFile) {
  var shadowRoot = element.createShadowRoot();
  WebInspector.appendStyle(shadowRoot, 'ui/inspectorCommon.css');
  WebInspector.themeSupport.injectHighlightStyleSheets(shadowRoot);
  if (cssFile) WebInspector.appendStyle(shadowRoot, cssFile);
  shadowRoot.addEventListener('focus', WebInspector._focusChanged.bind(WebInspector), true);
  return shadowRoot;
};
WebInspector.appendStyle = function(node, cssFile) {
  var content = Runtime.cachedResources[cssFile] || '';
  if (!content) console.error(cssFile + ' not preloaded. Check module.json');
  var styleElement = createElement('style');
  styleElement.type = 'text/css';
  styleElement.textContent = content;
  node.appendChild(styleElement);
  var themeStyleSheet = WebInspector.themeSupport.themeStyleSheet(cssFile, content);
  if (themeStyleSheet) {
    styleElement = createElement('style');
    styleElement.type = 'text/css';
    styleElement.textContent = themeStyleSheet + '\n' + Runtime.resolveSourceURL(cssFile + '.theme');
    node.appendChild(styleElement);
  }
};

WebInspector.ThemeSupport = function(setting) {
  this._themeName = setting.get() || 'default';
  this._themableProperties = new Set(['color', 'box-shadow', 'text-shadow', 'outline-color', 'background-image', 'background-color', 'border-left-color', 'border-right-color', 'border-top-color', 'border-bottom-color', '-webkit-border-image']);
  this._cachedThemePatches = new Map();
  this._setting = setting;
};
WebInspector.ThemeSupport.ColorUsage = {
  Unknown: 0,
  Foreground: 1 << 0,
  Background: 1 << 1,
  Selection: 1 << 2,
};
WebInspector.ThemeSupport.prototype = {
  hasTheme: function() {
    return this._themeName !== 'default';
  },
  injectHighlightStyleSheets: function(element) {
    this._injectingStyleSheet = true;
    WebInspector.appendStyle(element, 'ui/inspectorSyntaxHighlight.css');
    if (this._themeName === 'dark') WebInspector.appendStyle(element, 'ui/inspectorSyntaxHighlightDark.css');
    this._injectingStyleSheet = false;
  },
  applyTheme: function(document) {
    if (!this.hasTheme()) return;
    if (this._themeName === 'dark') document.body.classList.add('-theme-with-dark-background');
    var styleSheets = document.styleSheets;
    var result = [];
    for (var i = 0; i < styleSheets.length; ++i) result.push(this._patchForTheme(styleSheets[i].href, styleSheets[i]));
    result.push('/*# sourceURL=inspector.css.theme */');
    var styleElement = createElement('style');
    styleElement.type = 'text/css';
    styleElement.textContent = result.join('\n');
    document.head.appendChild(styleElement);
  },
  themeStyleSheet: function(id, text) {
    if (!this.hasTheme() || this._injectingStyleSheet) return '';
    var patch = this._cachedThemePatches.get(id);
    if (!patch) {
      var styleElement = createElement('style');
      styleElement.type = 'text/css';
      styleElement.textContent = text;
      document.body.appendChild(styleElement);
      patch = this._patchForTheme(id, styleElement.sheet);
      document.body.removeChild(styleElement);
    }
    return patch;
  },
  _patchForTheme: function(id, styleSheet) {
    var cached = this._cachedThemePatches.get(id);
    if (cached) return cached;
    try {
      var rules = styleSheet.cssRules;
      var result = [];
      for (var j = 0; j < rules.length; ++j) {
        if (rules[j] instanceof CSSImportRule) {
          result.push(this._patchForTheme(rules[j].styleSheet.href, rules[j].styleSheet));
          continue;
        }
        var output = [];
        var style = rules[j].style;
        var selectorText = rules[j].selectorText;
        for (var i = 0; style && i < style.length; ++i) this._patchProperty(selectorText, style, style[i], output);
        if (output.length) result.push(rules[j].selectorText + '{' + output.join('') + '}');
      }
      var fullText = result.join('\n');
      this._cachedThemePatches.set(id, fullText);
      return fullText;
    } catch (e) {
      this._setting.set('default');
      return '';
    }
  },
  _patchProperty: function(selectorText, style, name, output) {
    if (!this._themableProperties.has(name)) return;
    var value = style.getPropertyValue(name);
    if (!value || value === 'none' || value === 'inherit' || value === 'initial' || value === 'transparent') return;
    if (name === 'background-image' && value.indexOf('gradient') === -1) return;
    var isSelection = selectorText.indexOf('.-theme-selection-color') !== -1;
    if (selectorText.indexOf('-theme-') !== -1 && !isSelection) return;
    if (name === '-webkit-border-image') {
      output.push('-webkit-filter: invert(100%)');
      return;
    }
    isSelection = isSelection || selectorText.indexOf('selected') !== -1 || selectorText.indexOf('.selection') !== -1;
    var colorUsage = WebInspector.ThemeSupport.ColorUsage.Unknown;
    if (isSelection) colorUsage |= WebInspector.ThemeSupport.ColorUsage.Selection;
    if (name.indexOf('background') === 0 || name.indexOf('border') === 0) colorUsage |= WebInspector.ThemeSupport.ColorUsage.Background;
    if (name.indexOf('background') === -1) colorUsage |= WebInspector.ThemeSupport.ColorUsage.Foreground;
    var colorRegex = /((?:rgb|hsl)a?\([^)]+\)|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|\b\w+\b(?!-))/g;
    output.push(name);
    output.push(':');
    var items = value.replace(colorRegex, '\0$1\0').split('\0');
    for (var i = 0; i < items.length; ++i) output.push(this.patchColor(items[i], colorUsage));
    if (style.getPropertyPriority(name)) output.push(' !important');
    output.push(';');
  },
  patchColor: function(text, colorUsage) {
    var color = WebInspector.Color.parse(text);
    if (!color) return text;
    var hsla = color.hsla();
    this._patchHSLA(hsla, colorUsage);
    var rgba = [];
    WebInspector.Color.hsl2rgb(hsla, rgba);
    var outColor = new WebInspector.Color(rgba, color.format());
    var outText = outColor.asString(null);
    if (!outText) outText = outColor.asString(outColor.hasAlpha() ? WebInspector.Color.Format.RGBA : WebInspector.Color.Format.RGB);
    return outText || text;
  },
  _patchHSLA: function(hsla, colorUsage) {
    var hue = hsla[0];
    var sat = hsla[1];
    var lit = hsla[2];
    var alpha = hsla[3];
    switch (this._themeName) {
      case 'dark':
        if (colorUsage & WebInspector.ThemeSupport.ColorUsage.Selection) hue = (hue + 0.5) % 1;
        var minCap = colorUsage & WebInspector.ThemeSupport.ColorUsage.Background ? 0.14 : 0;
        var maxCap = colorUsage & WebInspector.ThemeSupport.ColorUsage.Foreground ? 0.9 : 1;
        lit = 1 - lit;
        if (lit < minCap * 2) lit = minCap + lit / 2;
        else if (lit > 2 * maxCap - 1) lit = maxCap - 1 / 2 + lit / 2;
        break;
    }
    hsla[0] = Number.constrain(hue, 0, 1);
    hsla[1] = Number.constrain(sat, 0, 1);
    hsla[2] = Number.constrain(lit, 0, 1);
    hsla[3] = Number.constrain(alpha, 0, 1);
  }
};

WebInspector.JSONView = function(parsedJSON) {
  WebInspector.VBox.call(this);
  this._parsedJSON = parsedJSON;
  this.element.classList.add('json-view');
};
WebInspector.JSONView._jsonToken = new RegExp('(?:false|true|null|[/*&\\|;=\\(\\),\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:\"(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*\"))', 'g');
WebInspector.JSONView._escapedUnicode = new RegExp('\\\\(?:([^u])|u(.{4}))', 'g');
WebInspector.JSONView._standardEscapes = {
  '"': '"',
  '/': '/',
  '\\': '\\',
  'b': '\b',
  'f': '\f',
  'n': '\n',
  'r': '\r',
  't': '\t'
};
WebInspector.JSONView._unescape = function(full, standard, unicode) {
  return standard ? WebInspector.JSONView._standardEscapes[standard] : String.fromCharCode(parseInt(unicode, 16));
};
WebInspector.JSONView._unescapeString = function(text) {
  return text.indexOf('\') === -1 ? text : text.replace(WebInspector.JSONView._escapedUnicode, WebInspector.JSONView._unescape);
};
WebInspector.JSONView._buildObjectFromJSON = function(text) {
  var regExp = WebInspector.JSONView._jsonToken;
  regExp.lastIndex = 0;
  var result = [];
  var tip = result;
  var stack = [];
  var key = undefined;
  var token = undefined;
  var lastToken = undefined;
  while (true) {
    var match = regExp.exec(text);
    if (match === null) break;
    lastToken = token;
    token = match[0];
    var code = token.charCodeAt(0);
    if ((code === 0x5b) || (code === 0x7b)) {
      var newTip = (code === 0x5b) ? [] : {};
      tip[key || tip.length] = newTip;
      stack.push(tip);
      tip = newTip;
    } else if ((code === 0x5d) || (code === 0x7d)) {
      tip = stack.pop();
      if (!tip) break;
    } else if (code === 0x2C) {
      if (Array.isArray(tip) && (lastToken === undefined || lastToken === '[' || lastToken === ',')) tip[tip.length] = undefined;
    } else if (code === 0x22) {
      token = WebInspector.JSONView._unescapeString(token.substring(1, token.length - 1));
      if (!key) {
        if (Array.isArray(tip)) {
          key = tip.length;
        } else {
          key = token || '';
          continue;
        }
      }
      tip[key] = token;
    } else if (code === 0x66) {
      tip[key || tip.length] = false;
    } else if (code === 0x6e) {
      tip[key || tip.length] = null;
    } else if (code === 0x74) {
      tip[key || tip.length] = true;
    } else if (code === 0x2f || code === 0x2a || code === 0x26 || code === 0x7c || code === 0x3b || code === 0x3d || code === 0x28 || code === 0x29) {
      throw 'Invalid JSON';
    } else {
      tip[key || tip.length] = +(token);
    }
    key = undefined;
  }
  return (result.length > 1) ? result : result[0];
};
WebInspector.JSONView.parseJSON = function(text) {
  if (text.startsWith('<')) return null;
  var inner = WebInspector.JSONView._findBrackets(text, '{', '}');
  var inner2 = WebInspector.JSONView._findBrackets(text, '[', ']');
  inner = inner2.length > inner.length ? inner2 : inner;
  if (inner.length === -1 || text.length - inner.length > 80) return null;
  var prefix = text.substring(0, inner.start);
  var suffix = text.substring(inner.end + 1);
  text = text.substring(inner.start, inner.end + 1);
  if (suffix.trim().length && !(suffix.trim().startsWith(')') && prefix.trim().endsWith('('))) return null;
  try {
    return new WebInspector.ParsedJSON(WebInspector.JSONView._buildObjectFromJSON(text), prefix, suffix);
  } catch (e) {
    return null;
  }
};
WebInspector.JSONView._findBrackets = function(text, open, close) {
  var start = text.indexOf(open);
  var end = text.lastIndexOf(close);
  var length = end - start - 1;
  if (start == -1 || end == -1 || end < start) length = -1;
  return {
    start: start,
    end: end,
    length: length
  };
};
WebInspector.JSONView.prototype = {
  wasShown: function() {
    this._initialize();
  },
  _initialize: function() {
    if (this._initialized) return;
    this._initialized = true;
    var obj = WebInspector.RemoteObject.fromLocalObject(this._parsedJSON.data);
    var title = this._parsedJSON.prefix + obj.description + this._parsedJSON.suffix;
    var section = new WebInspector.ObjectPropertiesSection(obj, title);
    section.expand();
    section.editable = false;
    this.element.appendChild(section.element);
  },
  __proto__: WebInspector.VBox.prototype
};
WebInspector.ParsedJSON = function(data, prefix, suffix) {
  this.data = data;
  this.prefix = prefix;
  this.suffix = suffix;
};
WebInspector.RequestView = function(request) {
  WebInspector.VBox.call(this);
  this.element.classList.add('request-view');
  this.request = request;
};

function createElementWithClass(elementName, className, customElementType) {
  var element = document.createElement(elementName, customElementType || '');
  if (className) element.className = className;
  return element;
}

WebInspector.Widget = function(isWebComponent) {
    this.contentElement = createElementWithClass("div", "widget");
    if (isWebComponent) {
        this.element = createElementWithClass("div", "vbox flex-auto");
        this._shadowRoot = WebInspector.createShadowRootWithCoreStyles(this.element);
        this._shadowRoot.appendChild(this.contentElement);
    } else {
        this.element = this.contentElement;
    }
    this._isWebComponent = isWebComponent;
    this.element.__widget = this;
    this._visible = true;
    this._isRoot = false;
    this._isShowing = false;
    this._children = [];
    this._hideOnDetach = false;
    this._notificationDepth = 0;
}
WebInspector.Widget.prototype = {
    markAsRoot: function() {
        WebInspector.Widget.__assert(!this.element.parentElement, "Attempt to mark as root attached node");
        this._isRoot = true;
    },
    parentWidget: function() {
        return this._parentWidget;
    },
    children: function() {
        return this._children;
    },
    childWasDetached: function(widget) {},
    isShowing: function() {
        return this._isShowing;
    },
    shouldHideOnDetach: function() {
        if (this._hideOnDetach) return true;
        for (var child of this._children) {
            if (child.shouldHideOnDetach()) return true;
        }
        return false;
    },
    setHideOnDetach: function() {
        this._hideOnDetach = true;
    },
    _inNotification: function() {
        return !!this._notificationDepth || (this._parentWidget && this._parentWidget._inNotification());
    },
    _parentIsShowing: function() {
        if (this._isRoot) return true;
        return this._parentWidget && this._parentWidget.isShowing();
    },
    _callOnVisibleChildren: function(method) {
        var copy = this._children.slice();
        for (var i = 0; i < copy.length; ++i) {
            if (copy[i]._parentWidget === this && copy[i]._visible) method.call(copy[i]);
        }
    },
    _processWillShow: function() {
        this._callOnVisibleChildren(this._processWillShow);
        this._isShowing = true;
    },
    _processWasShown: function() {
        if (this._inNotification()) return;
        this.restoreScrollPositions();
        this._notify(this.wasShown);
        this._callOnVisibleChildren(this._processWasShown);
    },
    _processWillHide: function() {
        if (this._inNotification()) return;
        this.storeScrollPositions();
        this._callOnVisibleChildren(this._processWillHide);
        this._notify(this.willHide);
        this._isShowing = false;
    },
    _processWasHidden: function() {
        this._callOnVisibleChildren(this._processWasHidden);
    },
    _processOnResize: function() {
        if (this._inNotification()) return;
        if (!this.isShowing()) return;
        this._notify(this.onResize);
        this._callOnVisibleChildren(this._processOnResize);
    },
    _notify: function(notification) {
        ++this._notificationDepth;
        try {
            notification.call(this);
        } finally {
            --this._notificationDepth;
        }
    },
    wasShown: function() {},
    willHide: function() {},
    onResize: function() {},
    onLayout: function() {},
    show: function(parentElement, insertBefore) {
        WebInspector.Widget.__assert(parentElement, "Attempt to attach widget with no parent element");
        if (this.element.parentElement !== parentElement) {
            if (this.element.parentElement) this.detach();
            var currentParent = parentElement;
            while (currentParent && !currentParent.__widget) currentParent = currentParent.parentElementOrShadowHost();
            if (currentParent) {
                this._parentWidget = currentParent.__widget;
                this._parentWidget._children.push(this);
                this._isRoot = false;
            } else WebInspector.Widget.__assert(this._isRoot, "Attempt to attach widget to orphan node");
        } else if (this._visible) {
            return;
        }
        this._visible = true;
        if (this._parentIsShowing()) this._processWillShow();
        this.element.classList.remove("hidden");
        if (this.element.parentElement !== parentElement) {
            WebInspector.Widget._incrementWidgetCounter(parentElement, this.element);
            if (insertBefore) WebInspector.Widget._originalInsertBefore.call(parentElement, this.element, insertBefore);
            else WebInspector.Widget._originalAppendChild.call(parentElement, this.element);
        }
        if (this._parentIsShowing()) this._processWasShown();
        if (this._parentWidget && this._hasNonZeroConstraints()) this._parentWidget.invalidateConstraints();
        else this._processOnResize();
    },
    detach: function(overrideHideOnDetach) {
        var parentElement = this.element.parentElement;
        if (!parentElement) return;
        if (this._parentIsShowing()) this._processWillHide();
        if (!overrideHideOnDetach && this.shouldHideOnDetach()) {
            this.element.classList.add("hidden");
            this._visible = false;
            if (this._parentIsShowing()) this._processWasHidden();
            if (this._parentWidget && this._hasNonZeroConstraints()) this._parentWidget.invalidateConstraints();
            return;
        }
        WebInspector.Widget._decrementWidgetCounter(parentElement, this.element);
        WebInspector.Widget._originalRemoveChild.call(parentElement, this.element);
        this._visible = false;
        if (this._parentIsShowing()) this._processWasHidden();
        if (this._parentWidget) {
            var childIndex = this._parentWidget._children.indexOf(this);
            WebInspector.Widget.__assert(childIndex >= 0, "Attempt to remove non-child widget");
            this._parentWidget._children.splice(childIndex, 1);
            this._parentWidget.childWasDetached(this);
            var parent = this._parentWidget;
            this._parentWidget = null;
            if (this._hasNonZeroConstraints()) parent.invalidateConstraints();
        } else WebInspector.Widget.__assert(this._isRoot, "Removing non-root widget from DOM");
    },
    detachChildWidgets: function() {
        var children = this._children.slice();
        for (var i = 0; i < children.length; ++i) children[i].detach();
    },
    elementsToRestoreScrollPositionsFor: function() {
        return [this.element];
    },
    storeScrollPositions: function() {
        var elements = this.elementsToRestoreScrollPositionsFor();
        for (var i = 0; i < elements.length; ++i) {
            var container = elements[i];
            container._scrollTop = container.scrollTop;
            container._scrollLeft = container.scrollLeft;
        }
    },
    restoreScrollPositions: function() {
        var elements = this.elementsToRestoreScrollPositionsFor();
        for (var i = 0; i < elements.length; ++i) {
            var container = elements[i];
            if (container._scrollTop) container.scrollTop = container._scrollTop;
            if (container._scrollLeft) container.scrollLeft = container._scrollLeft;
        }
    },
    doResize: function() {
        if (!this.isShowing()) return;
        if (!this._inNotification()) this._callOnVisibleChildren(this._processOnResize);
    },
    doLayout: function() {
        if (!this.isShowing()) return;
        this._notify(this.onLayout);
        this.doResize();
    },
    registerRequiredCSS: function(cssFile) {
        WebInspector.appendStyle(this._isWebComponent ? this._shadowRoot : this.element, cssFile);
    },
    printWidgetHierarchy: function() {
        var lines = [];
        this._collectWidgetHierarchy("", lines);
        console.log(lines.join("\n"));
    },
    _collectWidgetHierarchy: function(prefix, lines) {
        lines.push(prefix + "[" + this.element.className + "]" + (this._children.length ? " {" : ""));
        for (var i = 0; i < this._children.length; ++i) this._children[i]._collectWidgetHierarchy(prefix + "    ", lines);
        if (this._children.length) lines.push(prefix + "}");
    },
    defaultFocusedElement: function() {
        return this._defaultFocusedElement || this.element;
    },
    setDefaultFocusedElement: function(element) {
        this._defaultFocusedElement = element;
    },
    focus: function() {
        var element = this.defaultFocusedElement();
        if (!element || element.isAncestor(this.element.ownerDocument.activeElement)) return;
        WebInspector.setCurrentFocusElement(element);
    },
    hasFocus: function() {
        var activeElement = this.element.ownerDocument.activeElement;
        return activeElement && activeElement.isSelfOrDescendant(this.element);
    },
    measurePreferredSize: function() {
        var document = this.element.ownerDocument;
        WebInspector.Widget._originalAppendChild.call(document.body, this.element);
        this.element.positionAt(0, 0);
        var result = new Size(this.element.offsetWidth, this.element.offsetHeight);
        this.element.positionAt(undefined, undefined);
        WebInspector.Widget._originalRemoveChild.call(document.body, this.element);
        return result;
    },
    calculateConstraints: function() {
        return new Constraints();
    },
    constraints: function() {
        if (typeof this._constraints !== "undefined") return this._constraints;
        if (typeof this._cachedConstraints === "undefined") this._cachedConstraints = this.calculateConstraints();
        return this._cachedConstraints;
    },
    setMinimumAndPreferredSizes: function(width, height, preferredWidth, preferredHeight) {
        this._constraints = new Constraints(new Size(width, height), new Size(preferredWidth, preferredHeight));
        this.invalidateConstraints();
    },
    setMinimumSize: function(width, height) {
        this._constraints = new Constraints(new Size(width, height));
        this.invalidateConstraints();
    },
    _hasNonZeroConstraints: function() {
        var constraints = this.constraints();
        return !!(constraints.minimum.width || constraints.minimum.height || constraints.preferred.width || constraints.preferred.height);
    },
    invalidateConstraints: function() {
        var cached = this._cachedConstraints;
        delete this._cachedConstraints;
        var actual = this.constraints();
        if (!actual.isEqual(cached) && this._parentWidget) this._parentWidget.invalidateConstraints();
        else this.doLayout();
    },
    invalidateSize: function() {
        if (this._parentWidget) this._parentWidget.doLayout();
    },
    __proto__: WebInspector.Object.prototype
}
function TreeOutline(nonFocusable) {
    this._createRootElement();
    this.selectedTreeElement = null;
    this.expandTreeElementsWhenArrowing = false;
    this._comparator = null;
    this._contentElement = this._rootElement._childrenListNode;
    this._contentElement.addEventListener("keydown", this._treeKeyDown.bind(this), true);
    this.setFocusable(!nonFocusable);
    this.element = this._contentElement;
}
TreeOutline.Events = {
    ElementAttached: "ElementAttached",
    ElementExpanded: "ElementExpanded",
    ElementCollapsed: "ElementCollapsed",
    ElementSelected: "ElementSelected"
}
TreeOutline.prototype = {
    _createRootElement: function() {
        this._rootElement = new TreeElement();
        this._rootElement.treeOutline = this;
        this._rootElement.root = true;
        this._rootElement.selectable = false;
        this._rootElement.expanded = true;
        this._rootElement._childrenListNode.classList.remove("children");
    },
    rootElement: function() {
        return this._rootElement;
    },
    firstChild: function() {
        return this._rootElement.firstChild();
    },
    appendChild: function(child) {
        this._rootElement.appendChild(child);
    },
    insertChild: function(child, index) {
        this._rootElement.insertChild(child, index);
    },
    removeChild: function(child) {
        this._rootElement.removeChild(child);
    },
    removeChildren: function() {
        this._rootElement.removeChildren();
    },
    treeElementFromPoint: function(x, y) {
        var node = this._contentElement.ownerDocument.deepElementFromPoint(x, y);
        if (!node) return null;
        var listNode = node.enclosingNodeOrSelfWithNodeNameInArray(["ol", "li"]);
        if (listNode) return listNode.parentTreeElement || listNode.treeElement;
        return null;
    },
    treeElementFromEvent: function(event) {
        return event ? this.treeElementFromPoint(event.pageX, event.pageY) : null;
    },
    setComparator: function(comparator) {
        this._comparator = comparator;
    },
    setFocusable: function(focusable) {
        if (focusable) this._contentElement.setAttribute("tabIndex", 0);
        else this._contentElement.removeAttribute("tabIndex");
    },
    focus: function() {
        this._contentElement.focus();
    },
    _bindTreeElement: function(element) {
        if (element.treeOutline) console.error("Binding element for the second time: " + new Error().stack);
        element.treeOutline = this;
        element.onbind();
    },
    _unbindTreeElement: function(element) {
        if (!element.treeOutline) console.error("Unbinding element that was not bound: " + new Error().stack);
        element.deselect();
        element.onunbind();
        element.treeOutline = null;
    },
    selectPrevious: function() {
        var nextSelectedElement = this.selectedTreeElement.traversePreviousTreeElement(true);
        while (nextSelectedElement && !nextSelectedElement.selectable) nextSelectedElement = nextSelectedElement.traversePreviousTreeElement(!this.expandTreeElementsWhenArrowing);
        if (nextSelectedElement) {
            nextSelectedElement.reveal();
            nextSelectedElement.select(false, true);
            return true;
        }
        return false;
    },
    selectNext: function() {
        var nextSelectedElement = this.selectedTreeElement.traverseNextTreeElement(true);
        while (nextSelectedElement && !nextSelectedElement.selectable) nextSelectedElement = nextSelectedElement.traverseNextTreeElement(!this.expandTreeElementsWhenArrowing);
        if (nextSelectedElement) {
            nextSelectedElement.reveal();
            nextSelectedElement.select(false, true);
            return true;
        }
        return false;
    },
    _treeKeyDown: function(event) {
        if (event.target !== this._contentElement) return;
        if (!this.selectedTreeElement || event.shiftKey || event.metaKey || event.ctrlKey) return;
        var handled = false;
        var nextSelectedElement;
        if (event.keyIdentifier === "Up" && !event.altKey) {
            handled = this.selectPrevious();
        } else if (event.keyIdentifier === "Down" && !event.altKey) {
            handled = this.selectNext();
        } else if (event.keyIdentifier === "Left") {
            if (this.selectedTreeElement.expanded) {
                if (event.altKey) this.selectedTreeElement.collapseRecursively();
                else this.selectedTreeElement.collapse();
                handled = true;
            } else if (this.selectedTreeElement.parent && !this.selectedTreeElement.parent.root) {
                handled = true;
                if (this.selectedTreeElement.parent.selectable) {
                    nextSelectedElement = this.selectedTreeElement.parent;
                    while (nextSelectedElement && !nextSelectedElement.selectable) nextSelectedElement = nextSelectedElement.parent;
                    handled = nextSelectedElement ? true : false;
                } else if (this.selectedTreeElement.parent) this.selectedTreeElement.parent.collapse();
            }
        } else if (event.keyIdentifier === "Right") {
            if (!this.selectedTreeElement.revealed()) {
                this.selectedTreeElement.reveal();
                handled = true;
            } else if (this.selectedTreeElement._expandable) {
                handled = true;
                if (this.selectedTreeElement.expanded) {
                    nextSelectedElement = this.selectedTreeElement.firstChild();
                    while (nextSelectedElement && !nextSelectedElement.selectable) nextSelectedElement = nextSelectedElement.nextSibling;
                    handled = nextSelectedElement ? true : false;
                } else {
                    if (event.altKey) this.selectedTreeElement.expandRecursively();
                    else this.selectedTreeElement.expand();
                }
            }
        } else if (event.keyCode === 8 || event.keyCode === 46) handled = this.selectedTreeElement.ondelete();
        else if (isEnterKey(event)) handled = this.selectedTreeElement.onenter();
        else if (event.keyCode === WebInspector.KeyboardShortcut.Keys.Space.code) handled = this.selectedTreeElement.onspace();
        if (nextSelectedElement) {
            nextSelectedElement.reveal();
            nextSelectedElement.select(false, true);
        }
        if (handled) event.consume(true);
    },
    _deferredScrollIntoView: function(treeElement, center) {
        if (!this._treeElementToScrollIntoView) this.element.window().requestAnimationFrame(deferredScrollIntoView.bind(this));
        this._treeElementToScrollIntoView = treeElement;
        this._centerUponScrollIntoView = center;

        function deferredScrollIntoView() {
            this._treeElementToScrollIntoView.listItemElement.scrollIntoViewIfNeeded(this._centerUponScrollIntoView);
            delete this._treeElementToScrollIntoView;
            delete this._centerUponScrollIntoView;
        }
    },
    __proto__: WebInspector.Object.prototype
}

function TreeOutlineInShadow() {
    TreeOutline.call(this);
    var innerElement = this.element;
    innerElement.classList.add("tree-outline");
    this.element = createElement("div");
    this._shadowRoot = WebInspector.createShadowRootWithCoreStyles(this.element, "ui/treeoutline.css");
    this._disclosureElement = this._shadowRoot.createChild("div", "tree-outline-disclosure");
    this._disclosureElement.appendChild(innerElement);
    this._renderSelection = true;
}
TreeOutlineInShadow.prototype = {
    registerRequiredCSS: function(cssFile) {
        WebInspector.appendStyle(this._shadowRoot, cssFile);
    },
    hideOverflow: function() {
        this._disclosureElement.classList.add("tree-outline-disclosure-hide-overflow");
    },
    __proto__: TreeOutline.prototype
}

function TreeElement(title, expandable) {
    this.treeOutline = null;
    this.parent = null;
    this.previousSibling = null;
    this.nextSibling = null;
    this._listItemNode = createElement("li");
    this._listItemNode.treeElement = this;
    if (title) this.title = title;
    this._listItemNode.addEventListener("mousedown", this._handleMouseDown.bind(this), false);
    this._listItemNode.addEventListener("selectstart", this._treeElementSelectStart.bind(this), false);
    this._listItemNode.addEventListener("click", this._treeElementToggled.bind(this), false);
    this._listItemNode.addEventListener("dblclick", this._handleDoubleClick.bind(this), false);
    this._childrenListNode = createElement("ol");
    this._childrenListNode.parentTreeElement = this;
    this._childrenListNode.classList.add("children");
    this._hidden = false;
    this._selectable = true;
    this.expanded = false;
    this.selected = false;
    this.setExpandable(expandable || false);
    this._collapsible = true;
}
TreeElement._ArrowToggleWidth = 10;
TreeElement.prototype = {
    hasAncestor: function(ancestor) {
        if (!ancestor) return false;
        var currentNode = this.parent;
        while (currentNode) {
            if (ancestor === currentNode) return true;
            currentNode = currentNode.parent;
        }
        return false;
    },
    hasAncestorOrSelf: function(ancestor) {
        return this === ancestor || this.hasAncestor(ancestor);
    },
    children: function() {
        return this._children || [];
    },
    childCount: function() {
        return this._children ? this._children.length : 0;
    },
    firstChild: function() {
        return this._children ? this._children[0] : null;
    },
    lastChild: function() {
        return this._children ? this._children[this._children.length - 1] : null;
    },
    childAt: function(index) {
        return this._children ? this._children[index] : null;
    },
    indexOfChild: function(child) {
        return this._children ? this._children.indexOf(child) : -1;
    },
    appendChild: function(child) {
        if (!this._children) this._children = [];
        var insertionIndex;
        if (this.treeOutline && this.treeOutline._comparator) insertionIndex = this._children.lowerBound(child, this.treeOutline._comparator);
        else insertionIndex = this._children.length;
        this.insertChild(child, insertionIndex);
    },
    insertChild: function(child, index) {
        if (!this._children) this._children = [];
        if (!child) throw ("child can't be undefined or null");
        console.assert(!child.parent, "Attempting to insert a child that is already in the tree, reparenting is not supported.");
        var previousChild = (index > 0 ? this._children[index - 1] : null);
        if (previousChild) {
            previousChild.nextSibling = child;
            child.previousSibling = previousChild;
        } else {
            child.previousSibling = null;
        }
        var nextChild = this._children[index];
        if (nextChild) {
            nextChild.previousSibling = child;
            child.nextSibling = nextChild;
        } else {
            child.nextSibling = null;
        }
        this._children.splice(index, 0, child);
        this.setExpandable(true);
        child.parent = this;
        if (this.treeOutline) this.treeOutline._bindTreeElement(child);
        for (var current = child.firstChild(); this.treeOutline && current; current = current.traverseNextTreeElement(false, child, true)) this.treeOutline._bindTreeElement(current);
        child.onattach();
        child._ensureSelection();
        if (this.treeOutline) this.treeOutline.dispatchEventToListeners(TreeOutline.Events.ElementAttached, child);
        var nextSibling = child.nextSibling ? child.nextSibling._listItemNode : null;
        this._childrenListNode.insertBefore(child._listItemNode, nextSibling);
        this._childrenListNode.insertBefore(child._childrenListNode, nextSibling);
        if (child.selected) child.select();
        if (child.expanded) child.expand();
    },
    removeChildAtIndex: function(childIndex) {
        if (childIndex < 0 || childIndex >= this._children.length) throw ("childIndex out of range");
        var child = this._children[childIndex];
        this._children.splice(childIndex, 1);
        var parent = child.parent;
        if (this.treeOutline && this.treeOutline.selectedTreeElement && this.treeOutline.selectedTreeElement.hasAncestorOrSelf(child)) {
            if (child.nextSibling) child.nextSibling.select(true);
            else if (child.previousSibling) child.previousSibling.select(true);
            else if (parent) parent.select(true);
        }
        if (child.previousSibling) child.previousSibling.nextSibling = child.nextSibling;
        if (child.nextSibling) child.nextSibling.previousSibling = child.previousSibling;
        child.parent = null;
        if (this.treeOutline) this.treeOutline._unbindTreeElement(child);
        for (var current = child.firstChild(); this.treeOutline && current; current = current.traverseNextTreeElement(false, child, true)) this.treeOutline._unbindTreeElement(current);
        child._detach();
    },
    removeChild: function(child) {
        if (!child) throw ("child can't be undefined or null");
        if (child.parent !== this) return;
        var childIndex = this._children.indexOf(child);
        if (childIndex === -1) throw ("child not found in this node's children");
        this.removeChildAtIndex(childIndex);
    },
    removeChildren: function() {
        if (!this.root && this.treeOutline && this.treeOutline.selectedTreeElement && this.treeOutline.selectedTreeElement.hasAncestorOrSelf(this)) this.select(true);
        for (var i = 0; this._children && i < this._children.length; ++i) {
            var child = this._children[i];
            child.previousSibling = null
            child.nextSibling = null;
            child.parent = null;
            if (this.treeOutline) this.treeOutline._unbindTreeElement(child);
            for (var current = child.firstChild(); this.treeOutline && current; current = current.traverseNextTreeElement(false, child, true)) this.treeOutline._unbindTreeElement(current);
            child._detach();
        }
        this._children = [];
    },
    get selectable() {
        if (this._hidden) return false;
        return this._selectable;
    },
    set selectable(x) {
        this._selectable = x;
    },
    get listItemElement() {
        return this._listItemNode;
    },
    get childrenListElement() {
        return this._childrenListNode;
    },
    get title() {
        return this._title;
    },
    set title(x) {
        if (this._title === x) return;
        this._title = x;
        if (typeof x === "string") {
            this._titleElement = createElementWithClass("span", "tree-element-title");
            this._titleElement.textContent = x;
            this.tooltip = x;
        } else {
            this._titleElement = x;
            this.tooltip = "";
        }
        this._listItemNode.removeChildren();
        if (this._iconElement) this._listItemNode.appendChild(this._iconElement);
        this._listItemNode.appendChild(this._titleElement);
        this._ensureSelection();
    },
    startEditingTitle: function(editingConfig) {
        WebInspector.InplaceEditor.startEditing(this._titleElement, editingConfig);
        this.treeOutline._shadowRoot.getSelection().setBaseAndExtent(this._titleElement, 0, this._titleElement, 1);
    },
    createIcon() {
        if (!this._iconElement) {
            this._iconElement = createElementWithClass("div", "icon");
            this._listItemNode.insertBefore(this._iconElement, this._listItemNode.firstChild);
            this._ensureSelection();
        }
    },
    get tooltip() {
        return this._tooltip || "";
    },
    set tooltip(x) {
        if (this._tooltip === x) return;
        this._tooltip = x;
        this._listItemNode.title = x;
    },
    isExpandable: function() {
        return this._expandable;
    },
    setExpandable: function(expandable) {
        if (this._expandable === expandable) return;
        this._expandable = expandable;
        this._listItemNode.classList.toggle("parent", expandable);
        if (!expandable) this.collapse();
    },
    setCollapsible: function(collapsible) {
        if (this._collapsible === collapsible) return;
        this._collapsible = collapsible;
        this._listItemNode.classList.toggle("always-parent", !collapsible);
        if (!collapsible) this.expand();
    },
    get hidden() {
        return this._hidden;
    },
    set hidden(x) {
        if (this._hidden === x) return;
        this._hidden = x;
        this._listItemNode.classList.toggle("hidden", x);
        this._childrenListNode.classList.toggle("hidden", x);
    },
    invalidateChildren: function() {
        if (this._children) {
            this.removeChildren();
            this._children = null;
        }
    },
    _ensureSelection: function() {
        if (!this.treeOutline || !this.treeOutline._renderSelection) return;
        if (!this._selectionElement) this._selectionElement = createElementWithClass("div", "selection fill");
        this._listItemNode.insertBefore(this._selectionElement, this.listItemElement.firstChild);
    },
    _treeElementSelectStart: function(event) {
        event.currentTarget._selectionStarted = true;
    },
    _treeElementToggled: function(event) {
        var element = event.currentTarget;
        if (element._selectionStarted) {
            delete element._selectionStarted;
            var selection = element.getComponentSelection();
            if (selection && !selection.isCollapsed && element.isSelfOrAncestor(selection.anchorNode) && element.isSelfOrAncestor(selection.focusNode)) return;
        }
        if (element.treeElement !== this) return;
        var toggleOnClick = this.toggleOnClick && !this.selectable;
        var isInTriangle = this.isEventWithinDisclosureTriangle(event);
        if (!toggleOnClick && !isInTriangle) return;
        if (event.target && event.target.enclosingNodeOrSelfWithNodeName("a")) return;
        if (this.expanded) {
            if (event.altKey) this.collapseRecursively();
            else this.collapse();
        } else {
            if (event.altKey) this.expandRecursively();
            else this.expand();
        }
        event.consume();
    },
    _handleMouseDown: function(event) {
        var element = event.currentTarget;
        if (!element) return;
        delete element._selectionStarted;
        if (!this.selectable) return;
        if (element.treeElement !== this) return;
        if (this.isEventWithinDisclosureTriangle(event)) return;
        this.selectOnMouseDown(event);
    },
    _handleDoubleClick: function(event) {
        var element = event.currentTarget;
        if (!element || element.treeElement !== this) return;
        var handled = this.ondblclick(event);
        if (handled) return;
        if (this._expandable && !this.expanded) this.expand();
    },
    _detach: function() {
        this._listItemNode.remove();
        this._childrenListNode.remove();
    },
    collapse: function() {
        if (!this.expanded || !this._collapsible) return;
        this._listItemNode.classList.remove("expanded");
        this._childrenListNode.classList.remove("expanded");
        this.expanded = false;
        this.oncollapse();
        if (this.treeOutline) this.treeOutline.dispatchEventToListeners(TreeOutline.Events.ElementCollapsed, this);
    },
    collapseRecursively: function() {
        var item = this;
        while (item) {
            if (item.expanded) item.collapse();
            item = item.traverseNextTreeElement(false, this, true);
        }
    },
    expand: function() {
        if (!this._expandable || (this.expanded && this._children)) return;
        this.expanded = true;
        this._populateIfNeeded();
        this._listItemNode.classList.add("expanded");
        this._childrenListNode.classList.add("expanded");
        if (this.treeOutline) {
            this.onexpand();
            this.treeOutline.dispatchEventToListeners(TreeOutline.Events.ElementExpanded, this);
        }
    },
    expandRecursively: function(maxDepth) {
        var item = this;
        var info = {};
        var depth = 0;
        if (isNaN(maxDepth)) maxDepth = 3;
        while (item) {
            if (depth < maxDepth) item.expand();
            item = item.traverseNextTreeElement(false, this, (depth >= maxDepth), info);
            depth += info.depthChange;
        }
    },
    reveal: function(center) {
        var currentAncestor = this.parent;
        while (currentAncestor && !currentAncestor.root) {
            if (!currentAncestor.expanded) currentAncestor.expand();
            currentAncestor = currentAncestor.parent;
        }
        this.treeOutline._deferredScrollIntoView(this, !!center);
    },
    revealed: function() {
        var currentAncestor = this.parent;
        while (currentAncestor && !currentAncestor.root) {
            if (!currentAncestor.expanded) return false;
            currentAncestor = currentAncestor.parent;
        }
        return true;
    },
    selectOnMouseDown: function(event) {
        if (this.select(false, true)) event.consume(true);
    },
    select: function(omitFocus, selectedByUser) {
        if (!this.treeOutline || !this.selectable || this.selected) return false;
        if (this.treeOutline.selectedTreeElement) this.treeOutline.selectedTreeElement.deselect();
        this.treeOutline.selectedTreeElement = null;
        if (this.treeOutline._rootElement === this) return false;
        this.selected = true;
        if (!omitFocus) this.treeOutline.focus();
        if (!this.treeOutline) return false;
        this.treeOutline.selectedTreeElement = this;
        this._listItemNode.classList.add("selected");
        this.treeOutline.dispatchEventToListeners(TreeOutline.Events.ElementSelected, this);
        return this.onselect(selectedByUser);
    },
    revealAndSelect: function(omitFocus) {
        this.reveal(true);
        this.select(omitFocus);
    },
    deselect: function(supressOnDeselect) {
        if (!this.treeOutline || this.treeOutline.selectedTreeElement !== this || !this.selected) return;
        this.selected = false;
        this.treeOutline.selectedTreeElement = null;
        this._listItemNode.classList.remove("selected");
    },
    _populateIfNeeded: function() {
        if (this.treeOutline && this._expandable && !this._children) {
            this._children = [];
            this.onpopulate();
        }
    },
    onpopulate: function() {},
    onenter: function() {
        return false;
    },
    ondelete: function() {
        return false;
    },
    onspace: function() {
        return false;
    },
    onbind: function() {},
    onunbind: function() {},
    onattach: function() {},
    onexpand: function() {},
    oncollapse: function() {},
    ondblclick: function(e) {
        return false;
    },
    onselect: function(selectedByUser) {
        return false;
    },
    traverseNextTreeElement: function(skipUnrevealed, stayWithin, dontPopulate, info) {
        if (!dontPopulate) this._populateIfNeeded();
        if (info) info.depthChange = 0;
        var element = skipUnrevealed ? (this.revealed() ? this.firstChild() : null) : this.firstChild();
        if (element && (!skipUnrevealed || (skipUnrevealed && this.expanded))) {
            if (info) info.depthChange = 1;
            return element;
        }
        if (this === stayWithin) return null;
        element = skipUnrevealed ? (this.revealed() ? this.nextSibling : null) : this.nextSibling;
        if (element) return element;
        element = this;
        while (element && !element.root && !(skipUnrevealed ? (element.revealed() ? element.nextSibling : null) : element.nextSibling) && element.parent !== stayWithin) {
            if (info) info.depthChange -= 1;
            element = element.parent;
        }
        if (!element || element.root) return null;
        return (skipUnrevealed ? (element.revealed() ? element.nextSibling : null) : element.nextSibling);
    },
    traversePreviousTreeElement: function(skipUnrevealed, dontPopulate) {
        var element = skipUnrevealed ? (this.revealed() ? this.previousSibling : null) : this.previousSibling;
        if (!dontPopulate && element) element._populateIfNeeded();
        while (element && (skipUnrevealed ? (element.revealed() && element.expanded ? element.lastChild() : null) : element.lastChild())) {
            if (!dontPopulate) element._populateIfNeeded();
            element = (skipUnrevealed ? (element.revealed() && element.expanded ? element.lastChild() : null) : element.lastChild());
        }
        if (element) return element;
        if (!this.parent || this.parent.root) return null;
        return this.parent;
    },
    isEventWithinDisclosureTriangle: function(event) {
        var paddingLeftValue = window.getComputedStyle(this._listItemNode).paddingLeft;
        console.assert(paddingLeftValue.endsWith("px"));
        var computedLeftPadding = parseFloat(paddingLeftValue);
        var left = this._listItemNode.totalOffsetLeft() + computedLeftPadding;
        return event.pageX >= left && event.pageX <= left + TreeElement._ArrowToggleWidth && this._expandable;
    }
};

WebInspector.ObjectPropertiesSection = function(object, title, emptyPlaceholder, ignoreHasOwnProperty, extraProperties) {
    this._object = object;
    this._editable = true;
    TreeOutlineInShadow.call(this);
    this.hideOverflow();
    this.setFocusable(false);
    this._objectTreeElement = new WebInspector.ObjectPropertiesSection.RootElement(object, emptyPlaceholder, ignoreHasOwnProperty, extraProperties);
    this.appendChild(this._objectTreeElement);
    if (typeof title === "string" || !title) this.element.createChild("span").textContent = title || "";
    else this.element.appendChild(title);
    this.element._section = this;
    this.registerRequiredCSS("components/objectValue.css");
    this.registerRequiredCSS("components/objectPropertiesSection.css");
    this.rootElement().childrenListElement.classList.add("source-code", "object-properties-section");
}
WebInspector.ObjectPropertiesSection._arrayLoadThreshold = 100;
WebInspector.ObjectPropertiesSection.defaultObjectPresentation = function(object, skipProto) {
    var componentRoot = createElementWithClass("span", "source-code");
    var shadowRoot = WebInspector.createShadowRootWithCoreStyles(componentRoot, "components/objectValue.css");
    shadowRoot.appendChild(WebInspector.ObjectPropertiesSection.createValueElement(object, false));
    if (!object.hasChildren) return componentRoot;
    var objectPropertiesSection = new WebInspector.ObjectPropertiesSection(object, componentRoot);
    objectPropertiesSection.editable = false;
    if (skipProto) objectPropertiesSection.skipProto();
    return objectPropertiesSection.element;
}
WebInspector.ObjectPropertiesSection.prototype = {
    skipProto: function() {
        this._skipProto = true;
    },
    expand: function() {
        this._objectTreeElement.expand();
    },
    objectTreeElement: function() {
        return this._objectTreeElement;
    },
    enableContextMenu: function() {
        this.element.addEventListener("contextmenu", this._contextMenuEventFired.bind(this), false);
    },
    _contextMenuEventFired: function(event) {
        var contextMenu = new WebInspector.ContextMenu(event);
        contextMenu.appendApplicableItems(this._object);
        contextMenu.show();
    },
    titleLessMode: function() {
        this._objectTreeElement.listItemElement.classList.add("hidden");
        this._objectTreeElement.childrenListElement.classList.add("title-less-mode");
        this._objectTreeElement.expand();
    },
    __proto__: TreeOutlineInShadow.prototype
}
WebInspector.ObjectPropertiesSection.CompareProperties = function(propertyA, propertyB) {
    var a = propertyA.name;
    var b = propertyB.name;
    if (a === "__proto__") return 1;
    if (b === "__proto__") return -1;
    if (propertyA.symbol && !propertyB.symbol) return 1;
    if (propertyB.symbol && !propertyA.symbol) return -1;
    return String.naturalOrderComparator(a, b);
}
WebInspector.ObjectPropertiesSection.RootElement = function(object, emptyPlaceholder, ignoreHasOwnProperty, extraProperties) {
    this._object = object;
    this._extraProperties = extraProperties || [];
    this._ignoreHasOwnProperty = !!ignoreHasOwnProperty;
    this._emptyPlaceholder = emptyPlaceholder;
    var contentElement = createElement("content");
    TreeElement.call(this, contentElement);
    this.setExpandable(true);
    this.selectable = false;
    this.toggleOnClick = true;
    this.listItemElement.classList.add("object-properties-section-root-element");
}
WebInspector.ObjectPropertiesSection.RootElement.prototype = {
    onexpand: function() {
        if (this.treeOutline) this.treeOutline.element.classList.add("expanded");
    },
    oncollapse: function() {
        if (this.treeOutline) this.treeOutline.element.classList.remove("expanded");
    },
    ondblclick: function(e) {
        return true;
    },
    onpopulate: function() {
        WebInspector.ObjectPropertyTreeElement._populate(this, this._object, !!this.treeOutline._skipProto, this._emptyPlaceholder, this._ignoreHasOwnProperty, this._extraProperties);
    },
    __proto__: TreeElement.prototype
}
WebInspector.ObjectPropertyTreeElement = function(property) {
    this.property = property;
    TreeElement.call(this);
    this.toggleOnClick = true;
    this.selectable = false;
}
WebInspector.ObjectPropertyTreeElement.prototype = {
    onpopulate: function() {
        var propertyValue = (this.property.value);
        console.assert(propertyValue);
        var skipProto = this.treeOutline ? this.treeOutline._skipProto : true;
        var targetValue = this.property.name !== '__proto__' ? propertyValue : this.property.parentObject;
        WebInspector.ObjectPropertyTreeElement._populate(this, propertyValue, skipProto, undefined, undefined, undefined, targetValue);
    },
    ondblclick: function(event) {
        var editableElement = this.valueElement;
        if (!this.property.value.customPreview() && (this.property.writable || this.property.setter) && event.target.isSelfOrDescendant(editableElement)) this._startEditing();
        return false;
    },
    onattach: function() {
        this.update();
        this._updateExpandable();
    },
    update: function() {
        this.nameElement = WebInspector.ObjectPropertiesSection.createNameElement(this.property.name);
        if (!this.property.enumerable) this.nameElement.classList.add("object-properties-section-dimmed");
        if (this.property.isAccessorProperty()) this.nameElement.classList.add("properties-accessor-property-name");
        if (this.property.synthetic) this.nameElement.classList.add("synthetic-property");
        if (this.property.symbol) this.nameElement.addEventListener("contextmenu", this._contextMenuFired.bind(this, this.property.symbol), false);
        var separatorElement = createElementWithClass("span", "object-properties-section-separator");
        separatorElement.textContent = ": ";
        if (this.property.value) {
            this.valueElement = WebInspector.ObjectPropertiesSection.createValueElementWithCustomSupport(this.property.value, this.property.wasThrown, this.listItemElement);
            this.valueElement.addEventListener("contextmenu", this._contextMenuFired.bind(this, this.property.value), false);
        } else if (this.property.getter) {
            this.valueElement = WebInspector.ObjectPropertyTreeElement.createRemoteObjectAccessorPropertySpan(this.property.parentObject, [this.property.name], this._onInvokeGetterClick.bind(this));
        } else {
            this.valueElement = createElementWithClass("span", "object-value-undefined");
            this.valueElement.textContent = WebInspector.UIString("<unreadable>");
            this.valueElement.title = WebInspector.UIString("No property getter");
        }
        this.listItemElement.removeChildren();
        this.listItemElement.appendChildren(this.nameElement, separatorElement, this.valueElement);
    },
    _contextMenuFired: function(value, event) {
        var contextMenu = new WebInspector.ContextMenu(event);
        contextMenu.appendApplicableItems(value);
        contextMenu.show();
    },
    _startEditing: function() {
        if (this._prompt || !this.treeOutline._editable || this._readOnly) return;
        this._editableDiv = this.listItemElement.createChild("span");
        var text = this.property.value.description;
        if (this.property.value.type === "string" && typeof text === "string") text = "\"" + text + "\"";
        this._editableDiv.setTextContentTruncatedIfNeeded(text, WebInspector.UIString("<string is too large to edit>"));
        var originalContent = this._editableDiv.textContent;
        this.valueElement.classList.add("hidden");
        this.setExpandable(false);
        this.listItemElement.classList.add("editing-sub-part");
        this._prompt = new WebInspector.ObjectPropertyPrompt();
        var proxyElement = this._prompt.attachAndStartEditing(this._editableDiv, this._editingCommitted.bind(this, originalContent));
        this.listItemElement.getComponentSelection().setBaseAndExtent(this._editableDiv, 0, this._editableDiv, 1);
        proxyElement.addEventListener("keydown", this._promptKeyDown.bind(this, originalContent), false);
    },
    _editingEnded: function() {
        this._prompt.detach();
        delete this._prompt;
        this._editableDiv.remove();
        this._updateExpandable();
        this.listItemElement.scrollLeft = 0;
        this.listItemElement.classList.remove("editing-sub-part");
    },
    _editingCancelled: function() {
        this.valueElement.classList.remove("hidden");
        this._editingEnded();
    },
    _editingCommitted: function(originalContent) {
        var userInput = this._prompt.text();
        if (userInput === originalContent) {
            this._editingCancelled();
            return;
        }
        this._editingEnded();
        this._applyExpression(userInput);
    },
    _promptKeyDown: function(originalContent, event) {
        if (isEnterKey(event)) {
            event.consume(true);
            this._editingCommitted(originalContent);
            return;
        }
        if (event.keyIdentifier === "U+001B") {
            event.consume();
            this._editingCancelled();
            return;
        }
    },
    _applyExpression: function(expression) {
        var property = WebInspector.RemoteObject.toCallArgument(this.property.symbol || this.property.name);
        expression = expression.trim();
        if (expression) this.property.parentObject.setPropertyValue(property, expression, callback.bind(this));
        else this.property.parentObject.deleteProperty(property, callback.bind(this));

        function callback(error) {
            if (error) {
                this.update();
                return;
            }
            if (!expression) {
                this.parent.removeChild(this);
            } else {
                var parent = this.parent;
                parent.invalidateChildren();
                parent.expand();
            }
        };
    },
    _onInvokeGetterClick: function(result, wasThrown) {
        if (!result) return;
        this.property.value = result;
        this.property.wasThrown = wasThrown;
        this.update();
        this.invalidateChildren();
        this._updateExpandable();
    },
    _updateExpandable: function() {
        if (this.property.value) this.setExpandable(!this.property.value.customPreview() && this.property.value.hasChildren && !this.property.wasThrown);
        else this.setExpandable(false);
    },
    __proto__: TreeElement.prototype
}
WebInspector.ObjectPropertyTreeElement._populate = function(treeElement, value, skipProto, emptyPlaceholder, flattenProtoChain, extraProperties, targetValue) {
    if (value.arrayLength() > WebInspector.ObjectPropertiesSection._arrayLoadThreshold) {
        treeElement.removeChildren();
        WebInspector.ArrayGroupingTreeElement._populateArray(treeElement, value, 0, value.arrayLength() - 1);
        return;
    }

    function callback(properties, internalProperties) {
        treeElement.removeChildren();
        if (!properties) return;
        extraProperties = extraProperties || [];
        for (var i = 0; i < extraProperties.length; ++i) properties.push(extraProperties[i]);
        WebInspector.ObjectPropertyTreeElement.populateWithProperties(treeElement, properties, internalProperties, skipProto, targetValue || value, emptyPlaceholder);
    }
    if (flattenProtoChain) value.getAllProperties(false, callback);
    else WebInspector.RemoteObject.loadFromObjectPerProto(value, callback);
}
WebInspector.ObjectPropertyTreeElement.populateWithProperties = function(treeNode, properties, internalProperties, skipProto, value, emptyPlaceholder) {
    properties.sort(WebInspector.ObjectPropertiesSection.CompareProperties);
    for (var i = 0; i < properties.length; ++i) {
        var property = properties[i];
        if (skipProto && property.name === "__proto__") continue;
        if (property.isAccessorProperty()) {
            if (property.name !== "__proto__" && property.getter) {
                property.parentObject = value;
                treeNode.appendChild(new WebInspector.ObjectPropertyTreeElement(property));
            }
            if (property.isOwn) {
                if (property.getter) {
                    var getterProperty = new WebInspector.RemoteObjectProperty("get " + property.name, property.getter);
                    getterProperty.parentObject = value;
                    treeNode.appendChild(new WebInspector.ObjectPropertyTreeElement(getterProperty));
                }
                if (property.setter) {
                    var setterProperty = new WebInspector.RemoteObjectProperty("set " + property.name, property.setter);
                    setterProperty.parentObject = value;
                    treeNode.appendChild(new WebInspector.ObjectPropertyTreeElement(setterProperty));
                }
            }
        } else {
            property.parentObject = value;
            treeNode.appendChild(new WebInspector.ObjectPropertyTreeElement(property));
        }
    }
    if (internalProperties) {
        for (var i = 0; i < internalProperties.length; i++) {
            internalProperties[i].parentObject = value;
            treeNode.appendChild(new WebInspector.ObjectPropertyTreeElement(internalProperties[i]));
        }
    }
    if (value && value.type === "function") {
        var hasTargetFunction = false;
        if (internalProperties) {
            for (var i = 0; i < internalProperties.length; i++) {
                if (internalProperties[i].name == "[[TargetFunction]]") {
                    hasTargetFunction = true;
                    break;
                }
            }
        }
        if (!hasTargetFunction) treeNode.appendChild(new WebInspector.FunctionScopeMainTreeElement(value));
    }
    if (value && value.type === "object" && (value.subtype === "map" || value.subtype === "set" || value.subtype === "iterator")) treeNode.appendChild(new WebInspector.CollectionEntriesMainTreeElement(value));
    WebInspector.ObjectPropertyTreeElement._appendEmptyPlaceholderIfNeeded(treeNode, emptyPlaceholder);
}
WebInspector.ObjectPropertyTreeElement._appendEmptyPlaceholderIfNeeded = function(treeNode, emptyPlaceholder) {
    if (treeNode.childCount()) return;
    var title = createElementWithClass("div", "info");
    title.textContent = emptyPlaceholder || WebInspector.UIString("No Properties");
    var infoElement = new TreeElement(title);
    treeNode.appendChild(infoElement);
}
WebInspector.ObjectPropertyTreeElement.createRemoteObjectAccessorPropertySpan = function(object, propertyPath, callback) {
    var rootElement = createElement("span");
    var element = rootElement.createChild("span");
    element.textContent = WebInspector.UIString("(...)");
    if (!object) return rootElement;
    element.classList.add("object-value-calculate-value-button");
    element.title = WebInspector.UIString("Invoke property getter");
    element.addEventListener("click", onInvokeGetterClick, false);

    function onInvokeGetterClick(event) {
        event.consume();
        object.getProperty(propertyPath, callback);
    }
    return rootElement;
}