const mouse = require("./mouse");
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}




async function autoPlace(width, height, start, delay) {
    all_tiles = [];

    const tile_count = width * height;

    for(let n = 0; n < Math.ceil(count / tile_count); n++) {
        let tile_pos = { ... start };
        for(let j = 0; j < width; j++) {
            
            let tile_row = { ... tile_pos };
            for(let x = 0; x < height; x++) {

                all_tiles.push({ ... tile_row })
            
                tile_row.x += 32;
                tile_row.y += 16;
            }

            tile_pos.x -= 32;
            tile_pos.y += 16;
        }
    }


    all_tiles.length = count;

    all_tiles.forEach(async (tile, i) => {
        await sleep(i * delay);
        await mouse.moveTo(tile.x, tile.y);
        await mouse.click();
    })
}





const width = 13;
const height = 8;
const start = {x: 1010, y: 500};
const delay = 700;
const count = 750;

autoPlace(width, height, start, delay, count);