// 1. Variables Globales pour stocker les choix
const appChoices = {
    theme: null,
    colorPalette: null,
    background: null,
    imageStyle: null,
    ambiance: null,
    mainSubjects: null,
    mainText: null,
    font: null,
    luminosity: null,
    viewAngle: null,
    composition: null,
    specialEffects: null,
    textures: null,
    lighting: null,
    depthOfField: null,
    atmosphere: null,
    specificDetails: null,
    dominantColors: null,
    imageFormat: null,
    targetAudience: null,
    diffusionMedia: null,
    messageTone: null
};

// 2. Références aux éléments du DOM (Simplifié avec une approche générique pour les sections "Autre")
const DOM = {
    sections: {
        welcome: document.getElementById('welcomeSection'),
        theme: document.getElementById('themeSelection'),
        colorPalette: document.getElementById('colorPaletteSection'),
        background: document.getElementById('backgroundSection'),
        imageStyle: document.getElementById('imageStyleSection'),
        ambiance: document.getElementById('ambianceSection'),
        mainSubjects: document.getElementById('mainSubjectsSection'),
        mainText: document.getElementById('mainTextSection'),
        font: document.getElementById('fontSection'),
        luminosity: document.getElementById('luminositySection'),
        viewAngle: document.getElementById('viewAngleSection'),
        composition: document.getElementById('compositionSection'),
        specialEffects: document.getElementById('specialEffectsSection'),
        textures: document.getElementById('texturesSection'),
        lighting: document.getElementById('lightingSection'),
        depthOfField: document.getElementById('depthOfFieldSection'),
        atmosphere: document.getElementById('atmosphereSection'),
        specificDetails: document.getElementById('specificDetailsSection'),
        dominantColors: document.getElementById('dominantColorsSection'),
        imageFormat: document.getElementById('imageFormatSection'),
        targetAudience: document.getElementById('targetAudienceSection'),
        diffusionMedia: document.getElementById('diffusionMediaSection'),
        messageTone: document.getElementById('messageToneSection'),
        finalPrompt: document.getElementById('finalPromptSection')
    },
    // Boutons de navigation principaux
    navButtons: {
        start: document.getElementById('startButton'),
        generatePrompt: document.getElementById('generatePromptButton'),
        backFromPrompt: document.getElementById('backButtonFromPrompt'),
        startOver: document.getElementById('startOverButton')
    },
    // Conteneur où le prompt sera affiché
    output: document.getElementById('generatedPromptOutput')
};

