window.addEventListener('load', async () => {
    if (window.location.pathname === '/') return;
    handleSidebarExpension();
    setUserLoggedSettings();
    setCopyright();
    setMenuActive();
});

async function get_user_ip() {
    return await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Errore durante il recupero dell\'IP:', error);
            return '';
        });
}

function get_user_os() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) return 'W';
    if (userAgent.indexOf('Mac') !== -1) return 'M';
    if (userAgent.indexOf('X11') !== -1 || userAgent.indexOf('Linux') !== -1) return 'L';
    if (/Android/i.test(userAgent)) return 'A';
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'I';
    return 'N/A';
}

function setMenuActive() {
    const currentPage = window.location.pathname.split('/').pop();
    const sidebar_links = document.querySelectorAll('#main-sidebar .nav-link > a');
    const sidebar_links_alt = document.querySelectorAll('#main-sidebar-alt .nav-link > a');
    const header_links = document.querySelectorAll('#main-content > div:first-child a');
    sidebar_links.forEach(link => { link.classList.remove('active'); });
    sidebar_links_alt.forEach(link => { link.classList.remove('active'); });
    header_links.forEach(link => { link.classList.remove('active'); });
    let activeMenuId = '';
    switch (currentPage) {
        //sidebar
        case 'dashboard': activeMenuId = 'Dashboard'; break;
        case 'properties': activeMenuId = 'Properties'; break;
        case 'agents': activeMenuId = 'Agents'; break;
        //header
        case 'settings': activeMenuId = 'Settings'; break;
        case 'users': activeMenuId = 'Users'; break;
        case 'user-profile': activeMenuId = 'UserProfile'; break;
        default: return;
    }
    const activeMenu = document.querySelector(`#menu${activeMenuId}`);
    if (activeMenu) activeMenu.classList.add('active');
    const activeMenuAlt = document.querySelector(`#menu${activeMenuId}Alt`);
    if (activeMenuAlt) activeMenuAlt.classList.add('active');
}

function setCopyright(){
    const span = document.getElementById("copyright");
    const startY = 2025;
    const currentY = new Date().getFullYear();
    span.textContent = startY === currentY ? `©${startY}` : `©${startY}-${currentY}`;
}

function setUserLoggedSettings() {
    document.getElementById("spUserLoggedName").innerText = `Ciao ${localStorage.uname}!`;
    if(localStorage.urole > 100) {
        document.getElementById("menuUsers").classList.remove("visually-hidden");
        document.getElementById("menuSettings").classList.remove("visually-hidden");
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
}

function enterToClick(selectorControls, idButton) {
    document.querySelectorAll(selectorControls).forEach(c => {
        c.addEventListener("keyup", e => {
            let key = e.key || e.keyCode;
            if (key === "Enter" || key === 13) {
                e.stopImmediatePropagation();
                document.getElementById(idButton).click();
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initInternalTabs() {
    const tabs = document.querySelectorAll(".pai-tab");
    const contents = document.querySelectorAll(".pai-tab-content");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            const contentId = tab.getAttribute("data-tab");
            document.getElementById(contentId).classList.add("active");
        });
    });
}

function initHtmlEditor(idEditor) {
    return $('#' + idEditor).dxHtmlEditor({
        height: 300,
        valueType: 'html',
        imageUpload: { tabs: ['file', 'url'], fileUploadMode: 'base64' },
        toolbar: { "items": ["bold", "italic", "underline", "separator", "orderedList", "bulletList", "link"] },
        mediaResizing: { enabled: true }
    }).dxHtmlEditor('instance');
}

function handleSidebarMenu() {
    const sidebarState = localStorage.getItem("sidebarState");
    if (sidebarState !== null) localStorage.removeItem("sidebarState");
    else localStorage.setItem("sidebarState", "alt");
    handleSidebarExpension();
}

function handleSidebarExpension() {
    const mainSidebar = document.getElementById('main-sidebar');
    const mainSidebarAlt = document.getElementById('main-sidebar-alt');
    const mainContent = document.getElementById('main-content');
    const sidebarState = localStorage.getItem("sidebarState");
    if (sidebarState !== null) {
        mainSidebar.classList.add('visually-hidden');
        mainSidebarAlt.classList.remove('visually-hidden');
        mainContent.style.width = 'calc(100vw - var(--sidebar-alt-width))';
        mainContent.firstElementChild.style.width = 'calc(100vw - var(--sidebar-alt-width))';
        mainContent.lastElementChild.style.maxWidth = 'calc(100vw - var(--sidebar-alt-width))';
    } else {
        mainSidebar.classList.remove('visually-hidden');
        mainSidebarAlt.classList.add('visually-hidden');
        mainContent.lastElementChild.style.maxWidth = 'calc(100vw - var(--sidebar-width))';
        mainContent.firstElementChild.style.width = 'calc(100vw - var(--sidebar-width))';
        mainContent.style.width = 'calc(100vw - var(--sidebar-width))';
    }
}

function formatNumber(num) {
    if (num === null) num = 0;
    return ((num).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }));
}