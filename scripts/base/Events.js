var EVT = {};

EVT.eventListeners = {};
EVT.objEventListeners = [];

EVT.addEventToRegistry = function(element, eventString, handler, useCapture, eventRegistry) {
    if (!eventRegistry[eventString]) {
        eventRegistry[eventString] = [];
    }
    var item = {
        handler: handler,
        element: element,
        useCapture: useCapture
    };
    eventRegistry[eventString].push(item);
}

EVT.addEventListener = function(element, eventString, handler, useCapture, eventRegistry) {
    useCapture = !!useCapture;

    if (element.addEventListener) {
        element.addEventListener(eventString, handler, useCapture);
    } else {
        element.attachEvent("on" + eventString, handler);
    }
    if (eventRegistry && eventRegistry != EVT.eventListeners) {
        EVT.addEventToRegistry(element, eventString, handler, useCapture, eventRegistry);
    }
    EVT.addEventToRegistry(element, eventString, handler, useCapture, EVT.eventListeners);
}

EVT.addMouseEnterEventListener = function(element, handler) {
  if(BRW.isIE) {
    EVT.addEventListener(element, 'mouseenter', handler);
  } else {
    EVT.addEventListener(element, 'mouseover', function(event) {
      if (event.target && event.target == element && !DOM.hasChild(element, event.relatedTarget)) {
        var evento = new EVT.Event(false, false, event);
        evento.type = 'mouseenter';
        handler(evento);
      }
    });
  }
}

EVT.addMouseLeaveEventListener = function(element, handler) {
  if(BRW.isIE) {
    EVT.addEventListener(element, 'mouseleave', handler);
  } else {
    EVT.addEventListener(element, 'mouseout', function(event){
      if (event.relatedTarget && event.relatedTarget != element && !DOM.hasChild(element, event.relatedTarget)) {
        var evento = new EVT.Event(false, false, event);
        evento.type = 'mouseleave';
        handler(evento);
      }
    });
  }
}

EVT.removeMouseEnterEventListener = function(element, handler) {
  if(BRW.isIE) {
    EVT.removeEventListener(element, 'mouseenter', handler);
  } else {
    EVT.removeEventListener(element, 'mouseover', handler);
  }
}

EVT.removeMouseLeaveEventListener = function(element, handler) {
  if(BRW.isIE) {
    EVT.removeEventListener(element, 'mouseleave', handler);
  } else {
    EVT.removeEventListener(element, 'mouseout', handler);
  }
}

EVT.removeEventFromRegistry = function(element, eventString, handler, useCapture, eventRegistry) {
    var list = eventRegistry[eventString];
    var pos;
    for (var i = 0; i < list.length; ++i) {
        if (list[i].handler == handler && list[i].element == element && list[i].useCapture == useCapture) {
            pos = i;
            break;
        }
    }
    list.splice(pos, 1);
    if (list.length == 0) {
        delete eventRegistry[eventString];
    }
}

EVT.removeEventListener = function(element, eventString, handler, useCapture, eventRegistry) {
    useCapture = !!useCapture;
    if (eventRegistry && eventRegistry != EVT.eventListeners) {
        EVT.removeEventFromRegistry(element, eventString, handler, useCapture, eventRegistry);
    }
    EVT.removeEventFromRegistry(element, eventString, handler, useCapture, EVT.eventListeners);
    if (element.addEventListener) {
        element.removeEventListener(eventString, handler, useCapture);
    } else {
        element.detachEvent("on" + eventString, handler);
    }
}

EVT.removeAllEventListenersInGlobalRegistry = function() {
    EVT.removeAllEventListeners(EVT.eventListeners);
}

EVT.removeAllEventListeners = function(eventRegistry) {
    var eventString, list, item;
    for (eventString in eventRegistry) {
        list = eventRegistry[eventString];
        while (list.length > 0) {
            item = list[0];
            EVT.removeEventListener(item.element, eventString, item.handler, item.useCapture, eventRegistry);
        }
    }
}

EVT.getElementFromEvent = function(event) {
    if (event.target) {
        return event.explicitOriginalTarget;
    } else {
        return event.srcElement;
    }
}

EVT.getPositionFromEvent = function(event) {
    if (event.pageX) { /* Standards... */
        return {x: event.pageX, y: event.pageY};
    } else { /* ie ... */
        var pos = SIZE.getScrollBarPositions();
        return {x: event.clientX + pos.x, y: event.clientY + pos.y};
    }
}

EVT.getButtonFromEvent = function(event) {
    if (event.button == 2) {
        return 'right';
    } else if (BRW.isGecko) {
        if (event.button == 0) {
            return 'left';
        } else {
            return 'middle';
        }
    } else {
        if (event.button == 1) {
            return 'left';
        } else {
            return 'middle';
        }
    }
}

