var codes = require("./codes");

var langs = {
    "de": require("./de"),
    "en": require("./en"),
    "fr": require("./fr"),
    "nl": require("./nl"),
    "sv": require("./sv"),
    "es": require("./es"),
    "pt": require("./pt"),
    "fi": require("./fi"),
    "et": require("./et"),
    "ar": require("./ar"),
    "it": require("./it"),
    "sl": require("./sl"),
    "cz": require("./cz"),
    "ee": require("./ee"),
    "hu": require("./hu"),
    "lv": require("./lv"),
    "sk": require("./sk"),
    "lt": require("./lt")
};

/*
 * All codes map to ISO 3166-1 alpha-2
 */
var alpha2 = {},
    alpha3 = {},
    numeric = {},
    invertedNumeric = {};

codes.getCodes().forEach(function (codeInformation) {
    "use strict";

    var s = codeInformation;
    alpha2[s[0]] = s[1];
    alpha3[s[1]] = s[0];
    numeric[parseInt(s[2], 10)] = s[0];
    invertedNumeric[s[0]] = parseInt(s[2], 10);
});

/*
 * @param code Alpha-3 code
 * @return Alpha-2 code or undefined
 */
function alpha3ToAlpha2(code) {
    "use strict";
    return alpha3[code];
}
exports.alpha3ToAlpha2 = alpha3ToAlpha2;

/*
 * @param code Alpha-2 code
 * @return Alpha-3 code or undefined
 */
function alpha2ToAlpha3(code) {
    "use strict";
    return alpha2[code];
}
exports.alpha2ToAlpha3 = alpha2ToAlpha3;

/*
 * @param code Alpha-3 code
 * @return Numeric code or undefined
 */
function alpha3ToNumeric(code) {
    "use strict";
    return invertedNumeric[alpha3ToAlpha2(code)];
}
exports.alpha3ToNumeric = alpha3ToNumeric;

/*
 * @param code Alpha-2 code
 * @return Numeric code or undefined
 */
function alpha2ToNumeric(code) {
    "use strict";
    return invertedNumeric[code];
}
exports.alpha2ToNumeric = alpha2ToNumeric;

/*
 * @param code Numeric code
 * @return Alpha-3 code or undefined
 */
function numericToAlpha3(code) {
    "use strict";
    return alpha2ToAlpha3(numeric[parseInt(code, 10)]);
}
exports.numericToAlpha3 = numericToAlpha3;

/*
 * @param code Numeric code
 * @return Alpha-2 code or undefined
 */
function numericToAlpha2(code) {
    "use strict";
    return numeric[parseInt(code, 10)];
}
exports.numericToAlpha2 = numericToAlpha2;

/*
 * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
 * @return ISO 3166-1 alpha-3
 */
function toAlpha3(code) {
    "use strict";
    if (typeof code === "string") {
        if (/^[0-9]*$/.test(code)) {
            return numericToAlpha3(code);
        }
        if (code.length === 2) {
            return alpha2ToAlpha3(code.toUpperCase());
        }
        if (code.length === 3) {
            return code.toUpperCase();
        }
    }
    if (typeof code === "number") {
        return numericToAlpha3(code);
    }
    return undefined;
}
exports.toAlpha3 = toAlpha3;

/*
 * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
 * @return ISO 3166-1 alpha-2
 */
function toAlpha2(code) {
    "use strict";
    if (typeof code === "string") {
        if (/^[0-9]*$/.test(code)) {
            return numericToAlpha2(code);
        }
        if (code.length === 2) {
            return code.toUpperCase();
        }
        if (code.length === 3) {
            return alpha3ToAlpha2(code.toUpperCase());
        }
    }
    if (typeof code === "number") {
        return numericToAlpha2(code);
    }
    return undefined;
}
exports.toAlpha2 = toAlpha2;

/*
 * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
 * @param lang language for country name
 * @return name or undefined
 */
exports.getName = function (code, lang) {
    "use strict";
    try {
        var l = langs[lang.toLowerCase()];
        return l.i18n()[toAlpha2(code)];
    } catch (err) {
        return undefined;
    }
};

/*
 * @param lang language for country name
 * @return hash
 */
exports.getNames = function (lang) {
    "use strict";
    try {
        var l = langs[lang.toLowerCase()];
        return l.i18n();
    } catch (err) {
        return {};
    }
};

/*
 * @param name name
 * @param lang language for country name
 * @return ISO 3166-1 alpha-2 or undefined
 */
exports.getAlpha2Code = function (name, lang) {
    "use strict";
    try {
        var p,
            codenames = langs[lang.toLowerCase()].i18n();
        for (p in codenames) {
            if (codenames.hasOwnProperty(p)) {
                if (codenames[p].toLowerCase() === name.toLowerCase()) {
                    return p;
                }
            }
        }
        return undefined;
    } catch (err) {
        return undefined;
    }
};

/*
 * @return hash (alpha-2 => alpha-3)
 */
exports.getAlpha2Codes = function () {
    "use strict";
    return alpha2;
};

/*
 * @return hash (alpha-3 => alpha-2)
 */
exports.getAlpha3Codes = function () {
    "use strict";
    return alpha3;
};

/*
 * @return hash (numeric => alpha-2)
 */
exports.getNumericCodes = function () {
    "use strict";
    return numeric;
};
