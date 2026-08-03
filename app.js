'use strict';

const DAYS = [
  { name:'Montag', jsDay:1, color:'#ff5d68' }, { name:'Dienstag', jsDay:2, color:'#ff9b45' },
  { name:'Mittwoch', jsDay:3, color:'#ffd95a' }, { name:'Donnerstag', jsDay:4, color:'#69d58a' },
  { name:'Freitag', jsDay:5, color:'#62a6ff' }, { name:'Samstag', jsDay:6, color:'#b58cff' },
  { name:'Sonntag', jsDay:0, color:'#ef7fb5' }
];
const THEMES = {
  'Dunkel':{emoji:'🌙',price:0,dark:true,bg:'#14161c',surface:'#1f222b',raised:'#2b2f3b',text:'#f4f5f9',muted:'#aab0bf',primary:'#ffc107',primaryText:'#2f2600',dangerBg:'#4b2b30',dangerText:'#ffaeb5',decoration:'✦'},
  'Keks':{emoji:'🍪',price:0,dark:false,bg:'#fff8e8',surface:'#fffffa',raised:'#f6e4c3',text:'#4b311b',muted:'#846548',primary:'#b56f2d',primaryText:'#fffaf1',dangerBg:'#ffe2da',dangerText:'#a43737',decoration:'🍪'},
  'Hühner':{emoji:'🐔',price:50,dark:true,bg:'#111713',surface:'#1d2820',raised:'#2a382d',text:'#fff7db',muted:'#c8d1b5',primary:'#f2bd3f',primaryText:'#302300',dangerBg:'#512a28',dangerText:'#ffb6aa',decoration:'🐔 Küken, Eier, Federn und Körner'},
  'Herbst':{emoji:'🍂',price:25,dark:false,bg:'#fff2da',surface:'#fffbee',raised:'#f0d6ae',text:'#532c19',muted:'#8e5836',primary:'#d2691e',primaryText:'#fff9f0',dangerBg:'#fadaC5',dangerText:'#973d24',decoration:'🍁'},
  'Weihnachten':{emoji:'🎄',price:25,dark:true,bg:'#0d231d',surface:'#18372c',raised:'#254b3c',text:'#f8f7e8',muted:'#bed3c3',primary:'#dc3737',primaryText:'#fff',dangerBg:'#52272b',dangerText:'#ffbabe',decoration:'❄'},
  'Frühling':{emoji:'🌸',price:25,dark:false,bg:'#f4fdee',surface:'#fff',raised:'#e2f4da',text:'#324f32',muted:'#688963',primary:'#ef7ea4',primaryText:'#421327',dangerBg:'#ffe1e7',dangerText:'#a33759',decoration:'🌼'},
  'Halloween':{emoji:'🎃',price:25,dark:true,bg:'#160d1f',surface:'#281836',raised:'#3a224c',text:'#f8ecff',muted:'#bea8cf',primary:'#ff821e',primaryText:'#321500',dangerBg:'#4d223a',dangerText:'#ffa6cb',decoration:'👻'},
  'Pride':{emoji:'🌈',price:25,dark:false,bg:'#fafaff',surface:'#fff',raised:'#ebeeff',text:'#313142',muted:'#67677e',primary:'#7a4ac9',primaryText:'#fff',dangerBg:'#ffe0e8',dangerText:'#aa2f55',decoration:'💖'},
  'Einhornland':{emoji:'🦄',price:75,dark:false,bg:'#fff7ff',surface:'#ffffff',raised:'#f1e8ff',text:'#4b315d',muted:'#806a91',primary:'#d778e9',primaryText:'#32113a',dangerBg:'#ffe2f0',dangerText:'#a23568',decoration:'✨'}
};
function applyThemeIcon(themeName){
  const isUnicorn = themeName === 'Einhornland';

  // Das feste iPhone-/PWA-Icon bleibt immer der bunte Keks.
  const appleIcon = $('#appleTouchIcon');
  if (appleIcon) appleIcon.href = './apple-touch-icon.png?v=20260713-cookie-1';

  const preview = $('#appIconPreview');
  if (preview) preview.src = './apple-touch-icon.png?v=20260713-cookie-1';

  // Das Einhorn erscheint nur im freigeschalteten Einhornland-Theme.
  const mascot = $('#brandMascot');
  if (mascot) mascot.textContent = isUnicorn ? '🦄' : '🍪';

  const favicon = $('#appFavicon');
  if (favicon) {
    favicon.type = isUnicorn ? 'image/svg+xml' : 'image/png';
    favicon.href = isUnicorn
      ? './unicorn-icon.svg?v=20260713-cookie-1'
      : './icons/favicon-64.png?v=20260713-cookie-1';
  }
}

const ACHIEVEMENTS = [
  ['FIRST_COOKIE','Erster Krümel','Verdiene deinen ersten Belohnungskeks.','🍪'],
  ['TEN_DONE','Fleißiger Keks','Erledige insgesamt 10 Aufgaben.','✅'],
  ['FIFTY_DONE','Keksmaschine','Erledige insgesamt 50 Aufgaben.','⚙️'],
  ['FIVE_HUNDRED_DONE','Fleißkeks','Erledige insgesamt 500 Aufgaben.','📈'],
  ['KEKSMEISTER','Keksmeister','Sammle insgesamt 1000 Kekse.','🍪'],
  ['MONDAY_HERO','Montagsheld','Erledige vier Montage hintereinander vollständig.','📅'],
  ['PERFECT_WEEK','Perfekte Woche','Erledige alle Aufgaben einer Woche pünktlich.','⭐'],
  ['NOTHING_FORGOTTEN','Keine Aufgabe vergessen','Vier Wochen in Folge bleibt beim Reset nichts offen.','🧠'],
  ['EARLY_BIRD','Frühstarter','Erledige 10 Aufgaben vor 09:00 Uhr.','🌅'],
  ['CHICKEN_FRIEND','Hühnerfreund','Erledige 100 Aufgaben im Hühner-Theme.','🐔'],
  ['AUTUMN_COLLECTOR','Herbstsammler','Nutze das Herbst-Theme mindestens 30 Tage nach dem ersten Einsatz.','🍂'],
  ['CHRISTMAS_BAKER','Weihnachtsbäcker','Verdiene im Dezember 100 Kekse.','🎄'],
  ['TRICK_OR_TREAT','Süßes oder Saures','Schalte das Halloween-Theme frei.','🎃'],
  ['COLORFUL_CRUMBS','Bunte Krümel','Besitze alle Themes.','🌈'],
  ['COOKIE_MILLIONAIRE','Keksmillionär','Besitze gleichzeitig 5000 Kekse.','💰'],
  ['STREAK_COOKIE','Serienkeks','Erledige an 30 Tagen hintereinander mindestens eine Aufgabe.','🔥'],
  ['MAGICAL_COOKIE','Magischer Keks','Erledige 100 Aufgaben im Einhornland.','🦄'],
  ['RAINBOW_BAKER','Regenbogenbäcker','Sammle insgesamt 500 Kekse.','🌈'],
  ['STARDUST','Sternenstaub','Erledige an 50 Tagen hintereinander mindestens eine Aufgabe.','⭐'],
  ['CRUMB_KING','Krümelkönig','Schalte alle anderen Erfolge frei.','👑',true]
].map(([id,name,description,emoji,secret=false])=>({id,name,description,emoji,secret}));

