const PORT = 3001;
const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

// Ruta para manejar la solicitud con un parámetro dinámico en la cadena de consulta
app.get("/rating", (req, res) => {
    // Obtén el parámetro de la cadena de consulta llamado "search"
    const {
        search
    } = req.query;

    // Verifica si se proporciona un valor para "search"
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});