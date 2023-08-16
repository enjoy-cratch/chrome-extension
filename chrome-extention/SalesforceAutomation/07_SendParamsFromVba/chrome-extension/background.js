/**
 * ページオープン／更新イベント
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') {
        if (tab.url.indexOf('https://testcompany83-dev-ed.develop.lightning.force.com/lightning/o/Case/new?count=1') > -1) {
            chrome.debugger.attach({tabId: tab.id}, '1.3');
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["util/VBA_Request.js", "contents/contentsScript.js"]
            });
            return;
        }
    }
});

/**
 * 現在選択中のTabを取得
 */
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

/**
 * メッセージの受信
 */
chrome.runtime.onMessage.addListener((req, send, res) => {
    // 現在のタブを取得
    // onMessage内ではasync/awaitが動作しないためthenで代用
    getCurrentTab().then((tab) => {
        const id = tab.id;

        // キー入力 (Backspace)
        if (req.process_type === 'key') {
            const processType = 'Input.dispatchKeyEvent';
            let param = {
                "type": "keyDown"
                , "key": "Backspace"
                , "code": "Backspace"
                , "windowsVirtualKeyCode": 8
             };
            chrome.debugger.sendCommand({tabId:id}, processType, param);
            res({result:'OK'});
        }
    });
    return true;
});