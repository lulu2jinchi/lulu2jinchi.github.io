const button5 = document.querySelectorAll(".button5");
const pay = document.querySelector("#pay");
const boxcolor = document.querySelector(".fa-dropbox");
const addnumber = document.querySelector(".addnumber");
const button10 = document.querySelectorAll(".button10");
const singletextAll = document.querySelectorAll(".single");
const money = document.querySelector("#money");
// const money1 = document.querySelector("#money1");
const num1 = document.querySelector("#num");
const num2 = document.querySelector("#num1");
const wei = document.querySelector("#text4")
const pay1 = document.querySelector("#pay");
const show = document.querySelector(".fa-dropbox");
const bottom = document.querySelector("#last-bottom");
const bottom0 = document.querySelector("#last-bottom0");
const cartitem = document.querySelector("#cart-item");


bottom.hidden = false;
bottom0.hidden = true;
addnumber.hidden = true;
money.hidden = true;
// money1.hidden = true;
num1.hidden = true;
num2.hidden = true;
wei.hidden = false;


for (let i = 0; i < button10.length; i++) {
    button10[i].hidden = true;
    singletextAll[i].hidden = true;
    button10[i].addEventListener('click', minSingleNumber);
    button10[i].addEventListener('click', changeNumbermin);
}

console.log(button5);
console.log(button10);

for (let i = 0; i < button5.length; i++) {

    button5[i].addEventListener('click', changeColor);
    button5[i].addEventListener('click', changeNumber);
    button5[i].addEventListener('click', addSingleNumber);
    // button5[i].addEventListener('click', );


}

function changeColor() {
    pay.style.backgroundColor = "#74e974";
    pay.innerHTML = "去结算";
    boxcolor.style.backgroundColor = "rgb(67, 175, 224)";
}

function changeColor2() {
    pay.style.backgroundColor = "rgb(102, 101, 101)";
    pay.innerHTML = "¥0起送";
    boxcolor.style.backgroundColor = "rgb(68, 67, 67)";
}
addnumber.hidden = true;
let number = 0;

function changeNumber(event) {
    addnumber.hidden = false;
    addnumber.innerHTML = ++number;
    console.log(event.target);
}

function changeNumbermin(event) {
    addnumber.innerHTML = --number;
    console.log(event.target);
    if (number == 0) {
        addnumber.hidden = true;
        changeColor2();
    }
}

function addSingleNumber(event) {
    console.log(event.target);
    var btn = event.target.parentNode.parentNode;
    const singleplus = btn.querySelector('.button5');
    const singletext = btn.querySelector(".single");
    const button1001 = btn.querySelector(".button10");
    const pricetext = btn.querySelector(".text3");
    const name = btn.querySelector(".text6");
    const originalPrice = btn.querySelector("#delete");

    let pricebig = pricetext.innerHTML;
    // var regexp = /<span class="small">¥</span>(.*) <span id="delete">.+</span>/g
    // var price = pricebig.match(regxp);
    console.log(pricebig);
    // console.log(price);
    let singleNumber = singletext.innerHTML;
    singleNumber++;
    singletext.innerHTML = singleNumber;
    button1001.hidden = false;
    singletext.hidden = false;
    const num = btn.querySelector(".text3");
    let numtext = num.innerHTML;
    console.log(numtext);
    // let numNumber = Math.round(parseFloat(numtext)*10)/10;
    let numNumber = parseFloat(numtext);
    console.log(numNumber);
    // let num1text = Math.round(parseFloat(num1.innerHTML)*10)/10;
    let num1text = parseFloat(num1.innerHTML);
    // num1.innerHTML = (num1text + numNumber).toFixed(1);
    // num1.innerHTML = (num1text + numNumber).toFixed(1);
    num1.innerHTML = formatNumber(num1text + numNumber);

    const num0 = btn.querySelector("#delete");
    let numtext0 = num0.innerHTML;
    console.log(numtext0);
    // let numNumber = Math.round(parseFloat(numtext)*10)/10;
    let numNumber0 = parseFloat(numtext0.match(/\d+\.*\d*/g)[0]);
    // let numNumber0 = parseFloat(numtext0);
    console.log(numNumber0);
    // let num1text = Math.round(parseFloat(num1.innerHTML)*10)/10;
    console.log(num2.innerHTML);

    let num1text0 = parseFloat(num2.innerHTML.match(/\d+\.*\d*/g)[0]);
    // num1.innerHTML = (num1text + numNumber).toFixed(1);
    // num1.innerHTML = (num1text + numNumber).toFixed(1);
    num2.innerHTML = formatNumber(num1text0 + numNumber0);

    // let num1Str = num1.innerHTML.toString();
    // let index = num1Str.indexOf('.');
    // let result = num1text.toFixed(1);
    // num1.innerHTML = result;
    // num1text = Math.round(parseFloat(num1.innerHTML)*10)/10;
    wei.hidden = true;
    money.hidden = false;
    //    money1.hidden = false;
    num1.hidden = false;
    num2.hidden = false;

    bottom.hidden = true;
    bottom0.hidden = false;

    const box = document.querySelector('#cart-item');

    const oneItem = document.createElement('div');
    //设置css class
    oneItem.className = "smallbox";

    function yesOrNo() {
        let result = 1;
        const name0 = document.querySelectorAll(".name");

        for (let i = 0; i < name0.length; i++) {
            if (name.innerHTML == name0[i].innerHTML) {
                var aha = name0[i].parentNode;
                const single = aha.querySelector('.single');
                let single0 = single.innerHTML;
                single0++;
                single.innerHTML = single0;
                result = 0;
                if(single.innerHTML==0){
                    aha.hidden=true;
                }

            }
        } return result;
    }
     


    if (yesOrNo()) {
        //设置盒子的内容，用模版字符串
        oneItem.innerHTML = `
                <span class="name">${name.innerHTML}</span>
                <span class="originalPrice">${originalPrice.innerHTML}</span>
                <span class="nowMoney">¥</span>
                <span class="nowPrice">${num.innerHTML}</span>
                <button class="button666"><span class="fa fa-plus-circle"></span></button>
                <span class="single">${singleNumber}</span>
                <button class="button66"><span class="fa fa-minus"></span></button>
           `;
        //将本行数据的盒子放到大盒子
        box.appendChild(oneItem);
    }

}

