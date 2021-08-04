require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');   
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const upload = require('./routes/upload');
const productRouter = require('./routes/productRouter');
const paymentRouter = require('./routes/paymentRouter');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3taft.mongodb.net/ecommerce-db?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Connect successfully!!!')
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log('Connect failure!!!')
        process.exit(1)
    } 
};

connectDB();

app.use('/user', userRouter);
app.use('/api', categoryRouter);
app.use('/api', upload);
app.use('/api', productRouter);
app.use('/api', paymentRouter);
app.get('/', (req, res) => {
  res.send('Hello Le Lam, This is Ecommerce API')
});


