const bcryptjs = require("bcryptjs");
	const jwt = require("jsonwebtoken");

	const router = require("express").Router();

	const Users = require("./auth-model");
	const { isValid } = require("./auth-model");

	router.post("/register", (req, res) => {
	  const credentials = req.body;

	  if (isValid(credentials)) {
	    const rounds = process.env.BCRYPT_ROUNDS || 8;

	    // hash the password
	    const hash = bcryptjs.hashSync(credentials.password, rounds);

	    credentials.password = hash;

	    // save the user to the database
	    Users.add(credentials)
	      .then(user => {
	        res.status(201).json({ data: user });
	      })
	      .catch(error => {
	        res.status(500).json({ message: error.message });
	      });
	  } else {
	    res.status(400).json({
	      message: "please provide username and password and the password shoud be alphanumeric",
	    });
	  }
	});

	router.post("/login", (req, res) => {
	  const { username, password } = req.body;

	  if (isValid(req.body)) {
	    Users.findBy({ "username": username })
	      .then(([user]) => {
	        // compare the password the hash stored in the database
	        if (user && bcryptjs.compareSync(password, user.password)) {
	          // produce and send a token that includes the username and the role of the user
	          const token = createToken(user);

	          res.status(200).json({ message: "Welcome to our API", token });
	        } else {
	          res.status(401).json({ message: "Invalid credentials" });
	        }
	      })
	      .catch(error => {
	        res.status(500).json({ message: error.message });
	      });
	  } else {
	    res.status(400).json({
	      message: "please provide username and password and the password shoud be alphanumeric",
	    });
	  }
	});

	function createToken(user) {
	  const payload = {
	    username: user.username
	  };

	  const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!";

	  const options = {
	    expiresIn: "1d",
	  };

	  return jwt.sign(payload, secret, options);
	}

	module.exports = router;