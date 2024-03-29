require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.static(__dirname));
// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Alumni schema
const alumniSchema = new mongoose.Schema({
    name: String,
    batch: String,
    profile:String,
    photo:String,
    profession:String,
    achivements:String,
    email:String,
});

const Alumni = mongoose.model('Alumni', alumniSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));


// Routes

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/submit-form.html');
});

app.post('/', async (req, res) => {
    const { name, batch, profile,photo,profession,achivements,email } = req.body;
    try {
        const alumni = new Alumni({
            name,
            batch,
            profile,
            photo,
            profession,
            achivements,
            email,
        });
        await alumni.save();
        res.sendFile(__dirname + '/sucess.html');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
