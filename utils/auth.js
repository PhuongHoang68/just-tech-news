const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
        //calling next() it is calling the next async function
      next();
    }
  };
  
  module.exports = withAuth;