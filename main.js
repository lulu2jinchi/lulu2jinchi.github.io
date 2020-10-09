const init = function (img) {
    const t = 1000;
    let [w, h] = [img.width, img.height];
    const cover = document.createElement('canvas');
    cover.height = h;
    cover.width = w;
    cover.style.position = 'absolute';
    cover.style.top = img.offsetTop + 'px';
    cover.style.left = img.offsetLeft + 'px';
    let [top, left] = [img.offsetTop, img.offsetLeft];
    const ctx = cover.getContext('2d');
    const drawCover = function () {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img2, 0, 0, w, h);
    }
    let isDrawing = true;
    let path = [];
    const drawLine = function (now) {
        ctx.globalCompositeOperation = 'source-over';
        drawCover();
        path = path.filter(p => now - p.time < t);
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 100;
        //         console.log('path length', path.length);
        for (let p of path) {
            const alpha = (1 - (now - p.time) / t);
            //console.log('alpha: ', alpha);
            ctx.strokeStyle = `rgba(0, 100, 0, ${alpha})`;
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        requestAnimationFrame(drawLine);
    }

    const startFunc = function (event) {
        event.preventDefault();
        isDrawing = true;
        ctx.moveTo((event.clientX || event.changedTouches[0].clientX) - left, (event.clientY || event.changedTouches[0].clientY) - top);
    }
    cover.addEventListener(
        'mousedown', startFunc
    );
    cover.addEventListener(
        'touchstart', startFunc
    );
    const moveFunc = function (event) {
        event.preventDefault();
        requestAnimationFrame(
            () => {
                if (isDrawing) {
                    const point = {
                        x: (event.clientX || event.changedTouches[0].clientX) - left,
                        y: (event.clientY || event.changedTouches[0].clientY) - top,
                        time: performance.now()
                    };
                    // console.log(`x:${point.x} y:${point.y}`);
                    // console.log(`w:${w} h:${h}`);
                    path.push(
                        point
                    )
                }
            }
        )
    }
    cover.addEventListener('mousemove', moveFunc);
    cover.addEventListener('touchmove', moveFunc);

    const upFunc = function (event) {
        event.preventDefault();
        // isDrawing = false;
    }
    cover.addEventListener('mouseup', upFunc);
    cover.addEventListener('touchend', upFunc);
    const img2 = new Image();
    img2.src = 'firstpic.png';
    img2.onload = () => {
        document.body.append(cover);
        requestAnimationFrame(drawLine);
    };
    //调整窗口大小后调整坐标系
    window.addEventListener('resize', function () {
        setTimeout(
            () => {
                [w, h] = [img.width, img.height];
                cover.height = h;
                cover.width = w;
                cover.style.top = img.offsetTop + 'px';
                cover.style.left = img.offsetLeft + 'px';
                [top, left] = [img.offsetTop, img.offsetLeft];
                isDrawing = false;
                path = [];
            }, 0
        )
    });
}
const backImage = document.querySelector('#backImg');
if (backImage.complete) {
    init(backImage);
}
backImage.onload = function () {
    init(backImage);
}

const cover = document.querySelector('.cover');

window.addEventListener('click', function () {
    cover.classList.add('slide-up');
});

function getChengji(name, grade) {
    return {
        NAME: name,
        GRADE: grade,
        toString: function () {
            return '姓名为' + this.NAME + '的学生的成绩是' + this.GRADE;
        },
        valueOf: function () { return this.GRADE }
    }
}

//类数组，就是一个有整数下标和length属性的对象
const mainPage = document.querySelector("#main");
const aboutMe = document.querySelector(".aboutMe");

mainPage.hidden = false;

aboutMe.addEventListener('click',function(){
    mainPage.hidden = true;
});
