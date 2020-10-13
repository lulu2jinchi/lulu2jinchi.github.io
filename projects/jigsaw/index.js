const HORIZONTAL_TILES_NUM = 4;
const VERTICAL_TILES_NUM = 4;

const TILE_CLASS = 'tile';

const createImg = function(source, row, col) {
    const img = document.createElement('canvas');
    const ctx = img.getContext('2d');
    const tile_width = source.width / HORIZONTAL_TILES_NUM;
    const tile_height = source.height / VERTICAL_TILES_NUM;
    img.width = tile_width;
    img.height = tile_height;
    img.classList.add(TILE_CLASS);
    img.dataset.row = row;
    img.dataset.col = col;
    ctx.drawImage(source, 
        col * tile_width, row * tile_height, 
        tile_width, tile_height, 
        0, 0, 
        tile_width, tile_height
        );
    return img;
}

const insertImg = function(img) {
    document.body.appendChild(img);
    img.style.top = Math.random() * (window.innerHeight - img.height);
    img.style.left = Math.random() * (window.innerWidth - img.width);
}

const getGridEle = function(grid, row, col) {
    if (row >= 0 && row < VERTICAL_TILES_NUM && col >= 0 && col < HORIZONTAL_TILES_NUM) {
        return grid[row][col];
    } else {
        return null;
    }
}

const findAdjacentTiles = function(img) {
    const [r, c] = [parseInt(img.dataset.row), parseInt(img.dataset.col)];
    return {
        top: getGridEle(grid, r - 1, c),
        right: getGridEle(grid, r, c + 1),
        down: getGridEle(grid, r + 1, c),
        left: getGridEle(grid, r, c - 1),
    }
}

const checkThreshold = function(val1, val2) {
    const threshold = 6;
    return Math.abs(val1 - val2) < threshold;
}

const isNearby = function(img1, img2, direction) {
    switch (direction) {
        case 'top':
            return checkThreshold(img1.offsetTop, img2.offsetTop + img2.clientHeight)
                   && checkThreshold(img1.offsetLeft, img2.offsetLeft);
        case 'right':
            return checkThreshold(img1.offsetLeft + img1.clientWidth, img2.offsetLeft)
                   && checkThreshold(img1.offsetTop, img2.offsetTop);
        case 'down':
            return checkThreshold(img1.offsetTop + img1.clientHeight, img2.offsetTop)
                   && checkThreshold(img1.offsetLeft, img2.offsetLeft);
        case 'left':
            return checkThreshold(img1.offsetLeft, img2.offsetLeft + img2.clientWidth)
                   && checkThreshold(img1.offsetTop, img2.offsetTop);
    }
    return false;
}

const checkNearbyTile = function(img, adjacentTiles) {
    for(let dir of ['top', 'right', 'down', 'left']) {
        if (adjacentTiles[dir] && isNearby(img, adjacentTiles[dir], dir)) {
            return {
                direction: dir,
                tile: adjacentTiles[dir],
            }
        }
    }
    return null;
}

const joinNearbyTile = function(img, nearbyTile, direction) {
    switch (direction) {
        case 'top':
            img.style.top = nearbyTile.offsetTop + nearbyTile.clientHeight + 'px';
            img.style.left = nearbyTile.offsetLeft + 'px';
            break;
        case 'right':
            img.style.left = nearbyTile.offsetLeft - nearbyTile.clientWidth + 'px';
            img.style.top = nearbyTile.offsetTop + 'px';
            break;
        case 'down':
            img.style.top = nearbyTile.offsetTop - nearbyTile.clientHeight + 'px';
            img.style.left = nearbyTile.offsetLeft + 'px';
            break;
        case 'left':
            img.style.left = nearbyTile.offsetLeft + nearbyTile.clientWidth + 'px';
            img.style.top = nearbyTile.offsetTop + 'px';
            break;
    }

    for(let group of joinTable) {
        if (group.includes(nearbyTile)) {
            group.push(img);
            return ;
        }
    }

    joinTable.push(
        [
            img, nearbyTile
        ]
    );
}

const findGroup = function(img) {
    for(let group of joinTable) {
        if (group.includes(img)) {
            return group;
        }
    }
}

let grid = null;

const readImage = function(e) {
    console.log('read image: ', e);
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            console.log(reader.result);
            const image = new Image();
            image.src = reader.result;
            image.onload = function () {
                const [width, height] = [image.width, image.height];
                grid = Array(VERTICAL_TILES_NUM).fill().map(
                    (item, rowIndex) => {
                        return Array(HORIZONTAL_TILES_NUM).fill().map(
                            (i, colIndex) => {
                                const img = createImg(image, rowIndex, colIndex);
                                insertImg(img);
                                return img;
                            }
                        );
                    }
                );
            }
        }
    }
}

document.querySelector('#image_picker').addEventListener('change', readImage);

let isDragging = false;
let draggingGroup = null;
let draggingEle = null;
let adjacentTiles = null;
let lastDragX = 0;
let lastDragY = 0;
const joinTable = [];

document.addEventListener('mousedown', function(event) {
    event.preventDefault();
    const ele = event.target;
    lastDragX = event.clientX;
    lastDragY = event.clientY;
    if(ele.classList.contains(TILE_CLASS)) {
        console.log('startDragging');
        isDragging = true;
        draggingEle = ele;
        
        draggingGroup = findGroup(ele);
        if (!draggingGroup) {
            ele.classList.add('dragging');
            adjacentTiles = findAdjacentTiles(ele);
            console.log('adjacent tiles: ', adjacentTiles);
        } else {
            for(let e of draggingGroup) {
                e.classList.add('dragging', 'dragging-group');
            }
            adjacentTiles = null;
        }
    }
});

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    const dx = event.clientX - lastDragX;
    const dy = event.clientY - lastDragY;
    lastDragX = event.clientX;
    lastDragY = event.clientY;
    if(isDragging && draggingEle) {
        if (!draggingGroup) {
            draggingEle.style.top = parseFloat(draggingEle.style.top) + dy + 'px';
            draggingEle.style.left = parseFloat(draggingEle.style.left) + dx + 'px';
            const nearbyTile = checkNearbyTile(draggingEle, adjacentTiles);
            if (nearbyTile) {
                console.log('found nearby tile: ', nearbyTile);
                joinNearbyTile(draggingEle, nearbyTile.tile, nearbyTile.direction);
                isDragging = false;
                draggingEle.classList.remove('dragging');
                draggingEle = null;
            }
        } else {
            for(let ele of draggingGroup) {
                ele.style.top = parseFloat(ele.style.top) + dy + 'px';
                ele.style.left = parseFloat(ele.style.left) + dx + 'px';
            }
        }
    }
});

document.addEventListener('mouseup', function(event) {
    event.preventDefault();
    isDragging = false;
    draggingEle && draggingEle.classList.remove('dragging', 'dragging-group');
    draggingEle = null;
    if (draggingGroup) {
        for (let ele of draggingGroup) {
            ele.classList.remove('dragging', 'dragging-group');
        }
    }
});