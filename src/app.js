const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app =  express();
const cors = require("cors");
const bodyParser  = require("body-parser");
const connectionDB = require("../config/database");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const User = require("../src/routes/userRoutes");
const Faqs = require("../src/routes/faqsRoutes");
const ContatctUs = require("./routes/contactUsRoutes");
const Vidoe = require("./routes/videoRoutes");
const policy = require("./routes/policyRoutes");


const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173' ,'https://spreadz-admin.vercel.app', 'https://spreadz.vercel.app']
};
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorHandler);


connectionDB();
// createAdmin(); 

//Default route
app.get('/' , (req,res)=>{
    res.send("Application is currently working !")
});

app.use("/users", User);
app.use("/faqs", Faqs);
app.use("/contact-us", ContatctUs);
app.use("/videos", Vidoe);
app.use("/policies", policy);

module.exports = app;
