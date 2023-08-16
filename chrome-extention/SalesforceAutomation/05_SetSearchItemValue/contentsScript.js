/**
 * プルダウンを選択する
 * @param {string} target_label_name 画面上の表示ラベル名
 * @param {string} option_value 設定値
 */
async function selectPulldown(target_label_name, option_value) {
    const container = document.querySelector('.actionBody');
    const items = container.querySelectorAll('button[role="combobox"]');

    // 該当プルダウンを検索する。
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const aria_label = item.getAttribute('aria-label');
        if (!aria_label) {
            continue;
        }
        // ラベル名を取得する。
        const label_name = aria_label.split(',')[0];
    
        // 該当プルダウンをクリック
        if (label_name == target_label_name) {
            
            // 0.01秒待機
            item.click();
            await sleep(10);

            // 値の一致するオプションをクリックする。
            const options = item.parentNode.parentNode.parentNode.querySelectorAll('lightning-base-combobox-item');
            for (let j = 0; j < options.length; j++) {
                const option = options[j];
                const val = option.getAttribute('data-value');
                if (val == option_value) {
                    option.click();
                    return;
                }
            }
        }
    }
}

/**
 * テキストボックス、テキストエリアに入力する
 * @param {string} target_label_name 画面上の表示ラベル名
 * @param {string} text 設定値
 */
async function inputText(target_label_name, text) {
    const container = document.querySelector('.actionBody');
    const items = container.querySelectorAll('input[part="input"], textarea.slds-textarea');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const label = item.parentNode.parentNode;
        if (label.innerText == target_label_name) {
            // item.value = text;
            await CDPInputText(item, text);
            return;
        }
    }
}

/**
 * コンボボックスを選択する
 * @param {string} target_label_name 画面上の表示ラベル名 ("名"の除いた文字列)
 * @param {string} text 入力値 
 */
async function selectCombobox(target_label_name, text) {
    const container = document.querySelector('.actionBody');
    const items = container.querySelectorAll('input[role="combobox"]');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const placeholder = item.getAttribute('placeholder');
        const label_name = placeholder.replace('を検索...', '');
        if (label_name == target_label_name) {

            // キーワード入力
            item.focus();
            await CDPInputText(item, text);
            await CDPInputText(item, text);

            // 検索ボタン押下
            await asyncClick((args) => {
                return args[0].parentNode.parentNode.querySelector('lightning-base-combobox-item[data-value="actionAdvancedSearch"]');
            }, [item]); 

            // モーダル画面が表示されるまで待機 
            await asyncConditionalWait((args) => {
                const modal = document.querySelector('.modal-container');
                const item1 = modal.querySelector('a[data-refid="recordId"]');
                const item2 = modal.querySelector('div[role="region"]');
                return item1 || item2;
            });

            // アイテム または キャンセルボタンをクリック
            const modal = document.querySelector('.modal-container');
            const item1 = modal.querySelector('a[data-refid="recordId"]');
            if (item1) {
                item1.click();
            } else {
                const cancel_button = modal.querySelector('button[title="キャンセル"]');
                cancel_button.click();
            }
            
            // モーダル画面が閉じるまで待機
            await asyncConditionalWait((args) => {
                const modal = document.querySelector('.modal-container');
                return (!modal);
            });
            return;
        }
    }
}
    

/**
 * 指定時間待機する
 * @param {integer} ms 
 */
async function sleep(ms) {
    await new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

/**
 * CDP経由のテキスト入力
 * @param {HTMLElement} item DOM要素
 */
async function CDPInputText(item, text) {
    item.value =  text + '★';
    item.focus();
    const param =  {process_type:'key'};
    await sendCommand(param);
}

/**
 * background.jsへコマンドを送信する
 * @param {} param bgへ連携するパラメータ
 */
async function sendCommand(param) {
    try {
        const result = await chrome.runtime.sendMessage(param);
        console.log(result);
        return result;
    } catch (err) {
    }
}

/**
 * DOMノードを取得する（非同期）
 */
async function asyncGetNode(selector, args = {}, timeout = 10000) {
    const begin_time = new Date().getTime();
    let diff_time = 0;
    do {
        try {
            const item = selector(args);
            if (item) {
                return item;
            }
        }
        catch (err) {
            // do nothing
        }
        diff_time = new Date().getTime() - begin_time;
        await sleep(100);
    } while(diff_time < timeout);
}

/**
 * function selectorがtrueを返却するまで処理を中断する
 */ 
    async function asyncConditionalWait(selector, args = {}, timeout = 10000) {
    const result = await asyncGetNode(selector, args, timeout);
}

/**
 * ノードのクリックを行う(非同期)
 */
async function asyncClick(selector, args = {}, timeout = 10000) {
    const result = await asyncGetNode(selector, args, timeout);
    result.click();
}

async function main() {
    await selectPulldown('優先度', 'High');
    inputText('Web 会社名', 'ABCソリューション')
    await selectCombobox('取引先責任者', '雪村アオイ');
}
main();