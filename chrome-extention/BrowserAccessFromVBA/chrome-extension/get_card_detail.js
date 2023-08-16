async function main() {

/** クリップボード経由でVBAからのリクエストを取得する場合
    const request = new VBA_Request();
    const data = await request.getData();
    console.log(data);
*/

    const container = document.querySelectorAll('.item_box');
    const attack = container[2].innerText.split('\n')[1];
    const defense = container[3].innerText.split('\n')[1];

    const response = new VBA_Response();
    response.setStatus('SEARCHED');
    response.setMessage('message nothing');
    response.addData('攻撃力', attack);
    response.addData('守備力', defense);
    await response.sendData();
}

main();