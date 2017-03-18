import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "[class^=\"icon-\"]": {
        "fontFamily": "'icomoon' !important",
        "speak": "none",
        "fontStyle": "normal",
        "fontWeight": "normal",
        "fontVariant": "normal",
        "textTransform": "none",
        "lineHeight": 1,
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale"
    },
    "[class*=\" icon-\"]": {
        "fontFamily": "'icomoon' !important",
        "speak": "none",
        "fontStyle": "normal",
        "fontWeight": "normal",
        "fontVariant": "normal",
        "textTransform": "none",
        "lineHeight": 1,
        "WebkitFontSmoothing": "antialiased",
        "MozOsxFontSmoothing": "grayscale"
    },
    "icon-error:before": {
        "content": "\\e903"
    },
    "icon-correct:before": {
        "content": "\\e904"
    },
    "icon-account:before": {
        "content": "\\e901"
    },
    "icon-lock:before": {
        "content": "\\e902"
    },
    "icon-back:before": {
        "content": "\\e900"
    },
    "icon-angle-right:before": {
        "content": "\\e915"
    }
});