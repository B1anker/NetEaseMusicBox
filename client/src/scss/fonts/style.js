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
    "icon-loading path1:before": {
        "content": "\\e927",
        "color": "rgb(233, 233, 233)"
    },
    "icon-loading path2:before": {
        "content": "\\e928",
        "marginLeft": -1,
        "color": "rgb(152, 150, 151)"
    },
    "icon-loading path3:before": {
        "content": "\\e929",
        "marginLeft": -1,
        "color": "rgb(155, 153, 154)"
    },
    "icon-loading path4:before": {
        "content": "\\e92a",
        "marginLeft": -1,
        "color": "rgb(163, 161, 162)"
    },
    "icon-loading path5:before": {
        "content": "\\e92b",
        "marginLeft": -1,
        "color": "rgb(171, 169, 170)"
    },
    "icon-loading path6:before": {
        "content": "\\e92c",
        "marginLeft": -1,
        "color": "rgb(178, 178, 178)"
    },
    "icon-loading path7:before": {
        "content": "\\e92d",
        "marginLeft": -1,
        "color": "rgb(186, 184, 185)"
    },
    "icon-loading path8:before": {
        "content": "\\e92e",
        "marginLeft": -1,
        "color": "rgb(194, 192, 193)"
    },
    "icon-loading path9:before": {
        "content": "\\e92f",
        "marginLeft": -1,
        "color": "rgb(203, 203, 203)"
    },
    "icon-loading path10:before": {
        "content": "\\e930",
        "marginLeft": -1,
        "color": "rgb(210, 210, 210)"
    },
    "icon-loading path11:before": {
        "content": "\\e931",
        "marginLeft": -1,
        "color": "rgb(218, 218, 218)"
    },
    "icon-loading path12:before": {
        "content": "\\e932",
        "marginLeft": -1,
        "color": "rgb(226, 226, 226)"
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
        "content": "\\e90e",
        "color": "#666"
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