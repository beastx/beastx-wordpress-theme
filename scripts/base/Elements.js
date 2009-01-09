var DOM = {};

DOM.removeAllChildren = function(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

DOM.get = function(id) {
    return document.getElementById(id);
}

DOM.getOnlyById = function(id) {
    if (DOM.isIE) {
        var list = document.getElementsByName(id);
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                return list[i];
            }
        }
        return null;
    } else {
        return document.getElementById(id);
    }
}

DOM.getAllNodesBetweeen = function(element1, element2) {
    if (element1 == element2) {
        return [];
    }
    if (element1.firstChild) {
        return [ element1.firstChild ].concat(DOM.getAllNodesBetweeen(element1.firstChild, element2));
    } else if (element1.nextSibling) {
        return [ element1.nextSibling ].concat(DOM.getAllNodesBetweeen(element1.nextSibling, element2));
    } else {
        while (element1.parentNode && element1.parentNode != element2) {
            var i, nodes;
            nodes = element1.parentNode.childNodes;
            for (i = 0; i < nodes.length; i++) {
                if (nodes[i] == element1) {
                    break;
                }
            }
            if (i + 1 < nodes.length) {
                return DOM.getAllNodesBetweeen(nodes[i + 1], element2);
            }
            element1 = element1.parentNode;
        }
        return [];
    }
}

DOM.elementIsVisible = function(element) {
    if (element.nodeType == 1) {
        if (DOM.getCurrentStyle(element, 'display') == 'none' || DOM.getCurrentStyle(element, 'visibility') == 'hidden') {
            return false;
        } else if (element.parentNode) {
            return DOM.elementIsVisible(element.parentNode);
        } else {
            return true;
        }
    } else {
        return true;
    }
}

DOM.getNextElement = function(element) {
    if (!(element = element.nextSibling)) {
        return null
    }
    while (element.nodeType != 1 && element.nextSibling) {
        element = element.nextSibling;
    }
    if (element.nodeType == 1) {
        return element;
    } else {
        return null;
    }
}

DOM.getPreviousElement = function(element) {
    if (!(element = element.previousSibling)) {
        return null;
    }
    while (element.nodeType != 1 && element.previousSibling) {
        element = element.previousSibling;
    }
    if (element.nodeType == 1) {
        return element;
    } else {
        return null;
    }
}

DOM.getElementsByClassName = function(node, className) {
    var results = [], elements = node.getElementsByTagName('*');
    for (var i = 0; i < elements.length; ++i) {
        if (elements[i].className && DOM.hasClass(elements[i], className)) {
            results.push(elements[i]);
        }
    }
    return results;
}

DOM.getElementsByName = function(parentNode, name) {
    var elements = document.getElementsByName(name);
    var results = [];
    for (var i = 0; i < elements.length; ++i) {
        if (DOM.contains(parentNode, elements[i])) {
            results.push(elements[i]);
        }
    }
    return results;
}

DOM.getElementsBySelector = function(selector, fromElement) {
  function getAllChildren(parentNode) {
      return parentNode.getElementsByTagName('*');
  }
  if (!fromElement) {
      fromElement = document;
  }
  if (!document.getElementsByTagName) {
    return new Array();
  }
  var tokens = selector.split(' ');
  var currentContext = new Array(fromElement);
  for (var i = 0; i < tokens.length; i++) {
    token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');;
    if (token.indexOf('#') > -1) {
      var bits = token.split('#');
      var tagName = bits[0];
      var id = bits[1];
      var element = document.getElementById(id);
      if (tagName && element.nodeName.toLowerCase() != tagName) {
        return new Array();
      }
      currentContext = new Array(element);
      continue;
    }
    if (token.indexOf('.') > -1) {
      var bits = token.split('.');
      var tagName = bits[0];
      var className = bits[1];
      if (!tagName) {
        tagName = '*';
      }
      var found = new Array;
      var foundCount = 0;
      for (var h = 0; h < currentContext.length; h++) {
        var elements;
        if (tagName == '*') {
            elements = getAllChildren(currentContext[h]);
        } else {
            elements = currentContext[h].getElementsByTagName(tagName);
        }
        for (var j = 0; j < elements.length; j++) {
          found[foundCount++] = elements[j];
        }
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      for (var k = 0; k < found.length; k++) {
        if (found[k].className && found[k].className.match(new RegExp('\\b'+className+'\\b'))) {
          currentContext[currentContextIndex++] = found[k];
        }
      }
      continue;
    }
    if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
      var tagName = RegExp.$1;
      var attrName = RegExp.$2;
      var attrOperator = RegExp.$3;
      var attrValue = RegExp.$4;
      if (!tagName) {
        tagName = '*';
      }
      var found = new Array;
      var foundCount = 0;
      for (var h = 0; h < currentContext.length; h++) {
        var elements;
        if (tagName == '*') {
            elements = getAllChildren(currentContext[h]);
        } else {
            elements = currentContext[h].getElementsByTagName(tagName);
        }
        for (var j = 0; j < elements.length; j++) {
          found[foundCount++] = elements[j];
        }
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      var checkFunction;
      switch (attrOperator) {
        case '=':
          checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue); };
          break;
        case '~':
          checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('\\b'+attrValue+'\\b'))); };
          break;
        case '|':
          checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))); };
          break;
        case '^':
          checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0); };
          break;
        case '$':
          checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length); };
          break;
        case '*':
          checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1); };
          break;
        default :
          checkFunction = function(e) { return e.getAttribute(attrName); };
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      for (var k = 0; k < found.length; k++) {
        if (checkFunction(found[k])) {
          currentContext[currentContextIndex++] = found[k];
        }
      }
      continue;
    }
    tagName = token;
    var found = new Array;
    var foundCount = 0;
    for (var h = 0; h < currentContext.length; h++) {
      var elements = currentContext[h].getElementsByTagName(tagName);
      for (var j = 0; j < elements.length; j++) {
        found[foundCount++] = elements[j];
      }
    }
    currentContext = found;
  }
  return currentContext;
}

