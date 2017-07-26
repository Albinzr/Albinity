import User from "../model/userModel";

const userController = {};

//NOTE - Register -

userController.register = (req, res) => {
  const {username, password, email, phno} = req.body;

  // NOTE Validation if necessory

  const user = new User({
    username,
    password,
    email,
    phno
  });

  user
    .save()
    .then(newUser => {
      res.json({
        success: true,
        data: newUser
      });
    })
    .catch(error => {
      if (error.code == 11000) {
        return res.status(403).json({
          success: false,
          message: "Email already exists",
          error: error
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "Failed to register",
          error: error
        });
      }
    });
};

//NOTE - Login -

userController.login = (req, res) => {
  const {username, password} = req.body;

  console.log(username);

  User.findOne({
    username: username
  }, function(error, user) {
    console.log(user._id);
    if (user != null && user.password == password) {

      req.session.username = req.body.username;
      req.session.userId = user._id
      req.session.email = user.email

      return res.json({
        success: true,
        data: "logged in successfully"
      });

    } else {
      return res.status(403).json({
        success: false,
        message: "User dose not exist",
        error: error
      });
    }

  });
};

//NOTE - logout -

userController.logout = (req, res) => {
  // return request.session.destroy();
  req.session.destroy(error => {
    if (error) {
      return res.status(403).json({
        success: false,
        message: "User dose not exist",
        error: error
      });
    } else {
      return res.json({
        success: true,
        data: "logged out successfully"
      });
    }
  });
};

export default userController;
