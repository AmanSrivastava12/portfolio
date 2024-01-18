const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");
const notifier = require("node-notifier");
const port = 80;
const app = express();

app.use("/static", express.static("static")); // Serving static files
app.use(express.urlencoded()); // Middleware
app.set("view engine", "pug"); // Setting Template Engine
app.set("views", path.join(__dirname, "views")); // Specifying the folder

// DATABASE
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/contactInfo", {
    useNewUrlParser: true,
  });
}
var contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { versionKey: false }
);
var infocontact = mongoose.model("infocontact", contactSchema);

// FORM DATA POST REQUEST
app.post("/contact", (req, res) => {
  var contactData = new infocontact(req.body);
  // SEND EMAIL
  async function sendemail() {
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // secure:true for 465(SSL), false for 587(TLS)
      auth: {
        user: "-", // mail id through which you will send a mail to one of your ids containing the connection message and other details
        pass: "-", // app password of the mail id through which you will send a mail to one of your ids containing the connection message and other details
      },
    });
    transport.sendMail(
      {
        from: '"connection message"<->', // mail id through which you will send a mail to one of your ids containing the connection message and other details
        to: "-", // mail id through which you will receive the mail sent to you by the mail id mentioned above
        subject: `${req.body.name} wants to connect with you through your website "Portfolio"`,
        text: `The email of ${req.body.name} is ${req.body.email} and the message sent is "${req.body.message}"`,
        html: "",
      },
      (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
      }
    );
  }
  sendemail().catch(console.error);
  // SAVING DATA TO DATABASE
  const parameters = {};
  contactData
    .save()
    .then(() => {
      res.status(200).render("contact.pug", parameters);
      notifier.notify("Will connect with you soon. Thankyou for your time.");
    })
    .catch(() => {
      res.status(400).render("contact.pug", parameters);
      notifier.notify("The form could not be submitted. Please try again.");
    });
});

// GET REQUESTS
app.get("/", (req, res) => {
  const parameters = {};
  res.status(200).render("index.pug", parameters);
});
app.get("/experience", (req, res) => {
  const parameters = {};
  res.status(200).render("experience.pug", parameters);
});
app.get("/courses", (req, res) => {
  const parameters = {};
  res.status(200).render("courses.pug", parameters);
});
app.get("/skills", (req, res) => {
  const parameters = {};
  res.status(200).render("skills.pug", parameters);
});
app.get("/projects", (req, res) => {
  const parameters = {};
  res.status(200).render("projects.pug", parameters);
});
app.get("/about", (req, res) => {
  const parameters = {};
  res.status(200).render("about.pug", parameters);
});
app.get("/contact", (req, res) => {
  const parameters = {};
  res.status(200).render("contact.pug", parameters);
});

// LISTENING TO SERVER
app.listen(port, () => {
  console.log(`Application started successfully on port ${port}`);
});
