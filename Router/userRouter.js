const express = require('express')
const Total_TransactionModel = require('../UserModel/total_transactionModel')
const UserDeposit = require('../UserModel/depositModel')
const WithdrawDeposit = require('../UserModel/widthdraw')
const ReferralReward = require('../UserModel/ReferralReward')
const bcrypt = require('bcryptjs')
const User = require('../UserModel/userModel')
const mailgun = require('mailgun-js')
const dotEnv = require('dotenv')
const jwt = require('jsonwebtoken')
const async = require('async')
const nodemailer = require("nodemailer");
const crypto = require('crypto')

dotEnv.config()

const Router = express.Router()

Router.post("/register/", async (req, res) => {
  try {
      // Check if the user already exists
      const user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).send("Email already exists");

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user instance
      const saveUser = new User({
          full_Name: req.body.full_Name,
          user_Name: req.body.user_Name,
          password: hashPassword,
          email: req.body.email,
          bitcoin: req.body.bitcoin,
          ip_address: req.body.ip_address,
          accountBalance: Number(req.body.accountBalance),
          reffer: req.body.reffer,
          refferReward: req.body.refferReward,
          question: req.body.question,
          question__ans: req.body.question__ans,
          activetDeposit: Number(req.body.activetDeposit),
          date: req.body.date
      });

      // Referral program logic
      if (req.body.reffer) {
          const referrer = await User.findOne({ user_Name: req.body.reffer });
          if (referrer) {
              referrer.refferReward += 10; // Adjust reward amount
              await referrer.save();
          }
      }

      // Save user to database
      await saveUser.save();

      // Configure Nodemailer for your email hosting
      const transporter = nodemailer.createTransport({
          host: "mail.capgainco.com",
          port: 465, // Use 587 if TLS is needed
          secure: true, // True for SSL, false for TLS
          auth: {
              user: "support@capgainco.com",
              pass: process.env.SMTP_PASS, // Store in environment variables
          },
          tls: {
              rejectUnauthorized: false, // Disable SSL/TLS verification
          },
      });

      // Email options
      const mailOptions = {
          from: '"Capital Gain Support" <support@capgainco.com>',
          to: req.body.email,
          subject: `Welcome to Capital Gain, ${req.body.user_Name}!`,
          html: `
              <!DOCTYPE html>
              <html>
              <head>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          margin: 0;
                          padding: 0;
                          background-color: #f4f4f4;
                      }
                      .container {
                          width: 100%;
                          max-width: 600px;
                          margin: 0 auto;
                          background-color: #ffffff;
                          padding: 20px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }
                      .header {
                          text-align: center;
                          padding: 10px 0;
                          background-color: #007bff;
                          color: #ffffff;
                      }
                      .content {
                          padding: 20px;
                      }
                      .footer {
                          text-align: center;
                          padding: 10px 0;
                          background-color: #007bff;
                          color: #ffffff;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <div class="header">
                          <h1>Welcome to Capital Gain!</h1>
                      </div>
                      <div class="content">
                          <p>Hello ${req.body.full_Name},</p>
                          <p>Thank you for registering with Capital Gain! Your account has been successfully created.</p>
                          <p>We look forward to helping you grow your wealth through smart bitcoin investments.</p>
                          <p>Visit our website: <a href="https://capgainco.com">capgainco.com</a></p>
                          <p>Best Regards,<br>Capital Gain Team</p>
                      </div>
                      <div class="footer">
                          <p>&copy; 2025 Capital Gain Co. All rights reserved.</p>
                      </div>
                  </div>
              </body>
              </html>
          `,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error("Email sending failed:", error);
              return res.status(500).send("User registered but email not sent.");
          }
          console.log("Email sent:", info.response);
      });

      res.send("User registered and welcome email sent successfully.");
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred.");
  }
});


    
    
Router.post('/login', async(req,res)=>{
    const user = await User.findOne({user_Name: req.body.user_Name})
    if(!user) {

        return res.status(400).send(`User ${req.body.user_Name} Do Not Exist`)
    } 

    await bcrypt.compare(req.body.password, user.password,(err,isMatch)=>{
        if(!isMatch) return res.status(400).send('Wrong Password Enter ')
        else{
            const payload = {
                 user_id: user._id,
                 full_Name: user.full_Name,
                 user_Name: user.user_Name,
                 email: user.email,
                 refferReward: user.refferReward,
                 password: user.password,
                 bitcoin: user.bitcoin,
                 ip_address: user.ip_address,           
                 date: user.Date,
                 accountBalance: user.accountBalance,
                 activetDeposit: user.activetDeposit,
                question: user.question,
                question__ans: user.question__ans,
                 date: user.date
            }
            const token = jwt.sign(payload, process.env.TokenSecret)
            res.header('x-access-token', token)
            return res.status(200).send(token)
        }
    })
})




