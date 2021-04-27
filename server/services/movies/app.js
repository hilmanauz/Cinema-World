const express = require('express');
const port = process.env.PORT || 4001;
const app = express();
const router = require('./routers');
const cors = require('cors')
const {connectMongodb} = require('./config/mongodb')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use(router)
app.use(errorHandler)

connectMongodb((connected) => {
    if(connected) {
        console.log('Success connect to mongodb')
    }
    else console.log('error!')
})

app.listen(port, () => {
    console.log('listening on port: ', port)
})
