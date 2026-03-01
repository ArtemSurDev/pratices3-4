const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

let products = [
    { id: nanoid(6), name: 'iPhone 15 Pro', category: 'Смартфоны', description: 'Флагман Apple', price: 129990, stock: 5 },
    { id: nanoid(6), name: 'Samsung Galaxy S24', category: 'Смартфоны', description: 'Флагман Samsung', price: 99990, stock: 3 },
    { id: nanoid(6), name: 'MacBook Pro 14"', category: 'Ноутбуки', description: 'M3 Pro, 16GB RAM', price: 199990, stock: 2 },
    { id: nanoid(6), name: 'ASUS ROG Strix', category: 'Ноутбуки', description: 'Игровой ноутбук', price: 159990, stock: 4 },
    { id: nanoid(6), name: 'iPad Air', category: 'Планшеты', description: 'M1 чип', price: 59990, stock: 7 },
    { id: nanoid(6), name: 'Sony WH-1000XM5', category: 'Наушники', description: 'Шумоподавление', price: 29990, stock: 8 },
    { id: nanoid(6), name: 'Apple Watch Ultra', category: 'Часы', description: 'Для спорта', price: 79990, stock: 3 },
    { id: nanoid(6), name: 'Logitech MX Master', category: 'Аксессуары', description: 'Беспроводная мышь', price: 8990, stock: 10 },
    { id: nanoid(6), name: 'Samsung Tab S9', category: 'Планшеты', description: '12.4" AMOLED', price: 89990, stock: 4 },
    { id: nanoid(6), name: 'PS5 Digital', category: 'Консоли', description: 'PlayStation 5', price: 49990, stock: 2 }
];

app.get('/api/products', (req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    product ? res.json(product) : res.status(404).json({ error: 'Not found' });
});

app.post('/api/products', (req, res) => {
    const newProduct = { id: nanoid(6), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    Object.assign(product, req.body);
    res.json(product);
});

app.delete('/api/products/:id', (req, res) => {
    products = products.filter(p => p.id !== req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});