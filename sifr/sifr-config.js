var SohoGothicProLight = { src: '/wp-content/themes/beastx/sifr/SohoGothicProLight.swf' };
var SohoGothicProMedium = { src: '/wp-content/themes/beastx/sifr/SohoGothicProMedium.swf' };
var SohoGothicProMediumItalic = { src: '/wp-content/themes/beastx/sifr/SohoGothicProMediumItalic.swf' };

sIFR.useStyleCheck = true;
sIFR.activate(SohoGothicProLight, SohoGothicProMedium, SohoGothicProMediumItalic);

sIFR.replace(SohoGothicProMedium, {
    selector: '.entryTitle h1',
    css: [
        '.sIFR-root { background:transparent; color: #8AC11B; z-index: -10 }',
        'a { text-decoration: none; color:#8AC11B }',
        'a:link { color: #8AC11B; }',
        'a:hover { color: #8AC11B; }'
    ],
    wmode: 'transparent',
    filters: {
        DropShadow: {
            distance: 0.3,
            color: '#333333',
            strength: 2
        }
    }
});

sIFR.replace(SohoGothicProMedium, {
    selector: '.entryTitle h2',
    css: [
        '.sIFR-root {background:transparent; color: #8AC11B; z-index: -10 }',
        'a { text-decoration: none; color:#8AC11B }',
        'a:link { color: #8AC11B; }',
        'a:hover { color: #8AC11B; }'
    ],
    wmode: 'transparent',
    filters: {
        DropShadow: {
            distance: 0.3,
            color: '#333333',
            strength: 2
        }
    }
});


sIFR.replace(SohoGothicProLight, {
    selector: '.mainButtonsList .mainButton',
    css: [
        '.sIFR-root { background-color: #2D183F; color: #f9f9f9; }',
        'a { text-decoration: none; font-size: 12em; color:#eeeeee }',
        'a:link { color: #eeeeee; }',
        'a:hover { color: #ffffff; }'
    ]
});


sIFR.replace(SohoGothicProMediumItalic, {
    selector: 'h2.blogDescription',
    css: '.sIFR-root { background-color: #261138; color: #4E4262; font-style: italic; }'
});

sIFR.replace(SohoGothicProLight, {
    selector: 'h4.topBlockWidgetTitle',
    css: '.sIFR-root { background-color: #302B38; color: #f9f9f9; }'
});

sIFR.replace(SohoGothicProLight, {
    selector: 'h4.rightSideBarLeftWidgetTitle',
    css: '.sIFR-root { background-color: #302B38; color: #f9f9f9; }'
});

sIFR.replace(SohoGothicProLight, {
    selector: 'h4.rightSideBarRightWidgetTitle',
    css: '.sIFR-root { background-color: #302B38; color: #f9f9f9; }'
});

sIFR.replace(SohoGothicProLight, {
    selector: '#searchform label',
    css: '.sIFR-root { background-color: #302B38; color: #f9f9f9; }'
});


sIFR.replace(SohoGothicProLight, {
    selector: 'h4.commentsTitle',
    css: '.sIFR-root { background-color: #ECECEC; color: #333; }'
});

