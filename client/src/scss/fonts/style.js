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
    "icon-cd:before": {
        "content": "\\e927"
    },
    "icon-cart:before": {
        "content": "\\e900"
    },
    "icon-envelope:before": {
        "content": "\\e901"
    },
    "icon-info:before": {
        "content": "\\e902"
    },
    "icon-lamp:before": {
        "content": "\\e903"
    },
    "icon-member:before": {
        "content": "\\e904"
    },
    "icon-scan:before": {
        "content": "\\e905"
    },
    "icon-setting:before": {
        "content": "\\e906"
    },
    "icon-favor-hollow:before": {
        "content": "\\e907"
    },
    "icon-favor:before": {
        "content": "\\e908"
    },
    "icon-order-loop:before": {
        "content": "\\e909"
    },
    "icon-pencil:before": {
        "content": "\\e90a"
    },
    "icon-praise:before": {
        "content": "\\e90b"
    },
    "icon-shuffle-loop:before": {
        "content": "\\e90c"
    },
    "icon-single-loop:before": {
        "content": "\\e90d"
    },
    "icon-song-lists:before": {
        "content": "\\e90e"
    },
    "icon-account:before": {
        "content": "\\e90f"
    },
    "icon-back:before": {
        "content": "\\e910"
    },
    "icon-comment:before": {
        "content": "\\e911"
    },
    "icon-correct:before": {
        "content": "\\e912"
    },
    "icon-cross:before": {
        "content": "\\e913"
    },
    "icon-error:before": {
        "content": "\\e914"
    },
    "icon-expand:before": {
        "content": "\\e915"
    },
    "icon-friends:before": {
        "content": "\\e916"
    },
    "icon-lock:before": {
        "content": "\\e917"
    },
    "icon-logo:before": {
        "content": "\\e918"
    },
    "icon-next:before": {
        "content": "\\e919"
    },
    "icon-note-2:before": {
        "content": "\\e91a"
    },
    "icon-note:before": {
        "content": "\\e91b"
    },
    "icon-option:before": {
        "content": "\\e91c"
    },
    "icon-player:before": {
        "content": "\\e91d"
    },
    "icon-prev:before": {
        "content": "\\e91e"
    },
    "icon-search:before": {
        "content": "\\e91f"
    },
    "icon-share:before": {
        "content": "\\e920"
    },
    "icon-singer:before": {
        "content": "\\e921"
    },
    "icon-start:before": {
        "content": "\\e922"
    },
    "icon-stop:before": {
        "content": "\\e923"
    },
    "icon-time:before": {
        "content": "\\e924"
    },
    "icon-trumpet:before": {
        "content": "\\e925"
    },
    "icon-user:before": {
        "content": "\\e926"
    }
});