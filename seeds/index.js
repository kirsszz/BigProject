const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground.js');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '609d7c6439cf0e96ec47be74',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dzz7basyp/image/upload/v1622576929/YelpCamp/lum8f3yymwgetvc9x3o3.jpg',
                    filename: 'YelpCamp/lum8f3yymwgetvc9x3o3'
                },
                {
                    url: 'https://res.cloudinary.com/dzz7basyp/image/upload/v1622489944/YelpCamp/cno0n1o7pmun04ir6r0w.jpg',
                    filename: 'YelpCamp/cno0n1o7pmun04ir6r0w'

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})