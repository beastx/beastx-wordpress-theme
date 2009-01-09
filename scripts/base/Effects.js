var EFF = new function() {
}

EFF.Loop = function() {};

EFF.Loop.prototype.init = function(objOptions) {
  for(var option in objOptions) {
    this[option] = objOptions[option];
  }
  this.step = 0;
  this.Timeout = true;
}

EFF.Loop.prototype.run = function() {
  this.step++;
  if(this.onStep && typeof this.onStep == 'function') {
    this.onStep(this);
  }
  if(this.maxSteps > this.step) {
    var me = this;
    if (!this.canceled) {
      this.Timeout = setTimeout(function() { me.run() }, this.delay);
    }
  } else if(this.onDone && typeof this.onDone == 'function') {
    this.onDone(this);
  }
}

EFF.Loop.prototype.cancel = function() {
  this.canceled = true;
  clearTimeout(this.Timeout);
  if(this.onCancel) {
    this.onCancel();
  }
}

EFF.Highlight = function(element, options) {
  options = OBJ.update(options, {
      time: 0.05,
      startColor: "ffff99",
      endColor: COLOR.fromBackground(element),
      numSteps: 20
  });

  var startRgb = COLOR.hex2rgb(options.startColor);
  var endRgb = COLOR.hex2rgb(options.endColor);
  var rgbDelta = {
      r: endRgb.r - startRgb.r,
      g: endRgb.g - startRgb.g,
      b: endRgb.b - startRgb.b
  };
  var rgbSteps = {
      r: rgbDelta.r / options.numSteps,
      b: rgbDelta.b / options.numSteps,
      g: rgbDelta.g / options.numSteps
  }
  var curColor = OBJ.clone(startRgb);

  var loop = new EFF.Loop();
  loop.init({
      onStep: function(loop) {
          curColor = {
              r: curColor.r + rgbSteps.r,
              g: curColor.g + rgbSteps.g,
              b: curColor.b + rgbSteps.b
          }
          element.style.backgroundColor = COLOR.rgb2hex(curColor.r, curColor.g, curColor.b);
          if(options.onStep) {
            options.onStep(loop);
          }
      },
      onDone: function(loop) {
          element.style.backgroundColor = options.endColor;
          if(options.onDone) {
            options.onDone(loop);
          }
      }
  });

  loop.maxSteps = options.numSteps;
  loop.delay = (options.time / options.numSteps) * 1000;
  loop.run();
}

EFF.fadeIn = function(element, options) {
  var curOpacity = 0.0;
  options = OBJ.update(options, {
      time: 1,
      endOpacity: 1.0,
      step: .05
  });
  DOM.setOpacity(element, curOpacity);
  DOM.setStyle(element, {display: ''});
  var loop = new EFF.Loop()
  loop.init({
      onStep: function(loop) {
          curOpacity += options.step;
          DOM.setOpacity(element, curOpacity);
          if(options.onStep) {
            options.onStep(loop);
          }
      },
      onDone: function(loop) {
          DOM.setOpacity(element, options.endOpacity);
          if(options.onDone) {
            options.onDone(loop);
          }
      }
  });
  loop.maxSteps = Math.floor((options.endOpacity - curOpacity) / options.step);
  loop.delay = (options.time / loop.maxSteps) * 1000;
  loop.run();
}

EFF.fadeOut = function(element, options) {
  var curOpacity = DOM.getOpacity(element) || 1.0;
  options = OBJ.update(options, {
      time: .5,
      endOpacity: 0.0,
      step: .05
  });
  var loop = new EFF.Loop();
  loop.init({
      onStep: function(loop) {
          DOM.setOpacity(element, curOpacity);
          curOpacity -= options.step;
          if(options.onStep) {
            options.onStep(loop);
          }
      },
      onDone: function(loop) {
        DOM.setOpacity(element, options.endOpacity);
        DOM.setStyle(element, {display: 'none'});
        if(options.onDone) {
            options.onDone(loop);
          }
      }

  });
  loop.maxSteps = Math.floor((curOpacity - options.endOpacity) / options.step);
  loop.delay = (options.time / loop.maxSteps) * 1000;
  loop.run();
}

EFF.slideUp = function(element, options) {
  var curHeight = SIZE.getSize(element).h;
  options = OBJ.update(options, {
      time: 0.001,
      endHeight: 0,
      step: 3,
      startHeight: curHeight
  });
  SIZE.setHeight(element, options.startHeight);
  var loop = new EFF.Loop()
  loop.init({
      onStep: function(loop) {
          curHeight -= options.step;
          SIZE.setHeight(element, curHeight);
          if(options.onStep) {
            options.onStep(loop);
          }
      },
      onDone: function(loop) {
          SIZE.setHeight(element, options.endHeight);
          if(options.onDone) {
            options.onDone(loop);
          }
          DOM.setStyle(element, {visibility: 'hidden'});
      }
  });
  loop.maxSteps = Math.floor((options.startHeight - options.endHeight) / options.step);
  loop.delay = (options.time / loop.maxSteps) * 1000;
  loop.run();
}

EFF.slideDown = function(element, options) {
  var curHeight = SIZE.getSize(element).h;
  options = OBJ.update(options, {
      time: 0.001,
      endHeight: 100,
      step: 3,
      startHeight: curHeight
  });
  SIZE.setHeight(element, options.startHeight);
  DOM.setStyle(element, {visibility: 'visible'});
  var loop = new EFF.Loop()
  loop.init({
      onStep: function(loop) {
          curHeight += options.step;
          SIZE.setHeight(element, curHeight);
          if(options.onStep) {
            options.onStep(loop);
          }
      },
      onDone: function(loop) {
          SIZE.setHeight(element, options.endHeight);
          if(options.onDone) {
            options.onDone(loop);
          }
      }
  });
  loop.maxSteps = Math.floor((options.endHeight - options.startHeight) / options.step);
  loop.delay = (options.time / loop.maxSteps) * 1000;
  loop.run();
}

EFF.blink = function(element, options) {
  options = OBJ.update(options, {
      time: 0.4,
      numSteps: 5,
      className: 'blink'
  });
  var loop = new EFF.Loop();
  loop.init({
      onStep: function(loop) {
          DOM.toggleClass(element, options.className);
          if(options.onStep) {
            options.onStep(loop);
          }
      },
      onDone: function(loop) {
          DOM.removeClass(element, options.className);
          if(options.onDone) {
            options.onDone(loop);
          }
      }
  });
  loop.maxSteps = options.numSteps;
  loop.delay = (options.time / options.numSteps) * 1000;
  loop.run();
}
