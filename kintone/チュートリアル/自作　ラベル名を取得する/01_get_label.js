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
            const body = {
                app: kintone.app.getId(),
                id: 2
            }
            kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true)
            , 'GET'
            , body
            , (res) => {
                console.log(res.properties["TestText1"].label);
                console.log(res.properties["CompanyName"].label);
            });
        };

        
        kintone.app.record.getHeaderMenuSpaceElement().appendChild(myMenuButton);
    });
})();