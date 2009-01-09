var SDR = {
  zIndex: 9999
};

SDR.Drag = function(element, handlerElement, dontAddListeners, minDiff) {
  this.element = element;
  this.handlerElement = handlerElement;

  this.cursor = 'pointer';
  this.onDragCursor = 'move';

  if(!handlerElement) {
    this.element.style.cursor = this.cursor;
  } else {
    this.handlerElement.style.cursor = this.cursor;
  }
  this.dragging = false;
  this.minDiff = minDiff;
  this.minDiff = minDiff ? minDiff : 2;

  this.registeredIframes = [];
    if (!dontAddListeners) {
      this.addMouseDownListeners();
    }
  if (BRW.isGecko) {
    var me = this;
    this.onIframeKeyDown = function(event) {
      me.onKeyDown(event);
    }
    this.onIframeMouseMove = function(event) {
      me.onMouseMove(event);
    }
    this.onIframeMouseUp = function(event) {
      me.onMouseUp(event);
    }
  }
}

SDR.Drag.prototype.setHandler = function(element) {
  this.removeMouseDownListeners();
  this.handlerElement = element;
  this.element.style.cursor = 'default';
  this.handlerElement.style.cursor = this.cursor;
  this.addMouseDownListeners();
}

SDR.Drag.prototype.addMouseDownListeners = function() {
  if(this.handlerElement) {
    EVT.addObjEventListener(this, this.handlerElement, 'mousedown', this.onMouseDown);
  } else {
    EVT.addObjEventListener(this, this.element, 'mousedown', this.onMouseDown);
  }
}

SDR.Drag.prototype.removeMouseDownListeners = function() {
  if(this.handlerElement) {
    EVT.removeObjEventListener(this, this.handlerElement, 'mousedown', this.onMouseDown);
  } else if(this.element) {
    EVT.removeObjEventListener(this, this.element, 'mousedown', this.onMouseDown);
  }
}

SDR.Drag.prototype.createPositionObject = function() {
  return {
    element: this.element,
    startPosition: this.startPosition,
    currentPosition: this.currentPosition,
    startDraggingOffset: { x: this.startDraggingOffsetX, y: this.startDraggingOffsetY },
    relativePosition: { x: this.currentPosition.x - this.startPosition.x, y: this.currentPosition.y - this.startPosition.y }
  };
}

SDR.Drag.prototype.onMouseDown = function(event) {
  if (EVT.getButtonFromEvent(event) != 'left') {
    return;
  }
  this.startPosition = EVT.getPositionFromEvent(event);
  var elementPos = SIZE.getPosition(this.element);
  this.startDraggingOffsetX = elementPos.x - this.startPosition.x;
  this.startDraggingOffsetY = elementPos.y - this.startPosition.y;
  EVT.addObjEventListener(this, document, 'mousemove', this.onMouseMove);
  EVT.addObjEventListener(this, document, 'mouseup', this.onMouseUp);

  if (BRW.isGecko) {
    var iframes = [];
    for (var i = 0; i < window.frames.length; ++i) {
      EVT.addEventListener(window.frames[i], 'mousemove', this.onIframeMouseMove);
      EVT.addEventListener(window.frames[i], 'mouseup', this.onIframeMouseUp);
      iframes.push(window.frames[i]);
    }
    this.registeredIframes = iframes;
  }
  EVT.preventDefault(event);
}

SDR.Drag.prototype.findOwnerIframe = function(iframeDocument) {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; ++i) {
        if (iframes[i].contentWindow.document == iframeDocument) {
            return iframes[i];
        }
    }
    return null;
}

SDR.Drag.prototype.onMouseMove = function(event) {
  this.currentPosition = EVT.getPositionFromEvent(event);
  var target = EVT.getElementFromEvent(event);
  if (target.ownerDocument != document) {
    var iframe = this.findOwnerIframe(target.ownerDocument);
    var framePosition = SIZE.getPosition(iframe);
    this.currentPosition.x += framePosition.x;
    this.currentPosition.y += framePosition.y;
  }
  var positionObj = this.createPositionObject();
  var xDiff = positionObj.relativePosition['x'];
  var yDiff = positionObj.relativePosition['y'];
  if (!this.dragging && (xDiff > this.minDiff || xDiff < -this.minDiff || yDiff > this.minDiff || yDiff < -this.minDiff)) {
    if(this.handlerElement) {
      this.handlerElement.style.cursor = this.onDragCursor;
    } else {
      this.element.style.cursor = this.onDragCursor;
    }
    this.dragging = true;
    EVT.addObjEventListener(this, document, 'keydown', this.onKeyDown);
    if (BRW.isGecko) {
      var iframes = this.registeredIframes;
      for (var i = 0; i < iframes.length; ++i) {
        EVT.addEventListener(iframes[i], 'keydown', this.onIframeKeyDown);
      }
    }
    if (this.ondragstart) {
      this.ondragstart(positionObj);
    }
    SDR.zIndex++;
    this.element.style.zIndex = SDR.zIndex;
    if(this.opacityOnDrag) {
      DOM.setOpacity(this.element, this.opacityOnDrag);
    }
  }
  if(this.dragging) {
    if(this.ondragmove) {
      this.ondragmove(positionObj);
    }
    if(!this.updateElementPositionCallback) {
      this.updateElementPosition(positionObj);
    } else {
      this.updateElementPositionCallback(positionObj);
    }
  }
  EVT.stopPropagation(event);
  EVT.preventDefault(event);
}