EVT.preventDefault = function(event) {
    if (!event) {
        event = window.event;
    }
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

EVT.stopPropagation = function(event) {
    if (!event) {
        event = window.event;
    }
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

EVT.cancelEvent = function(event) {
    EVT.preventDefault(event);
    EVT.stopPropagation(event);
}

EVT.addEventListener(window, 'unload', EVT.removeAllEventListenersInGlobalRegistry);

EVT.addObjEventListener = function(obj, element, eventString, handler, useCapture, objEventRegistry) {
    useCapture = !!useCapture;
    var pos = EVT.objEventListeners.length;
    var item = {
        obj: obj,
        element: element,
        eventString: eventString,
        handler: handler,
        useCapture: useCapture,
        internalHandler: new Function('event', "EVT.runObjEventHandler(event, " + pos + ")")
    };
    EVT.objEventListeners[pos] = item;
    EVT.addEventListener(element, eventString, item.internalHandler, useCapture);
    if (objEventRegistry) {
        objEventRegistry[pos] = item;
    }
}

EVT.removeObjEventListener = function(obj, element, eventString, handler, useCapture, objEventRegistry) {
    useCapture = !!useCapture;
    var list = EVT.objEventListeners, item, i;
    for (i = 0; i < list.length; i++) {
        item = list[i];
        if (item && item.obj == obj && item.element == element && item.eventString == eventString && item.handler == handler && item.useCapture == useCapture) {
            EVT.removeEventListener(element, eventString, item.internalHandler, useCapture);
            delete(list[i]);
            if (objEventRegistry) {
                delete objEventRegistry[i];
            }
            break;
        }
    }
}

EVT.removeAllObjEventListeners = function(objEventRegistry) {
    for (var i in objEventRegistry) {
        EVT.removeEventListener(objEventRegistry[i].element, objEventRegistry[i].eventString, objEventRegistry[i].internalHandler, objEventRegistry[i].useCapture);
        delete objEventRegistry[i];
    }
}

EVT.runObjEventHandler = function(event, number) {
    EVT.objEventListeners[number].handler.call(EVT.objEventListeners[number].obj, event);
}

EVT.createEventHandler = function(obj, methodName, parameter) {
    return function(event) {
        if (!event) {
            event = window.event;
        }
        obj[methodName].call(obj, event, parameter);
    }
}

EVT.createCaller = function(object, methodName, params) {
    var f;
    if (params) {
        f = function() {
            if (!object[methodName] && DEBUG_MODE) {
                debugger;
            }
            return object[methodName].apply(object, params);
        }
    } else {
        f = function() {
            if (!object[methodName] && DEBUG_MODE) {
                debugger;
            }
            return object[methodName].apply(object, arguments);
        }
    }
    if (App.DEBUG_MODE) {
        f.getExtraInfoToLog = function() {
            var data = {
                caller: {
                    object: object,
                    methodName: methodName,
                    callback: object[methodName]
                }
            };
            if (params) {
                data.caller.params = params;
            }
            return data;
        }
    }
    return f;
}

EVT.Event = function(canBubble, canCapture, properties) {
  if (typeof canBubble == 'undefined') {
    canBubble = true;
  }
  if (typeof canCapture == 'undefined') {
    canCapture = false;
  }
    this.propagationStopped = false;
    this.defaultPrevented = false;
    this.dispatcher = null;
    this.canCapture = canCapture;
    this.canBubble = canBubble;
    if (properties) {
      for (property in properties) {
        this[property] = properties[property];
      }
  }
}

EVT.Event.prototype.stopPropagation = function() {
    this.propagationStopped = true;
}

EVT.Event.prototype.preventDefault = function() {
    this.defaultPrevented = true;
}

EVT.EventManager = function() {
}

EVT.EventManager.prototype.init = function(ownerObj, parentEventManager) {
    this.captureHandlers = {};
    this.bubbleHandlers = {};
    this.ownerObj = ownerObj;
    if (parentEventManager) {
      this.parent = parentEventManager;
    }
}

EVT.EventManager.prototype.setParent = function(parentEventManager) {
  this.parent = parentEventManager;
}

EVT.EventManager.prototype.addListener = function(typeString, handler, useCapture) {
  var handlers;
  if (useCapture) {
    handlers = this.captureHandlers;
  } else {
    handlers = this.bubbleHandlers;
  }
    if (!handlers[typeString]) {
        handlers[typeString] = [];
    }
    handlers[typeString].push(handler);
}

EVT.EventManager.prototype.removeListener = function(typeString, handler, useCapture) {
  var handlers;
  if (useCapture) {
    handlers = this.captureHandlers;
  } else {
    handlers = this.bubbleHandlers;
  }
    LIST.remove(handlers[typeString], handler);
}

EVT.EventManager.prototype.runEventListeners = function(typeString, eventObj, useCapture) {
  var handlers;
  if (useCapture) {
    handlers = this.captureHandlers;
  } else {
    handlers = this.bubbleHandlers;
  }
    if (handlers[typeString]) {
        for (var i = 0; i < handlers[typeString].length; ++i) {
            handlers[typeString][i](eventObj);
        }
    }
}

EVT.EventManager.prototype.dispatchEvent = function(typeString, eventObj) {
  if (!eventObj) {
    eventObj = new EVT.Event;
  }
  if (!eventObj.type) {
    eventObj.type = typeString;
  }
  if (!eventObj.dispatcher) {
    eventObj.dispatcher = this.ownerObj;
  }
  var propagationList = [], i, eventManager = this.parent;
  while (eventManager) {
    propagationList.push(eventManager);
    eventManager = eventManager.parent;
  }
  if (eventObj.canCapture) {
    for (i = propagationList.length - 1; i >= 0; --i) {
      propagationList[i].runEventListeners(typeString, eventObj, true);
        if (eventObj.propagationStopped) {
            return eventObj;
        }
    }
  }
  this.runEventListeners(typeString, eventObj, true);
  this.runEventListeners(typeString, eventObj, false);
  if (eventObj.canBubble) {
    for (i = 0; i < propagationList.length; ++i) {
      propagationList[i].runEventListeners(typeString, eventObj, false);
        if (eventObj.propagationStopped) {
            return eventObj;
        }
    }
  }
  return eventObj;
}
