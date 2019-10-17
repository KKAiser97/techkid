const express=require('express');
const mongoose=require('mongoose');
const bosyParser=require('body-parser');
const bookRouter=require('./api/modules/books/book.router.js');
const userRouter=require('./api/modules/users/user.router.js');
const authRouter=require('./api/modules/auth/auth.router.js');
const config=require('./config');
const PORT=3000;

mongoose.connect(config.mongoConnectionString);
const app=express();
app.use(bosyParser.json());
app.use('/',express.static('../client'));
app.use('/api/book', bookRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, function(){
    console.log(`Server is listening on ${PORT}`);   
});