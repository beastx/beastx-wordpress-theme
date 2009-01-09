var FOC = {};

FOC.focusNextElement = function(element, previous) {
    var nextElement = FOC.getNextFocusElement(element, previous);
    if (nextElement) {
        nextElement.focus();
    }
}

FOC.getNextFocusElement = function(element, previous) {
    var elements = document.getElementsByTagName('*');
    var i, element_i;
    for (i = 0; i < elements.length; i++) {
        if (elements[i] == element) {
            element_i = i;
            break;
        }
    }
    var tag, ee;

    function loop(i) {
        ee = elements[i];
        if (ee.nodeType == 1 && ee.style.display != 'none') {
            tag = ee.tagName.toLowerCase();
            if ((tag == 'input' && ee.type != 'hidden') || (tag == 'button' || tag == 'iframe' || tag == 'a' || tag == 'select' || tag == 'textarea')) {
                if (DOM.elementIsVisible(ee)) {
                    if (typeof ee.focus == 'function') {
                        return ee;
                    }
                }
            }
        }
        return false;
    }

    var temp;
    if (element_i) {
        if (previous) {
            for (i = element_i - 1; i >= 0; i--) {
                temp = loop(i);
                if (temp) {
                    return temp;
                }
            }
        } else {
            for (i = element_i + 1; i < elements.length; i++) {
                temp = loop(i);
                if (temp) {
                    return temp;
                }
            }
        }
    }
}

