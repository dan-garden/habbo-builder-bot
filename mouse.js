const exec = require('child_process').execFile;
async function execute(params, path) {
    let promise = new Promise((resolve, reject) => {
        exec("mouse.exe", params, { cwd: path }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });

    });
    return promise;
}







module.exports = {
    click: async () => await execute(["click"]),
    doubleClick: async () => await execute(["doubleClick"]),
    rightClick: async () => await execute(["rightClick"]),
    position: async () => await execute(["position"]).then(result => {
        result = result.split("\r")[0].trim().split("x");
        return { x: parseInt(result[0]), y: parseInt(result[1]) };
    }),
    scrollUp: async (n) => await execute(["scrollUp", n]),
    scrollDown: async (n) => await execute(["scrollDown", n]),
    moveBy: async (x, y) => await execute(["moveBy", `${x}x${y}`]),
    moveTo: async (x, y) => await execute(["moveTo", `${x}x${y}`]),
    dragBy: async (x, y) => await execute(["dragBy", `${x}x${y}`]),
    dragTo: async (x, y) => await execute(["dragTo", `${x}x${y}`])
};