Router.post("/forgotpassword", async (req, res) => {
    const userEmail = req.body.email;

    async.waterfall([
        (done) => {
            crypto.randomBytes(20, (err, buffer) => {
                if (err) return done(err);
                let token = buffer.toString("hex");
                done(null, token);
            });
        },
        (token, done) => {
            User.findOne({ email: userEmail }, async (err, user) => {
                if (err) return done(err); // Pass error to async.waterfall
                if (!user) {
                    return res.status(400).json({ message: "Email not found." });
                }

                // Debug: Check if user is found
                console.log("User found:", user);

                // Ensure restartLinkPassword exists in schema
                user.restartLinkPassword = token;

                try {
                    await user.save();
                    console.log("Reset token saved:", user.restartLinkPassword);
                    done(null, token, user);
                } catch (saveError) {
                    done(saveError); // Pass save error to async.waterfall
                }
            });
        },
        (token, user, done) => {
            const transporter = nodemailer.createTransport({
                host: "mail.capgainco.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls: { rejectUnauthorized: false },
            });

            const mailOptions = {
                from: '"Capital Gain Support" <support@capgainco.com>',
                to: userEmail,
                subject: "Password Reset Request",
                html: `
                    <p>Hello ${user.full_Name},</p>
                    <p>Click the link below to reset your password:</p>
                    <a href="${process.env.forgotPasswordLink}/${token}">${process.env.forgotPasswordLink}/${token}</a>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return done(error); // Pass error to async.waterfall
                console.log("Email sent:", info.response);
                done(null, "Password reset link sent to your email.");
            });
        }
    ], (err, result) => {
        if (err) {
            console.error("Forgot password error:", err);
            return res.status(500).json({ message: "Database error.", error: err.message });
        }
        res.status(200).json({ message: result });
    });
});



 Router.post('/activtypassword/:token', async(req,res)=>{
   
   User.findOne({restartLinkPassword : req.params.token})
   .then(user=>{
       if(!user){
           return res.status(422).json({error:"Invalid token"})
       }
       bcrypt.genSalt(10, function(err, salt) {
           bcrypt.hash(req.body.password, salt, function(err, hash) {
           user.password = hash
           user.restartLinkPassword = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })

           });
        });
       
   }).catch(err=>{
       console.log(err)
   })
})

Router.get("/recent-users", async (req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 }).limit(20);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

Router.get('/last-deposits', async (req, res) => {
  try {
      const deposits = await UserDeposit.find().sort({ createdAt: -1 }).limit(20);
      res.json(deposits);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});

Router.get('/last/withdrawals', async (req, res) => {
  try {
      const withdrawals = await WithdrawDeposit.find().sort({ createdAt: -1 }).limit(20);
      res.json(withdrawals);
  } catch (error) {
      console.error('Error fetching withdrawals:', error);
      res.status(500).json({ message: 'Server Error' });
  }
});

Router.post('/withdrawInfo',async(req,res)=>{
   
    user_id = req.body.id
    const user = await WithdrawDeposit.findOne({user_id: req.body.id})

    if(user){
        const currentDeposit = await WithdrawDeposit.aggregate([
            { $match : { user_id : user_id } },
            {$group: {_id: "$user_id", WithdrawAmount: { $sum: "$activetDeposit" },WithdrawAmountlast: { $last: "$activetDeposit" }}  },
            
        ])
    res.send(currentDeposit)
    }
    
    
})
Router.post('/depositInfo',async(req,res)=>{
   
    const user_id = req.body.id
    const user = await UserDeposit.findOne({user_id: req.body.id})

    if(user){
        const currentDeposit = await UserDeposit.aggregate([
            { $match : { user_id : user_id } },
            {$group: {_id: "$user_id", depositAmount: { $sum: "$depositAmount" },depositAmountlast: { $last: "$depositAmount" }}  },
            
        ])
    res.send(currentDeposit)
    }
    
    
})


Router.post('/total_transaction_history',async(req,res)=>{
   
    user_id = req.body.id
    fromDate = req.body.fromDate
    endDate = req.body.endDate
    
    const user = await UserDeposit.findOne({user_id: req.body.id})
     const find_User_deposit = await UserDeposit.find({"createdAt": {$gte: fromDate , $lte: endDate }})
    const find_User_withdraw = await WithdrawDeposit.find({"createdAt": {$gte: fromDate , $lte: endDate }})
    const both_transaction = find_User_deposit.concat(find_User_withdraw)

    both_transaction.sort((a, b) => b.createdAt - a.createdAt)

    if(user){
    res.send(both_transaction)
    }
    
    
})


Router.post('/transaction_depositInfo_query',async(req,res)=>{
   
    user_id = req.body.id
    fromDate = req.body.fromDate
    endDate = req.body.endDate
    const user = await UserDeposit.findOne({user_id: req.body.id})
    console.log(req.body)
   if(user){
       const showTransactionDate = await UserDeposit.find({"createdAt": {$gte: fromDate , $lte: endDate }})
       
     res.send(showTransactionDate)
   }

 
    
    
})

Router.post('/transaction_withdrawInfo_query',async(req,res)=>{
   
    user_id = req.body.id
    fromDate = req.body.fromDate
    endDate = req.body.endDate
    const user = await WithdrawDeposit.findOne({user_id: req.body.id})
    console.log(req.body)
   if(user){
       const showTransactionDate = await WithdrawDeposit.find({"createdAt": {$gte: fromDate , $lte: endDate }})
       
     res.send(showTransactionDate)
   }

 
    
    
})



Router.post('/checkdate',async(req,res)=>{   
   
    user_id = req.body.id
    const user = await UserDeposit.findOne({user_id: req.body.id})

    if(user){
        const currentDeposit = await UserDeposit.aggregate([
            { $match : { user_id : user_id } },
            {$group: {_id: "$user_id",lastDate : { $last: "$createdAt" }}  },
            
        ])
    res.json(currentDeposit)
    }
    
    
})



  
Router.post('/user_profile_display',async(req,res)=>{
   
    user_id = req.body.id
    const user = await User.findById(user_id);
    if(user){
        res.send(user)
    }else{
        res.send('Not User')
    }

    
    
})





Router.post('/user_deposit_display', async (req, res) => {
    try {
        const user_id = req.body.id;

        // Find the most recent deposit for the user
        const latestDeposit = await UserDeposit.findOne({ user_id })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .exec();

        if (latestDeposit) {
            res.send({
                deposit: latestDeposit, // The latest deposit details
                lastDate: latestDeposit.createdAt, // The last deposit date
            });
        } else {
            res.send('No deposits found for the user');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



Router.post('/user_balance',async(req,res)=>{
   
    user_id = req.body.id
    const user = await User.findById(user_id);
    if(user){
        res.send(user)
    }else{
        res.send('Not User')
    }

    
    
})



Router.post('/deposit', async(req,res)=>{
    
    const UserDepositNow = new UserDeposit({
        user_id: req.body.user_id,
        user_Name: req.body.user_Name,
        full_Name: req.body.full_Name,
        fixedDepositAmount: (req.body.fixedDepositAmount),
        depositAmount: Number(req.body.depositAmount),
        walletAddress: req.body.walletAddress,
        email: req.body.email,
        deposit_date: req.body.deposit_date,
        date: req.body.date

    })

    await UserDepositNow.save()
    res.send(".........Waiting for BlockChain confirm to credit your Dashboard")
})

Router.post("/updateAccountBalance/:id", async (req, res) => {
    console.log(req.body.accountBalance)
    const user = await User.findById(req.params.id);
    if (req.body.accountBalance) user.accountBalance = req.body.accountBalance;
    await user.save();
    res.send('Balance update');
});

Router.post('/withdraw/:id', async(req,res)=>{ 
    const user = await User.findById(req.params.id);
    if (req.body.zero_accountBalance) user.activetDeposit = req.body.zero_accountBalance;
    await user.save();

    const email = req.body.email;
    const user_Name = req.body.user_Name; 
    const withdrawtAmount = req.body.accountBalance
    const WithdrawNow = new WithdrawDeposit({
    user_id: req.body.user_id,
    user_Name: req.body.user_Name,
    full_Name: req.body.full_Name,
    type: req.body.type,
    accountBalance: req.body.accountBalance,
    activetDeposit: req.body.activetDeposit,
    zero_accountBalance: req.body.zero_accountBalance,
    email: req.body.email,
    date: req.body.date,
    bitcoin: req.body.bitcoin,
})
await WithdrawNow.save()

const userUpdate = await User.findById(req.params.id);
if(userUpdate){
    
}
const payload = {
    user_id: user._id,
    full_Name: user.full_Name,
    user_Name: user.user_Name,
    email: user.email,
    password: user.password,
    bitcoin: user.bitcoin,
    bitcoinCash: user.bitcoinCash,
    ethereum: user.ethereum,
    ip_address: user.ip_address,           
    date: user.Date,
    accountBalance: user.accountBalance,
    activetDeposit: user.activetDeposit,
    date: user.date
}
const RefreshToken = jwt.sign(payload, process.env.RefreshToken)
res.header('RefreshToken', RefreshToken)

var mailgun = require('mailgun-js')({apiKey: process.env.API_key, domain: process.env.API_baseURL});
var data = {
    from: 'PayItForward <payitforwardisnvestmentlimited@gmail.com>',
    to: email,
    subject: 'Payment',
    text: `Hello ${user_Name } Payment of ${withdrawtAmount} have sent to your Bitcoin Wallert Address`
};
mailgun.messages().send(data, function (error, body) {
    console.log(body);
});

res.send(RefreshToken)
 })

Router.post('/refferReward/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if there's enough referral reward to withdraw
    if (user.refferReward && user.refferReward > 0) {
      // Create a new record for the referral reward transaction
      const referralReward = new ReferralReward({
        userId: user._id,
        amount: user.refferReward,
      });

      // Save the referral reward transaction
      await referralReward.save();

      // Set referral reward to 0 after withdrawal
      user.refferReward = 0;

      // Save the updated user object
      await user.save();

      return res.status(200).json({ message: "Referral reward withdrawn successfully" });
    } else {
      return res.status(400).json({ message: "No referral reward to withdraw" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

Router.get('/totalRefferReward/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find all referral reward transactions for the user
    const rewards = await ReferralReward.find({ userId });

    if (!rewards || rewards.length === 0) {
      return res.status(404).json({ message: "No referral rewards found" });
    }

    // Calculate the total referral reward
    const totalReward = rewards.reduce((acc, reward) => acc + reward.amount, 0);

    return res.status(200).json({ totalReward });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

Router.post('/withdrawReferralReward', async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has enough referral reward to withdraw
    if (user.refferReward > 0) {
      // Save the withdrawal transaction in ReferralReward model
      const referralReward = new ReferralReward({
        userId: user._id,
        amount: user.refferReward,
      });

      await referralReward.save();

      // Reset user's referral reward balance to zero
      user.refferReward = 0;
      await user.save();

      return res.status(200).json({ message: "Withdrawal successful!", totalWithdrawn: referralReward.amount });
    } else {
      return res.status(400).json({ message: "No referral reward available to withdraw." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


 Router.post("/updateprofile/:id", async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const editPassword = await bcrypt.hash(req.body.password, salt)


    const user = await User.findById(req.params.id);
    if (req.body.full_Name) {
        user.full_Name = req.body.full_Name;
    }
    if (req.body.password) {
        user.password = editPassword;
    }
    if (req.body.bitcoin) {
        user.bitcoin = req.body.bitcoin;
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    await user.save();
    

    const payload = {
        user_id: user._id,
        full_Name: user.full_Name,
        user_Name: user.user_Name,
        email: user.email,
        password: user.password,
        bitcoin: user.bitcoin,
        ip_address: user.ip_address,           
        date: user.Date,
        accountBalance: user.accountBalance,
        activetDeposit: user.activetDeposit, 
        date: user.date
    }
const Refres_profile_hToken = jwt.sign(payload, process.env.Refres_profile_hToken)
res.header('Refres_profile_hToken', Refres_profile_hToken)
res.send(Refres_profile_hToken)


});











 Router.post('/sendmessage',(req,res)=>{
   
   
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Please i have sent you $548, Check your Account ',
     from: '+19472105301',
     to: '+233235674386'
   })
  .then(message => console.log(message.sid));

    res.send('Message Sent')
 })
 Router.post('/sendmail', async (req,res)=>{
   
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:'payitforwardinvestment50@gmail.com', // generated ethereal user
      pass:'VyGh7NbW93jvFTOH', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "payitforwardinvestment50@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Checking new api</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


    res.send('Message Sent')
 })


















































































// Router.post('/widthdraw/:id', async(req,res)=>{
//     console.log(req.body.zero_accountBalance)
//     const user = await User.findById(req.params.id);
//     if (req.body.zero_accountBalance) user.accountBalance = req.body.zero_accountBalance;
//     await user.save();

  
//     res.send('Payment send to Account Wallet')
// })






module.exports = Router;
