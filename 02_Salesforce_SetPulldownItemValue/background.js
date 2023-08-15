/**
 * インストールイベント
 */
chrome.runtime.onInstalled.addListener(function() {
    const menu = chrome.contextMenus.create({
        type: "normal"
        , id: "contextmenu1"
        , title: "右クリックメニュー"
    });
});

/**
 * 右クリックメニュー選択イベント
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["contentsScript.js"]
      });
});

