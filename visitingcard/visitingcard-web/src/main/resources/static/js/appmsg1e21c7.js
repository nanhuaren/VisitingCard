//µ÷ÓÃÎ¢ÐÅÍ¼Æ¬ä¯ÀÀÆ÷
//ÊµÀý:<div id="img-content">...</div>

var ISWP = !!navigator.userAgent.match(/Windows\sPhone/i), sw = 0;

msg_link = "", function() {


function e(e) {
typeof window.WeixinJSBridge != "undefined" && WeixinJSBridge.invoke("imagePreview", {
current: e,
urls: n
});
}

function t() {
var t = document.getElementById("img-content");
t = t ? t.getElementsByTagName("img") : [];
for (var r = 0, i = t.length; r < i; r++) {
var s = t.item(r), o = s.getAttribute("data-src") || s.getAttribute("src");
o="http://www.jr0412.com"+o;
o && (n.push(o), function(t) {
s.addEventListener ? s.addEventListener("click", function() {
e(t);
}) : s.attachEvent && s.attachEvent("click", function() {
e(t);
});
}(o));
}
}



var n = [];
window.addEventListener ? window.addEventListener("load", t, !1) : window.attachEvent && (window.attachEvent("load", t), window.attachEvent("onload", t));
}();

var has_click = {};

(function() {
function detect() {
var e = (window.pageYOffset || document.documentElement.scrollTop) - 20;
for (var t = 0, n = images.length; t < n; t++) {
var r = images[t], i = r.el.offsetTop;
!r.show && e < i + r.height && e + height > i && (r.el.setAttribute("src", r.src), r.show = !0, r.el.style.setProperty("height", "auto", "important"), r.el.style.setProperty("visibility", "visible", "important")), ISWP && r.el.width * 1 > sw && (r.el.width = sw);
}
}


function onLoad() {
var e = document.getElementsByTagName("img"), t = document.getElementById("img-content");

t.currentStyle ? sw = t.currentStyle.width : typeof getComputedStyle != "undefined" && (sw = getComputedStyle(t).width), sw = 1 * sw.replace("px", "");
for (var n = 0, r = e.length; n < r; n++) {
var i = e.item(n);
if (!i.getAttribute("data-src")) continue;
images.push({
el: i,
src: i.getAttribute("data-src"),
height: i.offsetHeight,
show: !1
}), i.style.setProperty("height", "auto", "important"), i.style.setProperty("visibility", "hidden", "important");
}
detect();

}

})(), function() {
function e() {
var e = document.getElementsByTagName("a"), t = !1;

if (!!e) {
var r = e.length;
for (var i = 0; i < r; ++i) {
var s = e[i], o = s.getAttribute("href"), u = /^(http|https):\/\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)(\/)?/g, a = u.exec(o);
a && a[2] && a[2] != "mp.weixin.qq.com" && (t = t || [], t.push(o), n.push(encodeURIComponent(o)));
}
}
return t;
}


}();