// Map des sections pour faciliter la navigation et l'accès aux éléments
// Chaque entrée : [sectionElement, choiceClassName, otherOptionId, otherInputId, otherInputContainerId, prevSectionElement, nextSectionElement, choicePropertyInAppChoices, validateButtonId, backButtonId]
const sectionsMap = {
    welcome: { section: DOM.sections.welcome, next: DOM.sections.theme },
    theme: {
        section: DOM.sections.theme,
        choicesSelector: '.btn-choice[data-choice-value]', // Utilise une classe générique
        validateBtn: document.getElementById('validateButtonTheme'),
        backBtn: document.getElementById('backButtonTheme'),
        prev: DOM.sections.welcome,
        next: DOM.sections.colorPalette,
        choiceKey: 'theme',
        otherBtnId: null, // Pas d'option "Autre" pour cette section
        otherInputId: null,
        otherContainerId: null
    },
    colorPalette: {
        section: DOM.sections.colorPalette,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonColorPalette'),
        backBtn: document.getElementById('backButtonColorPalette'),
        prev: DOM.sections.theme,
        next: DOM.sections.background,
        choiceKey: 'colorPalette',
        otherBtnId: 'otherColorOption',
        otherInputId: 'otherColorInput',
        otherContainerId: 'otherColorInputContainer'
    },
    background: {
        section: DOM.sections.background,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonBackground'),
        backBtn: document.getElementById('backButtonBackground'),
        prev: DOM.sections.colorPalette,
        next: DOM.sections.imageStyle,
        choiceKey: 'background',
        otherBtnId: 'otherBackgroundOption',
        otherInputId: 'otherBackgroundInput',
        otherContainerId: 'otherBackgroundInputContainer'
    },
    imageStyle: {
        section: DOM.sections.imageStyle,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonImageStyle'),
        backBtn: document.getElementById('backButtonImageStyle'),
        prev: DOM.sections.background,
        next: DOM.sections.ambiance,
        choiceKey: 'imageStyle',
        otherBtnId: 'otherImageStyleOption',
        otherInputId: 'otherImageStyleInput',
        otherContainerId: 'otherImageStyleInputContainer'
    },
    ambiance: {
        section: DOM.sections.ambiance,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonAmbiance'),
        backBtn: document.getElementById('backButtonAmbiance'),
        prev: DOM.sections.imageStyle,
        next: DOM.sections.mainSubjects,
        choiceKey: 'ambiance',
        otherBtnId: 'otherAmbianceOption',
        otherInputId: 'otherAmbianceInput',
        otherContainerId: 'otherAmbianceInputContainer'
    },
    mainSubjects: {
        section: DOM.sections.mainSubjects,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonMainSubjects'),
        backBtn: document.getElementById('backButtonMainSubjects'),
        prev: DOM.sections.ambiance,
        next: DOM.sections.mainText,
        choiceKey: 'mainSubjects',
        otherBtnId: 'otherMainSubjectsOption',
        otherInputId: 'otherMainSubjectsInput',
        otherContainerId: 'otherMainSubjectsInputContainer'
    },
    mainText: {
        section: DOM.sections.mainText,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonMainText'),
        backBtn: document.getElementById('backButtonMainText'),
        prev: DOM.sections.mainSubjects,
        next: DOM.sections.font,
        choiceKey: 'mainText',
        otherBtnId: 'otherMainTextOption',
        otherInputId: 'otherMainTextInput',
        otherContainerId: 'otherMainTextInputContainer'
    },
    font: {
        section: DOM.sections.font,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonFont'),
        backBtn: document.getElementById('backButtonFont'),
        prev: DOM.sections.mainText,
        next: DOM.sections.luminosity,
        choiceKey: 'font',
        otherBtnId: 'otherFontOption',
        otherInputId: 'otherFontInput',
        otherContainerId: 'otherFontInputContainer'
    },
    luminosity: {
        section: DOM.sections.luminosity,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonLuminosity'),
        backBtn: document.getElementById('backButtonLuminosity'),
        prev: DOM.sections.font,
        next: DOM.sections.viewAngle,
        choiceKey: 'luminosity',
        otherBtnId: 'otherLuminosityOption',
        otherInputId: 'otherLuminosityInput',
        otherContainerId: 'otherLuminosityInputContainer'
    },
    viewAngle: {
        section: DOM.sections.viewAngle,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonViewAngle'),
        backBtn: document.getElementById('backButtonViewAngle'),
        prev: DOM.sections.luminosity,
        next: DOM.sections.composition,
        choiceKey: 'viewAngle',
        otherBtnId: 'otherViewAngleOption',
        otherInputId: 'otherViewAngleInput',
        otherContainerId: 'otherViewAngleInputContainer'
    },
    composition: {
        section: DOM.sections.composition,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonComposition'),
        backBtn: document.getElementById('backButtonComposition'),
        prev: DOM.sections.viewAngle,
        next: DOM.sections.specialEffects,
        choiceKey: 'composition',
        otherBtnId: 'otherCompositionOption',
        otherInputId: 'otherCompositionInput',
        otherContainerId: 'otherCompositionInputContainer'
    },
    specialEffects: {
        section: DOM.sections.specialEffects,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonSpecialEffects'),
        backBtn: document.getElementById('backButtonSpecialEffects'),
        prev: DOM.sections.composition,
        next: DOM.sections.textures,
        choiceKey: 'specialEffects',
        otherBtnId: 'otherSpecialEffectsOption',
        otherInputId: 'otherSpecialEffectsInput',
        otherContainerId: 'otherSpecialEffectsInputContainer'
    },
    textures: {
        section: DOM.sections.textures,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonTextures'),
        backBtn: document.getElementById('backButtonTextures'),
        prev: DOM.sections.specialEffects,
        next: DOM.sections.lighting,
        choiceKey: 'textures',
        otherBtnId: 'otherTexturesOption',
        otherInputId: 'otherTexturesInput',
        otherContainerId: 'otherTexturesInputContainer'
    },
    lighting: {
        section: DOM.sections.lighting,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonLighting'),
        backBtn: document.getElementById('backButtonLighting'),
        prev: DOM.sections.textures,
        next: DOM.sections.depthOfField,
        choiceKey: 'lighting',
        otherBtnId: 'otherLightingOption',
        otherInputId: 'otherLightingInput',
        otherContainerId: 'otherLightingInputContainer'
    },
    depthOfField: {
        section: DOM.sections.depthOfField,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonDepthOfField'),
        backBtn: document.getElementById('backButtonDepthOfField'),
        prev: DOM.sections.lighting,
        next: DOM.sections.atmosphere,
        choiceKey: 'depthOfField',
        otherBtnId: 'otherDepthOfFieldOption',
        otherInputId: 'otherDepthOfFieldInput',
        otherContainerId: 'otherDepthOfFieldInputContainer'
    },
    atmosphere: {
        section: DOM.sections.atmosphere,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonAtmosphere'),
        backBtn: document.getElementById('backButtonAtmosphere'),
        prev: DOM.sections.depthOfField,
        next: DOM.sections.specificDetails,
        choiceKey: 'atmosphere',
        otherBtnId: 'otherAtmosphereOption',
        otherInputId: 'otherAtmosphereInput',
        otherContainerId: 'otherAtmosphereInputContainer'
    },
    specificDetails: {
        section: DOM.sections.specificDetails,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonSpecificDetails'),
        backBtn: document.getElementById('backButtonSpecificDetails'),
        prev: DOM.sections.atmosphere,
        next: DOM.sections.dominantColors,
        choiceKey: 'specificDetails',
        otherBtnId: 'otherSpecificDetailsOption',
        otherInputId: 'otherSpecificDetailsInput',
        otherContainerId: 'otherSpecificDetailsInputContainer'
    },
    dominantColors: {
        section: DOM.sections.dominantColors,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonDominantColors'),
        backBtn: document.getElementById('backButtonDominantColors'),
        prev: DOM.sections.specificDetails,
        next: DOM.sections.imageFormat,
        choiceKey: 'dominantColors',
        otherBtnId: 'otherDominantColorsOption',
        otherInputId: 'otherDominantColorsInput',
        otherContainerId: 'otherDominantColorsInputContainer'
    },
    imageFormat: {
        section: DOM.sections.imageFormat,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonImageFormat'),
        backBtn: document.getElementById('backButtonImageFormat'),
        prev: DOM.sections.dominantColors,
        next: DOM.sections.targetAudience,
        choiceKey: 'imageFormat',
        otherBtnId: 'otherImageFormatOption',
        otherInputId: 'otherImageFormatInput',
        otherContainerId: 'otherImageFormatInputContainer'
    },
    targetAudience: {
        section: DOM.sections.targetAudience,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonTargetAudience'),
        backBtn: document.getElementById('backButtonTargetAudience'),
        prev: DOM.sections.imageFormat,
        next: DOM.sections.diffusionMedia,
        choiceKey: 'targetAudience',
        otherBtnId: 'otherTargetAudienceOption',
        otherInputId: 'otherTargetAudienceInput',
        otherContainerId: 'otherTargetAudienceInputContainer'
    },
    diffusionMedia: {
        section: DOM.sections.diffusionMedia,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: document.getElementById('validateButtonDiffusionMedia'),
        backBtn: document.getElementById('backButtonDiffusionMedia'),
        prev: DOM.sections.targetAudience,
        next: DOM.sections.messageTone,
        choiceKey: 'diffusionMedia',
        otherBtnId: 'otherDiffusionMediaOption',
        otherInputId: 'otherDiffusionMediaInput',
        otherContainerId: 'otherDiffusionMediaInputContainer'
    },
    messageTone: {
        section: DOM.sections.messageTone,
        choicesSelector: '.btn-choice[data-choice-value]',
        validateBtn: DOM.navButtons.generatePrompt, // Bouton "Générer le prompt" pour la dernière étape
        backBtn: document.getElementById('backButtonMessageTone'),
        prev: DOM.sections.diffusionMedia,
        next: DOM.sections.finalPrompt,
        choiceKey: 'messageTone',
        otherBtnId: 'otherMessageToneOption',
        otherInputId: 'otherMessageToneInput',
        otherContainerId: 'otherMessageToneInputContainer'
    },
    finalPrompt: { section: DOM.sections.finalPrompt, prev: DOM.sections.messageTone }
};

