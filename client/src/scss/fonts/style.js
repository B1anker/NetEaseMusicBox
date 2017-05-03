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
    "icon-pencil:before": {
        "content": "\\e91f"
    },
    "icon-praise:before": {
        "content": "\\e91e"
    },
    "icon-favor-hollow:before": {
        "content": "\\e900"
    },
    "icon-favor:before": {
        "content": "\\e901"
    },
    "icon-order-loop:before": {
        "content": "\\e902"
    },
    "icon-shuffle-loop:before": {
        "content": "\\e903"
    },
    "icon-single-loop:before": {
        "content": "\\e904"
    },
    "icon-song-lists:before": {
        "content": "\\e905"
    },
    "icon-account:before": {
        "content": "\\e906"
    },
    "icon-back:before": {
        "content": "\\e907"
    },
    "icon-comment:before": {
        "content": "\\e908"
    },
    "icon-correct:before": {
        "content": "\\e909"
    },
    "icon-cross:before": {
        "content": "\\e90a"
    },
    "icon-error:before": {
        "content": "\\e90b"
    },
    "icon-expand:before": {
        "content": "\\e90c"
    },
    "icon-friends:before": {
        "content": "\\e90d"
    },
    "icon-lock:before": {
        "content": "\\e90e"
    },
    "icon-logo:before": {
        "content": "\\e90f"
    },
    "icon-next:before": {
        "content": "\\e910"
    },
    "icon-note-2:before": {
        "content": "\\e911"
    },
    "icon-note:before": {
        "content": "\\e912"
    },
    "icon-option:before": {
        "content": "\\e913"
    },
    "icon-player:before": {
        "content": "\\e914"
    },
    "icon-prev:before": {
        "content": "\\e915"
    },
    "icon-search:before": {
        "content": "\\e916"
    },
    "icon-share:before": {
        "content": "\\e917"
    },
    "icon-singer:before": {
        "content": "\\e918"
    },
    "icon-start:before": {
        "content": "\\e919"
    },
    "icon-stop:before": {
        "content": "\\e91a"
    },
    "icon-time:before": {
        "content": "\\e91b"
    },
    "icon-trumpet:before": {
        "content": "\\e91c"
    },
    "icon-user:before": {
        "content": "\\e91d"
    }
});