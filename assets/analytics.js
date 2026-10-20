// Public collection URL; only the published site records page views.
(() => {
    const endpoint = 'https://abekek.goatcounter.com/count';
    if (!endpoint || window.location.hostname !== 'abekek.github.io') return;

    window.goatcounter = {
        path: window.location.pathname.replace(/\/index\.html$/, '/'),
        no_events: true,
    };

    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.async = true;
    script.dataset.goatcounter = endpoint;
    document.head.appendChild(script);
})();
