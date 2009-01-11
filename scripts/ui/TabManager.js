var TabManager = function() {
}

TabManager.prototype.init = function(containerElemnetId, tabContentClassName, tabLabelClassName, initialSelectedTab) {
    this.labels = [];
    this.contents = [];
    this.containerElement = $(containerElemnetId);
    this.selectedTab = initialSelectedTab ? initialSelectedTab : 0;
    this.prepareTabsElements(tabContentClassName, tabLabelClassName);
    this.updateUI();
}

TabManager.prototype.prepareTabsElements = function(tabContentClassName, tabLabelClassName) {
    var tempContentElements = this.containerElement.select('.' + tabContentClassName);
    for (var i = 0; i < tempContentElements.length; ++i) {
        var labelElement = tempContentElements[i].select('.' + tabLabelClassName)[0];
        tempContentElements[i].removeChild(labelElement);
        this.containerElement.removeChild(tempContentElements[i]);
        Log(labelElement);
        
        var label = New(TabLabel, [ labelElement, i, (i == this.selectedTab), this.eventManager, tempContentElements.length ]);
        this.labels.push(label);
        
        var content = New(TabContent,  [ tempContentElements[i], i, (i == this.selectedTab), this.eventManager ]);
        this.contents.push(content);
    }
    
    document.observe("tabManager:tabselect", createCaller(this, 'onTabLabelClick'));
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

TabManager.prototype.getLabelsHeigth = function() {
    return this.labels[0].element.offsetHeight;
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

TabContent.prototype.init = function(content, index, selected, parentEventManager) {
    this.content = content;
    this.index = index;
    this.selected = selected;
    this.eventManager = parentEventManager;
    this.updateUI();
}

TabContent.prototype.updateUI = function() {
    this.element = createDOMElement('div', { 'class': 'tabContent' }, [ this.content ]);
}

TabContent.prototype.setSelected = function(selected) {
    this.selected = selected;
    if (selected) {
        this.element.addClassName('selected');
    } else {
        this.element.removeClassName('selected');
    }
}