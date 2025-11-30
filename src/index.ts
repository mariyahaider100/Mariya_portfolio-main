

//  javascript ar type declare kore 

// interface , type 
interface MenuElements {
    menuBtn: HTMLButtonElement | null;
    menuClose: HTMLButtonElement | null;
    mobileMenu: HTMLElement | null;
    mobileLinks: NodeListOf<HTMLAnchorElement>;
}


// type declare korsi menu elements 
const elements: MenuElements = {
    menuBtn: document.getElementById('menu-btn') as HTMLButtonElement | null,
    menuClose: document.getElementById('menu-close') as HTMLButtonElement | null,
    mobileMenu: document.getElementById('mobile-menu') as HTMLElement | null,
    mobileLinks: document.querySelectorAll('#mobile-menu a') as NodeListOf<HTMLAnchorElement>,
};

function openMenu(): void {
    if (!elements.mobileMenu) return;
    // animate overlay to visible: remove hidden/opacity-0, enable pointer events
    elements.mobileMenu.classList.remove('opacity-0', 'pointer-events-none', 'bg-transparent');
    elements.mobileMenu.classList.add('opacity-100', 'pointer-events-auto', 'bg-black');
    elements.mobileMenu.classList.remove('backdrop-blur-sm');
    // show close button (fade-in)
    elements.menuClose?.classList.remove('opacity-0');
    elements.menuClose?.classList.add('opacity-100');
    // animate panel
    const panel = document.getElementById('mobile-menu-panel');
    panel?.classList.remove('translate-y-6', 'opacity-0');
    panel?.classList.add('translate-y-0', 'opacity-100');
    // prevent page scroll
    document.documentElement.style.overflow = 'hidden';
}

function closeMenu(): void {
    if (!elements.mobileMenu) return;
    // animate overlay to hidden: fade out and disable pointer events
    elements.mobileMenu.classList.remove('opacity-100', 'pointer-events-auto', 'bg-black');
    elements.mobileMenu.classList.add('opacity-0', 'pointer-events-none', 'bg-transparent');
    elements.mobileMenu.classList.add('backdrop-blur-sm');
    // hide close button (fade-out)
    elements.menuClose?.classList.remove('opacity-100');
    elements.menuClose?.classList.add('opacity-0');
    // animate panel
    const panel = document.getElementById('mobile-menu-panel');
    panel?.classList.remove('translate-y-0', 'opacity-100');
    panel?.classList.add('translate-y-6', 'opacity-0');
    // restore page scroll
    document.documentElement.style.overflow = '';
}

if (elements.menuBtn && elements.mobileMenu) {
    elements.menuBtn.addEventListener('click', (): void => {
        // only use overlay behavior on small/medium screens
        if (window.innerWidth >= 1024) return;
        const isClosed = elements.mobileMenu!.classList.contains('opacity-0');
        if (isClosed) openMenu();
        else closeMenu();
    });

    // close when a link is clicked
    elements.mobileLinks.forEach((link: HTMLAnchorElement) => {
        link.addEventListener('click', (): void => {
            closeMenu();
        });
    });

    // close button
    elements.menuClose?.addEventListener('click', (): void => closeMenu());

    console.log('Mobile menu initialized successfully');
} else {
    console.error('Required elements not found');
}

// Ensure overlay closes/resets when resizing to desktop
window.addEventListener('resize', (): void => {
    if (window.innerWidth >= 1024 && elements.mobileMenu) {
        closeMenu();
    }
});