const languageBtn = [...document.getElementsByClassName("languageBtn")];
let language = localStorage.getItem("lang");

const rednerLanguage = {
    setDefaultLanguage: () => {
        if(!language) {
            localStorage.setItem("lang", "en");
            language = "en";
        }
    },

    onClickLanguage: () => {
        for(let item of languageBtn) {
            item.addEventListener("click", rednerLanguage.applyLanguage)
        }
    },

    applyLanguage: (languageInput) => {
        localStorage.setItem("lang", languageInput.target.attributes.lang.value);
        language = languageInput.target.attributes.lang.value;
        emptyLayout();
        renderLayout.init();
    },

    init: () => {
        rednerLanguage.setDefaultLanguage();
        rednerLanguage.onClickLanguage();
    }
}
