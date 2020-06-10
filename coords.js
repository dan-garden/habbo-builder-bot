const mouse = require("./mouse");

mouse.position().then(pos => {
    console.log(pos);
})