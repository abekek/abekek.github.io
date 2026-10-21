// Only migrate the personal site; separate GitHub project sites keep their URLs.
(() => {
    if (window.location.hostname !== 'abekek.github.io') return;
    window.location.replace('https://alibekkaliyev.com' + window.location.pathname + window.location.search + window.location.hash);
})();
