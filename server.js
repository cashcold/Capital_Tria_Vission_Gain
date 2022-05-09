const express = require('express')
const cors = require('cors')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')
const path = require('path')
const cron = require("node-cron")
const shell = require("shelljs")
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "*",
      }
});

dotEnv.config()


mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true },()=>{
    console.log('DataBase Connented Successful')
})
const PORT = process.env.PORT || 8000


// cron.schedule("* * * * * *",()=>{
//     console.log('TIME WORKING')
// })


app.use(cors())
app.use(bodyParser.json())

io.on('connection', socket => {
    

   socket.on('live_deposit', live_deposit =>{
       socket.broadcast.emit('incoming_deposit', live_deposit)
   })

   socket.on('NewDeposit',NewDeposit =>{
       socket.broadcast.emit('NewDeposit',NewDeposit)
   })


   
  });
  
app.use('/users',userRouter)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


server.listen(PORT,()=>{
    console.log(`server is runing on local Port Number ${PORT} socket.oi`)
})