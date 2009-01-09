var COLOR = {};

COLOR.hsv2rgb = function (h, s, v) {
  var r, g, b;
  if ( s == 0 ) {
    r = v * 255;
    g = v * 255;
    b = v * 255;
  } else {
    var var_h = h * 6;
    if ( var_h == 6 ) {
      var_h = 0;
    }

    var var_i = Math.floor( var_h );
    var var_1 = v * ( 1 - s );
    var var_2 = v * ( 1 - s * ( var_h - var_i ) );
    var var_3 = v * ( 1 - s * ( 1 - ( var_h - var_i ) ) );

    if ( var_i == 0 ) {
      var_r = v;
      var_g = var_3;
      var_b = var_1;
    } else if ( var_i == 1 ) {
      var_r = var_2;
      var_g = v;
      var_b = var_1;
    } else if ( var_i == 2 ) {
      var_r = var_1;
      var_g = v;
      var_b = var_3
    } else if ( var_i == 3 ) {
      var_r = var_1;
      var_g = var_2;
      var_b = v;
    } else if ( var_i == 4 ) {
      var_r = var_3;
      var_g = var_1;
      var_b = v;
    } else {
      var_r = v;
      var_g = var_1;
      var_b = var_2
    }

    r = var_r * 255          //rgb results = 0 ÷ 255
    g = var_g * 255
    b = var_b * 255
  }
  return [Math.round(r), Math.round(g), Math.round(b)];
};


COLOR.rgb2hsv = function (r, g, b) {
    var r = ( r / 255 );
    var g = ( g / 255 );
    var b = ( b / 255 );

    var min = Math.min( r, g, b );    //Min. value of RGB
    var max = Math.max( r, g, b );    //Max. value of RGB
    deltaMax = max - min;             //Delta RGB value

    var v = max;
    var s, h;
    var deltaRed, deltaGreen, deltaBlue;

    if ( deltaMax == 0 ) {
       h = 0;                               //HSV results = 0 ÷ 1
       s = 0;
    } else {
       s = deltaMax / max;

       deltaRed = ( ( ( max - r ) / 6 ) + ( deltaMax / 2 ) ) / deltaMax;
       deltaGreen = ( ( ( max - g ) / 6 ) + ( deltaMax / 2 ) ) / deltaMax;
       deltaBlue = ( ( ( max - b ) / 6 ) + ( deltaMax / 2 ) ) / deltaMax;

       if      ( r == max ) h = deltaBlue - deltaGreen;
       else if ( g == max ) h = ( 1 / 3 ) + deltaRed - deltaBlue;
       else if ( b == max ) h = ( 2 / 3 ) + deltaGreen - deltaRed;

       if ( h < 0 ) h += 1;
       if ( h > 1 ) h -= 1;
    }
    return [h, s, v];
}

COLOR.rgb2hex = function (r,g,b) {
  return this.toHex(r) + this.toHex(g) + this.toHex(b);
};

COLOR.hexchars = "0123456789ABCDEF";

COLOR.toHex = function(n) {
  n = n || 0;
  n = parseInt(n, 10);
  if (isNaN(n)) n = 0;
  n = Math.round(Math.min(Math.max(0, n), 255));
  return this.hexchars.charAt((n - n % 16) / 16) + this.hexchars.charAt(n % 16);
};

COLOR.toDec = function(hexchar) {
  return this.hexchars.indexOf(hexchar.toUpperCase());
};

COLOR.hex2rgb = function(str) {
  var rgb = {};
  rgb.r = (this.toDec(str.substr(0, 1)) * 16) +
          this.toDec(str.substr(1, 1));
  rgb.g = (this.toDec(str.substr(2, 1)) * 16) +
          this.toDec(str.substr(3, 1));
  rgb.b = (this.toDec(str.substr(4, 1)) * 16) +
          this.toDec(str.substr(5, 1));
  return rgb;
};

COLOR.fromBackground = function(element) {
  var backColor = DOM.getCurrentStyle(element, 'backgroundColor');
  if(backColor.substr(0,4) == 'rgb(') {
    var backColorRGB = backColor.substr(4);
    backColorRGB = backColorRGB.substr(0, backColorRGB.length -1);
    backColorRGB = backColorRGB.split(',');
    backColor = this.rgb2hex(backColorRGB[0], backColorRGB[1], backColorRGB[2]);
  }
  return backColor;
}

COLOR.hsvToRgb = function(hue, saturation, value) {
    var red;
    var green;
    var blue;
    if (value == 0.0) {
        red = 0;
        green = 0;
        blue = 0;
    } else {
        var i = Math.floor(hue * 6);
        var f = (hue * 6) - i;
        var p = value * (1 - saturation);
        var q = value * (1 - (saturation * f));
        var t = value * (1 - (saturation * (1 - f)));
        switch (i) {
            case 1: red = q; green = value; blue = p; break;
            case 2: red = p; green = value; blue = t; break;
            case 3: red = p; green = q; blue = value; break;
            case 4: red = t; green = p; blue = value; break;
            case 5: red = value; green = p; blue = q; break;
            case 6: // fall through
            case 0: red = value; green = t; blue = p; break;
        }
    }
    return {r: red, g: green, b: blue};
}

COLOR.rgbToHsv = function(red, green, blue) {
    var max = Math.max(Math.max(red, green), blue);
    var min = Math.min(Math.min(red, green), blue);
    var hue;
    var saturation;
    var value = max;
    if (min == max) {
        hue = 0;
        saturation = 0;
    } else {
        var delta = (max - min);
        saturation = delta / max;
        if (red == max) {
            hue = (green - blue) / delta;
        } else if (green == max) {
            hue = 2 + ((blue - red) / delta);
        } else {
            hue = 4 + ((red - green) / delta);
        }
        hue /= 6;
        if (hue < 0) {
            hue += 1;
        }
        if (hue > 1) {
            hue -= 1;
        }
    }
    return {
        h: hue,
        s: saturation,
        v: value
    };
}

COLOR.hexToRgb = function(hex_string, default_) {
  if (default_ == undefined) {
    default_ = null;
  }

  if (hex_string.substr(0, 1) == '#') {
    hex_string = hex_string.substr(1);
  }

  var r, g, b;
  if (hex_string.length == 3) {
    r = hex_string.substr(0, 1);
    r += r;
    g = hex_string.substr(1, 1);
    g += g;
    b = hex_string.substr(2, 1);
    b += b;
  } else if (hex_string.length == 6) {
    r = hex_string.substr(0, 2);
    g = hex_string.substr(2, 2);
    b = hex_string.substr(4, 2);
  } else {
    return default_;
  }

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return default_;
  } else {
    return {r: r / 255, g: g / 255, b: b / 255};
  }
}

COLOR.rgbToHex = function(r, g, b, includeHash) {
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  if (includeHash == undefined) {
    includeHash = true;
  }
  r = r.toString(16);
  if (r.length == 1) {
    r = '0' + r;
  }
  g = g.toString(16);
  if (g.length == 1) {
    g = '0' + g;
  }
  b = b.toString(16);
  if (b.length == 1) {
    b = '0' + b;
  }
  return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
}
