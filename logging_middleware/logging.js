const axios = require("axios");

const api = axios.create({
    baseURL: "http://20.207.122.201/evaluation-service"
});

async function LogData(stack, level, package, message) {
    console.log(`[${stack}] [${level}] [${package}] ${message}`);
    const logData = await api.post("/logs", {
        "stack": stack,
        "level": level,
        "package": package,
        "message": message
    })
    console.log(logData.data);
}

module.exports = { LogData };