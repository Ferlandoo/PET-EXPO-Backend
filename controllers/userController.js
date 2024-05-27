import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";

// @desc Auth user & get token
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    generateToken(response, user._id);
    response.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    response.status(401);
    throw new Error("Invalid username or password");
  }
});

// @decs Register a new user
// @route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (request, response) => {
  const { username, email, password } = request.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    response.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ username, email, password });
  if (user) {
    generateToken(response, user._id);
    response.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    response.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Log user out
// @route POST /api/user/logout
// @access Private
const logoutUser = asyncHandler(async (request, response) => {
  response.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
  });
  response.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);
  if (user) {
    response.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);
  if (user) {
    user.username = request.body.username || user.username;
    user.email = request.body.email || user.email;
    if (request.body.password) {
      user.password = request.body.password;
    }
    const updatedUser = await user.save();
    response.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

export { loginUser, logoutUser, getUserProfile, updateUserProfile, registerUser };
