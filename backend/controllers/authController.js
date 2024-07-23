const db = require("../connect");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");
const admin = require('firebase-admin');
const serviceAccount = require('../../eritomata-e5b36-firebase-adminsdk-ya0ty-90ac3c195f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://erotimata.firebaseio.com"
});

module.exports.authRegister = (req, res) => {
  const { name, email, password, desc } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "Fill all the data",
    });
  }

  let q = "select * from usermodel where email = ?";

  db.query(q, [email], (error, data) => {
    if (error) {
      return res.json({
        message: "Error while registering",
        error,
      });
    }

    if (data.length) {
      return res.json({
        message: "User already exists",
      });
    }

    let q =
      "INSERT INTO usermodel (`name`, `email`, `password`, `desc`) VALUES (?)";

    const genSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, genSalt);

    const values = [name, email, hashedPassword, desc];
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.json({
          message: "error while registering",
          err,
        });
      }

      return res.json({
        message: "user registered",
        data: data,
      });
    });
  });
};

module.exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all the details",
      });
    }

    let q = "SELECT * FROM userModel WHERE email = ?";

    db.query(q, [email], async (error, data) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Internal server error", error });
      if (data.length === 0)
        return res.status(404).json({ message: "User not found" });

      const isPasswordValid = await bcrypt.compare(password, data[0].password);

      if (!isPasswordValid)
        return res.status(400).json({ message: "Wrong password or username" });

      const token = generateToken(data[0].id);

      res.json({
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        desc: data[0].desc,
        token: token,
      });
    });
  
};

module.exports.googleAuth = async (req,res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ message: "ID token is required" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name } = decodedToken;

        let q = "SELECT * FROM userModel WHERE email = ?";

        db.query(q, [email], (error, data) => {
            if (error) return res.status(500).json({ message: "Internal server error", error });

            if (data.length === 0) {
                // User does not exist, create a new user
                let insertQuery = "INSERT INTO userModel (uid, email, name) VALUES (?, ?, ?)";
                db.query(insertQuery, [uid, email, name], (error, result) => {
                    if (error) return res.status(500).json({ message: "Internal server error", error });

                    const token = generateToken(result.insertId);
                    res.json({ id: result.insertId, email, name, token });
                });
            } else {
                // User exists, generate a token
                const token = generateToken(data[0].id);
                res.json({
                    id: data[0].id,
                    name: data[0].name,
                    email: data[0].email,
                    desc: data[0].desc,
                    token: token,
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized", error });
    }
}

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  const q = "select name, email, `desc` from usermodel where id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.json({
        message: "error occured",
      });
    }

    if (data.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "Here is the user",
      data: data,
    });
  });
};
