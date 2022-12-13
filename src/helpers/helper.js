import CryptoJS from 'crypto-js';

export function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
}

export function saveToken(obj) {
    let encrypt = CryptoJS.AES.encrypt(JSON.stringify(obj), import.meta.env.VITE_SECRET_TOKEN);
    localStorage.setItem("_token", encrypt);
}

export function extractToken() {
    let token = localStorage.getItem("_token") || null;
    if (token == null) return null;
    let bytes = CryptoJS.AES.decrypt(token, import.meta.env.VITE_SECRET_TOKEN);
    let json = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return json;
}