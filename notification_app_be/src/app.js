require('dotenv').config();
const express = require("express");
const cors = require('cors');
const api = require("./utils/axios"); 
const app = express();
const LogData = require("../../logging_middleware/logging").LogData;

app.use(cors());

const typeWeights = {
    Placement: 3,
    Result: 2,
    Event: 1,
};

function sortNotifications(notifications) {
    return notifications
        .slice()
        .sort((a, b) => {
            const timeA = new Date(a.Timestamp.replace(" ", "T")).getTime();
            const timeB = new Date(b.Timestamp.replace(" ", "T")).getTime();

            if (timeB !== timeA) {
                return timeB - timeA;
            }
            const weightA = typeWeights[a.Type] || 0;
            const weightB = typeWeights[b.Type] || 0;

            return weightB - weightA;
        })
        .slice(0, 10);
}

app.get("/", async (req, res) => {
    try{ 
        const data = await api.get("/notifications")
        res.json(data.data);
        res.send(sortNotifications(data.data.notifications));
    } catch (error) {
        await LogData("frontend", "error", "api", "Failed to fetch notifications")
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
})