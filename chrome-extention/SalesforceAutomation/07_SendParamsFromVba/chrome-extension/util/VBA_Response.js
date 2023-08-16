/**
 * レスポンスデータ
 * データはクリップボード経由で返却する
 */
class VBA_Response {
    // ステータス、メッセージ、データはいずれも任意
    // 返却先の必要に応じて設定する
    #mStatus
    #mMessage;
    #mData = [];
    
    // Setter
    setStatus(status) {
        this.#mStatus = status;
    }
    setMessage(message){
        this.#mMessage = message;
    }
    addData(key, value) {
        this.#mData.push(key + '=' + value);
    }
    
    // データを返却する
    async sendData() {
        const HEADER = 'CHROME_TO_VBA';
        const NEWLINE = '\r\n';
        let str = HEADER + NEWLINE;
        str += this.#mStatus + NEWLINE;
        str += this.#mMessage + NEWLINE;
        str += this.#mData.join('&');
        await navigator.clipboard.writeText(str);
    }
}