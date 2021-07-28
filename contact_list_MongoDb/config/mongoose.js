// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contacts_list_db', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error to db :'));
db.once('open', function() {
  // we're connected!
  console.log(" WE are connected to the database !!");
});
