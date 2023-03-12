var HOST = "";
switch (location.hostname) {
    case "localhost":
        HOST = "/devApi";
        break;
    case "azdockerq.mtel.ws":
        HOST = "http://azdockerq.mtel.ws:5215";
        break;
    case "appuatcms.hilaifoods.com":
        HOST = "https://appuat.hilaifoods.com";
        break;
    default:
        // HOST=location.protocol + '//'+location.hostname;
        HOST = "https://app.hilaifoods.com";
}
export const API = {
    'login': HOST + '/api/admin/login', // 用户登录
}
