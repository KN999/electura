const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

// Refering different routes
const userRoute = require('./Routes/ServiceLayer/users.js');
const documentRoute = require('./Routes/ServiceLayer/documents.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Different routes
app.use('/users', userRoute);
app.use('/documents', documentRoute);

app.get('/', (req, res) => {
    res.send("HI");
});

module.exports = app.listen(PORT, () => {
    console.log("app is listening to " + PORT);
});
