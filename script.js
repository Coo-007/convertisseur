// ============================================
// ÉTAPE 1: Récupérer les éléments HTML
// ============================================
// Je vais chercher les éléments dont j'ai besoin dans la page HTML
const inputTemperature = document.getElementById('temperature');  // champ de saisie
const resultatCelsius = document.getElementById('resultatcelsius');    // affichage Celsius
const resultatFahrenheit = document.getElementById('resultatfahrenheit'); // affichage Fahrenheit
const resultatKelvin = document.getElementById('resultatkelvin');      // affichage Kelvin

const btnCelsius = document.getElementById('btncelsius');     // bouton Celsius
const btnFahrenheit = document.getElementById('btnfahrenheit'); // bouton Fahrenheit
const btnKelvin = document.getElementById('btnkelvin');       // bouton Kelvin

// Variable pour savoir DANS QUELLE UNITÉ l'utilisateur a saisi sa température
// Par défaut, on considère que c'est en Celsius
let uniteSaisie = "celsius";


// ============================================
// ÉTAPE 2: Les FORMULES de conversion
// ============================================

// Fonction qui convertit la température D'ABORD en Celsius (unité de base)
function convertirEnCelsius(valeur, unite) {
    if (unite === "celsius") {
        return valeur;  // Déjà en Celsius
    }
    else if (unite === "fahrenheit") {
        // Formule: (F - 32) × 5/9
        return (valeur - 32) * 5 / 9;
    }
    else if (unite === "kelvin") {
        // Formule: K - 273.15
        return valeur - 273.15;
    }
}

// Fonction qui convertit DEPUIS le Celsius vers TOUTES les unités
function convertirDepuisCelsius(celsius) {
    return {
        celsius: celsius,
        fahrenheit: (celsius * 9 / 5) + 32,  // Formule: (C × 9/5) + 32
        kelvin: celsius + 273.15              // Formule: C + 273.15
    };
}


// ============================================
// ÉTAPE 3: La fonction PRINCIPALE qui met à jour l'affichage
// ============================================

function mettreAJour() {
    // 1. Lire la valeur saisie par l'utilisateur
    let valeurSaisie = parseFloat(inputTemperature.value);
    
    // 2. Vérifier si c'est un nombre valide
    if (isNaN(valeurSaisie)) {
        // Si ce n'est pas un nombre, on affiche "---"
        resultatcelsius.textContent = "---";
        resultatfahrenheit.textContent = "---";
        resultatkelvin.textContent = "---";
        return;
    }
    
    // 3. Convertir la valeur saisie en Celsius (unité centrale)
    let celsius = convertirEnCelsius(valeurSaisie, uniteSaisie);
    
    // 4. Convertir ce Celsius vers toutes les unités
    let resultats = convertirDepuisCelsius(celsius);
    
    // 5. Afficher les résultats (arrondis à 2 décimales)
    resultatCelsius.textContent = resultats.celsius.toFixed(2);
    resultatFahrenheit.textContent = resultats.fahrenheit.toFixed(2);
    resultatKelvin.textContent = resultats.kelvin.toFixed(2);
}


// ============================================
// ÉTAPE 4: Changer l'unité source
// ============================================

function changerUnite(unite) {
    // Mettre à jour la variable globale
    uniteSaisie = unite;
    
    // Changer l'apparence des boutons (enlève la classe active de tous, puis ajoute au bon)
    btncelsius.classList.remove("active");
    btnfahrenheit.classList.remove("active");
    btnkelvin.classList.remove("active");
    
    if (unite === "celsius") btncelsius.classList.add("active");
    if (unite === "fahrenheit") btnfahrenheit.classList.add("active");
    if (unite === "kelvin") btnkelvin.classList.add("active");
    
    // Recalculer l'affichage avec la nouvelle unité
    mettreAJour();
}


// ============================================
// ÉTAPE 5: Brancher les ÉVÈNEMENTS (temps réel)
// ============================================

// Quand on tape dans l'input, on met à jour
inputTemperature.addEventListener("input", mettreAJour);

// Quand on clique sur un bouton, on change l'unité
btncelsius.addEventListener("click", function() {
    changerUnite("celsius");
});
btnfahrenheit.addEventListener("click", function() {
    changerUnite("fahrenheit");
});
btnkelvin.addEventListener("click", function() {
    changerUnite("kelvin");
});

// Initialisation : premier affichage
mettreAJour();


// ============================================
// EXPLICATION DU FONCTIONNEMENT :
// ============================================
// 
// 1. L'utilisateur tape "100" dans l'input
// 2. L'événement "input" déclenche mettreAJour()
// 3. mettreAJour() lit la valeur (100) et l'unité source (ex: "celsius")
// 4. convertirEnCelsius(100, "celsius") → retourne 100
// 5. convertirDepuisCelsius(100) → retourne { celsius:100, fahrenheit:212, kelvin:373.15 }
// 6. On affiche : 100°C, 212°F, 373.15K
//
// Si l'utilisateur change l'unité source pour Fahrenheit et tape "212" :
// 1. convertirEnCelsius(212, "fahrenheit") → (212-32)×5/9 = 100
// 2. convertirDepuisCelsius(100) → idem
// 3. On affiche bien 100°C, 212°F, 373.15K
//
// LE PRINCIPE CLÉ : TOUT PASSE PAR LE CELSIUS
// C'est plus simple car on n'a besoin que de 2 formules au lieu de 6 !
// ============================================