SDR.Drag.prototype.onKeyDown = function(event) {
  if (event.keyCode == 27) {
    var positionObj = this.createPositionObject();
    if (this.ondragcancel) {
      this.ondragcancel(positionObj);
    }
    this.endDrag(positionObj);
    EVT.stopPropagation(event);
    EVT.preventDefault(event);
  }
}

SDR.Drag.prototype.onMouseUp = function(event) {
  if (EVT.getButtonFromEvent(event) != 'left') {
    return;
  }
  if (!this.dragging) {
    this.removeListeners();
    return;
  }
  var positionObj = this.createPositionObject();
  if (this.ondrop) {
    this.ondrop(positionObj);
  }
  this.endDrag(positionObj);
  EVT.stopPropagation(event);
  EVT.preventDefault(event);
}

SDR.Drag.prototype.updateElementPosition = function(dragEvent) {
  if(!this.limitPositionObj) {
    this.element.style.left = dragEvent.currentPosition.x + dragEvent.startDraggingOffset.x + 'px';
    this.element.style.top = dragEvent.currentPosition.y + dragEvent.startDraggingOffset.y + 'px';
  } else {
    var posX = dragEvent.currentPosition.x + dragEvent.startDraggingOffset.x;
    var posY = dragEvent.currentPosition.y + dragEvent.startDraggingOffset.y;
    if(this.limitPositionObj.x0 <= posX && this.limitPositionObj.x1 >= posX + this.element.offsetWidth) {
      this.element.style.left = posX + 'px';
    } else {
      if(!this.handlerElement) {
        if(posX - this.limitPositionObj.x0 > this.limitPositionObj.x1 - posX + this.element.offsetWidth) {
          this.element.style.left = this.limitPositionObj.x1 - this.element.offsetWidth + 'px';
        } else {
          this.element.style.left = this.limitPositionObj.x0 + 'px';
        }
      }
    }
    if(this.limitPositionObj.y0 <= posY && this.limitPositionObj.y1 >= posY + this.element.offsetHeight) {
      this.element.style.top = posY + 'px';
    } else {
      if(!this.handlerElement) {
        if(posY - this.limitPositionObj.y0 > this.limitPositionObj.y1 - posY + this.element.offsetHeight) {
          this.element.style.top = this.limitPositionObj.y1 - this.element.offsetHeight + 'px';
        } else {
          this.element.style.top = this.limitPositionObj.y0 + 'px';
        }
      } else {
        if(posY - this.limitPositionObj.y0 > this.limitPositionObj.y1 - posY + this.element.offsetHeight) {
          this.element.style.top = this.limitPositionObj.y1 - this.element.offsetHeight + 'px';
        } else {
          this.element.style.top = this.limitPositionObj.y0 + 'px';
        }
      }
    }
  }
}

SDR.Drag.prototype.endDrag = function() {
  if (this.dragging) {
    EVT.removeObjEventListener(this, document, 'keydown', this.onKeyDown);
    if (BRW.isGecko) {
      var iframes = this.registeredIframes;
      for (var i = 0; i < iframes.length; ++i) {
        try { // See removeListeners
          EVT.removeEventListener(iframes[i], 'keydown', this.onIframeKeyDown);
        } catch (e) {
        }
      }
    }
    if(this.handlerElement) {
      this.handlerElement.style.cursor = this.cursor;
    } else {
      this.element.style.cursor = this.cursor;
    }
    if(this.opacityOnDrag) {
      DOM.setOpacity(this.element, 1);
    }
    if (this.ondragend) {
      this.ondragend(this.createPositionObject());
    }
    this.dragging = false;
  }
  this.removeListeners();
}

SDR.Drag.prototype.setOpacityOnDrag = function(opacity) {
  this.opacityOnDrag = opacity;
}

SDR.Drag.prototype.setLimits = function(limitPositionObjOrElement) {
  if(VAR.isHtmlElement(limitPositionObjOrElement)) {
    this.limitPositionObj = SIZE.getElementBoundaries(limitPositionObjOrElement);
  } else {
    this.limitPositionObj = limitPositionObjOrElement;
  }
}

SDR.Drag.prototype.setCursor = function(cursor, onDragCursor) {
  if(cursor) {
    this.cursor = cursor;
  }
  if(onDragCursor) {
    this.onDragCursor = onDragCursor;
  }
  if(!this.handlerElement) {
    this.element.style.cursor = this.cursor;
  } else {
    this.handlerElement.style.cursor = this.cursor;
  }
}

SDR.Drag.prototype.removeListeners = function() {
  EVT.removeObjEventListener(this, document, 'mousemove', this.onMouseMove);
  EVT.removeObjEventListener(this, document, 'mouseup', this.onMouseUp);

  if (BRW.isGecko) {
    var iframes = this.registeredIframes;
    for (var i = 0; i < iframes.length; ++i) {
      try { // This is necessary since the iframes sometimes lose their event handlers and throw exceptions
        EVT.removeEventListener(iframes[i], 'mousemove', this.onIframeMouseMove);
      } catch (e) {
      }
      try {
        EVT.removeEventListener(iframes[i], 'mouseup', this.onIframeMouseUp);
      } catch (e) {
      }
    }
    this.registeredIframes = [];
  }
}
