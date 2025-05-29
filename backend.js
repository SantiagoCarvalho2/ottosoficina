// backend.js
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const FormData = require("form-data");

const app = express();
const upload = multer();
app.use(cors());

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1377751722021359636/6ICNX_H5Gu1zIN4m-54rfzJIyvEeE1oHG6LFIC4-aiaitxngJDqjMlHAspYgy1Ug1EiL";

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }

  const form = new FormData();
  form.append("file", req.file.buffer, req.file.originalname);

  try {
    await axios.post(DISCORD_WEBHOOK_URL, form, {
      headers: form.getHeaders(),
    });

    res.status(200).send("Imagem enviada para o Discord.");
  } catch (err) {
    console.error("Erro ao enviar para o Discord:", err.message);
    res.status(500).send("Erro ao enviar para o Discord.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