const defaultState = () => ({
  Theme:'Dunkel', LastWeeklyResetMonday:null, LastWeeklyResetSunday:null, CookieBalance:0, LifetimeCookies:0, AllTimeCompleted:0,
  AllTimeOnTimeCompleted:0, BestWeekCompleted:0, WeeksReset:0, PerfectWeeks:0, ConsecutivePerfectMondays:0,
  ConsecutiveNoForgottenWeeks:0, EarlyTasks:0, ChickenThemeCompleted:0, ChristmasDecemberCookies:0,
  CurrentDailyStreak:0, BestDailyStreak:0, LastActiveDate:null, SoundsEnabled:true, AnimationMode:'subtle', CommentMode:'rare', CommentCompletionCounter:0,
  UnlockedThemes:['Dunkel','Keks'], UnlockedAchievements:[], ThemeFirstUsed:{}, WeekdayCompleted:{}, WeeklyHistory:[],
  UnicornThemeCompleted:0, UnicornDiscovered:false, UnicornDiscoveryShown:false, LegendaryRideShown:false
});
let data = loadData();
let activeDay = todayListDay();
let pendingInstallPrompt = null;
let confirmationAction = null;
let achievementQueue = [];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const iso = d => new Date(d).toISOString();
const dateOnly = d => { const x=new Date(d); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`; };
const uuid = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function loadData(){
  try{
    const parsed=JSON.parse(localStorage.getItem('keksToDoData')||'null');
    if(parsed){ return normalizePackage(parsed); }
  }catch{}
  return { Version:2, CreatedAt:new Date().toISOString(), Items:[], State:defaultState() };
}
function normalizePackage(pkg){
  const state={...defaultState(),...(pkg.State||pkg.state||{})};
  // Ältere Versionen kannten nur den Sonntagsreset. Beim ersten Start dieser Version
  // wird die aktuelle Woche übernommen, damit keine vorhandenen Aufgaben verloren gehen.
  if(!state.LastWeeklyResetMonday) state.LastWeeklyResetMonday=iso(currentMonday());
  for(const key of ['UnlockedThemes','UnlockedAchievements']) state[key]=[...new Set(state[key]||[])];
  state.UnlockedThemes=[...new Set(['Dunkel','Keks',...state.UnlockedThemes])];
  state.ThemeFirstUsed=state.ThemeFirstUsed||{}; state.WeekdayCompleted=state.WeekdayCompleted||{}; state.WeeklyHistory=state.WeeklyHistory||[];
  if(!['off','subtle','full'].includes(state.AnimationMode)) state.AnimationMode='subtle';
  if(!['off','rare','frequent'].includes(state.CommentMode)) state.CommentMode='rare';
  state.CommentCompletionCounter=Number(state.CommentCompletionCounter)||0;
  const items=(pkg.Items||pkg.items||[]).map(i=>({
    Id:i.Id||i.id||uuid(), Day:i.Day||i.day||'Montag', Text:i.Text||i.text||'', IsCompleted:!!(i.IsCompleted??i.isCompleted),
    CreatedAt:i.CreatedAt||i.createdAt||new Date().toISOString(), CompletedAt:i.CompletedAt||i.completedAt||null,
    CookieAwardEvaluated:!!(i.CookieAwardEvaluated??i.cookieAwardEvaluated), CookieAwarded:!!(i.CookieAwarded??i.cookieAwarded)
  }));
  return {Version:2,CreatedAt:pkg.CreatedAt||pkg.createdAt||new Date().toISOString(),Items:items,State:state};
}
function saveData(){ localStorage.setItem('keksToDoData',JSON.stringify(data)); }
function todayListDay(){ const d=new Date().getDay(); return DAYS.find(x=>x.jsDay===d)?.name||'Montag'; }
function currentMonday(now=new Date()){ const d=new Date(now); d.setHours(0,0,0,0); const wd=d.getDay(); d.setDate(d.getDate()-(wd===0?6:wd-1)); return d; }

function weeklyResetIfNeeded(){
  const monday=currentMonday();
  if(!data.State.LastWeeklyResetMonday){ data.State.LastWeeklyResetMonday=iso(monday); saveData(); return; }
  const last=new Date(data.State.LastWeeklyResetMonday);
  if(last>=monday) return;
  const items=data.Items;
  const created=items.length, completed=items.filter(i=>i.IsCompleted).length, onTime=items.filter(i=>i.CookieAwarded).length, open=created-completed;
  const previousSunday=new Date(monday); previousSunday.setDate(monday.getDate()-1);
  if(created>0){
    data.State.WeeklyHistory.push({WeekEnding:iso(previousSunday),Created:created,Completed:completed,OnTime:onTime,Open:open});
    data.State.WeeklyHistory=data.State.WeeklyHistory.slice(-26);
    data.State.BestWeekCompleted=Math.max(data.State.BestWeekCompleted,completed);
    data.State.WeeksReset++;
    const mondayTasks=items.filter(i=>i.Day==='Montag');
    const mondayPerfect=mondayTasks.length>0&&mondayTasks.every(i=>i.IsCompleted&&i.CookieAwarded);
    data.State.ConsecutivePerfectMondays=mondayPerfect?data.State.ConsecutivePerfectMondays+1:0;
    data.State.ConsecutiveNoForgottenWeeks=open===0?data.State.ConsecutiveNoForgottenWeeks+1:0;
    const perfect=created>0&&open===0&&onTime===created;
    if(perfect) data.State.PerfectWeeks++;
    data.State.LastWeekPerfect=perfect;
  }
  data.Items=[]; data.State.LastWeeklyResetMonday=iso(monday); saveData(); checkAchievements(); showToast('Neue Woche, frisches Keksblech! 🍪');
}

function applyAnimationMode(){
  const mode=['off','subtle','full'].includes(data.State.AnimationMode)?data.State.AnimationMode:'subtle';
  data.State.AnimationMode=mode;
  document.body.classList.remove('animations-off','animations-subtle','animations-full');
  document.body.classList.add(`animations-${mode}`);
}

function applyTheme(name){
  const t=THEMES[name]||THEMES.Dunkel; data.State.Theme=name in THEMES?name:'Dunkel';
  const r=document.documentElement.style;
  for(const [k,v] of Object.entries({bg:t.bg,surface:t.surface,raised:t.raised,text:t.text,muted:t.muted,primary:t.primary,primaryText:t.primaryText,dangerBg:t.dangerBg,dangerText:t.dangerText})) r.setProperty(`--${k}`,v);
  document.documentElement.style.colorScheme=t.dark?'dark':'light';
  $('meta[name="theme-color"]').content=t.bg;
  const themeClasses=['theme-dark','theme-cookie','chicken-theme','theme-autumn','theme-christmas','theme-spring','theme-halloween','theme-pride','unicorn-theme'];
  document.body.classList.remove(...themeClasses);
  const classByTheme={
    'Dunkel':'theme-dark','Keks':'theme-cookie','Hühner':'chicken-theme','Herbst':'theme-autumn',
    'Weihnachten':'theme-christmas','Frühling':'theme-spring','Halloween':'theme-halloween',
    'Pride':'theme-pride','Einhornland':'unicorn-theme'
  };
  document.body.classList.add(classByTheme[data.State.Theme]||'theme-dark');
  applyAnimationMode();
  applyThemeIcon(data.State.Theme);
  if(!data.State.ThemeFirstUsed[name]) data.State.ThemeFirstUsed[name]=new Date().toISOString();
  saveData();
}

function renderAll(){
  discoverUnicornIfReady();
  applyTheme(data.State.Theme); renderHeader(); renderDays(); renderStats(); renderAchievements(); renderShop(); renderSettings();
  checkLegendaryRide();
}
function renderHeader(){
  $('#cookieBalance').textContent=data.State.CookieBalance; $('#shopBalance').textContent=data.State.CookieBalance;
  $('#brandMascot').textContent=data.State.Theme==='Einhornland'?'🦄':data.State.Theme==='Hühner'?'🐔':'🍪';
  const monday=currentMonday(), sunday=new Date(monday); sunday.setDate(monday.getDate()+6);
  $('#weekRange').textContent=`${monday.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})} bis ${sunday.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'})}`;
}
function renderDays(){
  $('#dayTabs').innerHTML=DAYS.map(d=>`<button class="day-tab ${activeDay===d.name?'active':''}" style="--day:${d.color}" data-day="${d.name}">${d.name.slice(0,2)}</button>`).join('');
  $('#dayCards').innerHTML=DAYS.map(d=>{
    const items=data.Items.filter(i=>i.Day===d.name); const done=items.filter(i=>i.IsCompleted).length;
    return `<article class="day-card ${activeDay===d.name?'mobile-active':''}" style="--day:${d.color}" data-day-card="${d.name}">
      <header class="day-card-header"><div class="day-title-wrap"><span class="day-dot"></span><div><h3>${d.name}</h3><span class="day-count">${done} von ${items.length} erledigt</span></div></div>
      <div class="day-actions"><button class="cookie-icon-button delete-cookie" data-clear-day="${d.name}" title="Alle Aufgaben löschen" aria-label="Alle Aufgaben von ${d.name} löschen"><span class="cookie-drawing"></span></button></div></header>
      ${items.length?`<ul class="task-list">${items.map(taskRow).join('')}</ul>`:`<div class="empty-state"><span class="empty-cookie">${themeEmptyState().icon}</span>${themeEmptyState().text}</div>`}
      <form class="inline-add" data-add-form="${d.name}"><input maxlength="180" placeholder="Neue Aufgabe für ${d.name} …" aria-label="Neue Aufgabe für ${d.name}"><button aria-label="Aufgabe hinzufügen">＋</button></form>
    </article>`;
  }).join('');
}
function themeEmptyState(){
  return ({
    'Hühner':{icon:'🐣',text:'Noch keine Aufgaben. Das Nest ist leer.'},
    'Herbst':{icon:'🍄',text:'Noch keine Aufgaben zwischen den Blättern.'},
    'Weihnachten':{icon:'🎁',text:'Noch keine Aufgaben unter dem Baum.'},
    'Frühling':{icon:'🦋',text:'Noch keine Aufgaben auf der Blumenwiese.'},
    'Halloween':{icon:'👻',text:'Noch keine Aufgaben in der Spuknacht.'},
    'Pride':{icon:'🌈',text:'Noch keine Aufgaben im Farbenmeer.'},
    'Einhornland':{icon:'🦄',text:'Noch keine Aufgaben im Einhornland.'},
    'Keks':{icon:'🍪',text:'Noch keine Aufgaben. Das Blech ist leer.'},
    'Dunkel':{icon:'🌙',text:'Noch keine Aufgaben in der Nacht.'}
  })[data.State.Theme]||{icon:'🍪',text:'Noch keine Aufgaben.'};
}


