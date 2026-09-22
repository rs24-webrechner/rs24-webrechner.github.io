// ========================================
// DATENBANKEN
// ========================================

import { geneDaten as geneDatenOriginal } from "../data/gene_daten.js";
import { tier_daten } from "../data/tier_daten.js";
import { itemDaten } from "../data/item_daten.js";

// ========================================
// ITEMPREISE
// ========================================

// Preise der einzelnen Itemstufen
const itempreise = {
    blaupausen: {
        sattel: 5000,
        tek: 8000,
        sonstige: 1000
    },
    konvertierbar: {
        sattel: 4000,
        tek: 6000,
        sonstige: 0
    },
    hergestellt: {
        sattel: 3000,
        tek: 4000,
        sonstige: 0
    }
};

// ========================================
// MINDESTPREISE
// ========================================

const mindestpreise = {
    blaupausen: {
        sattel: 5000,
        tek: 8000,
        sonstige: 1000
    },
    konvertierbar: {
        sattel: 4000,
        tek: 6000,
        sonstige: 0
    },
    hergestellt: {
        sattel: 3000,
        tek: 4000,
        sonstige: 0
    }
};

// Maximal möglicher Itempreis
const maximalerItempreis = 20000;

// Aktuell ausgewählte Itemstufe
let aktuelleItemstufe = "blaupausen";

// ========================================
// HTML-ELEMENTE
// ========================================

const itempreisStufe =
    document.getElementById("itempreis-stufe");

const preisSattel =
    document.getElementById("preis-sattel");

const preisTek =
    document.getElementById("preis-tek");

const preisSonstige =
    document.getElementById("preis-sonstige");

// ========================================
// SEITENLEISTE
// ========================================

const rechner =
    document.querySelector(".rechner");

const seitenleisteUmschalter =
    document.getElementById("seitenleiste-umschalter");

// ========================================
// SEITENLEISTE EIN- UND AUSKLAPPEN
// ========================================

seitenleisteUmschalter.addEventListener(
    "click",
    function () {
        const eingeklappt =
            rechner.classList.toggle(
                "seitenleiste-eingeklappt"
            );

        this.setAttribute(
            "aria-expanded",
            String(!eingeklappt)
        );
    }
);

// ========================================
// PREISE ANZEIGEN
// ========================================

function preiseAnzeigen(stufe) {
    const preise = itempreise[stufe];
    const mindestwerte = mindestpreise[stufe];

    preisSattel.value = preise.sattel;
    preisTek.value = preise.tek;
    preisSonstige.value = preise.sonstige;

    preisSattel.min = mindestwerte.sattel;
    preisTek.min = mindestwerte.tek;
    preisSonstige.min = mindestwerte.sonstige;

    preisSattel.max = maximalerItempreis;
    preisTek.max = maximalerItempreis;
    preisSonstige.max = maximalerItempreis;
}

// ========================================
// AKTUELLE PREISE SPEICHERN
// ========================================

function aktuellePreiseSpeichern() {
    itempreise[aktuelleItemstufe].sattel =
        Number(preisSattel.value);

    itempreise[aktuelleItemstufe].tek =
        Number(preisTek.value);

    itempreise[aktuelleItemstufe].sonstige =
        Number(preisSonstige.value);
}

// ========================================
// ITEMPREIS PRÜFEN
// ========================================

function itempreisPruefen(input, kategorie) {
    let wert = Number(input.value);

    const mindestwert =
        mindestpreise[aktuelleItemstufe][kategorie];

    if (wert < mindestwert) {
        wert = mindestwert;
    }

    if (wert > maximalerItempreis) {
        wert = maximalerItempreis;
    }

    input.value = wert;

    aktuellePreiseSpeichern();
}

// ========================================
// ITEMSTUFE WECHSELN
// ========================================

itempreisStufe.addEventListener("change", function () {
    aktuellePreiseSpeichern();

    aktuelleItemstufe = this.value;

    preiseAnzeigen(aktuelleItemstufe);
});

// ========================================
// PREISÄNDERUNGEN
// ========================================

preisSattel.addEventListener(
    "change",
    function () {
        itempreisPruefen(this, "sattel");
    }
);

