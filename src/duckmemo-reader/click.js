// const bottomBoxHidden = document.querySelector("#wordMessage");
// bottomBoxHidden.hidden = true;
const word = document.querySelector(".word");
const translations = document.querySelector(".translations");

document.addEventListener("selectionchange", translation);
document.addEventListener("contextmenu", (event)=>{
    event.preventDefault();
});

function translation() {
    let selObj = window.getSelection();
    let txt = selObj.toString();
    word.innerHTML=txt;
    if(!txt) {
        // bottomBoxHidden.hidden = true;
        return ;
    }
    // bottomBoxHidden.hidden = false;
    let wordTranslation = "http://127.0.0.1:5000/dict/" + txt;
    console.log(wordTranslation);
    let request3 = new XMLHttpRequest();
    request3.open('GET', wordTranslation, true);
    request3.send();
    request3.onreadystatechange = () => {
        // console.log('当前的请求状态是：' + request3.readyState);
        if (request3.readyState === 4) {
            // console.log('请求已经完成了');
            // console.log(request3.responseText);
            console.log(JSON.parse(request3.responseText));
            translations.innerHTML=JSON.parse(request3.responseText);

        }
        // console.log(this.newsTextList);
    };






}