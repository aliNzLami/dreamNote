import { navLinks, yourNotes, purposes, diary, hearYou, ourGallery, statics, gallery, preFooter } from './content.js';
import { DOM_list } from './DOMlist.js';
import { language } from './language.js';

export const emptyLayout = () => {
    for(let item in DOM_list) {
        DOM_list[item].innerHTML = "";
    }
}

export const renderLayout = {

    showNav: () => {
        for (let item of navLinks) {
            DOM_list.navBarHTML.innerHTML += `<li class="nav-items">
                            <a href="${item.url}" class="nav-link p-1 text-white">${item[language]}</a>
                        </li>`
        }
    },

    showYourNote: () => {
        DOM_list.yourNotesHTML.innerHTML += `<div class="col-md-6 d-flex align-items-center" data-aos="fade-left">
                                            <p class="text-${language === 'per' ? 'end' : 'start'}">
                                                ${yourNotes.paragraph[language]}
                                            </p>
                                        </div>
                                        <div class="${language === 'per' ? "about-noteBook-titles-left" : "about-noteBook-titles-right"} col-md-6 d-flex flex-column align-items-start" data-aos="fade-right">
                                            <h2>
                                                ${yourNotes.yourNote[language]}
                                            </h2>
                                            <h3>
                                                ${yourNotes.yourFeeling[language]}
                                            </h3>
                                    </div>`
    },

    showPurposes: () => {

        DOM_list.purposesHTML.innerHTML += `<div class="col-12 p-5 pb-2" data-aos="fade-up" data-aos-duration="3000">
                                        <h2 class="text-center h3">
                                            ${purposes.purpose[language]}
                                        </h2>
                                        <p class="text-center">
                                            ${purposes.paragraph[language]}
                                        </p>
                                    </div>`

        for(let item of purposes.purposeList) {
            DOM_list.purposesItemsHTML.innerHTML += `<div class="col-md-6 col-lg-4">
                                        <div class="card border-0">
                                            <div class="card-body">
                                                <span class="text-center d-block">
                                                    ${item.icon}
                                                </span>
                                                <h3 class="h4 text-center mt-3">
                                                    ${item[language]}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>`
        }
    },

    showDiary: () => {
        DOM_list.diaryHTML.innerText += diary[language];
    },

    showHearYou: () => {
        DOM_list.hearYouHTML.innerHTML += `<h2 class="h3 text-${language === 'per' ? 'end' : 'start'}">
                                        ${hearYou.weHearYou[language]}
                                    </h2>
                                    <p class="my-4 text-${language === 'per' ? 'end' : 'start'}">
                                        ${hearYou.paragraph[language]}
                                    </p>`
        
    },

    showOurGallery: () => {
        DOM_list.ourGalleryHTML.innerHTML += `<h2 class="h3 text-center">
                                        ${ourGallery.ourGallery[language]}
                                    </h2>
                                    <p class="text-center">
                                        ${ourGallery.paragraph[language]}
                                    </p>`

        for(let item of gallery) {
            DOM_list.ourGalleryListHTML.innerHTML += `<div class="position-relative gallery-img-height col-md-6" data-aos="flip-${item.flip}" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                                                <div class="gallery-img">
                                                    <img src="${item.img}">
                                                </div>
                                            </div>`
        }
        
    },


    showStatics: () => {
        for(let item of statics) {
            DOM_list.staticsyHTML.innerHTML += `<div class="col-lg-3 col-md-6 p-5">
                                            <span class="d-block text-center h2">
                                                <count-up>${item.number}</count-up>
                                            </span>
                                            <span class="d-block text-center h6">
                                                ${item[language]}
                                            </span>
                                        </div>`
        }
        
    },

    showPreFooter: () => {

        for(let src of preFooter) {
            DOM_list.preFooterHTML.innerHTML += `<div class="col-md-4 px-0">
                                                    <img src="${src}" width="100%" height="100%">
                                                </div>`
        }
        
    },

    init: () => {
        renderLayout.showNav();
        renderLayout.showYourNote();
        renderLayout.showPurposes();
        renderLayout.showDiary();
        renderLayout.showHearYou();
        renderLayout.showOurGallery();
        renderLayout.showStatics();
        renderLayout.showPreFooter();
    }
}