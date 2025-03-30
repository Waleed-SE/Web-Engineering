const Student = require('../models/student');
const Course = require('../models/course');

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('registeredCourses').populate('passedCourses');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.registerCourse = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
      // Find the student and course
      const student = await Student.findById(studentId);
      const course = await Course.findById(courseId).populate('prerequisites'); // Populate prerequisites to check

      if (!student || !course) {
          return res.status(404).json({ message: 'Student or Course not found' });
      }

      // Check if there are available seats
      if (course.seatsAvailable <= 0) {
          return res.status(400).json({ message: 'No seats available' });
      }

      // Check if the student is already registered for the course
      if (student.registeredCourses.includes(courseId)) {
          return res.status(400).json({ message: 'Already registered' });
      }

      // Check if all prerequisites are passed
      const unmetPrerequisites = course.prerequisites.filter(
          (prerequisite) => !student.passedCourses.includes(prerequisite._id.toString())
      );

      if (unmetPrerequisites.length > 0) {
          return res.status(400).json({
              message: 'Cannot register for the course. Prerequisites not passed.',
              unmetPrerequisites: unmetPrerequisites.map((prerequisite) => prerequisite.title),
          });
      }

      // Register the course
      course.seatsAvailable -= 1;
      student.registeredCourses.push(courseId);

      // Save updates
      await course.save();
      await student.save();

      res.json({ message: 'Course registered successfully', student });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};


exports.dropCourse = async (req, res) => {
    const { studentId, courseId } = req.body;

    try {
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) {
            return res.status(404).json({ message: 'Student or Course not found' });
        }

        if (!student.registeredCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Course not registered' });
        }

        course.seatsAvailable += 1;
        student.registeredCourses = student.registeredCourses.filter(id => id.toString() !== courseId);

        await course.save();
        await student.save();

        res.json({ message: 'Course dropped successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.completeCourse = async (req, res) => {
    const { studentId, courseId } = req.body;

    try {
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) {
            return res.status(404).json({ message: 'Student or Course not found' });
        }

        if (!student.registeredCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Course not registered' });
        }

        // Remove course from registeredCourses and add to passedCourses
        student.registeredCourses = student.registeredCourses.filter(id => id.toString() !== courseId);
        student.passedCourses.push(courseId);

        await student.save();

        res.json({ message: 'Course marked as complete successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
