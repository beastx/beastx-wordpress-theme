var COO = {};

COO.add = function(name, value, days, path) {
  if (typeof path == 'undefined') {
    path = document.location.pathname;
  }
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  }
  document.cookie = name + '=' + escape(value) + expires + '; path=' + path;
}

COO.remove = function(name) {
  COO.add(name, '', -1);
}

COO.get = function(name) {
  var nameEQ = name + '=';
  var cookieStrings = document.cookie.split(';');
  var cookieString;
  for (var i = 0; i < cookieStrings.length; ++i) {
    cookieString = cookieStrings[i];
    while (cookieString.charAt(0) == ' ') {
      cookieString = cookieString.substring(1);
    }
    if (cookieString.indexOf(nameEQ) == 0) {
      return unescape(cookieString.substring(nameEQ.length));
    }
  }
  return null;
}

COO.addInChunks = function(cookieName, data, maxCookieSize) {
  function generateId(length) {
    var id = '';
    for (var i = 0; i < length; ++i) {
      id += (Math.floor(Math.random() * 10)).toString();
    }
    return id;
  }

  var currentPart = 0;
  var id = generateId(7);

  function savePart() {
    COO.Cookies.add(
      cookieName + (currentPart > 0 ? currentPart : ''),
      id + ':' + data.substr(0, maxCookieSize - 8)
    );
    ++currentPart;
    data = data.substr(maxCookieSize - 8);
  }

  function saveEnd() {
    COO.Cookies.add(
      cookieName + (currentPart > 0 ? currentPart : ''),
      id + '-END'
    );
    ++currentPart;
  }

  while (data.length > 0) {
    savePart();
  }
  saveEnd();
}

COO.getInChunks = function(cookieName) {
  var currentPart = 0;
  var id;

  function getPart() {
          var data = COO.Cookies.get(cookieName + (currentPart > 0 ? currentPart : ''));
          if (!data) {
              throw "Invalid";
          }
          var currentId = data.substr(0, 7);
          if (!/^[0-9]+$/.test(currentId)) {
              throw "Invalid";
          }
          if (currentPart == 0) {
              id = currentId;
          } else {
              if (id != currentId) {
                  throw "Invalid";
              }
          }
    ++currentPart;
          var separator = data.substr(7, 1);
          if (separator == ':') {
              return data.substr(8);
          } else if (separator == '-' && data.substr(8) == 'END') {
              throw "End";
          } else {
              throw "Invalid";
          }
  }

  var data = '', part;
  while (true) {
          try {
              part = getPart();
          } catch (e) {
              if (e == 'Invalid') {
                  return '';
              } else if (e == 'End') {
                  return data;
              } else {
                  throw e;
              }
          }
          data += part;
  }
}