const THEME_COMMENTS = {
  'Dunkel':[
    'Die Nachtwache meldet: Aufgabe verschwunden. Sehr verdächtig. 🌙',
    'Leise erledigt. Nicht einmal der Mond hat etwas bemerkt.',
    'Eine Aufgabe weniger im nächtlichen Aktennebel.'
  ],
  'Keks':[
    'Aufgabe verputzt. Krümel fachgerecht entsorgt. 🍪',
    'Das Kekskonto nickt anerkennend.',
    'Knusprig erledigt. Der TÜV fürs Keksblech ist zufrieden.',
    'Diese Aufgabe wurde erfolgreich weggenascht.'
  ],
  'Hühner':[
    'Lord Krähibalt hat die Erledigung lautstark genehmigt. 🐔',
    'Ein Ei mehr im Nest. Niemand weiß genau, warum.',
    'Die Hühnerhofkontrolle meldet: alles ordnungsgemäß weggepickt.',
    'Ein Küken hat kurz applaudiert und ist dann in die falsche Richtung gelaufen.'
  ],
  'Herbst':[
    'Diese Aufgabe darf jetzt zu den Blättern auf den Boden. 🍂',
    'Erledigt. Zeit für Tee und übertriebene Gemütlichkeit.',
    'Der Herbstwind hat die Aufgabe aus der Liste geweht.',
    'Ein Pilz wäre beeindruckt. Vermutlich.'
  ],
  'Weihnachten':[
    'Ho ho erledigt! 🎄',
    'Eine Aufgabe weniger auf der Liste des Weihnachtsmanns.',
    'Das kommt unter den Baum der Produktivität.',
    'Ein Wichtel hat es geprüft. Es gilt als erledigt.'
  ],
  'Frühling':[
    'Plopp, da ist eine Produktivitätsblüte aufgegangen. 🌸',
    'Die Bienen sind beeindruckt. Vermutlich.',
    'Eine Aufgabe weniger, eine Blüte mehr.',
    'Der Schmetterling hat kurz genickt. Das zählt als Abnahme.'
  ],
  'Halloween':[
    'Die Aufgabe wurde ins Jenseits befördert. 👻',
    'Der Kürbis nickt. Das ist vermutlich ein gutes Zeichen.',
    'Ein Geist hat die Aufgabe abgeholt. Rückgabe ausgeschlossen.',
    'Erledigt. Selbst die Fledermäuse sind kurz still geworden.'
  ],
  'Pride':[
    'Erledigt und dabei hervorragend ausgesehen. 🌈',
    'Diese Aufgabe ist jetzt offiziell farblos vor Neid.',
    'Ein Regenbogen hat die Erledigung gegengezeichnet.',
    'Bunt, brillant und von der Liste verschwunden.'
  ],
  'Einhornland':[
    'Magisch erledigt. Physikalisch nicht erklärbar. 🦄',
    'Das Einhorn hat Glitzer draufgeworfen. Damit ist es offiziell.',
    'Eine Aufgabe weniger, drei Funkelsterne mehr.',
    'Der Rat der Einhörner bestätigt die Erledigung einstimmig.'
  ]
};

