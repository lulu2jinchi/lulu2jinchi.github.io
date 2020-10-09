const button = document.querySelectorAll(".btn");
const simple = document.querySelector(".simple");
const middle = document.querySelector(".middle");
const hard = document.querySelector(".hard");
const gameName = document.querySelector("#gameName");
const mainDiv = document.querySelector("#mainDiv");
const title = document.querySelector("#title");
const page = document.querySelector(".page");
const flagNum = document.querySelector(".flagNum");
const time = document.querySelector(".time");
let timeNum = 1;
let clickNum = 0;
let gezi;
let mineNumber = 0;
let leftMineNumber = 0;

title.hidden = true;

// document.addEventListener("click", CreateTable);
simple.addEventListener('click', () => {
    createGame(9, 9, 10);
});
middle.addEventListener('click', () => {
    createGame(16, 16, 40);
});
hard.addEventListener('click', () => {
    createGame(30, 16, 99);
});
page.addEventListener('click', backFirstPage);

function backFirstPage() {
    location.reload();
}

let width = 0;
let height = 0;

function createGame(w, h, mine) {
    mineNumber = mine;
    leftMineNumber = mine;
    width = w;
    height = h;
    createTable(w, h);
    gridDataSet(w, h, mine);
}

function createTable(width, height) {
    gameName.hidden = true;
    title.hidden = false;
    simple.hidden = true;
    middle.hidden = true;
    hard.hidden = true;
    setInterval(
        function () {
            time.innerHTML = timeNum++;
        }, 1000);
    let table = "<table id=\'small\'>";
    for (let i = 0; i < height; i++) {
        table += "<tr>";
        for (let j = 0; j < width; j++) {
            table += "<td><div id=\"g" + i.toString() + "-" + j.toString() + "\" class=\"gezi\"></div></td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    mainDiv.innerHTML = table;
    gezi = document.querySelectorAll("div.gezi");
    for (let i = 0; i < width * height; i++) {
        gezi[i].addEventListener('contextmenu', createflag);
        gezi[i].addEventListener('click', isBeenClicked);

        // gezi[i].addEventListener('click', markClickNum(9,10));
    }

}

function createflag(event) {
    event.preventDefault();
    if (this.dataset.isclick === '1' || (leftMineNumber === 0 && !this.classList.contains('fa-flag'))) {
        return;
    }
    if (!this.classList.contains('fa-flag')) {
        if (leftMineNumber > 0) {
            leftMineNumber--;
        }
    } else {
        leftMineNumber++;
    }
    flagNum.innerHTML = leftMineNumber;
    this.classList.toggle('fa');
    this.classList.toggle('fa-flag');
}


function randomInteger(min, max) {
    let ranInt = Math.round(min - 0.5 + (max - min + 0.5) * Math.random());
    // console.log(ranInt); 
    return ranInt;

}

/**
 * 
 * [
 *   [1, 3],
 *   [3, 6],
 * ]
 */
function isPositionExist(arr, a) {
    let num = arr.findIndex(item => item[0] === a[0] && item[1] === a[1]);
    if (num > -1) {
        return true;
    } else {
        return false;
    }
}

function generateMinePostions(width, height, n) {
    let i = 0;
    let arr = [];
    while (i < n) {
        let a = [];
        a[0] = randomInteger(0, height - 1);
        a[1] = randomInteger(0, width - 1);
        if (!isPositionExist(arr, a)) {
            i++;
            arr.push(a);
        }
        // console.log(arr);
    }
    return arr;
}

function circleNumber(i, j, arr) {

    // console.log(arr);
    let num = 0;
    if (isPositionExist(arr, [i - 1, j - 1])) {
        num++;
    };
    if (isPositionExist(arr, [i - 1, j])) {
        num++;
    }
    if (isPositionExist(arr, [i - 1, j + 1])) {
        num++;
    }
    if (isPositionExist(arr, [i, j - 1])) {
        num++;
    }
    if (isPositionExist(arr, [i, j + 1])) {
        num++;
    }
    if (isPositionExist(arr, [i + 1, j - 1])) {
        num++;
    }
    if (isPositionExist(arr, [i + 1, j])) {
        num++;
    }
    if (isPositionExist(arr, [i + 1, j + 1])) {
        num++;
    }
    return num;
}

console.log(circleNumber(4, 5));

function gridDataSet(width, height, n) {
    let arr = generateMinePostions(width, height, n);
    if (clickNum >= width * height - n) {
        console.log('you win');
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let el = document.querySelector('#g' + i.toString() + "-" + j.toString());
            el.dataset.num = circleNumber(i, j, arr);
            // el.innerHTML = circleNumber(i,j,arr);
            if (isPositionExist(arr, [i, j])) {
                el.innerHTML = '';
                el.dataset.num = '';
                // el.classList.add('fa', 'fa-bomb');
                // const fabomb = document.querySelectorAll(".fa-bomb");
                // for (let k = 0; k < n; k++) {
                //     fabomb[k].hidden = true;
                // }
            }
        }
    }
    flagNum.innerHTML = leftMineNumber;
}

function isBeenClicked(event) {
    clickNum++;
    this.classList.add('beclick');
    this.dataset.isclick = '1';
    this.innerHTML = this.dataset.num;
    if (this.innerHTML === '0') {
        this.innerHTML = '';
        let arr = this.id.slice(1).split("-");
        console.log(arr);

        let numi1 = arr[0] - 1;
        console.log(numi1)

        let numi2 = +arr[0];
        console.log(numi2)

        let numi3 = +arr[0] + 1;
        console.log(numi3)

        let numj1 = arr[1] - 1;
        console.log(numj1)

        let numj2 = +arr[1];
        console.log(numj2)

        let numj3 = +arr[1] + 1;
        console.log(numj3)
        let btn1 = document.querySelector('#g' + numi1.toString() + '-' + numj1.toString());
        //      btn1.classList.add('beclick');
        // btn1.innerHTML = this.dataset.num;
        if (btn1 && !btn1.dataset.isclick == '1') {
            btn1.click();
        }

        let btn2 = document.querySelector('#g' + numi1.toString() + '-' + numj2.toString());
        if (btn2 && !btn2.dataset.isclick == '1') {
            btn2.click();
        }

        let btn3 = document.querySelector('#g' + numi1.toString() + '-' + numj3.toString());
        if (btn3 && !btn3.dataset.isclick == '1') {
            btn3.click();
        }

        let btn4 = document.querySelector('#g' + numi2.toString() + '-' + numj1.toString());
        if (btn4 && !btn4.dataset.isclick == '1') {
            btn4.click();
        }
        let btn5 = document.querySelector('#g' + numi2.toString() + '-' + numj3.toString());
        if (btn5 && !btn5.dataset.isclick == '1') {
            btn5.click();
        }
        let btn6 = document.querySelector('#g' + numi3.toString() + '-' + numj1.toString());
        if (btn6 && !btn6.dataset.isclick == '1') {
            btn6.click();
        }
        let btn7 = document.querySelector('#g' + numi3.toString() + '-' + numj2.toString());
        if (btn7 && !btn7.dataset.isclick == '1') {
            btn7.click();
        }
        let btn8 = document.querySelector('#g' + numi3.toString() + '-' + numj3.toString());
        if (btn8 && !btn8.dataset.isclick == '1') {
            btn8.click();
        }

        //  console.log(btn1.innerHTML);


        // console.log('hahaha');

    }
    else if (this.innerHTML === '') {
        Array.from(document.querySelectorAll('.gezi[data-num=""]')).forEach(g => g.classList.add('fa', 'fa-bomb'));

        setTimeout(
            () => {
                let isReatart = confirm('you lost!重来吗');
                if (isReatart) {
                    backFirstPage();
                }
            }, 0
        )
    }

    if (clickNum >= width * height - mineNumber) {
        let mintime = localStorage.getItem('key');
        alert('you win');
        if (timeNum < mintime) {
            mintime = timeNum;
            localStorage.setItem('key', mintime);
        }
        alert('最佳记录：' + localStorage.getItem('key') + 's');
    }
}









