const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
         const token = req.headers.token;
      console.log("token",token);
      if (!token) throw 'Unauthorized';
      let payload = jwt.verify(token, process.env.JWT_SECRET);
      if (!payload) throw 'Unauthorized';
      req.authUser = payload; // Store the user ID in the request object
      
      console.log("Decoded token:", payload);

      console.log("user",req.authUser)
      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  };

module.exports = { verifyToken };
