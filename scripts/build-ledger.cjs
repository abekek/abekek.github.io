// Optional authoring step. GitHub Pages serves the generated HTML as-is.
// npm install --prefix scripts
// node scripts/build-ledger.cjs
const fs = require('node:fs');
const path = require('node:path');
const katex = require('katex');
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
const root=path.resolve(__dirname,'..');
let html=fs.readFileSync(path.join(root,'writing/personal-ledger.template.html'),'utf8');
const decode=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&amp;/g,'&');
html=html.replace(/<span data-tex="([^"]*)"( data-inline="true")?><\/span>/g,(_,tex,inline)=>katex.renderToString(decode(tex),{displayMode:!inline,throwOnError:true,strict:'error',output:'htmlAndMathml',trust:false}));
html=html.replace(/<code class="language-(python|sql)">([\s\S]*?)<\/code>/g,(_,language,code)=>`<code class="hljs language-${language}">${hljs.highlight(decode(code),{language}).value}</code>`);
fs.writeFileSync(path.join(root,'blog/personal-ledger/index.html'),html);
const target=path.join(root,'assets/katex');fs.mkdirSync(path.join(target,'fonts'),{recursive:true});
const pkg=path.dirname(require.resolve('katex/package.json'));
let css=fs.readFileSync(path.join(pkg,'dist/katex.min.css'),'utf8');
// Keep only WOFF2 sources; all supported browsers can load them.
css=css.replace(/,url\([^)]*\) format\("(?:woff|truetype)"\)/g,'');
fs.writeFileSync(path.join(target,'katex.min.css'),css);
fs.copyFileSync(path.join(pkg,'LICENSE'),path.join(target,'LICENSE'));
for(const f of fs.readdirSync(path.join(pkg,'dist/fonts'))){if(f.endsWith('.woff2'))fs.copyFileSync(path.join(pkg,'dist/fonts',f),path.join(target,'fonts',f));}
console.log('Rendered LaTeX and syntax highlighting into static HTML.');
