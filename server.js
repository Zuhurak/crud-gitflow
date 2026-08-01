const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Permite recibir datos JSON
app.use(express.json());

// Servir archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});