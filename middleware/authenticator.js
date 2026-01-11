const jwt = require("jsonwebtoken");
const {
  Decrypter,
  DecrypterString,
} = require("../services/repository/cryptography");
const { UnauthorizedTemplate } = require("../services/repository/helper");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token =
    req.session?.jwt ??
    req.body?.APK ??
    req.query?.APK ??
    req.params?.APK ??
    (authHeader?.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : undefined);

  console.log('Token received:', token);

  if (!token) {
    return res.status(401).send(UnauthorizedTemplate());
  }

  Decrypter(token, (err, data) => {
    if (err) {
      return res.status(404).json(UnauthorizedTemplate());
    } else {
      jwt.verify(data, process.env._SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log("JWT Error: ", err);
          return res.status(403).json(UnauthorizedTemplate());
        }
        req.user = decoded;
        next();
      });
    }
  });
};


module.exports = verifyJWT;

