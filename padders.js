let pad = require('pad');

function flip_pad(str, len, ch) {
    return pad(len, str, ch);
}

// http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
function recursive_pad(string, width, padding) {
    return (width <= string.length) ? string : recursive_pad(padding + string, width, padding);
}

module.exports = {

    // Canonical implementation
    tantrum_leftpad: function(str, len, ch) {
        str = String(str);
        var i = -1;
        if (!ch && ch !== 0)
            ch = ' ';
        len = len - str.length;
        while (++i < len) {
            str = ch + str;
        }
        return str;
    },

    // npm modules
    module_esleft_pad: require('es-leftpad'),
    module_left_pad: require('left-pad'),
    module_pad: flip_pad,
    module_pad_left: require('pad-left'),

    //https://programmingpraxis.com/2016/03/25/leftpad/
    praxis_leftpad: (str, len, chr = ' ') => chr.repeat(len >= str.length ? len - str.length : 0) + str,

    //https://gist.github.com/cslinmiso/a8314aa0a6186d26a125
    eslinmiso: function(v, n, c){
        c = c ? ' ' : c;
        return String(v).length >= n ? '' + v : (String(c).repeat(n) + v).slice(-n);
    },

    //https://www.educative.io/collection/page/10370001/520001/530001
    educative: function (str, len, ch) {
        if (!ch) {
            ch = '.';
        }
        str = String(str);
        if (ch.length !== 1) {
            throw 'Invalid Input'
        }
        len = len - str.length;
        strCh = '';
        for (i = 0; i < len; ++i) {
            strCh += ch;
        }
        return (strCh + str);
    },

    // http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
    padL: (a, b, c) => (new Array(b || 2).join(c || 0) + (a || c || 0)).slice(-b),
    recursive_pad,
    string_repeat: (str, len, ch) =>  ch.repeat(Math.max(0, len - str.length)) + this,

    // http://www.webtoolkit.info/javascript-pad.html
    webtoolkit_leftpad: function(str, len, pad, dir) {
        var STR_PAD_LEFT = 1;
        var STR_PAD_RIGHT = 2;
        var STR_PAD_BOTH = 3;
        if (typeof(len) == "undefined") { var len = 0; }
        if (typeof(pad) == "undefined") { var pad = ' '; }
        if (typeof(dir) == "undefined") { var dir = STR_PAD_LEFT; }

        if (len + 1 >= str.length) {
            switch (dir){
                case STR_PAD_LEFT:
                    str = Array(len + 1 - str.length).join(pad) + str;
                    break;
                case STR_PAD_BOTH:
                    var right = Math.ceil((padlen = len - str.length) / 2);
                    var left = padlen - right;
                    str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
                    break;
                default:
                    str = str + Array(len + 1 - str.length).join(pad);
                    break;
            } // switch
        }
        return str;
    },

    // https://www.reddit.com/r/programming/comments/4boteg/npm_leftpad_have_we_forgotten_how_to_program/d1bcro7?context=3
    russian_peasant: (str, len, ch) => {
        let str2 = str;
        for (len = len - str.length; ; len >>= 1) {
            if (len & 1) str2 = ch + str2;
            if (len > 1) ch = ch + ch; else break;
        }
        return str2;
    }
};
