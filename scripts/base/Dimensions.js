var SIZE = {};

SIZE.getPosition = function(obj) {
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

SIZE.getScrollBarPositions = function() {
    var x, y;
    if (typeof document.documentElement != 'undefined' && typeof document.documentElement.scrollLeft != 'undefined') {
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
    } else if (typeof window.pageXOffset != 'undefined') {
        x = window.pageXOffset;
        y = window.pageYOffset;
    } else {
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
    }
    return {x: x, y: y};
}

SIZE.getWindowInnerSize = function() {
    var w, h;
    /*if (self.outerHeight) { // all except Explorer
        w = self.outerWidth;
        h = self.outerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
    } else if (document.body) { // other
        w = document.body.clientWidth;
        h = document.body.clientHeight;
    }*/
    //return {w: w, h: h};
    return SIZE.getSize(DOM.get('body'));
}

SIZE.positionIsInsideElement = function(position, element) {
    var elementPos = SIZE.getPosition(element);
    elementPos.x1 = elementPos.x + element.offsetWidth;
    elementPos.y1 = elementPos.y + element.offsetHeight;
    return position.x >= elementPos.x && position.x <= elementPos.x1 && position.y >= elementPos.y && position.y <= elementPos.y1;
}

SIZE.getSize = function(element) {
    return {
        w: element.offsetWidth,
        h: element.offsetHeight
    }
}

SIZE.getElementBoundaries = function(element) {
    var elementPos = SIZE.getPosition(element);
    return {
        x0: elementPos.x,
        x1: elementPos.x + element.offsetWidth,
        y0: elementPos.y,
        y1: elementPos.y + element.offsetHeight
    }
}

SIZE.getPositionInsideBoundaries = function(position, boundaries) {
    if (position.x >= boundaries.x0 && position.x <= boundaries.x1 && position.y >= boundaries.y0 && position.y <= boundaries.y1) {
        return {
            x: position.x - boundaries.x0,
            y: position.y - boundaries.y0
        };
    } else {
        return null;
    }
}

SIZE.getPositionInsideElement = function(position, element) {
    return SIZE.getPositionInsideBoundaries(position, SIZE.getElementBoundaries(element));
}

SIZE.mouseIsInside = function(element, event) {
    return SIZE.positionIsInsideElement(EVT.getPositionFromEvent(event), element);
}

SIZE.setHeight = function(element, newHeight) {
  element.style.height = newHeight + 'px';
}