preisTek.addEventListener(
    "change",
    function () {
        itempreisPruefen(this, "tek");
    }
);

preisSonstige.addEventListener(
    "change",
    function () {
        itempreisPruefen(this, "sonstige");
    }
);

// ========================================
// STARTWERTE LADEN
// ========================================

preiseAnzeigen(aktuelleItemstufe);

// ========================================
// MUTATIONEN
// ========================================

// Alle im System bekannten Mutationen
const mutationen = [
    "leben",
    "ausdauer",
    "gewicht",
    "sauerstoff",
    "nahrung",
    "schaden",
    "geschwindigkeit",
    "handwerk"
];

// Aktuell ausgewählte Mutationen
const ausgewaehlteMutationen = new Set();

// Werte der einzelnen Mutationen
const mutationswerte = {
    leben: 2,
    ausdauer: 2,
    gewicht: 2,
    sauerstoff: 2,
    nahrung: 2,
    schaden: 2,
    geschwindigkeit: 2,
    handwerk: 2
};

// Preis pro Mutationspaar
const mutationspreise = {
    leben: 0,
    ausdauer: 0,
    gewicht: 0,
    sauerstoff: 0,
    nahrung: 0,
    schaden: 0,
    geschwindigkeit: 0,
    handwerk: 0
};

// Maximaler Preis pro Mutationspaar
const maximalerMutationspreis = 100;

// Minimale und maximale Mutationsanzahl
const minimaleMutationen = 2;
const maximaleMutationen = 254;

// Orientierungspunkte für den Mutationsslider
const mutationsMarken = [
    2,
    50,
    100,
    150,
    200,
    254
];

// ========================================
// HTML-ELEMENTE
// ========================================

const mutationAuswahl =
    document.getElementById("mutation-auswahl");

const aktiveMutationen =
    document.getElementById("aktive-mutationen");

const mutationsSlider =
    document.getElementById("mutations-slider");

const dinoMutationen =
    document.getElementById("dino-mutationen");

// ========================================
// MUTATIONSNAMEN
// ========================================

function mutationName(mutation) {
    const namen = {
        leben: "Leben",
        ausdauer: "Ausdauer",
        gewicht: "Gewicht",
        sauerstoff: "Sauerstoff",
        nahrung: "Nahrung",
        schaden: "Schaden",
        geschwindigkeit: "Geschwindigkeit",
        handwerk: "Handwerk"
    };

    return namen[mutation];
}

// ========================================
// SLIDER-FARBVERLAUF
// ========================================

function mutationsSliderFarbe(slider) {
    const min = Number(slider.min);
    const max = Number(slider.max);
    const wert = Number(slider.value);

    const fortschritt =
        ((wert - min) / (max - min)) * 100;

    slider.style.setProperty(
        "--slider-fortschritt",
        `${fortschritt}%`
    );
}

// ========================================
// MUTATION HINZUFÜGEN
// ========================================

mutationAuswahl.addEventListener("change", function () {
    const mutation = this.value;

    if (!mutation) {
        return;
    }

    ausgewaehlteMutationen.add(mutation);

    mutationHinzufuegen(mutation);

    this.value = "";
});

// ========================================
// AKTIVE MUTATION ANZEIGEN
// ========================================

