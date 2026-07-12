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
  'Hühner':{emoji:'🐔',price:50,dark:true,bg:'#181411',surface:'#2b231b',raised:'#3e3225',text:'#fff4dc',muted:'#cdb897',primary:'#f4b437',primaryText:'#3b2500',dangerBg:'#4f2b23',dangerText:'#ffb7a0',decoration:'🥚'},
  'Herbst':{emoji:'🍂',price:25,dark:false,bg:'#fff2da',surface:'#fffbee',raised:'#f0d6ae',text:'#532c19',muted:'#8e5836',primary:'#d2691e',primaryText:'#fff9f0',dangerBg:'#fadaC5',dangerText:'#973d24',decoration:'🍁'},
  'Weihnachten':{emoji:'🎄',price:25,dark:true,bg:'#0d231d',surface:'#18372c',raised:'#254b3c',text:'#f8f7e8',muted:'#bed3c3',primary:'#dc3737',primaryText:'#fff',dangerBg:'#52272b',dangerText:'#ffbabe',decoration:'❄'},
  'Frühling':{emoji:'🌸',price:25,dark:false,bg:'#f4fdee',surface:'#fff',raised:'#e2f4da',text:'#324f32',muted:'#688963',primary:'#ef7ea4',primaryText:'#421327',dangerBg:'#ffe1e7',dangerText:'#a33759',decoration:'🌼'},
  'Halloween':{emoji:'🎃',price:25,dark:true,bg:'#160d1f',surface:'#281836',raised:'#3a224c',text:'#f8ecff',muted:'#bea8cf',primary:'#ff821e',primaryText:'#321500',dangerBg:'#4d223a',dangerText:'#ffa6cb',decoration:'👻'},
  'Pride':{emoji:'🌈',price:25,dark:false,bg:'#fafaff',surface:'#fff',raised:'#ebeeff',text:'#313142',muted:'#67677e',primary:'#7a4ac9',primaryText:'#fff',dangerBg:'#ffe0e8',dangerText:'#aa2f55',decoration:'💖'}
};
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
  ['CRUMB_KING','Krümelkönig','Schalte alle anderen Erfolge frei.','👑',true]
].map(([id,name,description,emoji,secret=false])=>({id,name,description,emoji,secret}));