// function textNumber(){
//     let text4text = text4.innerHTML;
// }



function minSingleNumber(event) {
    console.log(event.target);
    var btn = event.target.parentNode.parentNode;
    const button1001 = btn.querySelector('.button10');
    const singletext = btn.querySelector(".single");
    let minNumber = singletext.innerHTML;
    minNumber--;
    singletext.innerHTML = minNumber;
    if (minNumber == 0) {
        button1001.hidden = true;
        singletext.hidden = true;
    }
    const num = btn.querySelector(".text3");
    let numtext = num.innerHTML;
    console.log(numtext);
    // let numNumber = Math.round(parseFloat(numtext)*10)/10;
    let numNumber = parseFloat(numtext);
    console.log(numNumber);
    // let num1text = Math.round(parseFloat(num1.innerHTML)*10)/10;
    let num1text = parseFloat(num1.innerHTML);
    // num1.innerHTML = Math.round(num1text - numNumber)*100/100;
    num1.innerHTML = formatNumber(num1text - numNumber);

    const num0 = btn.querySelector("#delete");
    let numtext0 = num0.innerHTML;
    console.log(numtext0);
    // let numNumber = Math.round(parseFloat(numtext)*10)/10;
    let numNumber0 = parseFloat(numtext0.match(/\d+\.*\d*/g)[0]);
    // let numNumber0 = parseFloat(numtext0);
    console.log(numNumber0);
    // let num1text = Math.round(parseFloat(num1.innerHTML)*10)/10;
    console.log(num2.innerHTML);

    let num1text0 = parseFloat(num2.innerHTML.match(/\d+\.*\d*/g)[0]);
    // num1.innerHTML = (num1text + numNumber).toFixed(1);
    // num1.innerHTML = (num1text + numNumber).toFixed(1);
    num2.innerHTML = formatNumber(num1text0 - numNumber0);

    // let num1Str = num1.innerHTML.toString();
    // let index = num1Str.indexOf('.');
    // let result = num1Str.slice(0, er6index + 3);  
    // let result = num1text;
    // num1.innerHTML = result;

    if (num1.innerHTML == 0) {
        wei.hidden = false;
        money.hidden = true;
        num1.hidden = true;
        //    money1.hidden = true;
        num2.hidden = true;
        bottom.hidden = false;
        bottom0.hidden = true;

    }
}

function formatNumber(number) {
    if (number % 1 === 0) {
        return number;
    } else {
        return number.toFixed(1);
    }
}


const boc = document.querySelector('#hidden');
let isCartHidden = true;
boxcolor.addEventListener('click', () => {
    console.log('box color clicked')
    isCartHidden = !isCartHidden;
    boc.hidden = isCartHidden;
});

const empty = document.querySelector("#empty");
empty.addEventListener("click",() => {
   const ahaha = document.querySelectorAll(".single");
   for(let i=0; i<ahaha.length;i++){
       ahaha[i].innerHTML=0;
   }
    cartitem.innerHTML="";
    
    

});




// function minSingleNumber(event){
//     console.log(event.target);
//     var btn = event.target.parentNode.parentNode;
//     const singletext = btn.querySelector('.single');
//     let minNumber = singletext.innerHTML;
//     minNumber--;
//     singletext.innerHTML = minNumber;
//     const singlemin = btn.querySelector(".button10");
// }


// paycolor.forEach(item=>item.addEventListener('click',
//     () => {
//         pay.style.backgroundColor = "#74e974";
//         pay.innerHTML = "去结算"
//     });

// paycolor.forEach(item=>item.addEventListener('click',changeColor))
//     function changeColor() {
//         pay.style.backgroundColor = "#74e974";
//         pay.innerHTML = "去结算"
//     }

// NodeList(12) [button.button7.button5, button.button7.button5, button.button7.button5, button.button5, button.button5, button.button5, button.button5, button.button5, button.button5, button.button5, button.button5, button.button5]
// script.js:23 <span class=​"fa fa-plus-circle">​…​</span>​
// event
// MouseEvent {isTrusted: true, screenX: 164, screenY: -511, clientX: 909, clientY: 1045, …}
// var btn = event.target
// undefined
// btn
// <span class=​"fa fa-plus-circle">​…​</span>​
// btn.parentNode
// <button class=​"button5">​…​</button>​
// btn.parentNode.parentNode
// <div class=​"hahaha">​…​</div>​
// var parent = btn.parentNode.parentNode
// undefined
// parent.querySelector('.single')
// <span class=​"single">​1​</span>​
// parent.querySelector('.single').innerText
// "1"
// let number = parent.querySelector('.single').innerText;
// undefined
// number
// 4
// parseInt('33')
// 33
// parent.hidden = true
// true
// parent.hidden = false
// false