const SPECIAL_COMMENTS = {
  first: {
    'Dunkel':'Erste Aufgabe des Tages erledigt. Die Nacht kann einpacken. 🌙',
    'Keks':'Der erste Tageskeks ist im Ofen. Jetzt läuft die Produktion. 🍪',
    'Hühner':'Das erste Ei des Tages liegt im Nest. Lord Krähibalt verkündet es bereits im ganzen Landkreis. 🥚',
    'Herbst':'Das erste Blatt des Tages ist gefallen. Sehr produktiv. 🍂',
    'Weihnachten':'Das erste Geschenk des Tages ist verpackt. 🎁',
    'Frühling':'Die erste Produktivitätsblüte des Tages ist offen. 🌸',
    'Halloween':'Das erste Tagesopfer wurde von der Liste geholt. 🎃',
    'Pride':'Der Tag startet direkt in voller Farbe. 🌈',
    'Einhornland':'Die erste Portion Tagesmagie wurde freigesetzt. ✨'
  },
  dayComplete: {
    'Dunkel':'Diese Tagesliste ist leer. Selbst die Schatten finden nichts mehr.',
    'Keks':'Blech leer! Sämtliche Aufgaben wurden restlos verkrümelt. 🍪',
    'Hühner':'Tagesstall sauber! Die Hühner übernehmen ab hier wieder das Chaos. 🐔',
    'Herbst':'Alles erledigt. Jetzt darfst du dich dekorativ unter eine Decke legen. 🍂',
    'Weihnachten':'Tagesliste leer. Der Weihnachtsmann kann Feierabend beantragen. 🎄',
    'Frühling':'Der ganze Tagesgarten blüht. Keine offene Aufgabe mehr. 🌷',
    'Halloween':'Die Tagesliste ist ausgestorben. Wortwörtlich fast. 👻',
    'Pride':'Kompletter Tag erledigt. Das verdient einmal den ganzen Regenbogen. 🌈',
    'Einhornland':'Der Tag ist vollständig verzaubert und abgeschlossen. 🦄✨'
  },
  streak: {
    'Dunkel':'Mehrere Aufgaben am Stück. Die Nachtwache wird langsam nervös.',
    'Keks':'Du räumst hier gerade Aufgaben weg wie eine hungrige Krümelwalze. 🍪',
    'Hühner':'Die Aufgaben fallen schneller als Körner beim Füttern. 🐔',
    'Herbst':'Produktivitätssturm! Die Aufgaben fallen wie Herbstlaub.',
    'Weihnachten':'Das ist kein Abarbeiten mehr, das ist Wichtel-Fließbandbetrieb. 🎄',
    'Frühling':'Hier sprießt die Produktivität gerade völlig unkontrolliert. 🌸',
    'Halloween':'Eine ganze Aufgabenserie ist spurlos verschwunden. Unheimlich effizient.',
    'Pride':'Diese Serie leuchtet inzwischen heller als der Regenbogen. 🌈',
    'Einhornland':'Eine magische Serie! Das Einhorn beantragt zusätzliches Glitzerbudget. 🦄'
  }
};