DOM.getCurrentStyle = function(element, property) {
    if (element.currentStyle) {
        return element.currentStyle[property];
    } else {
        return document.defaultView.getComputedStyle(element, null)[property];
    }
}

DOM.hasClass = function(element, className) {
    return !!element.className && VAR.hasWord(element.className, className)
}

DOM.addClass = function(element, className) {
    element.className = VAR.addWord(element.className, className)
}

DOM.removeClass = function(element, className) {
    element.className = VAR.removeWord(element.className, className)
}

DOM.toggleClass = function(element, className) {
    if (DOM.hasClass(element, className)) {
        DOM.removeClass(element, className);
    } else {
        DOM.addClass(element, className);
    }
}

DOM.setHasClass = function(element, className, addIfTrueRemoveIfFalse) {
    if (addIfTrueRemoveIfFalse) {
        DOM.addClass(element, className);
    } else {
        DOM.removeClass(element, className);
    }
}

if (BRW.isGecko) {
    DOM.contains = function(containerElement, containedElement) {
        return (containedElement.compareDocumentPosition(containerElement) & 8) == 8;
    }
} else {
    DOM.contains = function(containerElement, containedElement) {
        return containerElement.contains(containedElement);
    }
}

DOM.appendChild = function(parent, child) {
    if (child === null) {
        return;
    } else if (typeof child == 'string' || typeof child == 'number') {
        parent.appendChild(parent.ownerDocument.createTextNode(child));
    } else if (child.getDomNode) {
        parent.appendChild(child.getDomNode());
    } else {
        parent.appendChild(child);
    }
}

DOM.appendChildren = function(parent, childNodes) {
    if (typeof childNodes == 'string' || typeof childNodes.length == 'undefined') {
        if (DEBUG_MODE) {
            Log(
                {
                    parent: parent,
                    childNodes: childNodes
                }, "DOM.appendChildren: childNodes should be an array"
            );
            debugger;
        }
        throw e;
    }
    try {
        for (var i = 0; i < childNodes.length; ++i) {
            DOM.appendChild(parent, childNodes[i]);
        }
    } catch (e) {
        if (DEBUG_MODE) {
            Log(
                {
                    parent: parent,
                    childNodes: childNodes
                }, "DOM.appendChildren: Could not append child"
            );
            debugger;
        }
        throw e;
    }
}

DOM.removeChild = function(parent, child) {
    if (child === null) {
        return;
    } else if (child.getDomNode) {
        parent.removeChild(child.getDomNode());
    } else {
        parent.removeChild(child);
    }
}

