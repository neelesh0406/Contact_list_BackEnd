const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');   // Inported mongoose access to mongodb file
const Contact = require('./models/contact');   // Imported db model


// const l = new Contact({
//     name: "Needsfsfsdf",
//     phone: "432449324924324"
// });
// console.log("Object is equal to ", l);


const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name: "Neelesh",
        phone: "9406984222"
    },
    {
        name: "Tony Stark",
        phone: "9999999999"
    },
    {
        name: "Chris Evans",
        phone: "2373683692"
    },
    {
        name: "Elon Musk",
        phone: "4369020029"
    },
    {
        name: "Mahatma",
        phone: "2328736878"
    }
];



app.get('/', (req,res) => {
    
        Contact.find({}, (err, contacts) => {
            if(err){console.log("Uggh no contacts found"); return;}
            return res.render("home", {
                        title: "Contacts List App",
                        contact_list: contacts
                    })
        })
})


app.get('/practice', (req,res) => {
    return res.render('practice', {
        title: "Practice Page"
    })
})


app.post('/contact-input', (req,res) => {

   // // Inserting document in mongo database 
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, (err, newContact) => {
        if(err){console.log("Creating contact failed"); return;}

        return res.redirect('back');
    })
    
})

app.get('/delete-contact/:id', (req,res) => {
    // For params in the URL ( 2nd method is queries in the URL)
    let id = req.params.id;

    Contact.findByIdAndDelete(id, (err) => {
        if(err){
            console.log("Error in deleting contact");
        }
    })

    return res.redirect('back');
})


app.listen(port, (err) => {
    if(err){console.log("Server run unsuccessful !")};

    console.log("Server run successful on port: ",port);
})