let commentTimer;
function showComment(text){
  const el=$('#commentBubble');
  if(!el||!text) return;
  el.textContent=text;
  el.classList.add('show');
  clearTimeout(commentTimer);
  commentTimer=setTimeout(()=>el.classList.remove('show'),10000);
}
function completedTodayCount(now=new Date()){
  const today=dateOnly(now);
  return data.Items.filter(i=>i.IsCompleted&&i.CompletedAt&&dateOnly(i.CompletedAt)===today).length;
}
function chooseTaskComment(item,now){
  const mode=data.State.CommentMode||'rare';
  if(mode==='off') return null;
  data.State.CommentCompletionCounter=(data.State.CommentCompletionCounter||0)+1;
  const dayItems=data.Items.filter(i=>i.Day===item.Day);
  const dayComplete=dayItems.length>0&&dayItems.every(i=>i.IsCompleted);
  const firstToday=completedTodayCount(now)===1;
  const streak=data.State.CommentCompletionCounter%5===0;
  const specialChance=mode==='frequent'?0.9:0.62;
  if(dayComplete&&Math.random()<specialChance) return SPECIAL_COMMENTS.dayComplete[data.State.Theme];
  if(firstToday&&Math.random()<specialChance) return SPECIAL_COMMENTS.first[data.State.Theme];
  if(streak&&Math.random()<specialChance) return SPECIAL_COMMENTS.streak[data.State.Theme];
  const chance=mode==='frequent'?0.68:0.24;
  if(Math.random()>chance) return null;
  const pool=THEME_COMMENTS[data.State.Theme]||THEME_COMMENTS.Keks;
  return pool[Math.floor(Math.random()*pool.length)];
}

function taskRow(i){
  let meta=''; if(i.IsCompleted&&i.CompletedAt) meta=i.CookieAwarded?(data.State.Theme==='Hühner'?'Pünktlich erledigt 🥚':'Pünktlich erledigt 🍪'):'Erledigt, aber ohne Belohnungskeks';
  return `<li class="task-row ${i.IsCompleted?'completed':''}" data-id="${i.Id}"><input class="task-check" type="checkbox" ${i.IsCompleted?'checked':''} aria-label="Aufgabe erledigt" style="--day:${DAYS.find(d=>d.name===i.Day)?.color}"><div class="task-text">${escapeHtml(i.Text)}${meta?`<span class="task-meta">${meta}</span>`:''}</div><button class="delete-task" title="Aufgabe löschen" aria-label="Aufgabe löschen">🗑️</button></li>`;
}
function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

function addTask(day,text){ text=text.trim(); if(!text)return; data.Items.push({Id:uuid(),Day:day,Text:text,IsCompleted:false,CreatedAt:new Date().toISOString(),CompletedAt:null,CookieAwardEvaluated:false,CookieAwarded:false}); saveData(); renderAll(); }
function toggleTask(id,checked){
  const item=data.Items.find(i=>i.Id===id); if(!item)return;
  item.IsCompleted=checked;
  if(checked){
    const now=new Date(); item.CompletedAt=now.toISOString();
    data.State.AllTimeCompleted++; data.State.WeekdayCompleted[item.Day]=(data.State.WeekdayCompleted[item.Day]||0)+1;
    updateDailyStreak(now);
    if(now.getHours()<9) data.State.EarlyTasks++;
    if(data.State.Theme==='Hühner') data.State.ChickenThemeCompleted++;
    if(data.State.Theme==='Einhornland') data.State.UnicornThemeCompleted++;
    if(!item.CookieAwardEvaluated){
      item.CookieAwardEvaluated=true;
      const day=DAYS.find(d=>d.name===item.Day);
      item.CookieAwarded=day?.jsDay===now.getDay();
      if(item.CookieAwarded){
        data.State.CookieBalance++; data.State.LifetimeCookies++; data.State.AllTimeOnTimeCompleted++;
        if(now.getMonth()===11) data.State.ChristmasDecemberCookies++;
        if(data.State.Theme==='Einhornland'){ showUnicornCookie(); playSound('unicorn'); }
        else { showToast(themeCompletionMessage(true)); playThemeEffect(); playSound('cookie'); }
      } else showToast(themeCompletionMessage(false));
    }
  }else item.CompletedAt=null;
  const comment=checked?chooseTaskComment(item,new Date(item.CompletedAt)):null;
  saveData(); checkAchievements(); renderAll();
  if(comment) setTimeout(()=>showComment(comment),180);
}
function themeCompletionMessage(onTime){
  const messages={
    'Dunkel':onTime?'+1 Belohnungskeks 🍪':'Erledigt! Heute leider ohne Belohnungskeks.',
    'Keks':onTime?'Knusper! Ein Keks mehr in der Dose 🍪':'Erledigt, aber der Ofen war heute nicht zuständig.',
    'Hühner':onTime?'🥚 Ein Ei mehr im Nest!':'🐔 Erledigt, aber heute ohne Belohnungsei.',
    'Herbst':onTime?'🍁 Ein goldenes Blatt gesammelt!':'🍂 Erledigt, aber das Blatt fiel am falschen Tag.',
    'Weihnachten':onTime?'🎁 Ein Geschenk mehr unter dem Baum!':'❄️ Erledigt, aber heute ohne Geschenk.',
    'Frühling':onTime?'🌸 Eine neue Blüte ist aufgegangen!':'🌱 Erledigt, aber heute ohne Blütenkeks.',
    'Halloween':onTime?'🎃 Der Kürbis nickt zufrieden!':'👻 Erledigt, aber der Geist hat den Keks versteckt.',
    'Pride':onTime?'🌈 Farben machen den Tag heller!':'💖 Erledigt, aber heute ohne Regenbogenkeks.',
    'Einhornland':onTime?'+1 magischer Belohnungskeks 🦄🍪':'✨ Erledigt, aber die Magie kam am falschen Tag.'
  };
  return messages[data.State.Theme]||messages.Dunkel;
}
function playThemeEffect(){
  if(data.State.AnimationMode==='off') return;
  document.body.classList.remove('theme-reward-flash'); void document.body.offsetWidth; document.body.classList.add('theme-reward-flash');
  setTimeout(()=>document.body.classList.remove('theme-reward-flash'),900);
}
function themeGreeting(name){
  return ({'Hühner':'🐔 Willkommen auf dem Hühnerhof!','Herbst':'🍂 Willkommen im goldenen Herbst!','Weihnachten':'🎄 Willkommen im Weihnachtszauber!','Frühling':'🌸 Der Frühling ist da!','Halloween':'🎃 Willkommen in der Spuknacht!','Pride':'🌈 Willkommen im Farbenmeer!','Einhornland':'🦄 Willkommen im Einhornland!','Keks':'🍪 Willkommen zurück in der Keksdose!','Dunkel':'🌙 Dunkelmodus aktiviert.'})[name]||`${name} aktiviert.`;
}

