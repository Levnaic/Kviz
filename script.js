// promenjive
const pitanjeTxt = document.getElementById("naslov-pitanja");
const odgovorATxt = document.getElementById("odgovor-a");
const odgovorBTxt = document.getElementById("odgovor-b");
const odgovorCTxt = document.getElementById("odgovor-c");
const btnA = document.getElementById("odgovor-a-btn");
const btnB = document.getElementById("odgovor-b-btn");
const btnC = document.getElementById("odgovor-c-btn");
const scoreDisplay = document.getElementById("score");

let nizPitanja = [];
let score = 0;

// Funkcija za ucitavanje pitanja iz JSON-a
async function fetchNizPitanja() {
  const response = await fetch("pitanja.json");
  const data = await response.json();
  return data;
}

// Funkcija za prikaz pitanja
function prikaziPitanje(pitanje) {
  pitanjeTxt.textContent = pitanje.pitanje;
  odgovorATxt.textContent = pitanje.odgovorA;
  odgovorBTxt.textContent = pitanje.odgovorB;
  odgovorCTxt.textContent = pitanje.odgovorC;
}

// Funkcija za proveru odgovora
function proveriOdgovor(odgovor) {
  const trenutnoPitanje = nizPitanja.pop();
  if (odgovor === trenutnoPitanje.odgovor) {
    alert("Tačan odgovor!");
    score++;
    scoreDisplay.textContent = score;
  } else {
    alert("Pogrešan odgovor!");
  }
  if (nizPitanja.length > 0) {
    prikaziPitanje(nizPitanja[nizPitanja.length - 1]);
  } else {
    alert("Kviz je završen! Tvoj konačan rezultat je: " + score);
  }
}

// Postavi pitanja kada se stranica učita
window.onload = async function () {
  nizPitanja = await fetchNizPitanja();
  // Prikazi prvo pitanje
  prikaziPitanje(nizPitanja[nizPitanja.length - 1]);
};

// Event listeneri za odgovore
btnA.addEventListener("click", () => proveriOdgovor("a"));
btnB.addEventListener("click", () => proveriOdgovor("b"));
btnC.addEventListener("click", () => proveriOdgovor("c"));
