const express = require('express')
const geoip = require("geoip-lite");
const isbot = require("isbot");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require('cors')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')
const path = require('path')
const fs = require('fs');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, { 
    cors: {
        origin: ["https://capgainco.com"],
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

app.use(cors({
    origin: ["https://capgainco.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: true,
}));



app.use((req, res, next) => {

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "";

  const cleanIP = ip.replace("::ffff:", "");

  // allow localhost
  if (cleanIP === "127.0.0.1" || cleanIP === "::1") {
    return next();
  }

  const geo = geoip.lookup(cleanIP);
  const userAgent = req.headers["user-agent"] || "";

  if (isbot(userAgent) && !userAgent.includes("Googlebot")) {
    return res.status(403).json({
      message: "Bots are not allowed"
    });
  }

  if (!geo || geo.country !== "GH") {
    return res.status(403).json({
      message: "Access denied. Ghana users only 🇬🇭"
    });
  }

  next();
});


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60
});

app.use(limiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());



app.use(bodyParser.json({ limit: "200kb" }));

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
app.use(express.static(path.join(__dirname, "client")));

app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, './client/build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_TITLE/g, 'Earn Daily Profit with Capital Gain Management Co.')
           .replace(/\$OG_DESCRIPTION/g, "Invest easily through Mobile Money (MoMo) or your Bank and earn daily profits backed by Bitcoin cloud mining and real-world farming projects — fish, poultry, goat, and more. Trusted. Transparent. Global.")
           .replace(/\$OG_IMAGE/g, 'https://bitcoin4uonline.com/static/media/mobile-money.10e06826.jpg'); 
res.send(data);
    });
});

app.get('/dashboard/edit', (req, res) => {
    const filePath = path.resolve(__dirname, './client/build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        const { Song_overview, Song_title, Song_img } = req.query;
        data = data.replace(/\$OG_TITLE/g, 'edit')
                   .replace(/\$OG_DESCRIPTION/g, 'edit profile')
                   .replace(/\$OG_IMAGE/g, 'image');
        res.send(data);
    });
});
app.get('/edit', (req, res) => {
    const filePath = path.resolve(__dirname, './client/build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        const { Song_overview, Song_title, Song_img } = req.query;
        data = data.replace(/\$OG_TITLE/g, 'edit')
                   .replace(/\$OG_DESCRIPTION/g, 'edit profile')
                   .replace(/\$OG_IMAGE/g, 'image');
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

server.listen(PORT, () => {
    console.log(`Server is running on local Port Number ${PORT} socket.io`)
})