function updateDailyStreak(now){
  const today=dateOnly(now), last=data.State.LastActiveDate?dateOnly(data.State.LastActiveDate):null;
  if(last===today)return;
  const yesterday=new Date(now); yesterday.setDate(yesterday.getDate()-1);
  data.State.CurrentDailyStreak=last===dateOnly(yesterday)?data.State.CurrentDailyStreak+1:1;
  data.State.BestDailyStreak=Math.max(data.State.BestDailyStreak,data.State.CurrentDailyStreak); data.State.LastActiveDate=now.toISOString();
}
function deleteTask(id){ data.Items=data.Items.filter(i=>i.Id!==id); saveData(); renderAll(); }
function clearDay(day){ data.Items=data.Items.filter(i=>i.Day!==day); saveData(); renderAll(); showToast(`${day} wurde leergekrümelt.`); }

function checkAchievements(){
  const s=data.State; const should={
    FIRST_COOKIE:s.LifetimeCookies>=1, TEN_DONE:s.AllTimeCompleted>=10, FIFTY_DONE:s.AllTimeCompleted>=50,
    FIVE_HUNDRED_DONE:s.AllTimeCompleted>=500, KEKSMEISTER:s.LifetimeCookies>=1000,
    MONDAY_HERO:s.ConsecutivePerfectMondays>=4, PERFECT_WEEK:s.PerfectWeeks>=1||s.LastWeekPerfect===true,
    NOTHING_FORGOTTEN:s.ConsecutiveNoForgottenWeeks>=4, EARLY_BIRD:s.EarlyTasks>=10, CHICKEN_FRIEND:s.ChickenThemeCompleted>=100,
    AUTUMN_COLLECTOR:s.ThemeFirstUsed.Herbst&&(Date.now()-new Date(s.ThemeFirstUsed.Herbst).getTime())>=30*86400000,
    CHRISTMAS_BAKER:s.ChristmasDecemberCookies>=100, TRICK_OR_TREAT:s.UnlockedThemes.includes('Halloween'),
    COLORFUL_CRUMBS:Object.keys(THEMES).every(t=>s.UnlockedThemes.includes(t)), COOKIE_MILLIONAIRE:s.CookieBalance>=5000,
    STREAK_COOKIE:s.CurrentDailyStreak>=30, MAGICAL_COOKIE:s.UnicornThemeCompleted>=100,
    RAINBOW_BAKER:s.LifetimeCookies>=500, STARDUST:s.CurrentDailyStreak>=50
  };
  for(const a of ACHIEVEMENTS.filter(x=>x.id!=='CRUMB_KING')) if(should[a.id]&&!s.UnlockedAchievements.includes(a.id)){s.UnlockedAchievements.push(a.id);achievementQueue.push(a);}
  const allOther=ACHIEVEMENTS.filter(a=>a.id!=='CRUMB_KING').every(a=>s.UnlockedAchievements.includes(a.id));
  const king=ACHIEVEMENTS.find(a=>a.id==='CRUMB_KING'); if(allOther&&!s.UnlockedAchievements.includes('CRUMB_KING')){s.UnlockedAchievements.push('CRUMB_KING');achievementQueue.push(king);}
  saveData(); if(achievementQueue.length&&!$('#achievementDialog').open) showNextAchievement();
}
function showNextAchievement(){
  const a=achievementQueue.shift(); if(!a)return;
  const dialog=$('#achievementDialog'); dialog.classList.toggle('king',a.id==='CRUMB_KING');
  $('#achievementTitle').textContent=a.name; $('#achievementEmoji').textContent=a.emoji;
  $('#achievementDescription').textContent=a.id==='CRUMB_KING'?'Du hast alle Erfolge gesammelt. Hiermit wirst du offiziell zum Krümelkönig der To-do-Liste gekrönt!':a.description;
  makeConfetti(a.id==='CRUMB_KING'); dialog.showModal(); playSound(a.id==='CRUMB_KING'?'king':'achievement');
}
function makeConfetti(gold=false){ const layer=$('#confettiLayer'); layer.innerHTML=''; if(data.State.AnimationMode==='off') return; const colors=gold?['#ffd54a','#ffb300','#fff0a1']:['#ff5d68','#ff9b45','#ffd95a','#69d58a','#62a6ff','#b58cff']; const amount=data.State.AnimationMode==='subtle'?24:55; for(let i=0;i<amount;i++){const p=document.createElement('i');p.className='confetti';p.style.left=`${Math.random()*100}%`;p.style.background=colors[i%colors.length];p.style.setProperty('--duration',`${2+Math.random()*2}s`);p.style.setProperty('--drift',`${-90+Math.random()*180}px`);p.style.animationDelay=`${Math.random()*.7}s`;layer.appendChild(p);}}

