var FooterToggler = function() {
}

FooterToggler.prototype.init = function(elementId, footerHeaderHeight) {
    this.element = $(elementId);
    this.hidePosition = -(this.element.offsetHeight - footerHeaderHeight);
    this.setVisible(false, false);
    this.addListeners();
}

FooterToggler.prototype.addListeners = function() {
    Event.observe(this.element, 'mouseenter', createCaller(this, 'onMouseOver'));
    Event.observe(this.element, 'mouseleave', createCaller(this, 'onMouseOut'));
}

FooterToggler.prototype.onMouseOver = function(event) {
    this.setVisible(true, true);
}

FooterToggler.prototype.onMouseOut = function(event) {
    this.setVisible(false, true);
}

FooterToggler.prototype.setVisible = function(visible, useAnimation) {
    this.visible= visible;
    if (this.visible) {
        this.show(useAnimation);
    } else {
        this.hide(useAnimation);
    }
}

FooterToggler.prototype.getActualBottomValue = function() {
    var bottomValue = this.element.getStyle('bottom');
    return parseInt(bottomValue);
}

FooterToggler.prototype.show = function(useAnimation) {
    var me = this;
    if (useAnimation) {
        if (this.hideAnimation) {
            this.hideAnimation.cancel();
        }
        this.showAnimation = new Effect.Tween(this.element, this.getActualBottomValue(), 0,  { duration: 0.5, transition: Effect.Transitions.sinoidal }, function(value) { me.element.style.bottom = parseInt(value) + 'px'; } );
    } else {
        this.element.style.bottom = this.showPosition + 'px';
    }
}

FooterToggler.prototype.hide = function(useAnimation) {
    var me = this;
    if (useAnimation) {
        if (this.showAnimation) {
            this.showAnimation.cancel();
        }
        this.hideAnimation = new Effect.Tween(this.element, this.getActualBottomValue(), this.hidePosition,  { duration: 0.8, delay: 0.4, transition: Effect.Transitions.sinoidal }, function(value) { me.element.style.bottom = parseInt(value) + 'px'; } );
    } else {
        this.element.style.bottom = this.hidePosition + 'px';
    }
}