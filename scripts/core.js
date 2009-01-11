function createCaller(object, methodName, params) {
    var f;
    if (params) {
        f = function() {
            if (!object[methodName]) {
                debugger;
            }
            return object[methodName].apply(object, params);
        }
    } else {
        f = function() {
            if (!object[methodName]) {
                debugger;
            }
            return object[methodName].apply(object, arguments);
        }
    }
    return f;
}

function createDOMElement(tagName, attributes, childNodes) {
    var element = new Element(tagName, attributes);
    for (var i = 0; i < childNodes.length; ++i) {
        element.insert(childNodes[i]);
    }
    return element;
}

function New(classRef, constructorArgs) {
    var obj = new classRef;
    obj.classRef = classRef;
    if (constructorArgs) {
        obj.init.apply(obj, constructorArgs);
    } else if (obj.init) {
        obj.init();
    }
    return obj;
}