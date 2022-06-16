// ==UserScript==
// @name         gurufocus ad-free
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Remove annoying ads from gurufocus :)
// @author       https://github.com/KamilKoso
// @match        https://www.gurufocus.com/*
// @icon         https://www.google.com/s2/favicons?domain=gurufocus.com
// @grant        none
// @license      MIT
// ==/UserScript==


// This cookie is incremented each refresh, if value reaches 6 big ad shows and site is not being fully loaded
const pwcouCookie = {
    name: 'pwcou',
    domain: '.gurufocus.com',
    desiredValue: -9999,
    expirationDays: 30
}

// add here ads that are being displayed only once
const oneTimeShowingAds = ['section#notification-bar', 'div#colorbox', 'div#cboxOverlay', 'div.ad-image-container'];

// add here ads that are being displayed repeatedly
const repeatedlyShowingAds = ['div.el-dialog__wrapper', 'div.v-modal', 'div.paywall-shadow', 'div#business-description-non-logged'];

function clearPage(itemsToClear) {
    let elems = document.querySelectorAll(itemsToClear);
    elems.forEach(elem => {
        elem.remove();
    });
}

function setCookie(cName, cValue, cDomain, expDays) {
     let date = new Date();
     date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
     const expires = "expires=" + date.toUTCString();
     document.cookie = cName + "=" + cValue + "; " + expires + "; domain=" + cDomain +"; path=/";
}

(function() {
     setCookie(pwcouCookie.name, pwcouCookie.desiredValue, pwcouCookie.domain, pwcouCookie.expirationDays);
     setTimeout(() => {clearPage(oneTimeShowingAds)}, 500);
     setInterval(() => {clearPage(repeatedlyShowingAds)}, 500);
})();

