var FooterToggler = function() {
}

FooterToggler.prototype.init = function(elementId, showPosition, hidePosition) {
    this.element = DOM.get(elementId);
    Log(this.element);
    this.showPosition = showPosition;
    this.hidePosition = hidePosition;
    this.setVisible(false, false);
    this.addListeners();
}

FooterToggler.prototype.addListeners = function() {
    EVT.addEventListener(this.element, 'mouseover', EVT.createCaller(this, 'onMouseOver'));
    EVT.addEventListener(this.element, 'mouseout', EVT.createCaller(this, 'onMouseOut'));
}

FooterToggler.prototype.onMouseOver = function(event) {
    this.setVisible(true, true);
}

FooterToggler.prototype.onMouseOut = function(event) {
    this.setVisible(false, true);
}

FooterToggler.prototype.setVisible = function(visible, useAnimation) {
    this.visible= visible;
    Log(this.visible);
    if (this.visible) {
        this.show(useAnimation);
    } else {
        this.hide(useAnimation);
    }
}

FooterToggler.prototype.show = function(useAnimation) {
    if (useAnimation) {
        function show (element, toBottom) {
            var options = {
                time: 0.1,
                endBottom: 0,
                step: 1,
                curBottom: toBottom,
                onDone: function() {
                    Log(loop.step, 'done');
                }
            };
            element.style.bottom = options.curBottom + 'px';
            
            var loop = new EFF.Loop()
            loop.init({
                onStep: function(loop) {
                    options.curBottom += options.step;
                    element.style.bottom = options.curBottom + 'px';
                    if(options.onStep) {
                        options.onStep(loop);
                    }
                },
                onDone: function(loop) {
                    element.style.bottom = options.endBottom + 'px';
                    if(options.onDone) {
                        options.onDone(loop);
                    }
                }
            });
            loop.maxSteps = Math.floor((options.endBottom - options.curBottom) / options.step);
            loop.delay = (options.time / loop.maxSteps) * 1000;
            loop.run();
            return loop;
        }
        
        if (!this.showAnimation) {
            if (this.hideAnimation) {
                this.hideAnimation.cancel();
                this.hideAnimation = null;
            }
            this.showAnimation = show(this.element, this.hidePosition);
            Log(this.showAnimation);
        }
    } else {
        this.element.style.bottom = this.showPosition + 'px';
    }
}

FooterToggler.prototype.hide = function(useAnimation) {
    if (useAnimation) {
        function hide (element, toBottom) {
            var options = {
                time: 0.1,
                endBottom: toBottom,
                step: 1,
                curBottom: 0,
                onDone: function() {
                    Log(loop.step, 'done');
                }
            };
            element.style.bottom = options.curBottom + 'px';
            
            var loop = new EFF.Loop()
            loop.init({
                onStep: function(loop) {
                    options.curBottom -= options.step;
                    element.style.bottom = options.curBottom + 'px';
                    if(options.onStep) {
                        options.onStep(loop);
                    }
                },
                onDone: function(loop) {
                    element.style.bottom = options.endBottom + 'px';
                    if(options.onDone) {
                        options.onDone(loop);
                    }
                }
            });
            loop.maxSteps = Math.floor((options.curBottom - options.endBottom) / options.step);
            loop.delay = (options.time / loop.maxSteps) * 1000;
            loop.run();
            return loop;
        }
        
        if (!this.hideAnimation) {
            if (this.showAnimation) {
                this.showAnimation.cancel();
                this.showAnimation = null;
            }
            this.hideAnimation = hide(this.element, this.hidePosition);
        }
    } else {
        this.element.style.bottom = this.hidePosition + 'px';
    }
}