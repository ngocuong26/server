const express = require('express');
const cors = require('cors');
const MongoStore = require("connect-mongo");
const app = express();
const connectDB = require("./db/connect");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3001;

const category = require("./routes/category");
const products = require('./routes/products');
const users = require('./routes/user');
const news = require('./routes/news');
const login = require('./routes/login');
const logout = require('./routes/logout');
const orders = require('./routes/orders');
const cart = require('./routes/cart');
const comments = require('./routes/comments');

app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.1.13:3000'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const session = require('express-session');
const contact = require('./routes/contact');
const admin = require('./routes/admin');
const view = require('./routes/view');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //     mongoUrl: process.env.MONGODB_URL,
    //     ttl: 7 * 24 * 60 * 60 // giữ 7 ngày
    // }),
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 giờ
        httpOnly: true
    }
}));

app.use('/category', category);
app.use('/products', products);
app.use('/login', login);
app.use('/logout', logout);
app.use('/users', users);
app.use('/news', news);
app.use('/orders', orders);
app.use('/cart', cart);
app.use('/comments', comments);
app.use('/contact', contact);
app.use('/admin', admin);
app.use('/views', view);


app.get('/', (req, res) => {
    res.json({message: "Thanh cong!!!"});
})

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.post('/', (req, res) => {
    res.json({message: "Thanh cong!!!"});
})

// Cấu hình nơi lưu và đặt tên file
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

// API nhận ảnh từ client
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Không có file" });

    console.log("Ảnh đã nhận:", req.file);

    res.json({
        filename: req.file.filename,
        url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    });
});

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0');
})
.catch(err => {
    console.error("Kết nối thất bại:", err);
    process.exit(1);
})