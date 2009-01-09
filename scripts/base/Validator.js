var VAL = {};

VAL.validator = function() {};

VAL.validator.prototype.init = function(useDefaultErrorHandler) {
    if (typeof useDefaultErrorHandler == 'undefined') {
        this.useDefaultErrorHandler = true;
    } else {
        this.useDefaultErrorHandler = useDefaultErrorHandler;
    }
    this.elements = [];
}

VAL.validator.prototype.add = function(name, element, labelElement, validators) {
    var newElementToValidate = {
        name : name,
        element : element,
        labelElement : labelElement,
        validators : validators ? validators : [],
        isValid : true
    };
    this.elements.push(newElementToValidate);
}

VAL.validator.prototype.validate = function() {
    var formIsValid = true;
    var fieldIsValid = true;
    for (var i = 0; i < this.elements.length; ++i) {
        this.elements[i].isValid = true;
        for (var j = 0; j < this.elements[i].validators.length; ++j) {
            if(!this.elements[i].validators[j].test(this.elements[i])) {
                this.onError(this.elements[i], this.elements[i].validators[j].errorMsg);
            } else {
                this.onValidate(this.elements[i]);
            }
        }
        if (formIsValid) {
            formIsValid = this.elements[i].isValid;
        }
    }
    return formIsValid;
}

VAL.validator.prototype.onValidate = function(element) {
    if(element.errorElement) {
        element.errorElement.parentNode.removeChild(element.errorElement);
        element.errorElement = null;
    }
}

VAL.validator.prototype.serializeForm = function() {
    var returnObj = {};
    for (var i = 0; i < this.elements.length; ++i) {
        returnObj[this.elements[i].name] = this.elements[i].element.value;
    }
    return returnObj;
}

VAL.validator.prototype.onError = function(element, errorMsg) {
    element.isValid = false;
    if (this.useDefaultErrorHandler) {
        if(element.errorElement) {
            element.errorElement.firstChild.nodeValue = errorMsg;
        } else {
            element.element.parentNode.insertBefore(
                element.errorElement = DOM.createElement('span', { 'class': 'errorMsg' }, [ errorMsg ]),
                element.element.nextSibling
            );
        }
    }
    if (this.onerror) {
        this.onerror(element, errorMsg);
    }
}

VAL.Required = function() {};
VAL.Required.prototype.init = function(errorMsg) {
    this.errorMsg = errorMsg ? errorMsg : 'Este campo es requerido.';
}
VAL.Required.prototype.test = function(elementToValidate) {
    return !(VAR.isEmpty(elementToValidate.element.value));
}


VAL.isEmail = function() {};
VAL.isEmail.prototype.init = function(errorMsg) {
    this.errorMsg = errorMsg ? errorMsg : 'El Email debe ser Valido.';
}
VAL.isEmail.prototype.test = function(elementToValidate) {
    var s = elementToValidate.element.value;
    if (VAR.isEmpty(s)) { return false; }
    if (VAR.isWhitespace(s)) { return false; }
    var i = 1;
    var sLength = s.length;
    while ((i < sLength) && (s.charAt(i) != "@")) {
        i++
    }
    if ((i >= sLength) || (s.charAt(i) != "@")) {
        return false;
    } else {
        i += 2;
    }
    while ((i < sLength) && (s.charAt(i) != ".")) {
        i++
    }
    if ((i >= sLength - 1) || (s.charAt(i) != ".")) {
        return false;
    } else {
        return true;
    }
}
