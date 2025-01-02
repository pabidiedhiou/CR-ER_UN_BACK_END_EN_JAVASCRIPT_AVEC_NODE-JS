import path from "path"; //Créer un chemin complet vers un fichier
import { fileURLToPath } from "url"; //Obtenir le chemin du module en cours
import fs from "fs/promises";
const __nomfichier = fileURLToPath(import.meta.url);
const __nomdossier = path.dirname(__nomfichier);
const dbPath = path.join(__nomdossier, "DB.json");
export async function loadDatas() {
  try {
    const donnees = await fs.readFile(dbPath, "utf8");
    return JSON.parse(donnees);
  } catch (error) {
    return [];
  }
}

export async function saveDatas(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}