DOM.createElement = function(tagName, attributes, childNodes) {
    var ownerDocument = document;
    var element = ownerDocument.createElement(tagName);
    var styleProperties, item;
    var type;
    for (var attribute in attributes) {
        type = typeof attributes[attribute];
        if (type == 'function' || type == 'boolean') {
            element[attribute] = attributes[attribute];
        } else if (attribute == 'style' && typeof attributes[attribute] == 'object') {
            styleProperties = attributes[attribute];
            for (item in styleProperties) {
                element.style[item] = styleProperties[item];
            }
        } else if (attribute == 'class') {
            element.className = attributes[attribute];
        } else if (attribute == 'maxlength') { // IE doesn't support setting the maxlength attribute
            element.maxLength = attributes[attribute];
        } else if (attributes[attribute] === null) {
            continue;
        } else {
            element.setAttribute(attribute, attributes[attribute]);
        }
    }
    if (childNodes) {
        for (var i = 0; i < childNodes.length; ++i) {
            if (childNodes[i] === null) {
                continue;
            } else if (typeof childNodes[i] == 'string' || typeof childNodes[i] == 'number') {
                element.appendChild(ownerDocument.createTextNode(childNodes[i]));
            } else {
                element.appendChild(childNodes[i]);
            }
        }
    }
    return element;
}

DOM.hasChild = function(element, child) {
  if (element === child) { return false; }
    while (child && child !== element) {
      child = child.parentNode;
    }
   return child === element;
}

if (BRW.isIE) {
    DOM.getTextContent = function(element) {
        return element.innerText;
    }
} else {
    DOM.getTextContent = function(element) {
        return element.textContent;
    }
}

DOM.setOpacity = function(element, opacity) {
    var els = element.style;
    if( opacity == 1 ) {
        els.opacity = '0.999999';
        if( /MSIE/.test(navigator.userAgent) )
            els.filter = element.style.filter.replace(/alpha\([^\)]*\)/gi, '');
    }
    else {
        if( opacity < 0.00001 ) opacity = 0;
        els.opacity = opacity;
        if( /MSIE/.test(navigator.userAgent) )
            els.filter = element.style.filter.replace(/alpha\([^\)]*\)/gi, '') +
                         "alpha(opacity=" + opacity * 100 + ")";
    }
}

DOM.getOpacity = function(element) {
    var opacity;
    if( opacity = element.style.opacity )
        return parseFloat(opacity);
    if( opacity = (element.style.filter || '').match(/alpha\(opacity=(.*)\)/) )
        if( opacity[1] ) return parseFloat(opacity[1]) / 100;
    return 1.0;
}

DOM.setStyle = function(element, styleProperties) {
  for(var prop in styleProperties) {
    element.style[prop] = styleProperties[prop];
  }
}

DOM.remove = function(element) {
  element.parentNode.removeChild(element);
}

DOM.appendBodyChild = function(element) {
  DOM.getElementsBySelector('body')[0].appendChild(element);
}

DOM.insertBefore = function(element, referenceElement) {
  referenceElement.parentNode.insertBefore(element, referenceElement);
}

DOM.insertAfter = function(element, referenceElement) {
  referenceElement.parentNode.insertBefore(element, referenceElement.nextSibling);
}

DOM.insertTop = function(element, parentElement) {
  parentElement.insertBefore(element, parentElement.firstChild);
}

DOM.insertBottom = function(element, parentElement) {
  parentElement.appendChild(element);
}

DOM.replace = function(originalElement, newElement) {
  originalElement.parentNode.replaceChild(newElement, originalElement);
}

DOM.fixPNG = function (imageElement) {
  if (BRW.isIE) {
    var newImage = DOM.createElement('span',
      {
        id: imageElement.id,
        'class': imageElement.className,
        title: imageElement.title,
        cssText: imageElement.style.cssText,
        style: {
          fontSize: '0',
          width: imageElement.width.toString() + 'px',
          height: imageElement.height.toString() + 'px',
          display: 'inline-block'
        }
      }
    );
    newImage.style.setAttribute('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + imageElement.src + "\', sizingMethod='scale')");
    return newImage;
  } else {
    return imageElement.cloneNode(false);
  }
}

DOM.getPositionFromEvent = function(event) {
    if (event.pageX) { /* Standards... */
        return {x: event.pageX, y: event.pageY};
    } else { /* ie ... */
        var pos = SIZE.getScrollBarPositions();
        return {x: event.clientX + pos.x, y: event.clientY + pos.y};
    }
}

DOM.getPosition = function(obj) {
    var left = obj.offsetLeft;
    var top = obj.offsetTop;
    while (obj.offsetParent) {
        obj = obj.offsetParent;
        left += obj.offsetLeft - obj.scrollLeft;
        top += obj.offsetTop - obj.scrollTop;
    }
    left += document.body.scrollLeft;
    top += document.body.scrollTop;
    return { x: left, y: top };
}


$ = function(element) {
  return DOM.get(element);
}

$$ = function(selector, fromElement) {
  return DOM.getElementsBySelector(selector, fromElement);
}
