/**
 * 実行するタイミングは
 * kintoine.vents.onで指定する。
 */
(() => {
    'use strict';

    kintone.events.on('app.record.index.show', (e) => {
        alert('一覧画面');
    });

    kintone.events.on('app.record.detail.show', (e) => {
        alert('詳細画面');
    });

    kintone.events.on('app.record.create.show', (e) => {
        alert('追加画面');
    });


})();