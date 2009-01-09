var REMOTE = {};

REMOTE.createXmlHttpRequest = function() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } else {
        throw "Can't create XMLHttpRequest";
    }
}

REMOTE.setHandlerToHttpRequest = function(request, onload, onerror) {
    request.onreadystatechange = function() {
        if (request.readyState != 4) {
            return;
        }
        try {
            if (request.status != 200) {
                if (onerror) {
                    onerror(request.status);
                }
                return;
            }
        } catch (e) {
            if (onerror) {
                onerror();
            }
            return;
        }
        onload(request);
    }
}

REMOTE.exec = function(phpFile, options) {
    var request = REMOTE.createXmlHttpRequest();
    var parameters = '';
    if (options.parameters) {
        parameters = JSN.serialize(options.parameters);
    } else {
        parameters = '{}';
    }
    if (!options.responseFormat) {
      options.responseFormat = 'obj';
    }
    request.open('POST', phpFile, true);
    request.setRequestHeader('Content-Type', 'text/javascript');

    REMOTE.setHandlerToHttpRequest(
        request,
        function() { REMOTE.onload(phpFile, request, options) },
        function() { REMOTE.onerror(phpFile, request, options) }
    );
    request.send(parameters);
}

REMOTE.onload = function(phpFile, request, options) {
  if (options.responseFormat == 'obj') {
    var obj = JSN.unserialize(request.responseText);
    if (obj.error) {
      REMOTE.onerror(obj.error, phpFile, options);
    } else {
      if(options.responseFormat == 'obj') {
        options.onload(obj.msg);
      }
    }
  } else {
    options.onload(request.responseText);
  }
}

REMOTE.update = function(element, phpFile, options) {
  if(!options) {
    options = {};
  }
  options.responseFormat = 'text';
  options.onload = function(result) {
    element.innerHTML = result;
  }
  REMOTE.exec(phpFile, options);
}

REMOTE.onerror = function(errorMsg, phpFile, options) {
  if(options.onerror) {
    options.onerror(errorMsg, phpFile, options);
  }
  Log(errorMsg + ' en ' + phpFile, 'AJAX Error');
}

REMOTE.periodicalUpdate = function(element, phpFile, options) {
  var every;
  if (options.every) {
    every = options.every * 1000;
  } else {
    every = 1000;
  }

  if(options.onStart) {
    options.onStart();
  }

  var object = {
    index: 0,
    duration: options.duration,
    every: every,
    onUpdate: options.onUpdate,
    onEnd: options.onEnd,
    element: element,
    phpFile: phpFile
  };

  REMOTE.onPeriodicalUpdate(object);
}

REMOTE.onPeriodicalUpdate = function(periodicalObject) {
  REMOTE.update(periodicalObject.element, periodicalObject.phpFile);
  if(!periodicalObject.duration || periodicalObject.duration > periodicalObject.index) {
    periodicalObject.index++;
    setTimeout(function() {
      if(periodicalObject.onUpdate) {
        periodicalObject.onUpdate(periodicalObject);
      }
      REMOTE.onPeriodicalUpdate(periodicalObject)
    }, periodicalObject.every);
  } else {
    if(periodicalObject.onEnd) {
      periodicalObject.onEnd(periodicalObject);
    }
  }
}
