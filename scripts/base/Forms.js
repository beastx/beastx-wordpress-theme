var FRM = {};

FRM.getRadioValue = function(name) {
    var elements = document.getElementsByName(name);
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
    return false;
}

FRM.getTextInputSelection = function(element) {
    if (BRW.isIE) {
        var start = null, end = null;
        var selection = document.selection.createRange();

        var elementSelection;
        if (element.tagName.toLowerCase() == 'textarea') {
            elementSelection = selection.duplicate();
            elementSelection.moveToElementText(element);
        } else { // input type=text
            elementSelection = element.createTextRange();
        }
        try {
            for (var i = 0; i <= element.value.length; i++) {
                if (i > 0) {
                    elementSelection.move('character');
                }
                if (elementSelection.compareEndPoints('StartToStart', selection) == 0) {
                    start = i;
                    if (end !== null) {
                        break;
                    }
                }
                if (elementSelection.compareEndPoints('StartToEnd', selection) == 0) {
                    end = i;
                    if (start !== null) {
                        break;
                    }
                }
            }
        } catch (e) { // if the selection is collapsed explorer throws an exception
        }
        return [start === null ? 0 : start, end === null ? 0 : end];
    } else if (element.setSelectionRange) {
        return [element.selectionStart, element.selectionEnd];
    }
}

FRM.setTextInputSelection = function(element, range) {
    if (BRW.isIE) {
        var selection = element.createTextRange();
        var i;
        var distance = element.value.length - range[1];
        if (distance < 0) {
            distance = 0;
        }
        for (i = 1; i <= distance; i++) {
            selection.moveEnd('character', -1);
        }
        distance = range[0];
        if (distance > element.value.length) {
            distance = element.value.length;
        }
        for (i = 1; i <= distance; i++) {
            selection.moveStart('character');
        }
        selection.select();
    } else if (element.setSelectionRange) {
        element.selectionStart = range[0];
        element.selectionEnd = range[1];
    }
}
