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
            item.value = text;
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

async function main() {
    await selectPulldown('優先度', 'High');
    inputText('Web 会社名', 'ABCソリューション')
}
main();