const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const products = [];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Obtener todos los productos
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Crear producto
app.post("/api/products", (req, res) => {

    const { nombre, precio, cantidad } = req.body;

    const nuevoProducto = {
        id: Date.now(),
        nombre,
        precio,
        cantidad
    };

    products.push(nuevoProducto);

    res.status(201).json(nuevoProducto);

});

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});