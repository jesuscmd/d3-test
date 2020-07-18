const express = require("express");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

const jwtSecret = "JisusSecrets";

//SALVEMOS EL TOKEN EN UNA COOKIE
app.get("/jwt", (req, res) => {
  const token = jsonwebtoken.sign({ user: "johndoe" }, jwtSecret);
  res.cookie("token", token, { httpOnly: true });
  res.json({ token });
});

app.use(
  jwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
    getToken: (req) => req.cookies.token,
  })
);

const userData = { id: 0, name: "Arturo", lastName: "Troncoso" };

app.get("/userData", (req, res) => {
  res.json(userData);
});

app.listen(3001);

console.log("App running on localhost:3001");