function mutationHinzufuegen(mutation) {
    const option =
        mutationAuswahl.querySelector(
            `option[value="${mutation}"]`
        );

    if (option) {
        option.disabled = true;
    }

    // ========================================
    // SIDEBAR – PREIS
    // ========================================

    const container =
        document.createElement("div");

    container.className = "mutationspreis";
    container.dataset.mutation = mutation;

    const kopf =
        document.createElement("div");

    kopf.className = "mutationspreis-kopf";

    const titel =
        document.createElement("h4");

    titel.textContent =
        mutationName(mutation);

    kopf.appendChild(titel);

    const eingabe =
        document.createElement("div");

    eingabe.className =
        "mutationspreis-eingabe";

    const input =
        document.createElement("input");

    input.type = "number";
    input.min = "0";
    input.max = maximalerMutationspreis;
    input.step = "1";
    input.value = mutationspreise[mutation];

    input.addEventListener("change", function () {
        let wert = Number(this.value);

        if (wert < 0) {
            wert = 0;
        }

        if (wert > maximalerMutationspreis) {
            wert = maximalerMutationspreis;
        }

        this.value = wert;

        mutationspreise[mutation] = wert;
    });

    const einheit =
        document.createElement("span");

    einheit.textContent =
        "SP / Paar";

    eingabe.appendChild(input);
    eingabe.appendChild(einheit);

    container.appendChild(kopf);
    container.appendChild(eingabe);

    aktiveMutationen.appendChild(container);

    dinoMutationen.hidden = false;

    // ========================================
    // HAUPTBEREICH – SLIDER
    // ========================================

    const sliderContainer =
        document.createElement("div");

    sliderContainer.className =
        "mutation-slider";

    sliderContainer.dataset.mutation =
        mutation;

    // ========================================
    // SLIDER-KOPF
    // ========================================

    const sliderKopf =
        document.createElement("div");

    sliderKopf.className =
        "mutation-slider-kopf";

    const sliderTitel =
        document.createElement("h4");

    sliderTitel.textContent =
        mutationName(mutation);

    const entfernen =
        document.createElement("button");

    entfernen.type = "button";
    entfernen.className =
        "mutation-slider-entfernen";
    entfernen.textContent = "×";
    entfernen.title =
        "Mutation entfernen";

    entfernen.addEventListener("click", function () {
        mutationEntfernen(mutation);
    });

    sliderKopf.appendChild(sliderTitel);
    sliderKopf.appendChild(entfernen);

    // ========================================
    // SLIDER-BEREICH
    // ========================================

    const sliderBereich =
        document.createElement("div");

    sliderBereich.className =
        "mutation-slider-bereich";

    // ========================================
    // WERTEANZEIGE
    // ========================================

    const sliderWerte =
        document.createElement("div");

    sliderWerte.className =
        "mutation-slider-werte";

    const aktuellerWert =
        document.createElement("span");

    aktuellerWert.className =
        "mutation-slider-wert";

    aktuellerWert.textContent =
        mutationswerte[mutation];

    sliderWerte.appendChild(aktuellerWert);

    // ========================================
    // RANGE-SLIDER
    // ========================================

    const slider =
        document.createElement("input");

    slider.type = "range";

    slider.min =
        minimaleMutationen;

    slider.max =
        maximaleMutationen;

    slider.step = "2";

    slider.value =
        mutationswerte[mutation];

    slider.addEventListener("input", function () {
        const wert =
            Number(this.value);

        mutationswerte[mutation] =
            wert;

        aktuellerWert.textContent =
            wert;

        mutationsSliderFarbe(this);
    });

    // ========================================
    // ORIENTIERUNGSMARKEN
    // ========================================

    const marken =
        document.createElement("div");

    marken.className =
        "mutation-slider-marken";

    mutationsMarken.forEach(function (marke) {
        const marker =
            document.createElement("div");

        marker.className =
            "mutation-slider-marke";

        const strich =
            document.createElement("span");

        strich.className =
            "mutation-slider-marke-strich";

        const beschriftung =
            document.createElement("span");

        beschriftung.className =
            "mutation-slider-marke-text";

        beschriftung.textContent =
            marke;

        marker.appendChild(strich);
        marker.appendChild(beschriftung);

        marken.appendChild(marker);
    });

    sliderBereich.appendChild(sliderWerte);
    sliderBereich.appendChild(slider);
    sliderBereich.appendChild(marken);

    sliderContainer.appendChild(sliderKopf);
    sliderContainer.appendChild(sliderBereich);

    mutationsSlider.appendChild(sliderContainer);

    mutationsSliderFarbe(slider);
}

// ========================================
// MUTATION ENTFERNEN
// ========================================

function mutationEntfernen(mutation) {
    ausgewaehlteMutationen.delete(mutation);

    const option =
        mutationAuswahl.querySelector(
            `option[value="${mutation}"]`
        );

    if (option) {
        option.disabled = false;
    }

    const preisfeld =
        aktiveMutationen.querySelector(
            `[data-mutation="${mutation}"]`
        );

    if (preisfeld) {
        preisfeld.remove();
    }

    const slider =
        mutationsSlider.querySelector(
            `[data-mutation="${mutation}"]`
        );

    if (slider) {
        slider.remove();
    }

    if (ausgewaehlteMutationen.size === 0) {
        dinoMutationen.hidden = true;
    }
}