function renderStats(){
  const created=data.Items.length, done=data.Items.filter(i=>i.IsCompleted).length, onTime=data.Items.filter(i=>i.CookieAwarded).length, open=created-done, quote=created?Math.round(done/created*100):0;
  const stats=[['🍪',data.State.CookieBalance,'Kekskonto'],['✅',done,'Diese Woche erledigt'],['⏰',onTime,'Pünktlich erledigt'],['📋',open,'Noch offen'],['📈',`${quote}%`,'Erledigungsquote'],['🏅',data.State.AllTimeCompleted,'Insgesamt erledigt'],['🔥',data.State.CurrentDailyStreak,'Aktuelle Tageserie'],['🥇',data.State.BestWeekCompleted,'Beste Woche']];
  $('#statsGrid').innerHTML=stats.map(([icon,value,label])=>`<div class="stat-card"><span class="stat-icon">${icon}</span><strong>${value}</strong><span>${label}</span></div>`).join('');
  const hist=data.State.WeeklyHistory.slice(-8); const max=Math.max(1,...hist.map(h=>h.Created));
  $('#historyChart').innerHTML=hist.length?hist.map(h=>`<div class="bar-row"><span class="bar-label">${new Date(h.WeekEnding).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})}</span><div class="bar-track"><div class="bar-fill" style="width:${h.Completed/max*100}%"></div></div><span class="bar-value">${h.Completed}</span></div>`).join(''):'<p class="empty-state">Nach dem ersten Wochenreset erscheint hier deine Wochenhistorie.</p>';
  const wdMax=Math.max(1,...DAYS.map(d=>data.State.WeekdayCompleted[d.name]||0));
  $('#weekdayChart').innerHTML=DAYS.map(d=>`<div class="bar-row"><span class="bar-label">${d.name}</span><div class="bar-track"><div class="bar-fill" style="width:${(data.State.WeekdayCompleted[d.name]||0)/wdMax*100}%;background:${d.color}"></div></div><span class="bar-value">${data.State.WeekdayCompleted[d.name]||0}</span></div>`).join('');
}
function renderAchievements(){
  const unlocked=data.State.UnlockedAchievements; $('#achievementProgress').textContent=`${unlocked.length} von ${ACHIEVEMENTS.length} freigeschaltet`;
  $('#achievementGrid').innerHTML=ACHIEVEMENTS.map(a=>{const ok=unlocked.includes(a.id);return `<article class="achievement-card ${ok?'':'locked'} ${a.secret?'secret':''}"><div class="achievement-top"><div><div class="achievement-emoji">${ok||!a.secret?a.emoji:'❔'}</div><div class="achievement-name">${a.name}</div></div><span class="badge ${ok?'unlocked':''}">${ok?'Freigeschaltet':'Gesperrt'}</span></div><p class="achievement-description">${a.description}</p></article>`}).join('');
}
function renderShop(){
  $('#shopBalance').textContent=data.State.CookieBalance;
  $('#shopGrid').innerHTML=Object.entries(THEMES).filter(([name])=>name!=='Einhornland'||data.State.UnicornDiscovered||data.State.UnlockedThemes.includes(name)).map(([name,t])=>{const owned=data.State.UnlockedThemes.includes(name),active=data.State.Theme===name;return `<article class="shop-card" style="--themePrimary:${t.primary};--themeBg:${t.bg};--themeSurface:${t.surface}"><div class="shop-top"><div><span class="shop-emoji">${t.emoji}</span><div class="shop-name">${name}</div></div><span class="badge ${owned?'unlocked':''}">${active?'Aktiv':owned?'Freigeschaltet':'Im Shop'}</span></div><div class="theme-swatch"></div><p class="shop-description">${name==='Hühner'?'Dunkler Hühnerhof mit vielen Hühnern, Küken, Eiern, Federn und Körnerspuren.':`${t.dark?'Dunkles':'Helles'} Theme mit ${t.decoration}-Dekoration.`}</p><div class="shop-bottom"><span class="price">${t.price?`🍪 ${t.price}`:'Kostenlos'}</span><button class="${owned?'secondary-button':'primary-button'}" data-theme-action="${name}">${active?'Ausgewählt':owned?'Verwenden':'Kaufen'}</button></div></article>`}).join('');
}
function buyOrUseTheme(name){
  const t=THEMES[name]; if(!t)return;
  if(data.State.UnlockedThemes.includes(name)){data.State.Theme=name;applyTheme(name);renderAll();showToast(themeGreeting(name));playThemeEffect();return;}
  if(data.State.CookieBalance<t.price){showToast(`Dir fehlen ${t.price-data.State.CookieBalance} Kekse.`);return;}
  data.State.CookieBalance-=t.price;data.State.UnlockedThemes.push(name);data.State.Theme=name;if(!data.State.ThemeFirstUsed[name])data.State.ThemeFirstUsed[name]=new Date().toISOString();saveData();checkAchievements();renderAll();
  if(name==='Einhornland') showUnicornWelcome(); else { showToast(themeGreeting(name)); playThemeEffect(); }
  playSound(name==='Einhornland'?'unicorn':'achievement');
}
function discoverUnicornIfReady(){
  const s=data.State;
  const ready=s.LifetimeCookies>=500||s.UnlockedAchievements.includes('CRUMB_KING');
  if(!ready||s.UnicornDiscovered)return;
  s.UnicornDiscovered=true; saveData();
  if(!s.UnicornDiscoveryShown){
    s.UnicornDiscoveryShown=true; saveData();
    setTimeout(()=>{ const d=$('#unicornDiscoveryDialog'); if(d&&!d.open){makeConfetti(false);d.showModal();playSound('unicorn');}},350);
  }
}
function showUnicornWelcome(){
  const d=$('#unicornWelcomeDialog'); if(d&&!d.open){makeConfetti(false);d.showModal();}
}
function showUnicornCookie(){
  const m=$('#unicornCookieMoment');
  if(data.State.AnimationMode!=='off'){
    m.classList.remove('show'); void m.offsetWidth; m.classList.add('show');
    setTimeout(()=>m.classList.remove('show'),1500);
  }
  showToast('+1 magischer Belohnungskeks 🦄🍪');
}
function checkLegendaryRide(){
  const s=data.State;
  const allAchievements=ACHIEVEMENTS.every(a=>s.UnlockedAchievements.includes(a.id));
  const allThemes=Object.keys(THEMES).every(t=>s.UnlockedThemes.includes(t));
  if(!s.LegendaryRideShown&&allAchievements&&allThemes&&s.LifetimeCookies>=1000){
    s.LegendaryRideShown=true; saveData();
    setTimeout(()=>{const d=$('#legendaryRideDialog');if(d&&!d.open){makeConfetti(true);d.showModal();playSound('king');}},700);
  }
}
function renderSettings(){
  $('#themeSelect').innerHTML=data.State.UnlockedThemes.filter(t=>THEMES[t]).map(t=>`<option ${t===data.State.Theme?'selected':''}>${THEMES[t].emoji} ${t}</option>`).join('');
  $('#soundToggle').checked=data.State.SoundsEnabled;
  $('#animationModeSelect').value=data.State.AnimationMode||'subtle';
  $('#commentModeSelect').value=data.State.CommentMode||'rare';
}

