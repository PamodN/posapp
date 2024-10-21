const UserModel = require('../models/userModel'); // Consistent naming

// Login Controller
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Find user with matching userId and password (assuming verification logic)
    const user = await UserModel.findOne({ userId, password, verified: false });

    if (user) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Register Controller
const registerController = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send('New user created successfully');
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating user', error });
  }
};

module.exports = { loginController, registerController };
