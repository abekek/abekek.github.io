// Count visits only on the published personal site.
(() => {
    if (window.location.hostname !== 'alibekkaliyev.com') return;

    window.va = window.va || function () {
        (window.vaq = window.vaq || []).push(arguments);
    };

    const script = document.createElement('script');
    script.src = '/_vercel/insights/script.js';
    script.defer = true;
    document.head.appendChild(script);
})();