function exportBackup(){
  const pkg={...data,CreatedAt:new Date().toISOString()}; const blob=new Blob([JSON.stringify(pkg,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`KeksToDo_${dateOnly(new Date())}.keks`; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); showToast('Backup wurde gebacken. 💾🍪');
}
async function importBackup(file){
  try{const pkg=normalizePackage(JSON.parse(await file.text()));data=pkg;saveData();weeklyResetIfNeeded();checkAchievements();renderAll();showToast('Backup erfolgreich importiert. 🍪');}
  catch{showToast('Diese Keksdatei konnte nicht gelesen werden.');}
}
function resetAll(){ data={Version:2,CreatedAt:new Date().toISOString(),Items:[],State:defaultState()};saveData();renderAll();showToast('Alles zurückgesetzt. Frisches Blech!'); }

function playSound(type){
  if(!data.State.SoundsEnabled)return;
  try{const C=window.AudioContext||window.webkitAudioContext,ctx=new C();const notes=type==='king'?[523,659,784,1047]:type==='unicorn'?[659,784,988,1319]:type==='achievement'?[523,659,784]:[740,880];notes.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.001,ctx.currentTime+i*.09);g.gain.exponentialRampToValueAtTime(.08,ctx.currentTime+i*.09+.01);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.09+.11);o.connect(g).connect(ctx.destination);o.start(ctx.currentTime+i*.09);o.stop(ctx.currentTime+i*.09+.12);});}catch{}
}
let toastTimer; function showToast(text){const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
function askConfirm(title,text,action){$('#confirmTitle').textContent=title;$('#confirmText').textContent=text;confirmationAction=action;$('#confirmDialog').showModal();}
function openTaskDialog(day=activeDay){$('#taskDay').value=day;$('#taskText').value='';$('#taskDialog').showModal();setTimeout(()=>$('#taskText').focus(),120);}
function switchView(name){$$('.view').forEach(v=>v.classList.remove('active-view'));$(`#${name}View`).classList.add('active-view');$$('.nav-button').forEach(b=>b.classList.toggle('active',b.dataset.view===name));if(name==='stats')renderStats();if(name==='achievements')renderAchievements();if(name==='shop')renderShop();scrollTo({top:0,behavior:'smooth'});}

function bindEvents(){
  document.addEventListener('click',e=>{
    const nav=e.target.closest('.nav-button');if(nav){switchView(nav.dataset.view);return;}
    const tab=e.target.closest('.day-tab');if(tab){activeDay=tab.dataset.day;renderDays();return;}
    const clear=e.target.closest('[data-clear-day]');if(clear){const day=clear.dataset.clearDay;askConfirm(`${day} leeren?`,`Alle Aufgaben von ${day} werden gelöscht. Bereits verdiente Kekse bleiben erhalten.`,()=>clearDay(day));return;}
    const del=e.target.closest('.delete-task');if(del){const id=del.closest('.task-row').dataset.id;deleteTask(id);return;}
    const shop=e.target.closest('[data-theme-action]');if(shop){buyOrUseTheme(shop.dataset.themeAction);return;}
  });
  document.addEventListener('change',e=>{if(e.target.matches('.task-check'))toggleTask(e.target.closest('.task-row').dataset.id,e.target.checked);});
  document.addEventListener('submit',e=>{const f=e.target.closest('[data-add-form]');if(f){e.preventDefault();const input=f.querySelector('input');addTask(f.dataset.addForm,input.value);input.value='';}});
  $('#addQuickButton').onclick=()=>openTaskDialog();
  $('#taskForm').addEventListener('submit',e=>{e.preventDefault();addTask($('#taskDay').value,$('#taskText').value);$('#taskDialog').close();});
  $('#cancelTaskButton').onclick=()=>$('#taskDialog').close();
  $('#closeTaskDialogButton').onclick=()=>$('#taskDialog').close();
  $('#settingsButton').onclick=()=>$('#settingsDialog').showModal(); $('#cookieBalanceButton').onclick=()=>switchView('shop');
  $('#themeSelect').onchange=e=>{const name=e.target.value.replace(/^\S+\s/,'');data.State.Theme=name;applyTheme(name);renderAll();};
  $('#soundToggle').onchange=e=>{data.State.SoundsEnabled=e.target.checked;saveData();};
  $('#animationModeSelect').onchange=e=>{data.State.AnimationMode=e.target.value;applyAnimationMode();saveData();showToast(e.target.value==='off'?'Animationen ausgeschaltet.':e.target.value==='subtle'?'Dezente Animationen aktiviert.':'Volle Themenanimationen aktiviert.');};
  $('#commentModeSelect').onchange=e=>{data.State.CommentMode=e.target.value;saveData();showToast(e.target.value==='off'?'Lustige Kommentare ausgeschaltet.':e.target.value==='rare'?'Gelegentliche Kommentare aktiviert.':'Häufige Kommentare aktiviert.');};
  $('#iconHelpButton').onclick=()=>showToast('Das iPhone-Icon ist immer der bunte Keks. Zum Aktualisieren: altes Symbol löschen und die App in Safari erneut zum Home-Bildschirm hinzufügen.');
  $('#exportButton').onclick=exportBackup; $('#importInput').onchange=e=>{if(e.target.files[0])importBackup(e.target.files[0]);e.target.value='';};
  $('#resetDataButton').onclick=()=>askConfirm('Alle Daten löschen?','Aufgaben, Kekse, Shopkäufe, Erfolge und Statistik werden vollständig gelöscht.',resetAll);
  $('#confirmOk').onclick=e=>{e.preventDefault();$('#confirmDialog').close();const a=confirmationAction;confirmationAction=null;a?.();};
  $('#closeAchievementButton').onclick=()=>{$('#achievementDialog').close();if(achievementQueue.length)setTimeout(showNextAchievement,250);};
  $('#closeUnicornDiscoveryButton').onclick=()=>$('#unicornDiscoveryDialog').close();
  $('#closeUnicornWelcomeButton').onclick=()=>$('#unicornWelcomeDialog').close();
  $('#closeLegendaryRideButton').onclick=()=>$('#legendaryRideDialog').close();
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();pendingInstallPrompt=e;$('#installButton').classList.remove('hidden');});
  $('#installButton').onclick=async()=>{if(!pendingInstallPrompt){showToast('Auf dem iPhone: Safari → Teilen → Zum Home-Bildschirm.');return;}pendingInstallPrompt.prompt();await pendingInstallPrompt.userChoice;pendingInstallPrompt=null;$('#installButton').classList.add('hidden');};
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){weeklyResetIfNeeded();checkAchievements();renderAll();}});
}

function init(){
  $('#taskDay').innerHTML=DAYS.map(d=>`<option>${d.name}</option>`).join('');
  weeklyResetIfNeeded(); checkAchievements(); bindEvents(); renderAll();
  if('serviceWorker'in navigator) navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;if(!standalone&&/iPhone|iPad|iPod/.test(navigator.userAgent))setTimeout(()=>showToast('Tipp: Safari → Teilen → Zum Home-Bildschirm 🍪'),1300);
}
init();
