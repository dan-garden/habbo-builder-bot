const mouse = require("./mouse");
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  


async function autoPlace(width, height, start, delay, count, click=true) {
    let running = true;
    let mouse_pos = false;
    all_tiles = [];

    const time_taken = delay * count;
    let time_left = delay * count;
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


    console.log("Estimated time:   " + millisToMinutesAndSeconds(time_taken));

    all_tiles.length = count;
    all_tiles.forEach(async (tile, i) => {
        await sleep(i * delay);
        time_left -= (delay);
        if(running) {
            console.log("Time remaining: " + millisToMinutesAndSeconds(time_left) + `[${(i+1)}/${count}]`);
            mouse_pos = {x: tile.x-1, y: tile.y-1};
            await mouse.moveTo(tile.x, tile.y);
            if(click) {
                await mouse.click();
            }
        }
    });


    // setInterval(async () => {
    //     if(running && mouse_pos) {
    //         let pos = await mouse.position();
    //         // if((pos.x != mouse_pos.x || pos.y != mouse_pos.y)) {
    //             // running = false;
    //             // process.exit();
    //         // }
    //     }
    // }, 100);
}

module.exports = autoPlace;