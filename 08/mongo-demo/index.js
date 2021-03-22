const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', {
    useNewUrlParser: true
})
    .then(() => {
        console.log('Connected to MongoDB...');
    }).catch((err) => {
        console.error('Could not connect to MongoDB...', err);
    });

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        /*         validate: {
                    isAsync: true,
                    validator: function (v, callback) {
                        setTimeout(() => {
                            // Do some async work.
                            const result = v && v.length > 0;
                            callback(result);
                        }, 000);
                    },
                    message: 'A course should have at least 1 tag.'
                } */
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: (v) => {
            return Math.round(v);
        },
        set: (v) => {
            return Math.round(v);
        }
    }
});
courseSchema.set('toObject', { getters: true });

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
    const course = new Course({
        name: 'Angular course',
        category: 'Web',
        author: 'Or',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });

    try {
        //await course.validate();

        const result = await course.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
};

const getCourses = async () => {
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course.find({ author: 'Or', isPublished: true })
        /*                                 .skip((pageNumber - 1) * pageSize)
                                        .limit(pageSize) */
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1 });
    console.log(courses);
};


// createCourse();
getCourses();