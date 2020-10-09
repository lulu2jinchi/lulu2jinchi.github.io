let duck1 = document.querySelector('.duck1');
let duck2 = document.querySelector('.duck2');
let toushiText = document.querySelector('.toushiText');
let yzb;
let xzb;
let dx1 = 0;
let dy1 = 0;
let dx2 = 0;
let dy2 = 0;
let littled = 5;

function dist(clickx, clicky, x, y) {
    return (Math.sqrt(Math.pow(clickx - x, 2) + Math.pow(clicky - y, 2)));
}

function sin(clickx, clicky, x, y, littled) {
    let xiebian = dist(clickx, clicky, x, y);
    let sinx = (clicky - y) / xiebian;
    return littled * sinx;
}
function cos(clickx, clicky, x, y, littled) {
    let xiebian = dist(clickx, clicky, x, y);
    let cosx = (clickx - x) / xiebian;
    return littled * cosx;
}

let interval = 0;

function zuobiao(event) {
    xzb = event.clientX;
    yzb = event.clientY;

    function move() {
        dx1 = cos(xzb, yzb, duck1.offsetLeft, duck1.offsetTop, littled);
        dy1 = sin(xzb, yzb, duck1.offsetLeft, duck1.offsetTop, littled);
        dx2 = cos(xzb, yzb, duck2.offsetLeft, duck2.offsetTop, littled);
        dy2 = sin(xzb, yzb, duck2.offsetLeft, duck2.offsetTop, littled);

        console.log(Math.acos(dx1 / littled) * 180 / Math.PI);

        if (dist(xzb, yzb, duck1.offsetLeft, duck1.offsetTop) > 20) {
            duck1.style.top = (duck1.offsetTop + dy1) + 'px';
            duck1.style.left = (duck1.offsetLeft + dx1) + 'px';
        }
        if (dist(xzb, yzb, duck2.offsetLeft, duck2.offsetTop) > 20) {
            duck2.style.top = (duck2.offsetTop + dy2) + 'px';
            duck2.style.left = (duck2.offsetLeft + dx2) + 'px';
        }

        if (dist(xzb, yzb, duck1.offsetLeft, duck1.offsetTop) <= 20 && dist(xzb, yzb, duck2.offsetLeft, duck2.offsetTop) <= 20) {
            clearInterval(interval);
        }
    }
    if(interval > 0) {
        clearInterval(interval);
    }
    interval = setInterval(
        ()=>{
            move();
        }, 50
    );
}

// zuobiao();

// function sleep(n) {
//     let start = new Date().getTime();
//     while (true) {
//         var time = new Date().getTime();
//         if (time - start > n) {
//             break;
//         }
//     }
// }
// if (dist(xzb, yzb, duck2.offsetTop, duck2.offsetLeft) > 10) {
    //     setTimeout(
        //         () => {
            //             let dx = 0;
            //             let dy = 0;
            
            //             dx = 5 * cos(xzb, yzb, duck2.offsetLeft, duck2.offsetTop);
            //             dy = 5 * sin(xzb, yzb, duck2.offsetLeft, duck2.offsetTop);
            
            //             duck2.style.top = (duck2.offsetTop + dy) + 'px';
            //             duck2.style.left = (duck2.offsetLeft + dx) + 'px';
            
            //             f();
//         }, 50
//     );
// }


function toushi(event) {
    xzb1 = event.clientX;
    yzb1 = event.clientY;
    if (yzb1 < 480 || yzb1 > 760) {
        toushiText.style.display = "none";
        toushiText.innerHTML = "";
    } else {
        toushiText.style.display = "block";
        toushiText.style.position = "absolute";
        toushiText.style.top = yzb1 - 20;
        toushiText.style.left = xzb1;
        toushiText.style.color = "yellow";
        toushiText.innerHTML = "投食";
    }
}
