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
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
    const course = new Course({
        name: 'Angular course',
        author: 'Or',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
};

const getCourses = async () => {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)


    // or
    // and


    /*     const courses = await Course.find({ author: 'Or', isPublished: true })
                                    .limit(10)
                                    .sort({ name: 1 })
                                    .select({ name: 1, tags: 1 }); */

    /*     const courses = await Course.find({ price: { $gt: 10, $lte: 20 } })
                                    .limit(10)
                                    .sort({ name: 1 })
                                    .select({ name: 1, tags: 1 }); */

    /*         const courses = await Course.find({ price: { $in: [10, 15, 20] } } )
                                        .limit(10)
                                        .sort({ name: 1 })
                                        .select({ name: 1, tags: 1 }); */

    /*         const courses = await Course.find()
                                        .or([ { author: 'Or' }, { isPublished: true } ])
                                        .and()
                                        .limit(10)
                                        .sort({ name: 1 })
                                        .select({ name: 1, tags: 1 }); */

    /*             const courses = await Course.find({ author: /^r/ })
                                            .limit(10)
                                            .sort({ name: 1 })
                                            .select({ name: 1, tags: 1 }); */

    /*                                         const courses = await Course.find({ author: /or$/i })
                                            .limit(10)
                                            .sort({ name: 1 })
                                            .select({ name: 1, tags: 1 }); */

    /*                                         const courses = await Course.find({ author: /.*Or*./ })
                                            .limit(10)
                                            .sort({ name: 1 })
                                            .select({ name: 1, tags: 1 }); */

    /*                                         const courses = await Course.find({ author: /.*Or*./ })
                                            .limit(10)
                                            .sort({ name: 1 })
                                            .countDocuments(); */


    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course.find({ author: 'Or', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
};

// getCourses();

// createCourse();

/* const updateCourse = async (id) => {
    // Approach: Query first
   const course =  await Course.findById(id);
   if (!course) {
       return;
   }

   course.isPublished = true;
   course.author = 'Avi';

   const newCourse = await course.set({
        isPublished: true,
        author: 'Avi'
   }).save();
   console.log(newCourse);

    // Approach: Update first

    const result =  await Course.update({ _id: id }, {
        $set: {
            author: 'Gil',
            isPublished: false
        }
    });
    console.log(result);

    const course =  await Course.findByIdAndUpdate({ _id: id }, {
        $set: {
            author: 'Aviad',
            isPublished: true
        }
    }, { new: true });
    console.log(course);
};

updateCourse('5b443d7ed713ac674970bb0b'); */

const deleteCourse = async (id) => {
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
};

deleteCourse('5b443e2d982b5705b99cfcaf');