const mongoose = require('mongoose');

// Connect to the database.
mongoose.connect('mongodb://localhost:27017/mongo-exercises', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.error('Could not connected to MongoDB...', err);
    });

// Create a schema and implement it in MongoDB.
const courseSchema = mongoose.Schema({
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

// Get all the courses.
const getCourses = async () => {
    const courses = await Course.find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 });
    console.log(courses);
};

getCourses();