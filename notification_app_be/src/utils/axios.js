const axios = require("axios");

const api = axios.create({
    baseURL: "http://20.207.122.201/evaluation-service",
    headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        "Content-Type": "application/json"
    }
});

module.exports = api;