// ========================================
// RECHNER-AUSWAHL
// ========================================

const dinoKonfigurieren =
    document.getElementById("dino-konfigurieren");

const itemKonfigurieren =
    document.getElementById("item-konfigurieren");

const dinoKonfigurator =
    document.getElementById("dino-konfigurator");

const itemKonfigurator =
    document.getElementById("item-konfigurator");

const dinoKonfiguratorSchliessen =
    document.getElementById(
        "dino-konfigurator-schliessen"
    );

const tierInWarenkorb =
    document.getElementById("tier-in-warenkorb");

const itemKonfiguratorSchliessen =
    document.getElementById(
        "item-konfigurator-schliessen"
    );

const itemInWarenkorb =
    document.getElementById("item-in-warenkorb");

// ========================================
// DINO KONFIGURIEREN
// ========================================

dinoKonfigurieren.addEventListener("click", function () {
    dinoKonfigurator.hidden = false;
});

// ========================================
// DINO-KONFIGURATOR SCHLIESSEN
// ========================================

dinoKonfiguratorSchliessen.addEventListener(
    "click",
    function () {
        dinoKonfigurator.hidden = true;
    }
);

// ========================================
// TIER IN DEN WARENKORB
// ========================================

// Die eigentliche Warenkorb-Logik kommt später.
// Der Button ist bereits vorbereitet und reagiert
// aktuell nur auf den visuellen Klick.

tierInWarenkorb.addEventListener(
    "click",
    function () {
        // Platzhalter für die spätere Warenkorb-Logik.
    }
);

// ========================================
// ITEM-KONFIGURATOR
// ========================================

// Aktuell ausgewählte Item-Kategorie
let aktuelleItemKategorie = null;

// Aktuell ausgewähltes Item
let aktuellesItem = null;

// Aktuell ausgewählte Qualität
let aktuelleItemQualitaet = null;

// Aktuell ausgewählte Herstellungsart
let aktuelleItemHerstellungsart = null;

// ========================================
// ITEM-KATEGORIEN
// ========================================

const itemKategorien = {
    "endgame-sattel": {
        name: "Endgame-Sattel",
        hinweis:
            "Ossidon / Rex / Megatherium / Therizino / Deinosuchus / Spino / Acro / Carcha / Giga / Reaper / Rhynio / Dreadnoghtus / Rock Drake / Gigadesmodus / Tek-Sättel / Deinonychus"
    },
    "tek-ausruestung": {
        name: "Tek-Ausrüstung",
        hinweis:
            "Tek-Rüstung / Tek-Waffen / Tek-Werkzeuge"
    },
    "sonstige-bauplaene": {
        name: "Sonstiges",
        hinweis:
            "Alles was nicht gesondert aufgelistet wurde!"
    }
};

// ========================================
// ITEM-KONFIGURATOR ÖFFNEN
// ========================================

itemKonfigurieren.addEventListener("click", function () {
    itemKonfigurator.hidden = false;
});

// ========================================
// ITEM-KONFIGURATOR SCHLIESSEN
// ========================================

itemKonfiguratorSchliessen.addEventListener(
    "click",
    function () {
        itemKonfigurator.hidden = true;
    }
);

// ========================================
// ITEM-KATEGORIEN
// ========================================

const itemKategorieButtons =
    document.querySelectorAll(".item-kategorie-button");

const itemKategorieHinweis =
    document.getElementById("item-kategorie-hinweis");

itemKategorieButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        itemKategorieButtons.forEach(
            function (andererButton) {
                andererButton.classList.remove("aktiv");
            }
        );

        button.classList.add("aktiv");

        aktuelleItemKategorie =
            button.dataset.kategorie;

        if (itemKategorieHinweis) {
            const kategorie =
                itemKategorien[aktuelleItemKategorie];

            if (kategorie) {
                itemKategorieHinweis.textContent =
                    kategorie.hinweis;

                itemKategorieHinweis.hidden = false;
            }
        }

        // Itemauswahl bei Kategorienwechsel zurücksetzen

        aktuellesItem = null;

        itemSucheEingabe.value = "";

        itemSucheErgebnisse.innerHTML = "";

        itemSucheErgebnisse.hidden = true;
    });
});

