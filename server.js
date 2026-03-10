const express = require('express')
const isbot = require("isbot");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const slowDown = require("express-slow-down");
const cors = require('cors')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')
const path = require('path')
const fs = require('fs');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, { 
    cors: {
        origin: ["https://capgainco.com", "http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

dotEnv.config() 
app.set("trust proxy", 1);

mongoose.connect(process.env.MONGODB_URI,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, 
    }, () => {
    console.log('DataBase Connected Successfully')
})

// Start scheduled jobs after DB connection
mongoose.connection.once('open', () => {
    try {
        require('./Router/cronJobs/freezeDuplicates');
        console.log('Started freezeDuplicates cron job');
    } catch (err) {
        console.error('Failed to start cron job:', err);
    }
});

const PORT = process.env.PORT || 8000

// Allow multiple origins for CORS





app.use((req, res, next) => {

  const cleanIP = req.ip.replace("::ffff:", "");

  // allow localhost
  if (cleanIP === "127.0.0.1" || cleanIP === "::1") {
    return next();
  }

  const userAgent = req.headers["user-agent"] || "";

  const allowedBots = ["googlebot", "bingbot", "duckduckbot"];

  if (isbot(userAgent) && !allowedBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    return res.status(403).json({
      message: "Bots are not allowed"
    });
  }

  next();
});


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    status: 429,
    message: "Too many requests. Please slow down."
  }
});

const speedLimiter = slowDown({
  windowMs: 60 * 1000,
  delayAfter: 20,
  delayMs: 500
});


app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(limiter);
app.use(speedLimiter);
app.use(cors({
    origin: ["https://capgainco.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: true,
}));
app.use(express.json({ limit: "200kb" }));

io.on('connection', socket => {
   socket.on('live_deposit', live_deposit => {
       socket.broadcast.emit('incoming_deposit', live_deposit)
   })

   socket.on('NewDeposit', NewDeposit => {
       socket.broadcast.emit('NewDeposit', NewDeposit)
   })
   
   socket.on('Withdraw', Withdraw => {
       socket.broadcast.emit('Withdraw', Withdraw)
   })
   socket.on('refferReward', refferReward => {
       socket.broadcast.emit('refferReward', refferReward)
   })
});

app.use('/users', userRouter)

app.get('/', (req, res) => {

    const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {
            console.error("INDEX ERROR:", err);
            return res.sendFile(filePath); 
        }

        data = data
        .replace(/\$OG_TITLE/g, 'Earn Daily Profit with Capital Gain Management Co.')
        .replace(/\$OG_DESCRIPTION/g, 'Invest easily through Mobile Money (MoMo) or your Bank and earn daily profits backed by Bitcoin cloud mining and real-world farming projects.')
        .replace(/\$OG_IMAGE/g, 'https://bitcoin4uonline.com/static/media/mobile-money.10e06826.jpg');

        res.send(data);

    });

});


app.get('/dashboard/edit', (req, res) => {

    const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            return res.sendFile(filePath);
        }

        data = data
            .replace(/\$OG_TITLE/g, 'edit')
            .replace(/\$OG_DESCRIPTION/g, 'edit profile')
            .replace(/\$OG_IMAGE/g, 'image');

        res.send(data);

    });

});
app.get('/edit', (req, res) => {

    const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {
            console.error(err);
            return res.sendFile(filePath);
        }

        data = data
            .replace(/\$OG_TITLE/g, 'edit')
            .replace(/\$OG_DESCRIPTION/g, 'edit profile')
            .replace(/\$OG_IMAGE/g, 'image');

        res.send(data);

    });

});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
    
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error"
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on local Port Number ${PORT} socket.io`)
})
