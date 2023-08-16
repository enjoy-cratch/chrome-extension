/**
 * 実行するタイミングを指定していないので
 * 画面を切り替えるたびに呼び出される。
 */
(() => {
    'use strict';

    kintone.events.on('app.record.detail.show', (e) => {
        const myMenuButton = document.createElement('button');
        myMenuButton.id = 'my_menu_button';
        myMenuButton.innerText = 'ボタン';
        myMenuButton.onclick = function() {
            window.alert('id: ' + kintone.app.record.getId());
            let fieldValue = '';
            const rec = kintone.app.record.get();
            if (rec) {
                console.log(rec.record['CompanyName']['value']);
                 fieldValue = rec.record['CompanyName']['value'];
            }
        };

        
        kintone.app.record.getHeaderMenuSpaceElement().appendChild(myMenuButton);
    });
})();