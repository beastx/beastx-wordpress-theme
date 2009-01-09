var VAR = {};

VAR.whitespaceCharacters = " \t\n\r";

VAR.isUndefined = function(property) {
  return (typeof property == 'undefined');
}

VAR.isEmpty = function(s) {
    return ((s == null) || (s.length == 0))
}

VAR.isNumber = function(s, min, max) {
    var n;
    n = Number(s);
    if ((!VAR.isWhitespace(s)) && !isNaN(n) && (VAR.isUndefined(min) || (n >= min)) && (VAR.isUndefined(max) || (n <= max))) {
        return true;
    } else {
        return false;
    }
}

VAR.isHtmlElement = function(element) {
    if (element.appendChild) {
      return true;
    } else {
      return false;
    }
}


VAR.isWhitespace = function(s) {
    var i;
    // Is s empty?
    if (VAR.isEmpty(s)) {
        return true;
    }
    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.
    for (i = 0; i < s.length; i++) {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (VAR.whitespaceCharacters.indexOf(c) == -1) {
            return false;
        }
    }
    // All characters are whitespace.
    return true;
}

VAR.isArray = function(a) {
    return typeof a == 'object' && a.constructor == Array;
}

VAR.removeWhitespace = function(s) {
    var i, s2;
    for (i=0; i<s.length; i++) {
        var c = s.charAt(i);
        if (VAR.whitespaceCharacters.indexOf(c) == -1) {
            break;
        }
    }

    s=s.substr(i);

    for (i=s.length; i>0; i--) {
        var c = s.charAt(i);
        if (VAR.whitespaceCharacters.indexOf(c) == -1) {
            break;
        }
    }

    s = s.substr(0, i+1);
    return s;
}

VAR.addWord = function(str, word) {
    if (VAR.hasWord(str, word)) {
        return str;
    } else {
        return str + ' ' + word;
    }
}

VAR.splitBySpaces = function(str) {
    var words = [];
    var start = 0, end;
    while (true) {
        end = str.indexOf(' ', start);
        if (end != -1) {
            if (end > start) {
                words.push(str.substring(start, end));
            }
            start = end + 1;
        } else {
            if (str.length > start) {
                words.push(str.substring(start));
            }
            return words;
        }
    }
}

VAR.removeWord = function(str, word) {
    var list, i, str2 = '', c = 0;
    list = VAR.splitBySpaces(str);
    for (i = 0; i < list.length; i++) {
        if (list[i] != word) {
            if (c) {
                str2 += ' ';
            }
            str2 += list[i];
            c++;
        }
    }
    return str2;
}

VAR.hasWord = function(str, word) {
    var words = [];
    var start = 0, end;
    while (true) {
        end = str.indexOf(' ', start);
        if (end != -1) {
            if (end > start) {
                if (word == str.substring(start, end)) {
                    return true;
                }
            }
            start = end + 1;
        } else {
            if (str.length > start) {
                if (word == str.substring(start)) {
                    return true;
                }
            }
            return false;
        }
    }
}

VAR.endsWith = function(complete_string, part) {
    var pos = complete_string.length - part.length;
    if (complete_string.substr(pos) == part) {
        return complete_string.substr(0, pos);
    } else {
        return false;
    }
}

VAR.startsWith = function(complete_string, part) {
    if (complete_string.substr(0, part.length) == part) {
        return complete_string.substr(part.length);
    } else {
        return false;
    }
}

VAR.getFileNameFromUrl = function(url) {
    var start = url.lastIndexOf('/');
    if (start == -1) {
        return url;
    }
    var end = url.indexOf('?', start);
    if (end == -1) {
        return url.substring(start + 1);
    }
    return url.substring(start + 1, end);
}

VAR.removeAccents = function(text) {
    var accented = 'ŠšŸÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜİàáâãäåçèéêëìíîïñòóôõöøùúûüıÿ';
    var notAccented = 'SZszYAAAAAACEEEEIIIINOOOOOOUUUUYaaaaaaceeeeiiiinoooooouuuuyy';
    var out = "", chr, indexOf;
    for(var i = 0; i < text.length; i++) {
        var chr = text.charAt(i);
        indexOf = accented.indexOf(chr);
        if (indexOf != -1) {
            out += notAccented[indexOf];
        } else {
            out += chr;
        }
    }
    return out;
}

VAR.getPathHeadAndTail = function(path) {
    var index = path.indexOf('/');
    if (index == -1) {
        return [path, ''];
    } else {
        return [path.substr(0, index), path.substr(index + 1)];
    }
}

VAR.camelCase = function(value, toSelector) {
    if (!toSelector) {
        return value.replace(/\-(.)/g, function(m, l){return l.toUpperCase()});
    } else {
        return value.replace(/([A-Z])/g, '-$1').toLowerCase();
    }
}

VAR.isValidUrl = function(url) {
    var filter = /^(http|https|ftp):\/\//;
    return filter.test(url);
}