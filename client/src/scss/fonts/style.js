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
    "icon-stop:before": {
        "content": "\\e918"
    },
    "icon-start:before": {
        "content": "\\e914"
    },
    "icon-account:before": {
        "content": "\\e900"
    },
    "icon-back:before": {
        "content": "\\e901"
    },
    "icon-comment:before": {
        "content": "\\e902"
    },
    "icon-correct:before": {
        "content": "\\e903"
    },
    "icon-cross:before": {
        "content": "\\e904"
    },
    "icon-error:before": {
        "content": "\\e905"
    },
    "icon-expand:before": {
        "content": "\\e906"
    },
    "icon-favorite:before": {
        "content": "\\e907"
    },
    "icon-friends:before": {
        "content": "\\e908"
    },
    "icon-lock:before": {
        "content": "\\e909"
    },
    "icon-logo:before": {
        "content": "\\e90a"
    },
    "icon-next:before": {
        "content": "\\e90b"
    },
    "icon-note-2:before": {
        "content": "\\e90c"
    },
    "icon-note:before": {
        "content": "\\e90d"
    },
    "icon-option:before": {
        "content": "\\e90e"
    },
    "icon-player:before": {
        "content": "\\e90f"
    },
    "icon-prev:before": {
        "content": "\\e910"
    },
    "icon-search:before": {
        "content": "\\e911"
    },
    "icon-share:before": {
        "content": "\\e912"
    },
    "icon-singer:before": {
        "content": "\\e913"
    },
    "icon-time:before": {
        "content": "\\e915"
    },
    "icon-trumpet:before": {
        "content": "\\e916"
    },
    "icon-user:before": {
        "content": "\\e917"
    }
});