var TabManager = function() {
}

TabManager.prototype.init = function(containerElemnetId, tabLabelsElementTagName, initialSelectedTab) {
    this.labels = [];
    this.contents = [];
    this.containerElement = $(containerElemnetId);
    this.tabLabelsElementTagName = tabLabelsElementTagName;
    this.selectedTab = initialSelectedTab ? initialSelectedTab : 0;
    this.prepareTabsElements();
    this.updateUI();
}

TabManager.prototype.prepareTabsElements = function() {
    var tempLabelsElements = this.containerElement.select(this.tabLabelsElementTagName);
    for (var i = 0; i < tempLabelsElements.length; ++i) {
        var contentElements = this.getContentBeetwenTabLabels(tempLabelsElements[i], tempLabelsElements[i + 1]);
        this.containerElement.removeChild(tempLabelsElements[i]);
        
        var label = New(TabLabel, [ tempLabelsElements[i].firstChild.nodeValue, i, (i == this.selectedTab), this.eventManager, tempLabelsElements.length ]);
        this.labels.push(label);
        
        var content = New(TabContent,  [ contentElements, i, (i == this.selectedTab), this.eventManager ]);
        this.contents.push(content);
    }
    
    while(this.containerElement.childNodes.length > 0) {
        this.containerElement.removeChild(this.containerElement.firstChild);
    }
    document.observe("tabManager:tabselect", createCaller(this, 'onTabLabelClick'));
}

TabManager.prototype.getContentBeetwenTabLabels = function(tab1, tab2) {
    var elements = [];
    if (!tab1) {
        return;
    }
    if (tab1 && tab2) {
        currentElement = tab1;
        while (currentElement.next(0) != tab2) {
            elements.push(currentElement.next(0));
            currentElement = currentElement.next(0);
        }
    } else {
        currentElement = tab1;
        while (currentElement.next(0)) {
            elements.push(currentElement.next(0));
            currentElement = currentElement.next(0);
        }
    }
    return elements;
}
    
TabManager.prototype.updateUI = function() {
    this.labelsContainer = new Element('div', { 'class': 'tabLabels' });
    this.contentsContainer = new Element('div', { 'class': 'tabContents' });
    
    this.labelsContainer.insert(new Element('div', { 'class': 'leftCorner' }).insert(''));
    
    for (var i = 0; i < this.labels.length; ++i) {
        this.labelsContainer.insert(this.labels[i].element);
    }
    this.labelsContainer.insert(new Element('div', { 'class': 'rightCorner' }).insert(''));
    
    for (var i = 0; i < this.contents.length; ++i) {
        this.contentsContainer.insert(this.contents[i].element);
    }
    
    this.element = new Element('div', { 'class': 'tabManager' });
    
    this.element.insert(this.labelsContainer);
    this.element.insert(this.contentsContainer);
    
    this.containerElement.insert(this.element);
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

TabManager.prototype.onTabLabelClick = function(event) {
    this.selectTab(event.memo.index);
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
    this.element = new Element('div',
        { 'class': 'tabLabel' + (this.index == 0 ? ' firstTab' : (this.index == this.tabsLength -1 ? ' lastTab' : ''))}
    );
    this.element.insert(
        new Element('a', 
            {
                href: '#'
            }
        ).insert( this.text )
    );
    Event.observe(this.element, 'click', createCaller(this, 'onLabelClick'));
}

TabLabel.prototype.onLabelClick = function(event, aaa) {
    this.element.fire('tabManager:tabselect', { index: this.index });
    event.stop();
}

TabLabel.prototype.setSelected = function(selected) {
    this.selected = selected;
    if (selected) {
        this.element.addClassName('selected');
    } else {
        this.element.removeClassName('selected');
    }
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
    this.element = new Element('div', { 'class': 'tabContent' });
    for (var i = 0; i < this.contentElements.length; ++i) {
        this.element.insert(this.contentElements[i]);
    }
}

TabContent.prototype.setSelected = function(selected) {
    this.selected = selected;
    if (selected) {
        this.element.addClassName('selected');
    } else {
        this.element.removeClassName('selected');
    }
}