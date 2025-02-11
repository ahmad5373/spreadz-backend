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
const Subscpriptions = require("./routes/subscriptionRoutes");
const Blogs = require("./routes/blogRoutes");
const Comments = require("./routes/commentRoutes");
const requestGuides = require("./routes/requestGuideRoutes");

// const corsOptions = {
//     credentials: true,
//     origin: ['http://localhost:5173' ,'https://spreadz-admin.vercel.app', 'https://spreadz.vercel.app' ,'http://localhost:3000']
// };
app.use(
    cors({
      origin: "*", 
      credentials: true, 
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorHandler);


connectionDB();
// createAdmin(); 

app.get('/' , (req,res)=>{
    res.send("Application is currently working !")
});

app.use("/users", User);
app.use("/faqs", Faqs);
app.use("/contact-us", ContatctUs);
app.use("/videos", Vidoe);
app.use("/policies", policy);
app.use("/subscriptions", Subscpriptions);
app.use("/blogs",Blogs);
app.use("/comments",Comments);
app.use("/guides",requestGuides);

module.exports = app;
