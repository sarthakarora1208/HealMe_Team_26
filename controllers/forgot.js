const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");

const {email} = req.body;