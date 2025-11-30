"use strict";
//  javascript ar type declare kore 
var _a;
// type declare korsi menu elements 
const elements = {
    menuBtn: document.getElementById('menu-btn'),
    menuClose: document.getElementById('menu-close'),
    mobileMenu: document.getElementById('mobile-menu'),
    mobileLinks: document.querySelectorAll('#mobile-menu a'),
};
function openMenu() {
    var _a, _b;
    if (!elements.mobileMenu)
        return;
    // animate overlay to visible: remove hidden/opacity-0, enable pointer events
    elements.mobileMenu.classList.remove('opacity-0', 'pointer-events-none', 'bg-transparent');
    elements.mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'bg-black');
    elements.mobileMenu.classList.remove('backdrop-blur-sm');
    // show close button (fade-in)
    (_a = elements.menuClose) === null || _a === void 0 ? void 0 : _a.classList.remove('opacity-0');
    (_b = elements.menuClose) === null || _b === void 0 ? void 0 : _b.classList.add('opacity-100');
    // animate panel
    const panel = document.getElementById('mobile-menu-panel');
    panel === null || panel === void 0 ? void 0 : panel.classList.remove('translate-y-6', 'opacity-0');
    panel === null || panel === void 0 ? void 0 : panel.classList.add('translate-y-0', 'opacity-100');
    // prevent page scroll
    document.documentElement.style.overflow = 'hidden';
}
function closeMenu() {
    var _a, _b;
    if (!elements.mobileMenu)
        return;
    // animate overlay to hidden: fade out and disable pointer events
    elements.mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'bg-black');
    elements.mobileMenu.classList.add('opacity-0', 'pointer-events-none', 'bg-transparent');
    elements.mobileMenu.classList.add('backdrop-blur-sm');
    // hide close button (fade-out)
    (_a = elements.menuClose) === null || _a === void 0 ? void 0 : _a.classList.remove('opacity-100');
    (_b = elements.menuClose) === null || _b === void 0 ? void 0 : _b.classList.add('opacity-0');
    // animate panel
    const panel = document.getElementById('mobile-menu-panel');
    panel === null || panel === void 0 ? void 0 : panel.classList.remove('translate-y-0', 'opacity-100');
    panel === null || panel === void 0 ? void 0 : panel.classList.add('translate-y-6', 'opacity-0');
    // restore page scroll
    document.documentElement.style.overflow = '';
}
if (elements.menuBtn && elements.mobileMenu) {
    elements.menuBtn.addEventListener('click', () => {
        // only use overlay behavior on small/medium screens
        if (window.innerWidth >= 1024)
            return;
        const isClosed = elements.mobileMenu.classList.contains('opacity-0');
        if (isClosed)
            openMenu();
        else
            closeMenu();
    });
    // close when a link is clicked
    elements.mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    // close button
    (_a = elements.menuClose) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => closeMenu());
    console.log('Mobile menu initialized successfully');
}
else {
    console.error('Required elements not found');
}
// Ensure overlay closes/resets when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && elements.mobileMenu) {
        closeMenu();
    }
});
//# sourceMappingURL=index.js.map