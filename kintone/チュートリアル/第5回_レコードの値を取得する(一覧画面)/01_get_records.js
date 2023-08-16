/**
 * 実行するタイミングを指定していないので
 * 画面を切り替えるたびに呼び出される。
 */
(() => {
    'use strict';

    // 詳細画面表示
    kintone.events.on('app.record.index.show', (e) => {
        const records = e.records;
        console.log('レコード件数 ' + e.size);
        console.log('アプリID ' + e.appId);
        console.log('会社名 ' + records[3].CompanyName.value);
        console.log('会社名 ' + records[4].CompanyName.value);
        console.log('会社名 ' + records[5].CompanyName.value);
    });

})();