// ========================================
// ITEM-SUCHE
// ========================================

const itemSucheEingabe =
    document.getElementById("item-suche-eingabe");

const itemSucheErgebnisse =
    document.getElementById("item-suche-ergebnisse");

// ========================================
// ITEM-SUCHE ERGEBNISSE ANZEIGEN
// ========================================

function itemSucheAnzeigen() {
    const suchtext =
        itemSucheEingabe.value.trim().toLowerCase();

    itemSucheErgebnisse.innerHTML = "";

    if (!suchtext) {
        itemSucheErgebnisse.hidden = true;
        return;
    }

    const treffer =
        itemDaten.filter(function (item) {
            const nameDeutsch =
                (item.name_de || "").toLowerCase();

            return nameDeutsch.startsWith(suchtext);
        });

    if (treffer.length === 0) {
        const keinTreffer =
            document.createElement("div");

        keinTreffer.className =
            "item-suche-kein-treffer";

        keinTreffer.textContent =
            "Kein passendes Item gefunden.";

        itemSucheErgebnisse.appendChild(keinTreffer);

        itemSucheErgebnisse.hidden = false;

        return;
    }

    treffer.forEach(function (item) {
        const eintrag =
            document.createElement("button");

        eintrag.type = "button";

        eintrag.className =
            "item-suche-ergebnis";

        // Für die Anzeige wird der deutsche Name verwendet.
        // Die englischen Namen bleiben für die spätere
        // Mehrsprachigkeit in der Datenbank erhalten.

        eintrag.textContent =
            item.name_de || item.name;

        eintrag.addEventListener("click", function () {
            aktuellesItem = item;

            itemSucheEingabe.value =
                item.name_de || item.name;

            itemSucheErgebnisse.innerHTML = "";

            itemSucheErgebnisse.hidden = true;
        });

        itemSucheErgebnisse.appendChild(eintrag);
    });

    itemSucheErgebnisse.hidden = false;
}

// ========================================
// ITEM-SUCHE EINGABE
// ========================================

itemSucheEingabe.addEventListener(
    "input",
    function () {
        itemSucheAnzeigen();
    }
);

// ========================================
// QUALITÄT
// ========================================

const itemQualitaetButtons =
    document.querySelectorAll(".item-qualitaet-button");

itemQualitaetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        itemQualitaetButtons.forEach(
            function (andererButton) {
                andererButton.classList.remove("aktiv");
            }
        );

        button.classList.add("aktiv");

        aktuelleItemQualitaet =
            button.dataset.qualitaet;
    });
});

// ========================================
// HERSTELLUNGSART
// ========================================

const itemHerstellungsartButtons =
    document.querySelectorAll(
        ".item-herstellungsart-button"
    );

itemHerstellungsartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        itemHerstellungsartButtons.forEach(
            function (andererButton) {
                andererButton.classList.remove("aktiv");
            }
        );

        button.classList.add("aktiv");

        aktuelleItemHerstellungsart =
            button.dataset.herstellungsart;
    });
});

// ========================================
// ITEM IN DEN WARENKORB
// ========================================

// Die eigentliche Warenkorb-Logik kommt später.
// Die Konfiguration wird bis dahin nur gesammelt.

itemInWarenkorb.addEventListener(
    "click",
    function () {
        const itemKonfiguration = {
            item: aktuellesItem,

            kategorie:
                aktuelleItemKategorie,

            qualitaet:
                aktuelleItemQualitaet,

            herstellungsart:
                aktuelleItemHerstellungsart,

            ruestungswert:
                document.getElementById(
                    "item-ruestungswert"
                ).value,

            itemrating:
                document.getElementById(
                    "itemrating"
                ).value,

            menge:
                document.getElementById(
                    "item-menge"
                ).value
        };

        // Platzhalter für die spätere Warenkorb-Logik

        console.log(
            "Item-Konfiguration:",
            itemKonfiguration
        );
    }
);

// ========================================
// DINO-KATEGORIEN
// ========================================

