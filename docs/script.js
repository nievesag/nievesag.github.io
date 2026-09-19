const translations = {
  en: {
    title_menu: "menu",
    title_about: "about me",
    title_profile: "profile",
    title_projects: "projects",
    title_contact: "contact",
    formName: "name ↴",
    formEmail: "email ↴",
    formSubject: "subject ↴",
    formMessage: "message ↴",
    formSend: "send",
    get_in_touch: "Get in touch ➝ ",
    title_education: "education",
    title_skills: "skills",
    title_languages: "languages",
    education_bachelors: "Bachelor's Degree in Videogame Development",
    education_uni: "Universidad Complutense de Madrid (UCM), Spain",
    education_baccaulerate: "Baccaulerate in Science and Technology",
    education_ies: "IES Pintor Antonio López, Madrid, Spain",
    eng_language: "English | C1 Advanced user",
    eng_language_info: "Grade A in the Cambridge Certificate in Advanced English",
    esp_language: "Spanish | Native speaker",
    esp_language_info: "Mother tongue",
    programming_title: "programming languages ➝",
    engines_title: "engines ➝",
    version_title: "version control ➝",
    libraries_title: "libraries ➝",
    art_title: "art & design ➝",
    audio_title: "audio ➝",
    softs_title: "soft skills ➝",
    chavales_desc: "Data-driven EC game engine written in C++ for Windows.",
    tirabolas_desc: "Arcade-like videogame developed in CHAVALES Engine, gameplay written in C++ and scene serialization in Lua.",
    normal_desc: "Real-time 3D texture (albedo & normal map) painting software prototype, made with Godot and accelerated via compute shaders.",
    magnolias_desc: "Rhythm videogame in Godot compatible with guitar controller and data-driven levels by a team of 4 people for a 5-day jam.",
    chladni_desc: "2D physical simulation videogame of the Chladni plates experiment, made with Unity & FMOD.",
    hollenhaus_desc: "Deck-building videogame with local 1v1 multiplayer and PSX aesthetic written in C++ with SDL by a team of 11 people."
  },
  es: {
    title_menu: "menú",
    title_about: "sobre mí",
    title_profile: "perfil",
    title_projects: "proyectos",
    title_contact: "contacto",
    formName: "nombre ↴",
    formEmail: "email ↴",
    formSubject: "asunto ↴",
    formMessage: "mensaje ↴",
    formSend: "enviar",
    get_in_touch: "Ponte en contacto ➝ ",
    title_education: "estudios",
    title_skills: "habilidades",
    title_languages: "idiomas",
    education_bachelors: "Grado en Desarrollo de Videojuegos",
    education_uni: "Universidad Complutense de Madrid (UCM), España",
    education_baccaulerate: "Bachillerato Científico Tecnológico",
    education_ies: "IES Pintor Antonio López, Madrid, España",
    eng_language: "Inglés | C1 Advanced user",
    eng_language_info: "Grado A en el Cambridge Certificate in Advanced English",
    esp_language: "Español | Nativo",
    esp_language_info: "Lengua materna",
    programming_title: " lenguajes de programación ➝",
    engines_title: "motores ➝",
    version_title: "control de versiones ➝",
    libraries_title: "bibliotecas ➝",
    art_title: "arte & diseño ➝",
    audio_title: "audio ➝",
    softs_title: "soft skills ➝",
    chavales_desc: "Motor de videojuegos EC basado en datos, programado en C++ para Windows.",
    tirabolas_desc: "Videojuego arcade desarrollado usando CHAVALES Engine, gameplay programado en C++ y serialización de escenas en lua.",
    normal_desc: "Prototipo de aplicación de pintura albedo y normal maps de modelos 3D en tiempo real, hecho en Godot y acelerada por shaders de cómputo.",
    magnolias_desc: "Videojuego de ritmo en Godot compatible con controlador de guitarra y niveles dirigidos por datos, realizado por un equipo de 4 personas para una jam de 5 días.",
    chladni_desc: "Videojuego simulador del modelo físico de las placas de Chladni en 2D, hecho en Unity, usando FMOD.",
    hollenhaus_desc: "Videojuego de deck-building con multijugador 1v1 local y estética PSX programado en C++ con SDL por un equipo de 11 personas."
  }
}

toggle = document.querySelectorAll(".toggle")[0];
nav = document.querySelectorAll("nav")[0];
toggle_open_text = 'menu';
toggle_close_text = 'X';

toggle.addEventListener('click', function () {
  nav.classList.toggle('open');

  if (nav.classList.contains('open')) {
    toggle.innerHTML = toggle_close_text;
  } else 
  {
    toggle_open_text = (document.documentElement.lang == 'en') ? "menu" : "menú";
    toggle.innerHTML = toggle_open_text;
  }
}, false);

setTimeout(function () {
  nav.classList.toggle('open');
}, 800);

// traducciones

function setLanguage(language) {
  const selectedLanguage = translations[language] ? language : "en";
  document.documentElement.lang = selectedLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if(element.innerHTML != 'X')
    {
      const value = translations[selectedLanguage][element.dataset.i18n];
      if (value !== undefined) element.innerHTML = value.replace(/\n\n/g, "<br><br>");
    }
  });
  
  document.querySelectorAll("[data-language]").forEach((link) => {
    link.setAttribute("aria-current", link.dataset.language === selectedLanguage ? "true" : "false");
  });

  const resumeLink = document.querySelector(".resume");
  if (resumeLink) {
    resumeLink.href = resumeFiles[selectedLanguage];
    resumeLink.download = resumeFiles[selectedLanguage].split("/").pop();
  }

  localStorage.setItem("preferred-language", selectedLanguage);
  window.requestAnimationFrame(() => {
    window.dispatchEvent(new Event("cards-content-updated"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("preferred-language");
  const browserLanguage = navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
  setLanguage(savedLanguage || browserLanguage);
  document.querySelectorAll("[data-language]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setLanguage(link.dataset.language);
    });
  });
});