const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();


app.use(cors());

app.get("/rating", (req, res) => {
    const {
        search
    } = req.query;

    if (!search) {
        return res.status(400).json({
            error: "El parámetro 'search' es requerido."
        });
    }

    const options = {
        method: "GET",
        url: `https://drop-api.ea.com/rating/fc-24?locale=es&limit=100&search=${search}`,
        headers: {
            "X-CMC_PRO_API_KEY": process.env.REACT_APP_MARKET_CAP_KEY,
        }
    };

    axios
        .request(options)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            res.json(error);
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});