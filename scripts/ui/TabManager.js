var TabManager = function() {
}

TabManager.prototype.init = function(containerElemnetId, tabLabelsElementTagName, initialSelectedTab) {
    this.labels = [];
    this.contents = [];
    this.containerElement = DOM.get(containerElemnetId);
    this.tabLabelsElementTagName = tabLabelsElementTagName;
    this.selectedTab = initialSelectedTab ? initialSelectedTab : 0;
    this.eventManager = new EVT.EventManager();
    this.eventManager.init(this);
    this.eventManager.addListener('select', EVT.createCaller(this, 'onTabLabelClick'));
    this.prepareTabsElements();
    this.updateUI();
}

TabManager.prototype.prepareTabsElements = function() {
    var tempLabelsElements = DOM.getElementsBySelector(this.tabLabelsElementTagName, this.containerElement);
    for (var i = 0; i < tempLabelsElements.length; ++i) {
        var contentElements = this.getContentBeetwenTabLabels(tempLabelsElements[i], tempLabelsElements[i + 1]);
        DOM.removeChild(this.containerElement, tempLabelsElements[i]);
        
        var label = new TabLabel();
        label.init(tempLabelsElements[i].firstChild.nodeValue, i, (i == this.selectedTab), this.eventManager, tempLabelsElements.length);
        this.labels.push(label);
        
        var content = new TabContent();
        content.init(contentElements, i, (i == this.selectedTab), this.eventManager);
        this.contents.push(content);
    }
    
    DOM.removeAllChildren(this.containerElement);
}

TabManager.prototype.getContentBeetwenTabLabels = function(tab1, tab2) {
    var elements = [];
    if (!tab1) {
        return;
    }
    if (tab1 && tab2) {
        currentElement = tab1;
        while (DOM.getNextElement(currentElement) != tab2) {
            elements.push(DOM.getNextElement(currentElement));
            currentElement = DOM.getNextElement(currentElement);
        }
    } else {
        currentElement = tab1;
        while (DOM.getNextElement(currentElement)) {
            elements.push(DOM.getNextElement(currentElement));
            currentElement = DOM.getNextElement(currentElement);
        }
    }
    return elements;
}
    
TabManager.prototype.updateUI = function() {
    var labelsElements = [DOM.createElement('div', { 'class': 'leftCorner' }, [ '' ])];
    var contentsElements = [];
    for (var i = 0; i < this.labels.length; ++i) {
        labelsElements.push(this.labels[i].element);
    }
    labelsElements.push(DOM.createElement('div', { 'class': 'rightCorner' }, [ '' ]));
    for (var i = 0; i < this.contents.length; ++i) {
        contentsElements.push(this.contents[i].element);
    }
    this.element = DOM.createElement('div', { 'class': 'tabManager' }, [
        this.labelsContainer = DOM.createElement('div', { 'class': 'tabLabels' }, labelsElements),
        this.contentsContainer = DOM.createElement('div', { 'class': 'tabContents' }, contentsElements)
    ]);
    DOM.appendChild(this.containerElement, this.element);
    this.selectTab(this.selectedTab);
}

TabManager.prototype.selectTab = function(index) {
    this.unSelectTab(this.selectedTab);
    this.selectedTab = index;
    this.labels[this.selectedTab].setSelected(true);
    this.contents[this.selectedTab].setSelected(true);
}

TabManager.prototype.unSelectTab = function(index) {
    this.labels[index].setSelected(false);
    this.contents[index].setSelected(false);
}

TabManager.prototype.onTabLabelClick = function(eventObj) {
    this.selectTab(eventObj.index);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var TabLabel = function() {
}

TabLabel.prototype.init = function(text, index, selected, parentEventManager, tabsLength) {
    this.text = text;
    this.index = index;
    this.selected = selected;
    this.tabsLength = tabsLength;
    this.eventManager = parentEventManager;
    this.updateUI();
}

TabLabel.prototype.updateUI = function() {
    this.element = DOM.createElement('div',
        { 'class': 'tabLabel' + (this.index == 0 ? ' firstTab' : (this.index == this.tabsLength -1 ? ' lastTab' : ''))},
        [
            DOM.createElement('a', 
                {
                    href: '#',
                    onclick: EVT.createCaller(this, 'onLabelClick')
                },
                [ this.text ]
            )
        ]
    );
}

TabLabel.prototype.onLabelClick = function(event) {
    EVT.cancelEvent(event);
    this.eventManager.dispatchEvent('select', { index: this.index });
    //~ Log(this.index);
}

TabLabel.prototype.setSelected = function(selected) {
    this.selected = selected;
    DOM.setHasClass(this.element, 'selected', this.selected);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var TabContent = function() {
}

TabContent.prototype.init = function(contentElements, index, selected, parentEventManager) {
    this.contentElements = contentElements;
    this.index = index;
    this.selected = selected;
    this.eventManager = parentEventManager;
    this.updateUI();
}

TabContent.prototype.updateUI = function() {
    this.element = DOM.createElement('div', { 'class': 'tabContent' }, this.contentElements);
}

TabContent.prototype.setSelected = function(selected) {
    this.selected = selected;
    DOM.setHasClass(this.element, 'selected', this.selected);
}