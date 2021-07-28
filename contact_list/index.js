const express = require('express');
const path = require('path');
const port = 8000;
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
    return res.render("home", {
            title: "Home Page",
            contact_list: contactList
        })
})

app.get('/practice', (req,res) => {
    return res.render('practice', {
        title: "Practice Page"
    })
})


app.post('/contact-input', (req,res) => {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    contactList.push(req.body);
    
    // return res.redirect('/');
    return res.redirect('back');
})

app.get('/delete-contact/:phone', (req,res) => {
    // For params in the URL
    // console.log(req.params);
    let phone = req.params.phone;
    let contactIndex = contactList.findIndex(o => o.phone == phone );

    //check whether the phone is founde or not
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1); // removes just 1 element
    }

    return res.redirect('back');
})

// app.get('/delete-contact/', (req,res) => {
//     console.log(req.query);
// // For query in the URL
// })

app.listen(port, (err) => {
    if(err){console.log("Server run unsuccessful !")};

    console.log("Server run successful on port: ",port);
})