let currentSectionKey = 'welcome'; // Suivi de la section active

// 3. Fonctions de gestion de l'interface utilisateur
function showSection(sectionKey) {
    Object.values(DOM.sections).forEach(section => {
        section.style.display = 'none';
    });
    DOM.sections[sectionKey].style.display = 'block';
    currentSectionKey = sectionKey;
    console.log("Section actuelle:", sectionKey);
}

// Fonction générique pour réinitialiser les sélections d'une section
function resetSectionChoices(sectionInfo) {
    if (sectionInfo.choicesSelector) {
        document.querySelectorAll(`#${sectionInfo.section.id} ${sectionInfo.choicesSelector}`).forEach(btn => {
            btn.classList.remove('active');
        });
    }
    if (sectionInfo.validateBtn) {
        sectionInfo.validateBtn.disabled = true;
    }
    if (sectionInfo.otherInputId && document.getElementById(sectionInfo.otherInputId)) {
        document.getElementById(sectionInfo.otherInputId).value = '';
    }
    if (sectionInfo.otherContainerId && document.getElementById(sectionInfo.otherContainerId)) {
        document.getElementById(sectionInfo.otherContainerId).style.display = 'none';
    }
    appChoices[sectionInfo.choiceKey] = null; // Réinitialise le choix dans l'état de l'app
}

