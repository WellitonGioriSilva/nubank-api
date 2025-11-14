const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const authMiddleware = require("./src/autenticacao");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "chave_segura_api";

// Mock
const mockUser = {
  email: "admin@email.com",
  password: "1234"
};

app.get("/", (req, res) => {
  res.send("API de Autenticação com JWT");
});

// POST /login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

    return res.json({
      message: "Login realizado com sucesso",
      token
    });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

// Rota protegida
app.get("/private", authMiddleware(SECRET), (req, res) => {
  res.json({
    message: "Acesso permitido",
    user: req.user
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
