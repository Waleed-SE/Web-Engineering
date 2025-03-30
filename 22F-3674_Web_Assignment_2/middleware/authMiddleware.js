const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.session.token;  // ✅ Get token from session

  if (!token) {
      return res.redirect('/auth/login');  // ✅ Redirect to login page if no token
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
      return res.redirect('/auth/login');  // ✅ Redirect if token is invalid
  }
};


exports.verifyStudent = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Students only.' });
    }
};

exports.verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};