const dinoKategorien = [
    {
        wert: "schulter",
        name: "Schulter",
        icon: "schulter.png",
        hinweis:
            "Bulbdog / Katze / Compy / Cosmo / Dimorphodon / Drakeling / Featherlight / Ferox / Gloon / Glowtail / Hesperonis / Ichthyornis / Jerboa / Mesopithecus / Microraptor / Otter / Pegomastax / Shinehorn / Vulture"
    },
    {
        wert: "companion",
        name: "Companion",
        icon: "companion.png",
        hinweis:
            "Armadoggo / Veilwyn"
    },
    {
        wert: "normal",
        name: "Normal",
        icon: "normal.png",
        hinweis:
            "Alles was nicht explizit unter einer anderen Kategorie aufgelistet ist!"
    },
    {
        wert: "boss",
        name: "Boss",
        icon: "boss.png",
        hinweis:
            "Ossidon / Rex / Megatherium / Therizino / Deinosuchus / Spino / Acro"
    },
    {
        wert: "eier",
        name: "Eier",
        icon: "eier.png",
        hinweis:
            "Deinonychus / Aureliax / Wyvern / Rock Drake"
    },
    {
        wert: "special",
        name: "Special",
        icon: "special.png",
        hinweis:
            "Carchar / Giga / Reaper / Rhynio / Dreadnoughtus\nWichtig: Tiere dürfen nur an Spieler verkauft werden, die bereits einen im Besitz haben und dies nachweisen können!"
    },
    {
        wert: "gacha",
        name: "Element-Gacha",
        icon: "gacha.png",
        hinweis:
            "Kastration wird ignoriert!"
    }
];

// Aktuell ausgewählte Kategorie
let aktuelleDinoKategorie = null;

// Aktuell ausgewähltes Tier
let aktuellesTier = null;

// ========================================
// HTML-ELEMENTE
// ========================================

const kategorieButtons =
    document.querySelector(".kategorie-buttons");

const kategorieHinweis =
    document.querySelector(".kategorie-hinweis");

const dinoSucheEingabe =
    document.getElementById("dino-suche-eingabe");

const dinoSucheErgebnisse =
    document.getElementById("dino-suche-ergebnisse");

// ========================================
// DINO-SUCHE
// ========================================

function dinoSucheAnzeigen() {
    const suchtext =
        dinoSucheEingabe.value.trim().toLowerCase();

    dinoSucheErgebnisse.innerHTML = "";

    if (!suchtext) {
        dinoSucheErgebnisse.hidden = true;
        return;
    }

    const treffer =
        tier_daten.filter(function (tier) {
            const name =
                (tier.name || "").toLowerCase();

            const nameDeutsch =
                (tier.name_de || "").toLowerCase();

            return (
                name.startsWith(suchtext) ||
                nameDeutsch.startsWith(suchtext)
            );
        });

    if (treffer.length === 0) {
        const keinTreffer =
            document.createElement("div");

        keinTreffer.className =
            "dino-suche-kein-treffer";

        keinTreffer.textContent =
            "Kein passendes Tier gefunden.";

        dinoSucheErgebnisse.appendChild(keinTreffer);

        dinoSucheErgebnisse.hidden = false;

        return;
    }

    treffer.forEach(function (tier) {
        const eintrag =
            document.createElement("button");

        eintrag.type = "button";

        eintrag.className =
            "dino-suche-ergebnis";

        // Für die Anzeige wird der deutsche Name verwendet.
        // Falls kein deutscher Name vorhanden ist,
        // wird auf den Originalnamen zurückgegriffen.

        eintrag.textContent =
            tier.name_de || tier.name;

        eintrag.addEventListener("click", function () {
            aktuellesTier = tier;

            // ========================================
            // KATEGORIE AUTOMATISCH ANPASSEN
            // ========================================

            if (tier.kategorie) {
                document
                    .querySelectorAll(".kategorie-button.aktiv")
                    .forEach(function (aktiv) {
                        aktiv.classList.remove("aktiv");
                    });

                const passendeKategorie =
                    document.querySelector(
                        `.kategorie-button[data-kategorie="${tier.kategorie}"]`
                    );

                if (passendeKategorie) {
                    passendeKategorie.classList.add("aktiv");
                }

                aktuelleDinoKategorie =
                    tier.kategorie;

                const kategorie =
                    dinoKategorien.find(function (eintrag) {
                        return eintrag.wert === tier.kategorie;
                    });

                if (kategorie && kategorieHinweis) {
                    kategorieHinweis.textContent =
                        kategorie.hinweis;

                    kategorieHinweis.hidden = false;
                }
            }

            dinoSucheEingabe.value =
                tier.name_de || tier.name;

            dinoSucheErgebnisse.innerHTML = "";

            dinoSucheErgebnisse.hidden = true;
        });

        dinoSucheErgebnisse.appendChild(eintrag);
    });

    dinoSucheErgebnisse.hidden = false;
}

