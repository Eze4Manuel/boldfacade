const express = require('express');
const ejsLint = require('ejs');
// const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const bodyParser = require('body-parser');
const port = 3000

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

 app.set('view engine', 'ejs');
 app.use('/assets', express.static('assets'))


app.get('/', (request, response) => {
   response.render('home');
})

app.get('/about', (request, response) => {
   response.render('about');
})

app.get('/portfolio', (request, response) => {
   response.render('portfolio');
})

app.get('/blog', (request, response) => {
   response.render('blog');
})
app.get('/projects', (request, response) => {
   response.render('projects');
})

app.get('/contact', (request, response) => {
   response.render('contact');
})

app.get('/timestamp-cached', (request, response) => {
  response.set('Cached-Control', 'public, max-age=300, s-maxage=600')
  response.send(`Date is ${Date.now()}`);

})


app.listen(port, () => console.log(`Boldfacade app listening at http://localhost:${port}`))

/////////////////////////////Sending Mail test
/**
* Here we're using Gmail to send
*/


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'boldfacadeltd@gmail.com',
        pass: 'vrhdloxilzmbctil'
    }
});
//Handling FirstMail ---Intactor
app.post('/intactor', urlencodedParser, (req,res) => {
  cors(req, res, () => {
      // getting dest email by query string
      const dest = req.query.dest;
      const mailOptions = {
          from: ` ${req.body.email}`, // Something like: Jane Doe <janedoe@gmail.com>
          to: 'boldfacadeltd@gmail.com',
          subject: 'Newsletter Subscriber', // email subject
          html: `<p style="font-size: 16px;"> ${req.body.email} Subscribed For Newsletter</p>
            ` // email content in HTML
      };
      const responseMail = {
          from: `info@boldfacade.com`, // Something like: Jane Doe <janedoe@gmail.com>
          to: req.body.email,
          subject: 'BoldFacade Development Ltd', // email subject
          html: `<p style="font-size: 16px;">Thank You for Subscribing to our newsletter </p>
            ` // email content in HTML
          };

      // returning result
      var v1 = new Promise(function(resolve, reject){
        let val = transporter.sendMail(responseMail,(erro,info) => {(erro)? false: true})
        resolve(val)
      });

      v1.then(function(dee){
        transporter.sendMail(mailOptions, (erro, info) => {
           if(erro){
               return res.render('formprocessed',{status: "OOpps! Something went wrong. Message Sending Failed"});
           }else{
           //  autoResponder(req, res, req.body.email, message, subjcct);
             return res.render('formprocessed',{status: "Message sent Sucessfully"});
           }
       })

      })

  });
});


//Handling SecondMail ---Sendmail
app.post('/sendmail', urlencodedParser, (req, res) => {

    cors(req, res, () => {
        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions2 = {
            from: `${req.body.lastname} ${req.body.firstname} <${req.body.mail}>`, // Something like: Jane Doe <janedoe@gmail.com>
            to: 'boldfacadeltd@gmail.com',
            subject: req.body.subject, // email subject
            html: `<p style="font-size: 16px;">From: ${req.body.mail}, Tel: ${req.body.phone}, Message:  </br> ${req.body.message}</p>
                <br />
             ` // email content in HTML
        };

        const responseMail2 = {
            from: `info@boldfacade.com`, // Something like: Jane Doe <janedoe@gmail.com>
            to: req.body.mail,
            subject: 'BoldFacade Development Ltd', // email subject
            html: `<p style="font-size: 16px;">Thank you for contacting us, we'll get back to you soonest!</p>
              ` // email content in HTML
            };

            // returning result
            var v2 = new Promise(function(resolve, reject){
              let val = transporter.sendMail(responseMail2,(erro,info) => {(erro)? false: true})
              resolve(val)
            });

            v2.then(function(dee){
              transporter.sendMail(mailOptions2, (erro, info) => {
                 if(erro){
                     return res.render('formprocessed',{status: "OOpps! Something went wrong. Message Sending Failed"});
                 }else{
                 //  autoResponder(req, res, req.body.email, message, subjcct);
                   return res.render('formprocessed',{status: "Message sent Sucessfully"});
                 }
             })

            })

    });
});