// Fonction générique pour gérer la sélection des boutons
function handleChoiceSelection(event, sectionInfo) {
    const clickedButton = event.currentTarget;
    const choiceValue = clickedButton.dataset.choiceValue;

    // Désélectionne tous les autres boutons de la section
    document.querySelectorAll(`#${sectionInfo.section.id} ${sectionInfo.choicesSelector}`).forEach(btn => {
        btn.classList.remove('active');
    });
    clickedButton.classList.add('active'); // Sélectionne le bouton cliqué

    if (choiceValue === 'autre') {
        document.getElementById(sectionInfo.otherContainerId).style.display = 'block';
        const otherInput = document.getElementById(sectionInfo.otherInputId);
        // Mettre à jour le choix avec la valeur actuelle de l'input au moment du clic sur "Autre"
        // et activer/désactiver le bouton "Valider" en fonction de la présence de texte
        appChoices[sectionInfo.choiceKey] = otherInput.value.trim();
        sectionInfo.validateBtn.disabled = appChoices[sectionInfo.choiceKey] === '';
        otherInput.focus();
    } else {
        if (sectionInfo.otherContainerId && document.getElementById(sectionInfo.otherContainerId)) {
            document.getElementById(sectionInfo.otherContainerId).style.display = 'none';
        }
        if (sectionInfo.otherInputId && document.getElementById(sectionInfo.otherInputId)) {
            document.getElementById(sectionInfo.otherInputId).value = ''; // Vide le champ "Autre"
        }
        appChoices[sectionInfo.choiceKey] = choiceValue;
        sectionInfo.validateBtn.disabled = false; // Active le bouton Valider dès qu'un choix est fait
    }
}

// Fonction générique pour gérer la saisie dans le champ "Autre"
function handleOtherInput(event, sectionInfo) {
    const otherInput = event.currentTarget;
    if (document.getElementById(sectionInfo.otherBtnId).classList.contains('active')) {
        appChoices[sectionInfo.choiceKey] = otherInput.value.trim();
        sectionInfo.validateBtn.disabled = appChoices[sectionInfo.choiceKey] === '';
    }
}

// Fonction générique pour gérer la validation et passer à la section suivante
function handleValidateClick(sectionInfo) {
    let finalChoice = appChoices[sectionInfo.choiceKey];
    if (sectionInfo.otherBtnId && document.getElementById(sectionInfo.otherBtnId).classList.contains('active')) {
        finalChoice = document.getElementById(sectionInfo.otherInputId).value.trim();
        appChoices[sectionInfo.choiceKey] = finalChoice; // S'assurer que le choix 'autre' est enregistré
    }

    // Le bouton doit déjà être activé si un choix est fait ou si "Autre" est rempli.
    // Cette condition est une sécurité supplémentaire.
    if (finalChoice && finalChoice !== "") { // Assure qu'il y a bien un choix non vide
        console.log(`${sectionInfo.choiceKey} enregistré:`, finalChoice);
        if (sectionInfo.next) {
            showSection(Object.keys(DOM.sections).find(key => DOM.sections[key] === sectionInfo.next));
            // Pour la dernière étape, déclencher la génération du prompt
            if (sectionInfo.next === DOM.sections.finalPrompt) {
                generatePrompt();
            }
        }
    }
}

// Fonction générique pour gérer le bouton "Précédent"
function handleBackClick(sectionInfo) {
    if (sectionInfo.prev) {
        showSection(Object.keys(DOM.sections).find(key => DOM.sections[key] === sectionInfo.prev));
    }
}

