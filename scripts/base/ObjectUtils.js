var OBJ = {};

OBJ.update = function(originalObj, newObj) {
  if(typeof originalObj == 'undefined') {
    return newObj;
  }
  for( var item in newObj) {
    if(typeof originalObj[item] == 'undefined') {
      originalObj[item] = newObj[item];
    }
  }
  return originalObj;
}

OBJ.clone = function(fromObject) {
  var obj = {};
  for(var item in fromObject) {
    obj[item] = fromObject[item];
  }
  return obj;
}
