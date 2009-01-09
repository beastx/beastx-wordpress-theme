var LIST = {};

LIST.indexOf = function(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return i;
        }
    }
    return -1;
}

LIST.setContains = function(arr, item, contains) {
    var index = LIST.indexOf(arr, item);
    var isContained = index != -1;
    if (isContained == contains) {
        return index;
    }
    if (contains) {
        arr.push(item);
        return arr.length - 1;
    } else {
        LIST.remove(arr, item);
        return false;
    }
}

LIST.clone = function(variable) {
    if (typeof variable != 'object') {
        return variable;
    }
    var item, out;
    if (VAR.isArray(variable)) {
        out = [];
    } else {
        out = {};
    }
    for (item in variable) {
        out[item] = LIST.clone(variable[item])
    }
    return out;
}

LIST.getKeys = function(object) {
    var keys = [];
    for (var item in object) {
        keys.push(item);
    }
    return keys;
}

LIST.filter = function(func, list) {
    var newList = [];
    for (var i = 0; i < list.length; ++i) {
        if (func(list[i])) {
            newList.push(list[i]);
        }
    }
    return newList;
}

LIST.remove = function(arr, item) {
    var index = LIST.indexOf(arr, item);
    if (index == -1) {
        return false;
    } else {
        arr.splice(index, 1);
        return true;
    }
}

LIST.forEach = function(list, callback) {
    for (var i = 0; i < list.length; ++i) {
        callback(list[i]);
    }
}

LIST.deleteAllIndex = function(array) {
  array = null;
  array = [];
  return array;
}
