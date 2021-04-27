const express = require('express');
const port = 3000;
const app = express();
const router = require('./routers');
const {connectMongodb} = require('./config/mongodb')

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use(router)

connectMongodb((connected) => {
    if(connected) {
        console.log('Success connect to mongodb')
    }
    else console.log('error!')
})
app.listen(port, () => {
    console.log('listening on port: ', port)
})
