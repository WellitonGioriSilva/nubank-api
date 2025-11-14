const jwt = require("jsonwebtoken");

module.exports = (secret) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token é obrigatório" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token inválido" });
      }

      req.user = decoded;
      next();
    });
  };
};
