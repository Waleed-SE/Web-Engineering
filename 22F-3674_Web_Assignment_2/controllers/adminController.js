const Course = require('../models/course');
const Student = require('../models/student');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('prerequisites');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.addCourse = async (req, res) => {
    const { courseCode, title, department, level, schedule, seatsAvailable, prerequisites } = req.body;

    try {
        // Check if any circular dependency exists in prerequisites
        for (const prerequisiteId of prerequisites) {
            const hasLoop = await detectCircularDependency(prerequisiteId, courseCode);
            if (hasLoop) {
                return res.status(400).json({ message: `Adding prerequisite ${prerequisiteId} creates a circular dependency.` });
            }
        }

        // Create new course
        const newCourse = new Course({
            courseCode,
            title,
            department,
            level,
            schedule,
            seatsAvailable,
            prerequisites,
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course added successfully!', course: newCourse });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

/**
 * Helper Function to Detect Circular Dependency
 */
async function detectCircularDependency(prerequisiteId, courseCode) {
    const visited = new Set();

    // Recursive function to traverse prerequisites graph
    async function traverse(courseId) {
        if (visited.has(courseId)) return false; // Already visited
        visited.add(courseId);

        const course = await Course.findById(courseId).populate('prerequisites');
        if (!course) return false;

        // If courseCode matches the current course in traversal, circular dependency detected
        if (course.courseCode === courseCode) return true;

        // Recursively check all prerequisites
        for (const prereq of course.prerequisites) {
            if (await traverse(prereq._id)) return true;
        }

        return false;
    }

    return await traverse(prerequisiteId);
}


exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('registeredCourses');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.overrideRegistration = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
      const student = await Student.findById(studentId);
      const course = await Course.findById(courseId).populate('prerequisites');

      if (!student || !course) {
          return res.status(404).json({ message: 'Student or Course not found' });
      }

      const hasCompletedPrerequisites = course.prerequisites.every(prereq =>
          student.completedCourses.includes(prereq._id)
      );

      if (!hasCompletedPrerequisites) {
          return res.status(400).json({ message: 'Student has not completed prerequisites' });
      }

      if (course.seatsAvailable <= 0) {
          return res.status(400).json({ message: 'No available seats in this course' });
      }

      if (!student.registeredCourses.includes(courseId)) {
          student.registeredCourses.push(courseId);
          course.seatsAvailable -= 1;
          await student.save();
          await course.save();
      }

      res.json({ message: 'Student added to course successfully', student });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateSeats = async (req, res) => {
  const { id } = req.params;
  const { seatsAvailable } = req.body;

  try {
      const course = await Course.findByIdAndUpdate(id, { seatsAvailable }, { new: true });

      if (!course) {
          return res.status(404).json({ message: 'Course not found' });
      }

      res.json({ message: 'Seats updated successfully', course });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};
