/**
 * 一覧画面にボタンを追加する。
 */
(() => {
    'use strict';

    kintone.events.on('app.record.index.show', (event) => {
        
        // 増殖しないよう、作成済みであれば処理をしない。
        if (document.getElementById('my_index_button') !== null) {
            return;
        }
        
        const myIndexButton = document.createElement('button');
        myIndexButton.id = 'my_index_button';
        myIndexButton.innerText = '一覧のボタン';
        kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton); 

    });
})();