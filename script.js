(function(){
const THEME_KEY='lh_theme';
const SCALE_KEY='lh_scale';

function applyTheme(theme){
if(theme==='dark'){document.body.classList.add('dark');}
else{document.body.classList.remove('dark');}
}

function applyScale(scale){
const s = Math.min(1.4, Math.max(0.85, scale));
document.documentElement.style.setProperty('--fontScale', String(s));
return s;
}

function getSaved(key, fallback){
try{
const v = localStorage.getItem(key);
return v===null ? fallback : v;
}catch(e){
return fallback;
}
}

let theme = getSaved(THEME_KEY,'light');
applyTheme(theme);

let scale = parseFloat(getSaved(SCALE_KEY,'1')) || 1;
scale = applyScale(scale);

function save(key,val){
try{localStorage.setItem(key,String(val));}catch(e){}
}

function wire(){
const tBtn = document.getElementById('themeToggle');
const inc = document.getElementById('fontInc');
const dec = document.getElementById('fontDec');
const rst = document.getElementById('fontReset');

if(tBtn){
tBtn.addEventListener('click', function(){
theme = document.body.classList.contains('dark') ? 'light' : 'dark';
applyTheme(theme);
save(THEME_KEY, theme);
});
}

if(inc){
inc.addEventListener('click', function(){
scale = applyScale(scale + 0.05);
save(SCALE_KEY, scale);
});
}

if(dec){
dec.addEventListener('click', function(){
scale = applyScale(scale - 0.05);
save(SCALE_KEY, scale);
});
}

if(rst){
rst.addEventListener('click', function(){
scale = applyScale(1);
save(SCALE_KEY, scale);
});
}

const contactForm = document.querySelector('form[data-contact-form]');
if(contactForm){
contactForm.addEventListener('submit', function(e){
e.preventDefault();
alert('تم ارسال رسالتك بنجاح');
contactForm.reset();
});
}
}

if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded', wire);
}else{
wire();
}
})();