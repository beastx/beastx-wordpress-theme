var BRW = {};

BRW.userAgent = navigator.userAgent.toLowerCase();
BRW.isGecko = BRW.userAgent.indexOf('gecko') != -1;
BRW.isOpera = BRW.userAgent.indexOf('opera') != -1;
BRW.isIE = BRW.userAgent.indexOf('msie') != -1 && !BRW.isOpera;
BRW.isIE7 = BRW.isIE && window.XMLHttpRequest;
