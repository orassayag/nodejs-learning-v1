const express = require('express');
const router = express.Router();

const courses = [{
    id: 1,
    name: 'course1'
},
{
    id: 2,
    name: 'course2'
},
{
    id: 3,
    name: 'course3'
}
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    // Validate
    const {
        error
    } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    // Validate the course id
    if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).send('Invalid id');
    }

    let courseId = parseInt(req.params.id, 10);

    // Look up the course
    const course = courses.find((cur) => {
        return cur.id === courseId;
    });

    // If not exists, return 404
    if (!course) {
        return res.status(404).send(`The course with the id of ${req.params.id} was not found.`);
    }

    // Validate
    const {
        error
    } = validateCourse(req.body);

    //If invalid, return 400 - Bad request
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Update course
    course.name = req.body.name;

    // Return the updated course
    courses.forEach((element, index) => {
        if (element.id === courseId) {
            courses[index] = course;
        }
    });

    res.send(course);
});

router.get('/:id', (req, res) => {
    // Validate the course id
    if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).send('Invalid id');
    }

    const courseId = parseInt(req.params.id, 10);
    const course = courses.find((cur) => {
        return cur.id === courseId;
    });

    if (!course) {
        return res.status(404).send(`The course with the id of ${req.params.id} was not found.`);
    }
    res.send(course);
});

router.delete('/:id', (req, res) => {
    // Validate the course id
    if (!req.params.id || isNaN(req.params.id)) {
        return res.status(400).send('Invalid id');
    }

    const courseId = parseInt(req.params.id, 10);
    const course = courses.find((cur) => {
        return cur.id === courseId;
    });

    if (!course) {
        return res.status(404).send(`The course with the id of ${req.params.id} was not found.`);
    }

    const courseIndex = courses.indexOf(course);
    courses.splice(courseIndex, 1);
    res.send(course);
});

const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};

module.exports = router;