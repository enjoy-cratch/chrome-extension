(() => {
    'use strict';
    
    kintone.events.on('app.record.index.show', (event) => {
        
        // 増殖しないよう、作成済みであれば処理をしない。
        if (document.getElementById('my_index_button') !== null) {
            return;
        }
        
        // ボタンを作成する。
        const myIndexButton = document.createElement('button');
        myIndexButton.id = 'my_index_button';
        myIndexButton.innerText = '一覧のボタン';
        myIndexButton.addEventListener('click', async () => {
            const body = {
                app: kintone.app.getId(),
            }
            const data = await kintone.api(kintone.api.url('/k/v1/app/form/layout.json', true), 'GET', body);
            let result = [];
            getLayoutList(data.layout, result);
            console.log(result);
        });
        kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton); 

    });

    // レイアウトの一覧を取得する。
    function getLayoutList(layout, result) {
        layout.forEach((item) => {
            if (item.type === 'ROW' || item.type === 'SUBTABLE') {
                item.fields.forEach((field) => {
                    if (field.code) {
                        result.push(field.code);
                    }
                });
                
            } else {
                getLayoutList(item.layout, result);
            }
        });
    }
})();