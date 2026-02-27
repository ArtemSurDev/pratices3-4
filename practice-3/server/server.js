const express = require('express');
const app = express();
const port = 3000;
let products = [
    { id: 1, name: 'Телефон', price: 30000 },
    { id: 2, name: 'Ноутбук', price: 75000 },
    { id: 3, name: 'Планшет', price: 25000 }
];

app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get('/', (req, res) => {
    res.send('Главная страница');
});
app.get('/products', (req, res) => {
    res.json(products);
});
app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).send('Товар не найден');
    }

    res.json(product);
});
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || typeof price !== 'number' || price <= 0) {
        return res.status(400).send('Некорректные данные товара. Требуется name (строка) и price (число > 0)');
    }

    const newProduct = {
        id: Date.now(),
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.patch('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).send('Товар не найден');
    }

    const { name, price } = req.body;
    if (name !== undefined) {
        if (typeof name !== 'string') {
            return res.status(400).send('Поле name должно быть строкой');
        }
        product.name = name;
    }

    if (price !== undefined) {
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).send('Поле price должно быть числом больше 0');
        }
        product.price = price;
    }

    res.json(product);
});
app.delete('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const productExists = products.some(p => p.id === id);

    if (!productExists) {
        return res.status(404).send('Товар не найден');
    }

    products = products.filter(p => p.id !== id);
    res.send('Ok');
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});