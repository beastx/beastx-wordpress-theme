function createCaller(object, methodName, params) {
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

function createElement(tagName, attributes, childNodes) {
    var element = new Element(tagName, attributes);
    for (var i = 0; i < childNodes.length; ++i) {
        element.insert(childNodes[i]);
    }
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