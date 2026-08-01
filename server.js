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

app.delete("/api/products/:id", (req, res) => {

    const id = Number(req.params.id);

    console.log("ID recibido:", id);
    console.log(products);

    const indice = products.findIndex(producto => producto.id === id);

    console.log("Indice:", indice);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    products.splice(indice, 1);

    console.log(products);

    res.json({
        mensaje: "Producto eliminado"
    });

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

// Actualizar producto
app.put("/api/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const producto = products.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    producto.cantidad = req.body.cantidad;

    res.json(producto);

});

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});