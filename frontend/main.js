import { router } from "./router.js";

window.addEventListener("hashchange", () => {
    if (window.location.hash === "") {
        window.location.hash = "#/clients"
    }
    let path = window.location.hash;
    router[path]();
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === ``) {
        window.location.hash = "#/clients"
    };
    let path = window.location.hash;
    router [path]();
})