if (!BRW.isGecko) {
    FOC.addFocusInListener = function(element, callback) {
        EVT.addEventListener(element, 'focusin', callback);
    }

    FOC.addFocusOutListener = function(element, callback) {
        EVT.addEventListener(element, 'focusout', callback);
    }

    FOC.removeFocusInListener = function(element, callback) {
        EVT.removeEventListener(element, 'focusin', callback);
    }

    FOC.removeFocusOutListener = function(element, callback) {
        EVT.removeEventListener(element, 'focusout', callback);
    }
} else {
    FOC.addFocusInListener = function(element, callback) {
        if (FOC.focusElements.length == 0) {
            FOC.addListeners();
        }
        var obj = FOC.getOrCreateFocusedElementObject(element);
        obj.focusInCallback = callback;
    }

    FOC.addFocusOutListener = function(element, callback) {
        if (FOC.focusElements.length == 0) {
            FOC.addListeners();
        }
        var obj = FOC.getOrCreateFocusedElementObject(element);
        obj.focusOutCallback = callback;
    }

    FOC.removeFocusInListener = function(element, callback) {
        var i = FOC.getFocusedElementIndex(element);
        if (i === null) {
            return;
        }
        var obj = FOC.focusElements[i];
        if (obj.focusInCallback) {
            delete obj.focusInCallback; // Remove the focusIn callback
        }
        FOC.cleanupFocusedElementObject(i);
    }

    FOC.removeFocusOutListener = function(element, callback) {
        var i = FOC.getFocusedElementIndex(element);
        if (i === null) {
            return;
        }
        var obj = FOC.focusElements[i];
        if (obj.focusOutCallback) {
            delete obj.focusOutCallback; // Remove the focusOut callback
        }
        FOC.cleanupFocusedElementObject(i);
    }

    FOC.registerVirtualChild = function(parent, child) {
       var childObj = FOC.getOrCreateFocusedElementObject(child);
       var parentObj = FOC.getOrCreateFocusedElementObject(parent);
       childObj.virtualParent = parentObj;
       parentObj.virtualChild = childObj;
    }

    FOC.unregisterVirtualChild = function(parent, child) {
        var parentIndex = FOC.getFocusedElementIndex(parent);
        if (parentIndex) {
            var parentObj = FOC.focusElements[parentIndex];
            delete parentObj.virtualChild;
            FOC.cleanupFocusedElementObject(parentIndex);
        }
        var childIndex = FOC.getFocusedElementIndex(child);
        if (childIndex) {
            var childObj = FOC.focusElements[childIndex];
            delete childObj.virtualParent;
            FOC.cleanupFocusedElementObject(childIndex);
        }
    }

    FOC.isFocused = function(element) {
        return FOC.currentFocus && DOM.contains(element, FOC.currentFocus);
    }

    // - - - Everything else is private - - -

    // Iframes which have event listeners added
    FOC.iframes = [];

    // Iframes' windows (must be kept separate since the windows get disconnected
    //   from the iframes when the iframe is removed from the document)
    FOC.iframeWindows = [];

    FOC.getFocusedElementIndex = function(element) {
        for (var i = 0; i < FOC.focusElements.length; ++i) {
            if (FOC.focusElements[i].element == element) {
                return i;
            }
        }
        return null;
    }

    FOC.getOrCreateFocusedElementObject = function(element) {
        var i = FOC.getFocusedElementIndex(element);
        var obj;
        if (i === null) {
            obj = {
                element: element
            }
            FOC.focusElements.push(obj);
        } else {
            obj = FOC.focusElements[i];
        }
        return obj;
    }

    FOC.cleanupFocusedElementObject = function(focusElementIndex) {
        var obj = FOC.focusElements[focusElementIndex];
        // If the object isn't used any more remove it
        if (!obj.focusInCallback && !obj.focusOutCallback && !obj.virtualParent && !obj.virtualChild) {
            FOC.focusElements.splice(focusElementIndex, 1); // Nothing is left, remove the item in the focusElements list
            if (FOC.focusElements.length == 0) {
                FOC.removeListeners();
            }
        }
    }

    FOC.addListeners = function() {
        EVT.addEventListener(document, 'focus', FOC.onFocus, true);
        EVT.addEventListener(document, 'blur', FOC.onBlur, true);
    }

    FOC.removeListeners = function() {
        EVT.removeEventListener(document, 'focus', FOC.onFocus, true);
        EVT.removeEventListener(document, 'blur', FOC.onBlur, true);
    }

    FOC.focusElements = [];
    FOC.currentFocus = null;

    FOC.onFocus = function(event) {
        function findOwnerIframe(iframeDocument) {
            var iframes = document.getElementsByTagName('iframe');
            for (var i = 0; i < iframes.length; ++i) {
                if (iframes[i].contentWindow.document == iframeDocument) {
                    return iframes[i];
                }
            }
            return null;
        }

        var element = EVT.getElementFromEvent(event);

        if (element.ownerDocument != document) {
            element = findOwnerIframe(element);
            if (element == null) {
                return;
            }
        }

        if (FOC.currentFocus == element) {
            return;
        }
        FOC.currentFocus = element;

        var focusElementObj;
        var elementsToBlur = [];
        var elementsToFocus = [];

        var isContainer = FOC.getContainsFunction(element);

        var i;
        for (i = 0; i < FOC.focusElements.length; ++i) {
            focusElementObj = FOC.focusElements[i];
            if (isContainer(focusElementObj.element)) {
                if (!focusElementObj.focused) {
                    focusElementObj.focused = true;
                    elementsToFocus.push(focusElementObj);
                }
            } else {
                if (focusElementObj.focused) {
                    focusElementObj.focused = false;
                    elementsToBlur.push(focusElementObj);
                }
            }
        }

        function focusElement(elementObj, callbackName) {
            if (elementObj[callbackName]) {
                elementObj[callbackName]();
            }
        }

        for (i = 0; i < elementsToBlur.length; ++i) {
            focusElement(elementsToBlur[i], 'focusOutCallback');
        }

        for (i = 0; i < elementsToFocus.length; ++i) {
            focusElement(elementsToFocus[i], 'focusInCallback');
        }
    }

    // Returns a function which will test if an element contains (probably virtually) an element
    //  It not only follows the DOM, it also takes care of virtual parents
    //   (if an element is a virtual parent of another element is is inside it, disregarding their position in the dom)
    FOC.getContainsFunction = function(containedElement) {
        function contains(element, leafElements) {
            for (var i = 0; i < leafElements.length; ++i) {
                if (element == leafElements[i] || DOM.contains(element, leafElements[i])) {
                    return true;
                }
            }
            return false;
        }

        // Contained leaf elements are the elements in the tree which are either:
        //  - the containedElement
        //  - virtual parents of other contained leaf elements
        function getLeafContainedElements() {
            function getChildrenWithVirtualParents() {
                var candidateChildren = [];
                for (var i = 0; i < FOC.focusElements.length; ++i) {
                    focusElementObj = FOC.focusElements[i];
                    if (focusElementObj.virtualParent) {
                        candidateChildren.push(focusElementObj);
                    }
                }
                return candidateChildren;
            }

            var candidateChildren = getChildrenWithVirtualParents();
            var leafElements = [containedElement];

            var virtualChild;

            for (var i = 0; i < candidateChildren.length; ++i) {
                virtualChild = candidateChildren[i];
                if (contains(virtualChild.element, leafElements)) {
                    candidateChildren.splice(i, 1);
                    i = 0;
                    leafElements.push(virtualChild.virtualParent.element);
                }
            }
            return leafElements;
        }

        var leafElements = getLeafContainedElements();

        return function(container) {
            return contains(container, leafElements);
        }
    }

    // Add focus listeners to new iframes and remove them from the old ones to prevent leaks
    FOC.updateIframeListeners = function() {
        for (var i = 0; i < FOC.iframes.length; ++i) {
            if (!DOM.contains(document, FOC.iframes[i])) {
                try {
                    EVT.removeEventListener(FOC.iframeWindows[i], 'focus', FOC.onFocus, true);
                } catch (e) { // This will trigger an exception if the iframe is not there any more
                }
                FOC.iframes.splice(i, 1);
                FOC.iframeWindows.splice(i, 1);
                --i;
            }
        }

        var currentIframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < currentIframes.length; ++i) {
            if (FOC.iframes.indexOf(currentIframes[i]) == -1) { // It was not there before
                FOC.iframes.push(currentIframes[i]);
                FOC.iframeWindows.push(currentIframes[i].contentWindow);
                EVT.addEventListener(currentIframes[i].contentWindow, 'focus', FOC.onFocus, true);
            }
        }
    }

    FOC.onBlur = function(event) {
        var element = EVT.getElementFromEvent(event);
        if (element == document) {
            FOC.updateIframeListeners();
        }
    }
}
