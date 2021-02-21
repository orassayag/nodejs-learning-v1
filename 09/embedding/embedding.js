const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', {
  useNewUrlParser: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

/* const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
})); */

/* const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true
  }
})); */

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}


/* async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}
 */
async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

const updateAuthor = async (courseId,) => {
  /*   // 5b45dad90d2bc321916ad9ae
    const course = await Course.findById(courseId);
    course.author.name = 'Or Assayag';
    course.save(); */


  /*     // 5b45dad90d2bc321916ad9ae
      const course = await Course.update({ _id: courseId }, {
        $set: {
          'author.name': 'John Smith'
        }
      }); */


  // 5b45dad90d2bc321916ad9ae
  const course = await Course.update({
    _id: courseId
  }, {
    $unset: {
      'author': ''
    }
  });
}

const addAuthor = async (courseId, author) => {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
};

const removeAuthor = async (courseId, authorId) => {
  /*   const course = await Course.findById(courseId);
    course.authors.splice(course.authors.findIndex(cur => { cur._id ===  authorId}), 1);
    course.save(); */

  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
};

// addAuthor('5b45e0ed3db13d70cd4706df', new Author({ name: 'Or' }));

removeAuthor('5b45e0ed3db13d70cd4706df', '5b45e0ed3db13d70cd4706de');

/* createCourse('Node Course', [
  new Author({ name: 'Or' }),
  new Author({ name: 'John' })
]); */

/* createCourse('Node Course', new Author({ name: 'Mosh' })); */

// updateAuthor('5b45dad90d2bc321916ad9ae');