// ========================================
// DINO-SUCHE EINGABE
// ========================================

dinoSucheEingabe.addEventListener(
    "input",
    function () {
        dinoSucheAnzeigen();
    }
);

// ========================================
// KATEGORIEN ANZEIGEN
// ========================================

dinoKategorien.forEach(function (kategorie) {
    const button =
        document.createElement("button");

    button.type = "button";

    button.className =
        "kategorie-button";

    button.dataset.kategorie =
        kategorie.wert;

    const inhalt =
        document.createElement("span");

    inhalt.className =
        "kategorie-button-inhalt";

    const icon =
        document.createElement("img");

    icon.className =
        "kategorie-button-icon";

    icon.src =
        `assets/icons/tiere/${kategorie.icon}`;

    icon.alt =
        kategorie.name;

    const text =
        document.createElement("span");

    text.className =
        "kategorie-button-text";

    text.textContent =
        kategorie.name;

    inhalt.appendChild(icon);
    inhalt.appendChild(text);

    button.appendChild(inhalt);

    kategorieButtons.appendChild(button);

    button.addEventListener("click", function () {
        document
            .querySelectorAll(".kategorie-button.aktiv")
            .forEach(function (aktiv) {
                aktiv.classList.remove("aktiv");
            });

        button.classList.add("aktiv");

        aktuelleDinoKategorie =
            kategorie.wert;

        // ========================================
        // KATEGORIE-HINWEIS
        // ========================================

        if (kategorieHinweis) {
            kategorieHinweis.textContent =
                kategorie.hinweis;

            kategorieHinweis.hidden = false;
        }
    });
});

// ========================================
// DINO-ANGABEN
// ========================================

// Aktuelle Auswahl der Dino-Angaben
const dinoAngaben = {
    abgabeart: null,
    geschlecht: null,
    kastration: null,
    shiny: null,
    rassenzusatz: null
};

// Alle Auswahlboxen
const angabeOptionen =
    document.querySelectorAll(".angabe-option");

// Auswahlboxen anklickbar machen

angabeOptionen.forEach(function (option) {
    option.addEventListener("click", function () {
        const gruppe =
            option.dataset.gruppe;

        const wert =
            option.dataset.wert;

        document
            .querySelectorAll(
                `.angabe-option[data-gruppe="${gruppe}"]`
            )
            .forEach(function (andereOption) {
                andereOption.classList.remove("aktiv");
            });

        option.classList.add("aktiv");

        dinoAngaben[gruppe] = wert;
    });
});

// ========================================
// GENE
// ========================================

// Die vollständige Gene-Datenbank kommt aus gene_daten.js.
// Die Datenbank selbst bleibt unverändert.

// Für die Website werden lediglich IDs ergänzt,
// damit einzelne Gene eindeutig angesprochen werden können.

const geneDaten =
    geneDatenOriginal.map(function (gene, index) {
        return {
            ...gene,
            id:
                `${gene.kategorie}-${index}`
        };
    });

// ========================================
// WEBSITE-HARDCAP
// ========================================

// Maximal fünf Gene gleichzeitig.
// Dies ist ausschließlich eine Begrenzung der Website-Auswahl
// und gehört nicht zur eigentlichen Rechnerlogik.

const maximaleGene =
    5;

// Aktuell ausgewählte Gene
const ausgewaehlteGene = [];

// HTML-Elemente
const genAuswahl =
    document.getElementById("gen-auswahl");

