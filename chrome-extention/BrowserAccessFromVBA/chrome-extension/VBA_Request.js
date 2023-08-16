/**
 * リクエストデータ
 * データはクリップボード経由で取得する。
 */
class VBA_Request {
    // データを取得する。
    async getData() {
        const HEADER = 'VBA_TO_CHROME';
        const row_data = await navigator.clipboard.readText();
        const lines = row_data.split("\r\n");
        let params = [];
        console.log(row_data);
        if (lines[0] === HEADER) {
            const kvs = lines[1].split('&');
            kvs.forEach((kv) => {
                params.push(kv.split('='));
            });
        }
        return params;
    }
}