const defaultState = () => ({
  Theme:'Dunkel', LastWeeklyResetMonday:null, LastWeeklyResetSunday:null, CookieBalance:0, LifetimeCookies:0, AllTimeCompleted:0,
  AllTimeOnTimeCompleted:0, BestWeekCompleted:0, WeeksReset:0, PerfectWeeks:0, ConsecutivePerfectMondays:0,
  ConsecutiveNoForgottenWeeks:0, EarlyTasks:0, ChickenThemeCompleted:0, ChristmasDecemberCookies:0,
  CurrentDailyStreak:0, BestDailyStreak:0, LastActiveDate:null, SoundsEnabled:true,
  UnlockedThemes:['Dunkel','Keks'], UnlockedAchievements:[], ThemeFirstUsed:{}, WeekdayCompleted:{}, WeeklyHistory:[]
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

function applyTheme(name){
  const t=THEMES[name]||THEMES.Dunkel; data.State.Theme=name in THEMES?name:'Dunkel';
  const r=document.documentElement.style;
  for(const [k,v] of Object.entries({bg:t.bg,surface:t.surface,raised:t.raised,text:t.text,muted:t.muted,primary:t.primary,primaryText:t.primaryText,dangerBg:t.dangerBg,dangerText:t.dangerText})) r.setProperty(`--${k}`,v);
  document.documentElement.style.colorScheme=t.dark?'dark':'light';
  $('meta[name="theme-color"]').content=t.bg;
  if(!data.State.ThemeFirstUsed[name]) data.State.ThemeFirstUsed[name]=new Date().toISOString();
  saveData();
}

function renderAll(){
  applyTheme(data.State.Theme); renderHeader(); renderDays(); renderStats(); renderAchievements(); renderShop(); renderSettings();
}
function renderHeader(){
  $('#cookieBalance').textContent=data.State.CookieBalance; $('#shopBalance').textContent=data.State.CookieBalance;
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
      ${items.length?`<ul class="task-list">${items.map(taskRow).join('')}</ul>`:`<div class="empty-state"><span class="empty-cookie">🍪</span>Noch keine Aufgaben. Das Blech ist leer.</div>`}
      <form class="inline-add" data-add-form="${d.name}"><input maxlength="180" placeholder="Neue Aufgabe für ${d.name} …" aria-label="Neue Aufgabe für ${d.name}"><button aria-label="Aufgabe hinzufügen">＋</button></form>
    </article>`;
  }).join('');
}
function taskRow(i){
  let meta=''; if(i.IsCompleted&&i.CompletedAt) meta=i.CookieAwarded?'Pünktlich erledigt 🍪':'Erledigt, aber ohne Belohnungskeks';
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
    if(!item.CookieAwardEvaluated){
      item.CookieAwardEvaluated=true;
      const day=DAYS.find(d=>d.name===item.Day);
      item.CookieAwarded=day?.jsDay===now.getDay();
      if(item.CookieAwarded){
        data.State.CookieBalance++; data.State.LifetimeCookies++; data.State.AllTimeOnTimeCompleted++;
        if(now.getMonth()===11) data.State.ChristmasDecemberCookies++;
        showToast('+1 Belohnungskeks 🍪'); playSound('cookie');
      } else showToast('Erledigt! Heute leider ohne Belohnungskeks.');
    }
  }else item.CompletedAt=null;
  saveData(); checkAchievements(); renderAll();
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
    STREAK_COOKIE:s.CurrentDailyStreak>=30
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
function makeConfetti(gold=false){ const layer=$('#confettiLayer'); layer.innerHTML=''; const colors=gold?['#ffd54a','#ffb300','#fff0a1']:['#ff5d68','#ff9b45','#ffd95a','#69d58a','#62a6ff','#b58cff']; for(let i=0;i<55;i++){const p=document.createElement('i');p.className='confetti';p.style.left=`${Math.random()*100}%`;p.style.background=colors[i%colors.length];p.style.setProperty('--duration',`${2+Math.random()*2}s`);p.style.setProperty('--drift',`${-90+Math.random()*180}px`);p.style.animationDelay=`${Math.random()*.7}s`;layer.appendChild(p);}}

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
  $('#shopGrid').innerHTML=Object.entries(THEMES).map(([name,t])=>{const owned=data.State.UnlockedThemes.includes(name),active=data.State.Theme===name;return `<article class="shop-card" style="--themePrimary:${t.primary};--themeBg:${t.bg};--themeSurface:${t.surface}"><div class="shop-top"><div><span class="shop-emoji">${t.emoji}</span><div class="shop-name">${name}</div></div><span class="badge ${owned?'unlocked':''}">${active?'Aktiv':owned?'Freigeschaltet':'Im Shop'}</span></div><div class="theme-swatch"></div><p class="shop-description">${t.dark?'Dunkles':'Helles'} Theme mit ${t.decoration}-Dekoration.</p><div class="shop-bottom"><span class="price">${t.price?`🍪 ${t.price}`:'Kostenlos'}</span><button class="${owned?'secondary-button':'primary-button'}" data-theme-action="${name}">${active?'Ausgewählt':owned?'Verwenden':'Kaufen'}</button></div></article>`}).join('');
}
function buyOrUseTheme(name){
  const t=THEMES[name]; if(!t)return;
  if(data.State.UnlockedThemes.includes(name)){data.State.Theme=name;applyTheme(name);renderAll();showToast(`${t.emoji} ${name}-Theme aktiviert.`);return;}
  if(data.State.CookieBalance<t.price){showToast(`Dir fehlen ${t.price-data.State.CookieBalance} Kekse.`);return;}
  data.State.CookieBalance-=t.price;data.State.UnlockedThemes.push(name);data.State.Theme=name;if(!data.State.ThemeFirstUsed[name])data.State.ThemeFirstUsed[name]=new Date().toISOString();saveData();checkAchievements();renderAll();showToast(`${t.emoji} ${name} freigeschaltet!`);playSound('achievement');
}
function renderSettings(){
  $('#themeSelect').innerHTML=data.State.UnlockedThemes.filter(t=>THEMES[t]).map(t=>`<option ${t===data.State.Theme?'selected':''}>${THEMES[t].emoji} ${t}</option>`).join('');
  $('#soundToggle').checked=data.State.SoundsEnabled;
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
  try{const C=window.AudioContext||window.webkitAudioContext,ctx=new C();const notes=type==='king'?[523,659,784,1047]:type==='achievement'?[523,659,784]:[740,880];notes.forEach((f,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.001,ctx.currentTime+i*.09);g.gain.exponentialRampToValueAtTime(.08,ctx.currentTime+i*.09+.01);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.09+.11);o.connect(g).connect(ctx.destination);o.start(ctx.currentTime+i*.09);o.stop(ctx.currentTime+i*.09+.12);});}catch{}
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
  $('#exportButton').onclick=exportBackup; $('#importInput').onchange=e=>{if(e.target.files[0])importBackup(e.target.files[0]);e.target.value='';};
  $('#resetDataButton').onclick=()=>askConfirm('Alle Daten löschen?','Aufgaben, Kekse, Shopkäufe, Erfolge und Statistik werden vollständig gelöscht.',resetAll);
  $('#confirmOk').onclick=e=>{e.preventDefault();$('#confirmDialog').close();const a=confirmationAction;confirmationAction=null;a?.();};
  $('#closeAchievementButton').onclick=()=>{$('#achievementDialog').close();if(achievementQueue.length)setTimeout(showNextAchievement,250);};
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
