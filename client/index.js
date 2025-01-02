const form = document.querySelector("form");
const bouton = document.querySelector(".btn");
const sendDatas = async (e) => {
  e.preventDefault();
  const donnees = new FormData(form);
  const nom = donnees.get("nom");
  const prenom = donnees.get("prenom");
  const donneesJson = {
    prenom,
    nom,
  };
  try {
    const reponses = await fetch("http://127.0.0.1:5000/api/addUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(donneesJson),
    });
    if (!reponses.ok) {
      console.log("Impossible d'envoyer l'utilisateur dans la base de données");
    }
    alert("Utilisateur envoyé avec succès");
  } catch (error) {
    console.log(`Les données ne peuvent pas être envoyées ${error}`);
  }
};
form.addEventListener("submit", sendDatas);

bouton.addEventListener("click", async () => {
  const response = await fetch("http://127.0.0.1:5000/api/allUsers");
  const post = await response.json();
  console.log(post);
});
