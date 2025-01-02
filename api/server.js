import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import cors from "cors";
import { get } from "http";
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Chemin complet du fichier dans lequel je suis(ici sever.js)
const __fileName = fileURLToPath(import.meta.url);
// Chemin complet du dossier dans lequel se trouve le fichier server.js(ici api)
const __dirName = path.dirname(__fileName);
// Chemin complet du fichier DB.json
const dbPath = path.join(__dirName, "DB.json");

app.post("/api/addUser", async (req, res) => {
  const nouvelleDonnee = req.body;
  const donneesexistantes = await recupereDonnee();
  donneesexistantes.push(nouvelleDonnee);
  await sauvegardeDonnees(donneesexistantes);
  res.status(201).json({ message: "Utilisateur ajouté avec succès" });
});
app.get("/api/allUsers", async (req, res) => {
  try {
    const donnees = await recupereDonnee();
    res.status(200).json(donnees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Impossible d'obtenir la liste des utilisateur" });
  }
});
async function recupereDonnee() {
  try {
    const donnees = await fs.readFile(dbPath, "utf8");
    return JSON.parse(donnees);
  } catch (error) {
    return [];
  }
}
async function sauvegardeDonnees(donnee) {
  fs.writeFile(dbPath, JSON.stringify(donnee, null, 2), "utf-8");
}
app.listen(port, () => {
  console.log(`On utilise le port ${port}`);
});
