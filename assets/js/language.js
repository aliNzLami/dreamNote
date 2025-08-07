import { renderLayout, emptyLayout } from './layout.js';

const languageBtn = [...document.getElementsByClassName("languageBtn")];
export let language = localStorage.getItem("lang");

export const rednerLanguage = {
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
        rednerLanguage.changeDirection();
    },

    changeDirection: () => {
        
        if(language === 'per') {
            document.body.setAttribute('class', 'rtl');
        }
        else {
            document.body.setAttribute('class', 'ltr');
        }
    },

    init: () => {
        rednerLanguage.setDefaultLanguage();
        rednerLanguage.onClickLanguage();
    }
}
