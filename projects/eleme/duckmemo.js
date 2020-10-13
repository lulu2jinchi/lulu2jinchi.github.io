const bottomBoxHidden = document.querySelector("#bottomBox");

const wordForSearchHTML = document.querySelector("#wordMessage");

const wordTranslation = document.querySelector("#wordTranslation");

bottomBoxHidden.hidden = true;

document.addEventListener("selectionchange", wangyiApi);
document.addEventListener("contextmenu", (event)=>{
    event.preventDefault();
});

function wangyiApi(event) {
    let selObj = window.getSelection();
    let txt = selObj.toString();
    if(!txt) {
        return ;
    }
    // console.log(selObj);
    // console.log(txt);
    bottomBoxHidden.hidden = false;
    wordForSearchHTML.innerHTML = txt;

    let appKey = '17242a4da1226d2d';
    var key = 'UCUkFdQ4zJ1zoyvfocPC96ydpqJqqnX8';//注意：暴露appSecret，有被盗用造成损失的风险
    var salt = (new Date).getTime();
    var curTime = Math.round(new Date().getTime() / 1000);
    var query = txt;
    console.log(query);
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'en';
    var to = 'zh-CHS';
    var str1 = appKey + truncate(query) + salt + curTime + key;
    console.log(str1);
    var sign = sha256(str1);
    console.log(sign);
    $.ajax({
        url: 'http://openapi.youdao.com/api',
        type: 'post',
        dataType: 'jsonp',
        data: {
            q: query,
            appKey: appKey,
            salt: salt,
            from: from,
            to: to,
            sign: sign,
            signType: "v3",
            curtime: curTime,
        },
        success: function (data) {
            wordTranslation.innerHTML = data.translation[0];
        }
    });

    function truncate(q) {
        var len = q.length;
        if (len <= 20) return q;
        return q.substring(0, 10) + len + q.substring(len - 10, len);
    }
    // r = requests.get(youdao_url, params = data).json()   # 获取返回的json()内容
    // console.log("翻译后的结果：" + r["translation"][0])

    // return txt;
};



// document.addEventListener("", () => {

//     bottomBoxHidden.hidden = true;

// });

// let appKey = 'duckmemo网页版';
// let key = 'UCUkFdQ4zJ1zoyvfocPC96ydpqJqqnX8';//注意：暴露appSecret，有被盗用造成损失的风险
// let salt = (new Date).getTime();
// let curTime = Math.round(new Date().getTime() / 1000);
// let query = txt;
// console.log(query);
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
// let from = 'en';
// let to = 'zh-CHS';
// let str1 = appKey + truncate(query) + salt + curTime + key;
// console.log(str1);
// let sign = sha256(str1);
// $.ajax({
//     url: 'http://openapi.youdao.com/api',
//     type: 'post',
//     dataType: 'jsonp',
//     data: {
//         q: query,
//         appKey: appKey,
//         salt: salt,
//         from: from,
//         to: to,
//         sign: sign,
//         signType: "v3",
//         curtime: curTime,
//     },
//     success: function (data) {
//         // console.log(data);
//     }
// });

// function truncate(q) {
//     let len = q.length;
//     if (len <= 20) return q;
//     return q.substring(0, 10) + len + q.substring(len - 10, len);
// }