const aktiveGene =
    document.getElementById("aktive-gene");

const dinoGene =
    document.getElementById("dino-gene");

const geneSlots =
    document.getElementById("gene-slots");

// ========================================
// GENE IM DROPDOWN ANZEIGEN
// ========================================

geneDaten.forEach(function (gene) {
    const option =
        document.createElement("option");

    option.value =
        gene.id;

    option.textContent =
        gene.name_de;

    genAuswahl.appendChild(option);
});

// Solange keine Gene ausgewählt wurden,
// bleibt der Gen-Bereich ausgeblendet.

dinoGene.hidden = true;

// ========================================
// GEN AUSWÄHLEN
// ========================================

genAuswahl.addEventListener("change", function () {
    const geneId =
        this.value;

    if (!geneId) {
        return;
    }

    // Website-Hardcap:
    // Maximal fünf Gene gleichzeitig.

    if (ausgewaehlteGene.length >= maximaleGene) {
        this.value = "";
        return;
    }

    const gene =
        geneDaten.find(function (eintrag) {
            return eintrag.id === geneId;
        });

    if (!gene) {
        this.value = "";
        return;
    }

    // ========================================
    // MAX STACKS DES GENS
    // ========================================

    const vorhandeneAnzahl =
        ausgewaehlteGene.filter(function (ausgewaehltesGene) {
            return ausgewaehltesGene.id === geneId;
        }).length;

    if (
        gene.max_stacks !== null &&
        vorhandeneAnzahl >= gene.max_stacks
    ) {
        this.value = "";
        return;
    }

    ausgewaehlteGene.push(gene);

    genHinzufuegen(gene);

    this.value = "";
});

// ========================================
// GEN HINZUFÜGEN
// ========================================

function genHinzufuegen(gene) {
    dinoGene.hidden = false;

    // ========================================
    // SIDEBAR
    // ========================================

    if (aktiveGene) {
        const sidebarEintrag =
            document.createElement("div");

        sidebarEintrag.className =
            "gene-auswahl-eintrag";

        sidebarEintrag.dataset.gene =
            gene.id;

        const sidebarName =
            document.createElement("span");

        sidebarName.textContent =
            gene.name_de;

        sidebarEintrag.appendChild(sidebarName);

        aktiveGene.appendChild(sidebarEintrag);
    }

    // ========================================
    // HAUPTBEREICH
    // ========================================

    const slot =
        document.createElement("div");

    slot.className =
        "gene-slot";

    slot.dataset.gene =
        gene.id;

    const name =
        document.createElement("span");

    name.className =
        "gene-slot-name";

    name.textContent =
        gene.name_de;

    const entfernen =
        document.createElement("button");

    entfernen.type = "button";

    entfernen.className =
        "gene-slot-entfernen";

    entfernen.textContent =
        "×";

    entfernen.title =
        "Gen entfernen";

    // Beschreibung erscheint nur beim Darüberfahren

    const beschreibung =
        document.createElement("div");

    beschreibung.className =
        "gene-slot-beschreibung";

    beschreibung.textContent =
        gene.beschreibung_de;

    entfernen.addEventListener("click", function () {
        genEntfernen(gene);
    });

    slot.appendChild(name);
    slot.appendChild(entfernen);
    slot.appendChild(beschreibung);

    geneSlots.appendChild(slot);
}

// ========================================
// GEN ENTFERNEN
// ========================================

function genEntfernen(gene) {
    const index =
        ausgewaehlteGene.indexOf(gene);

    if (index !== -1) {
        ausgewaehlteGene.splice(index, 1);
    }

    if (aktiveGene) {
        const sidebarEintrag =
            aktiveGene.querySelector(
                `[data-gene="${gene.id}"]`
            );

        if (sidebarEintrag) {
            sidebarEintrag.remove();
        }
    }

    const slots =
        geneSlots.querySelectorAll(
            `[data-gene="${gene.id}"]`
        );

    // Das zuletzt hinzugefügte Feld dieses Gens entfernen

    if (slots.length > 0) {
        slots[slots.length - 1].remove();
    }

    if (ausgewaehlteGene.length === 0) {
        dinoGene.hidden = true;
    }
}