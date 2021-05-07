const Hapi = require("@hapi/hapi");
const {routed} = require("./routes");

const init = async () =>{
    const server = Hapi.server({
        host: "localhost",
        port: 5000,
        routes: {
            cors : {
                origin: ["*"],
            },
        },
    });

    server.route(routed);

    await server.start();
    console.log(`dijalankan dengan : ${server.info.uri}`);

};


init();


















