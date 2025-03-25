const express = require('express')
const cors = require('cors')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')
const path = require('path')
const fs = require('fs');
const cron = require("node-cron")
const shell = require("shelljs")
const app = express()
const server = require('http').createServer(app);


dotEnv.config() 


mongoose.connect(process.env.MONGODB_URI,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, },()=>{
    console.log('DataBase Connented Successful')
})
const PORT = process.env.PORT || 8000


// cron.schedule("* * * * * *",()=>{
//     console.log('TIME WORKING')
// })

const allowedOrigins = [
    "https://capgainco.com", 
    "/" // Allow local development
];



app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST"],
    credentials: true // If using cookies
}));

const io = require('socket.io')(server, {
    cors: {
        origin: allowedOrigins, // Allow both production & local
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json())

io.on('connection', socket => {
    

   socket.on('live_deposit', live_deposit =>{
       socket.broadcast.emit('incoming_deposit', live_deposit)
   })

   socket.on('NewDeposit',NewDeposit =>{
       socket.broadcast.emit('NewDeposit',NewDeposit)
   })
   
   socket.on('Withdraw',Withdraw =>{
       socket.broadcast.emit('Withdraw',Withdraw)
   })

 });

 app.use('/users',userRouter)
 app.use(express.static(path.join(__dirname, "client")));

app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, './client/build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_TITLE/g, 'We Help Everyone Live Better Through Bitcoin')
           .replace(/\$OG_DESCRIPTION/g, "Join our Bitcoin mining project and secure your financial future. We make crypto mining simple, profitable, and accessible for everyone.")
           .replace(/\$OG_IMAGE/g, 'https://images.unsplash.com/photo-1658225282648-b199eb2a4830?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); 
res.send(data);

    });
});



app.use(express.static("client/build"));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


server.listen(PORT,()=>{
    console.log(`server is runing on local Port Number ${PORT} socket.oi`)
})