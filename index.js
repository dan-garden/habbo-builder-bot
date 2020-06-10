const mouse = require("./mouse");
const autoPlace = require("./auto-place.js");
const args = process.argv.slice(2)

const layouts = {
    "104": [13, 8],
    "416": [26, 16]
};

const layout = "104";

const delay = 800; //Fresh
// const delay = 400; //My retro
const count = parseInt(args[0]) || 500;

mouse.position().then(start => {
    autoPlace(layouts[layout][0], layouts[layout][1], start, delay, count, true);
});