// Fonction pour générer le prompt final
function generatePrompt() {
    let prompt = "Créez une affiche publicitaire avec les caractéristiques suivantes :\n\n";

    for (const key in appChoices) {
        if (appChoices[key]) { // Si un choix a été fait pour cette catégorie
            let label = "";
            switch (key) {
                case 'theme': label = "Thème général"; break;
                case 'colorPalette': label = "Palette de couleurs"; break;
                case 'background': label = "Fond"; break;
                case 'imageStyle': label = "Style d'image"; break;
                case 'ambiance': label = "Ambiance"; break;
                case 'mainSubjects': label = "Objets/Sujets principaux"; break;
                case 'mainText': label = "Texte principal (accroche)"; break;
                case 'font': label = "Police de caractères"; break;
                case 'luminosity': label = "Luminosité"; break;
                case 'viewAngle': label = "Angle de vue"; break;
                case 'composition': label = "Composition"; break;
                case 'specialEffects': label = "Effets spéciaux"; break;
                case 'textures': label = "Textures"; break;
                case 'lighting': label = "Éclairage"; break;
                case 'depthOfField': label = "Profondeur de champ"; break;
                case 'atmosphere': label = "Atmosphère"; break;
                case 'specificDetails': label = "Détails spécifiques"; break;
                case 'dominantColors': label = "Couleurs dominantes"; break;
                case 'imageFormat': label = "Format de l'image"; break;
                case 'targetAudience': label = "Public cible"; break;
                case 'diffusionMedia': label = "Média de diffusion"; break;
                case 'messageTone': label = "Ton du message"; break;
                default: label = key;
            }
            prompt += `- ${label} : ${appChoices[key]}.\n`;
        }
    }

    DOM.output.textContent = prompt;
    console.log("Prompt généré:\n", prompt);
}


// 5. Initialisation de l'application (Attachement des écouteurs d'événements)
function init() {
    // Bouton de démarrage
    DOM.navButtons.start.addEventListener('click', () => handleStartClick());

    // Attacher les écouteurs pour toutes les sections génériques
    for (const key in sectionsMap) {
        const sectionInfo = sectionsMap[key];

        if (sectionInfo.choicesSelector) { // Si c'est une section avec des choix (pas welcome/finalPrompt)
            // Attacher les écouteurs de clic aux boutons de choix
            document.querySelectorAll(`#${sectionInfo.section.id} ${sectionInfo.choicesSelector}`).forEach(button => {
                button.addEventListener('click', (e) => handleChoiceSelection(e, sectionInfo));
            });

            // Attacher l'écouteur pour le champ "Autre" si présent
            if (sectionInfo.otherInputId && document.getElementById(sectionInfo.otherInputId)) {
                document.getElementById(sectionInfo.otherInputId).addEventListener('input', (e) => handleOtherInput(e, sectionInfo));
            }

            // Attacher les écouteurs pour les boutons Valider et Précédent
            if (sectionInfo.validateBtn) {
                sectionInfo.validateBtn.addEventListener('click', () => handleValidateClick(sectionInfo));
            }
            if (sectionInfo.backBtn) {
                sectionInfo.backBtn.addEventListener('click', () => handleBackClick(sectionInfo));
            }
        }
    }

    // Gérer les boutons spécifiques de la dernière section
    DOM.navButtons.backFromPrompt.addEventListener('click', () => handleBackClick(sectionsMap.messageTone)); // Revenir à la dernière étape de choix
    DOM.navButtons.startOver.addEventListener('click', () => startOver());

    // Afficher la première section au chargement initial
    showSection('welcome');
}

// Nouvelle fonction pour gérer le démarrage (pour pouvoir la rappeler après "Commencer une nouvelle génération")
function handleStartClick() {
    // Réinitialiser tous les choix au début d'une nouvelle session
    for (const key in appChoices) {
        appChoices[key] = null;
    }
    // Réinitialiser l'affichage de toutes les sections de choix (état des boutons, inputs, etc.)
    for (const key in sectionsMap) {
        // S'assurer que la clé correspond à une section de choix et qu'elle a un bouton valider/choixSelector
        if (sectionsMap[key].choicesSelector || sectionsMap[key].validateBtn) {
            resetSectionChoices(sectionsMap[key]);
        }
    }
    DOM.output.textContent = ''; // Vider le prompt généré
    showSection('theme'); // Afficher la première étape réelle de choix
}

// Fonction pour recommencer depuis le début
function startOver() {
    showSection('welcome'); // Revenir à la page d'accueil
    // La réinitialisation des choix sera gérée par handleStartClick lors du prochain clic sur "Commencez!"
}

// Exécute l'initialisation quand le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', init);