import { useEffect, useRef, useState } from "react";

type DemoType = "snake" | "pong" | "breakout" | "iframe";

interface ApeResponse {
  text: string;
  code?: string;
  language?: string;
  demoType?: DemoType;
}

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  code?: string;
  language?: string;
  demoType?: DemoType;
}

// ── Game HTML Templates ────────────────────────────────────────────────────

const SNAKE_HTML = `<!DOCTYPE html><html><head><style>body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}canvas{border:2px solid #a855f7;box-shadow:0 0 20px #a855f7;}</style></head><body><canvas id="c" width="300" height="300"></canvas><script>const c=document.getElementById('c'),ctx=c.getContext('2d'),GRID=15,SIZE=20;let snake=[{x:7,y:7}],dir={x:1,y:0},food={x:12,y:12},score=0;document.addEventListener('keydown',e=>{if(e.key==='ArrowUp'&&dir.y!==1)dir={x:0,y:-1};if(e.key==='ArrowDown'&&dir.y!==-1)dir={x:0,y:1};if(e.key==='ArrowLeft'&&dir.x!==1)dir={x:-1,y:0};if(e.key==='ArrowRight'&&dir.x!==-1)dir={x:1,y:0};});function placeFood(){food={x:Math.floor(Math.random()*GRID),y:Math.floor(Math.random()*GRID)};}setInterval(()=>{const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(head.x<0||head.x>=GRID||head.y<0||head.y>=GRID||snake.some(s=>s.x===head.x&&s.y===head.y)){snake=[{x:7,y:7}];dir={x:1,y:0};score=0;}else{snake.unshift(head);if(head.x===food.x&&head.y===food.y){score++;placeFood();}else snake.pop();}ctx.fillStyle='#0a0a1a';ctx.fillRect(0,0,300,300);ctx.fillStyle='#06b6d4';ctx.shadowColor='#06b6d4';ctx.shadowBlur=10;ctx.fillRect(food.x*SIZE,food.y*SIZE,SIZE-2,SIZE-2);snake.forEach((s,i)=>{ctx.fillStyle=i===0?'#a855f7':'#7c3aed';ctx.shadowColor='#a855f7';ctx.shadowBlur=i===0?15:5;ctx.fillRect(s.x*SIZE,s.y*SIZE,SIZE-2,SIZE-2);});ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.font='12px monospace';ctx.fillText('Score: '+score,5,295);},150);<\/script></body></html>`;

const PONG_HTML = `<!DOCTYPE html><html><head><style>body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}canvas{border:1px solid #a855f7;}</style></head><body><canvas id="c" width="400" height="250"></canvas><script>const c=document.getElementById('c'),ctx=c.getContext('2d');let p1={y:100,s:0},p2={y:100,s:0},ball={x:200,y:125,vx:3,vy:2};const keys={};document.addEventListener('keydown',e=>keys[e.key]=true);document.addEventListener('keyup',e=>keys[e.key]=false);setInterval(()=>{if(keys['w']&&p1.y>0)p1.y-=4;if(keys['s']&&p1.y<200)p1.y+=4;if(keys['ArrowUp']&&p2.y>0)p2.y-=4;if(keys['ArrowDown']&&p2.y<200)p2.y+=4;ball.x+=ball.vx;ball.y+=ball.vy;if(ball.y<7||ball.y>243)ball.vy*=-1;if(ball.x<25&&ball.y>p1.y&&ball.y<p1.y+50){ball.vx*=-1;}if(ball.x>377&&ball.y>p2.y&&ball.y<p2.y+50){ball.vx*=-1;}if(ball.x<0){p2.s++;ball={x:200,y:125,vx:3,vy:2};}if(ball.x>400){p1.s++;ball={x:200,y:125,vx:-3,vy:2};}ctx.fillStyle='#0a0a1a';ctx.fillRect(0,0,400,250);ctx.setLineDash([8,8]);ctx.strokeStyle='#333';ctx.beginPath();ctx.moveTo(200,0);ctx.lineTo(200,250);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#a855f7';ctx.shadowColor='#a855f7';ctx.shadowBlur=8;ctx.fillRect(10,p1.y,8,50);ctx.fillRect(382,p2.y,8,50);ctx.fillStyle='#06b6d4';ctx.shadowColor='#06b6d4';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(ball.x,ball.y,7,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.font='20px monospace';ctx.fillText(p1.s,170,25);ctx.fillText(p2.s,220,25);ctx.font='9px monospace';ctx.fillStyle='#666';ctx.fillText('W/S',15,20);ctx.fillText('↑↓',378,20);},16);<\/script></body></html>`;

const BREAKOUT_HTML = `<!DOCTYPE html><html><head><style>body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}canvas{border:1px solid #a855f7;}</style></head><body><canvas id="c" width="360" height="280"></canvas><script>const c=document.getElementById('c'),ctx=c.getContext('2d'),COLS=8,ROWS=5,BW=40,BH=16;let paddle={x:150,w:60},ball={x:180,y=220,vx:2.5,vy:-3},bricks=[],score=0,lives=3;const keys={},colors=['#a855f7','#7c3aed','#06b6d4','#0891b2','#22d3ee'];document.addEventListener('keydown',e=>keys[e.key]=true);document.addEventListener('keyup',e=>keys[e.key]=false);for(let r=0;r<ROWS;r++)for(let c2=0;c2<COLS;c2++)bricks.push({x:c2*(BW+4)+4,y:r*(BH+4)+30,alive:true,color:colors[r]});setInterval(()=>{if(keys['ArrowLeft']&&paddle.x>0)paddle.x-=5;if(keys['ArrowRight']&&paddle.x<300)paddle.x+=5;ball.x+=ball.vx;ball.y+=ball.vy;if(ball.x<7||ball.x>353)ball.vx*=-1;if(ball.y<7)ball.vy*=-1;if(ball.y>270){lives--;ball={x:180,y:220,vx:2.5,vy:-3};if(lives<=0){bricks.forEach(b=>b.alive=true);lives=3;score=0;}}if(ball.y>254&&ball.x>paddle.x&&ball.x<paddle.x+60)ball.vy*=-1;bricks.forEach(b=>{if(!b.alive)return;if(ball.x>b.x&&ball.x<b.x+BW&&ball.y>b.y&&ball.y<b.y+BH){b.alive=false;ball.vy*=-1;score+=10;}});ctx.fillStyle='#0a0a1a';ctx.fillRect(0,0,360,280);bricks.forEach(b=>{if(!b.alive)return;ctx.fillStyle=b.color;ctx.shadowColor=b.color;ctx.shadowBlur=6;ctx.fillRect(b.x,b.y,BW,BH);});ctx.shadowBlur=0;ctx.fillStyle='#a855f7';ctx.shadowColor='#a855f7';ctx.shadowBlur=8;ctx.fillRect(paddle.x,262,60,8);ctx.fillStyle='#06b6d4';ctx.shadowColor='#06b6d4';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(ball.x,ball.y,7,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.font='11px monospace';ctx.fillText('Score:'+score,5,20);ctx.fillText('Lives:'+lives,300,20);},16);<\/script></body></html>`;

const CALCULATOR_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a0a1a,#1a0a2e);min-height:100vh;display:flex;justify-content:center;align-items:center;}
.calc{background:#1a1a2e;border:1px solid #a855f7;border-radius:20px;padding:20px;width:280px;box-shadow:0 0 40px rgba(168,85,247,0.3);}
.display{background:#0a0a1a;border:1px solid #333;border-radius:12px;padding:16px;text-align:right;margin-bottom:16px;}
.expr{color:#666;font-size:12px;min-height:18px;}
.val{color:#fff;font-size:2rem;font-weight:300;word-break:break-all;}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
btn{padding:16px;border:none;border-radius:10px;font-size:1rem;cursor:pointer;transition:all 0.15s;font-weight:600;}
.op{background:#a855f720;color:#a855f7;border:1px solid #a855f740;}
.op:hover{background:#a855f7;color:#fff;}
.eq{background:#a855f7;color:#fff;grid-row:span 2;}
.eq:hover{background:#9333ea;}
.num{background:#1e1e3a;color:#fff;border:1px solid #333;}
.num:hover{background:#2d2d4e;}
.clr{background:#dc262620;color:#dc2626;border:1px solid #dc262640;}
.clr:hover{background:#dc2626;color:#fff;}
.zero{grid-column:span 2;}
</style></head>
<body>
<div class="calc">
<div class="display">
<div class="expr" id="expr"></div>
<div class="val" id="val">0</div>
</div>
<div class="grid">
<button class="num clr" onclick="clearAll()">AC</button>
<button class="num" onclick="toggleSign()">+/-</button>
<button class="num" onclick="percent()">%</button>
<button class="op" onclick="op('/')">÷</button>
<button class="num" onclick="num('7')">7</button>
<button class="num" onclick="num('8')">8</button>
<button class="num" onclick="num('9')">9</button>
<button class="op" onclick="op('*')">×</button>
<button class="num" onclick="num('4')">4</button>
<button class="num" onclick="num('5')">5</button>
<button class="num" onclick="num('6')">6</button>
<button class="op" onclick="op('-')">−</button>
<button class="num" onclick="num('1')">1</button>
<button class="num" onclick="num('2')">2</button>
<button class="num" onclick="num('3')">3</button>
<button class="op eq" onclick="equals()">=</button>
<button class="num zero" onclick="num('0')">0</button>
<button class="num" onclick="dot()">.</button>
<button class="op" onclick="op('+')">+</button>
</div>
</div>
<script>
let cur='0',prev='',oper=null,fresh=true;
const d=()=>document.getElementById('val');
const e=()=>document.getElementById('expr');
function num(n){if(fresh){cur=n;fresh=false;}else cur=cur==='0'?n:cur+n;d().textContent=cur;}
function dot(){if(fresh){cur='0.';fresh=false;}else if(!cur.includes('.'))cur+='.';d().textContent=cur;}
function op(o){prev=cur;oper=o;fresh=true;e().textContent=cur+' '+(o==='*'?'×':o==='/'?'÷':o);}
function equals(){if(!oper)return;const a=parseFloat(prev),b=parseFloat(cur);let r;if(oper==='+')r=a+b;else if(oper==='-')r=a-b;else if(oper==='*')r=a*b;else r=b!==0?a/b:'Error';e().textContent=prev+' '+(oper==='*'?'×':oper==='/'?'÷':oper)+' '+cur+' =';cur=String(parseFloat(r.toFixed(10)));d().textContent=cur;oper=null;fresh=true;}
function clearAll(){cur='0';prev='';oper=null;fresh=true;d().textContent='0';e().textContent='';}
function toggleSign(){cur=String(-parseFloat(cur));d().textContent=cur;}
function percent(){cur=String(parseFloat(cur)/100);d().textContent=cur;}
document.addEventListener('keydown',k=>{if(k.key>='0'&&k.key<='9')num(k.key);else if(k.key==='.')dot();else if(['+','-','*','/'].includes(k.key))op(k.key);else if(k.key==='Enter'||k.key==='=')equals();else if(k.key==='Escape')clearAll();});
<\/script></body></html>`;

const TODO_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a0a1a,#1a0a2e);min-height:100vh;padding:30px 20px;}
.app{max-width:480px;margin:0 auto;}
h1{color:#a855f7;font-size:1.8rem;margin-bottom:6px;text-shadow:0 0 20px #a855f740;}  
.sub{color:#666;font-size:0.85rem;margin-bottom:24px;}
.add-row{display:flex;gap:10px;margin-bottom:24px;}
input{flex:1;background:#1a1a2e;border:1px solid #a855f740;border-radius:10px;padding:12px 16px;color:#fff;font-size:0.95rem;outline:none;}
input:focus{border-color:#a855f7;box-shadow:0 0 12px #a855f720;}
.add-btn{background:#a855f7;border:none;border-radius:10px;padding:12px 20px;color:#fff;font-size:1.1rem;cursor:pointer;transition:all 0.15s;}
.add-btn:hover{background:#9333ea;box-shadow:0 0 20px #a855f740;}
.filters{display:flex;gap:8px;margin-bottom:16px;}
.f-btn{background:transparent;border:1px solid #333;border-radius:20px;padding:5px 14px;color:#666;cursor:pointer;font-size:0.8rem;transition:all 0.15s;}
.f-btn.active{background:#a855f720;border-color:#a855f7;color:#a855f7;}
.todo-list{display:flex;flex-direction:column;gap:8px;}
.todo-item{background:#1a1a2e;border:1px solid #a855f720;border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;transition:all 0.2s;}
.todo-item:hover{border-color:#a855f740;}
.todo-item.done{opacity:0.5;}
.check{width:22px;height:22px;border-radius:50%;border:2px solid #a855f7;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;}
.check.checked{background:#a855f7;}
.todo-text{flex:1;color:#e2e8f0;font-size:0.95rem;}
.done .todo-text{text-decoration:line-through;color:#666;}
.del{background:none;border:none;color:#dc262660;cursor:pointer;font-size:1.1rem;transition:color 0.15s;}
.del:hover{color:#dc2626;}
.stats{color:#666;font-size:0.8rem;margin-top:16px;text-align:center;}
.empty{text-align:center;color:#444;padding:40px 0;font-size:0.95rem;}
</style></head>
<body>
<div class="app">
<h1>✅ Todo List</h1>
<p class="sub" id="stats">0 tasks</p>
<div class="add-row">
<input id="inp" placeholder="Add a new task..." onkeydown="if(event.key==='Enter')add()">
<button class="add-btn" onclick="add()">+</button>
</div>
<div class="filters">
<button class="f-btn active" onclick="filter('all',this)">All</button>
<button class="f-btn" onclick="filter('active',this)">Active</button>
<button class="f-btn" onclick="filter('done',this)">Done</button>
</div>
<div class="todo-list" id="list"></div>
</div>
<script>
let todos=[{id:1,text:'Learn JavaScript',done:true},{id:2,text:'Build an awesome app',done:false},{id:3,text:'Deploy to production',done:false}];
let mode='all',nextId=4;
function render(){const list=document.getElementById('list');const filtered=todos.filter(t=>mode==='all'?true:mode==='active'?!t.done:t.done);list.innerHTML=filtered.length===0?'<div class="empty">No tasks here 🎉</div>':filtered.map(t=>('<div class="todo-item '+(t.done?'done':'')+' " id="t'+t.id+'"><div class="check '+(t.done?'checked':'')+' " onclick="toggle('+t.id+')">'+( t.done?'v':'')+' </div><span class="todo-text">'+t.text+'</span><button class="del" onclick="del('+t.id+')">X</button></div>')).join('');const done=todos.filter(t=>t.done).length;document.getElementById('stats').textContent=todos.length+' tasks · '+done+' done';}
function add(){const inp=document.getElementById('inp');const v=inp.value.trim();if(!v)return;todos.push({id:nextId++,text:v,done:false});inp.value='';render();}
function toggle(id){const t=todos.find(t=>t.id===id);if(t)t.done=!t.done;render();}
function del(id){todos=todos.filter(t=>t.id!==id);render();}
function filter(m,btn){mode=m;document.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render();}
render();
<\/script></body></html>`;

const TIMER_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a0a1a,#1a0a2e);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px;}
.tabs{display:flex;gap:0;background:#1a1a2e;border:1px solid #a855f740;border-radius:12px;overflow:hidden;}
.tab{padding:10px 28px;color:#666;cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.2s;border:none;background:none;}
.tab.active{background:#a855f720;color:#a855f7;}
.panel{display:none;flex-direction:column;align-items:center;gap:20px;}
.panel.active{display:flex;}
.time-display{font-size:4rem;font-weight:200;color:#fff;letter-spacing:0.1em;font-family:monospace;text-shadow:0 0 30px #a855f780;}
.ms{font-size:1.8rem;color:#a855f7;}
.btns{display:flex;gap:12px;}
btn-r,button{padding:12px 28px;border-radius:10px;border:none;cursor:pointer;font-size:0.95rem;font-weight:600;transition:all 0.15s;}
.btn-start{background:#a855f7;color:#fff;}
.btn-start:hover{background:#9333ea;box-shadow:0 0 20px #a855f740;}
.btn-stop{background:#dc2626;color:#fff;}
.btn-stop:hover{background:#b91c1c;}
.btn-reset{background:#1e1e3a;color:#a855f7;border:1px solid #a855f740;}
.btn-reset:hover{background:#2d2d4e;}
.countdown-input{background:#1a1a2e;border:1px solid #a855f740;border-radius:10px;padding:10px;color:#fff;font-size:1.2rem;text-align:center;width:120px;outline:none;}
.laps{max-height:120px;overflow-y:auto;width:300px;}
.lap{color:#888;font-size:0.85rem;padding:4px 0;border-bottom:1px solid #1e1e3a;font-family:monospace;}
</style></head>
<body>
<div class="tabs">
<button class="tab active" onclick="switchTab('sw',this)">⏱ Stopwatch</button>
<button class="tab" onclick="switchTab('cd',this)">⏳ Countdown</button>
</div>
<div class="panel active" id="sw">
<div class="time-display"><span id="sw-time">00:00</span><span class="ms">.<span id="sw-ms">00</span></span></div>
<div class="btns">
<button class="btn-start" id="sw-btn" onclick="swToggle()">▶ Start</button>
<button class="btn-reset" onclick="swReset()">↺ Reset</button>
<button class="btn-reset" onclick="addLap()">Lap</button>
</div>
<div class="laps" id="laps"></div>
</div>
<div class="panel" id="cd">
<input class="countdown-input" id="cd-inp" type="number" placeholder="Seconds" value="60">
<div class="time-display" id="cd-time">01:00</div>
<div class="btns">
<button class="btn-start" id="cd-btn" onclick="cdToggle()">▶ Start</button>
<button class="btn-reset" onclick="cdReset()">↺ Reset</button>
</div>
</div>
<script>
let swMs=0,swRun=false,swInt=null,laps=[],lapN=1;
let cdSec=60,cdRun=false,cdInt=null;
function pad(n,d=2){return String(n).padStart(d,'0');}
function swToggle(){swRun=!swRun;if(swRun){swInt=setInterval(()=>{swMs+=10;document.getElementById('sw-time').textContent=pad(Math.floor(swMs/60000))+':'+pad(Math.floor(swMs/1000)%60);document.getElementById('sw-ms').textContent=pad(Math.floor(swMs/10)%100);},10);}else{clearInterval(swInt);}document.getElementById('sw-btn').textContent=swRun?'⏸ Pause':'▶ Start';}
function swReset(){swRun=false;clearInterval(swInt);swMs=0;laps=[];lapN=1;document.getElementById('sw-time').textContent='00:00';document.getElementById('sw-ms').textContent='00';document.getElementById('sw-btn').textContent='▶ Start';document.getElementById('laps').innerHTML='';}
function addLap(){if(!swRun)return;laps.push(swMs);const div=document.getElementById('laps');div.innerHTML='<div class="lap">Lap '+lapN+': '+pad(Math.floor(swMs/60000))+':'+pad(Math.floor(swMs/1000)%60)+'.'+pad(Math.floor(swMs/10)%100)+'</div>'+div.innerHTML;lapN++;}
function cdToggle(){cdRun=!cdRun;if(cdRun){const v=parseInt(document.getElementById('cd-inp').value)||60;if(cdSec===parseInt(document.getElementById('cd-inp').value)||cdSec===v){}cdInt=setInterval(()=>{if(cdSec<=0){clearInterval(cdInt);cdRun=false;document.getElementById('cd-btn').textContent='▶ Start';document.getElementById('cd-time').style.color='#dc2626';return;}cdSec--;document.getElementById('cd-time').textContent=pad(Math.floor(cdSec/60))+':'+pad(cdSec%60);},1000);}else{clearInterval(cdInt);}document.getElementById('cd-btn').textContent=cdRun?'⏸ Pause':'▶ Start';}
function cdReset(){cdRun=false;clearInterval(cdInt);cdSec=parseInt(document.getElementById('cd-inp').value)||60;document.getElementById('cd-time').textContent=pad(Math.floor(cdSec/60))+':'+pad(cdSec%60);document.getElementById('cd-time').style.color='#fff';document.getElementById('cd-btn').textContent='▶ Start';}
function switchTab(id,btn){document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));document.getElementById(id).classList.add('active');btn.classList.add('active');}
<\/script></body></html>`;

const LANDING_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:#0a0a1a;color:#fff;}
.nav{display:flex;justify-content:space-between;align-items:center;padding:18px 40px;background:#0a0a1aee;position:sticky;top:0;backdrop-filter:blur(10px);border-bottom:1px solid #a855f720;}
.logo{color:#a855f7;font-size:1.4rem;font-weight:800;}
.nav-links{display:flex;gap:24px;}
.nav-links a{color:#888;text-decoration:none;font-size:0.9rem;transition:color 0.2s;}
.nav-links a:hover{color:#a855f7;}
.cta-nav{background:#a855f7;color:#fff!important;padding:8px 20px;border-radius:8px!important;}
.hero{text-align:center;padding:80px 40px;background:radial-gradient(ellipse at center,#1a0a2e 0%,#0a0a1a 70%);}
.badge{display:inline-block;background:#a855f720;color:#a855f7;border:1px solid #a855f740;border-radius:20px;padding:5px 16px;font-size:0.8rem;font-weight:600;margin-bottom:24px;letter-spacing:0.1em;}
h1{font-size:3rem;font-weight:800;line-height:1.1;margin-bottom:20px;background:linear-gradient(135deg,#fff,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.sub{color:#888;font-size:1.1rem;max-width:500px;margin:0 auto 36px;line-height:1.7;}
.hero-btns{display:flex;gap:16px;justify-content:center;}
.btn-p{background:#a855f7;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:1rem;transition:all 0.2s;}
.btn-p:hover{background:#9333ea;box-shadow:0 0 30px #a855f740;}
.btn-s{background:transparent;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;border:1px solid #444;}
.features{padding:60px 40px;}
.features h2{text-align:center;font-size:2rem;margin-bottom:12px;}
.feat-sub{text-align:center;color:#666;margin-bottom:40px;font-size:0.95rem;}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:0 auto;}
.card{background:#1a1a2e;border:1px solid #a855f720;border-radius:16px;padding:28px;transition:all 0.2s;}
.card:hover{border-color:#a855f740;transform:translateY(-4px);box-shadow:0 8px 30px #a855f720;}
.icon{font-size:2rem;margin-bottom:14px;}
.card h3{color:#e2e8f0;margin-bottom:8px;font-size:1rem;}
.card p{color:#666;font-size:0.85rem;line-height:1.6;}
.footer{text-align:center;padding:30px;color:#444;border-top:1px solid #1a1a2e;font-size:0.85rem;}
</style></head>
<body>
<nav class="nav">
<div class="logo">⚡ LaunchKit</div>
<div class="nav-links">
<a href="#">Features</a><a href="#">Pricing</a><a href="#">Docs</a>
<a href="#" class="cta-nav">Get Started</a>
</div>
</nav>
<section class="hero">
<div class="badge">🚀 NOW IN BETA</div>
<h1>Build Faster.<br>Launch Smarter.</h1>
<p class="sub">The all-in-one platform for developers who want to ship products without the complexity. Start building in minutes.</p>
<div class="hero-btns">
<a href="#" class="btn-p">Start for Free →</a>
<a href="#" class="btn-s">See Demo</a>
</div>
</section>
<section class="features">
<h2>Everything you need</h2>
<p class="feat-sub">Powerful tools designed to help you ship faster</p>
<div class="grid">
<div class="card"><div class="icon">⚡</div><h3>Lightning Fast</h3><p>Optimized for performance with edge computing and smart caching out of the box.</p></div>
<div class="card"><div class="icon">🔒</div><h3>Secure by Default</h3><p>Enterprise-grade security with end-to-end encryption and automatic vulnerability scanning.</p></div>
<div class="card"><div class="icon">📊</div><h3>Real-time Analytics</h3><p>Deep insights into your app's performance with beautiful dashboards and alerts.</p></div>
<div class="card"><div class="icon">🔧</div><h3>Developer First</h3><p>Comprehensive APIs and CLI tools. Integrate with your existing workflow seamlessly.</p></div>
<div class="card"><div class="icon">🌍</div><h3>Global CDN</h3><p>Deploy to 200+ edge locations worldwide. Sub-50ms latency for your users globally.</p></div>
<div class="card"><div class="icon">🤝</div><h3>Team Collaboration</h3><p>Invite your team, set roles and permissions, and collaborate in real time.</p></div>
</div>
</section>
<footer class="footer">© 2025 LaunchKit · Built with APE AI</footer>
</body></html>`;

const PASSWORD_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a0a1a,#1a0a2e);min-height:100vh;display:flex;align-items:center;justify-content:center;}
.app{background:#1a1a2e;border:1px solid #a855f740;border-radius:20px;padding:32px;width:360px;box-shadow:0 0 40px #a855f720;}
h2{color:#a855f7;margin-bottom:6px;font-size:1.4rem;}  
.sub{color:#666;font-size:0.85rem;margin-bottom:24px;}
.out{background:#0a0a1a;border:1px solid #a855f740;border-radius:12px;padding:16px;margin-bottom:20px;display:flex;align-items:center;gap:10px;}
#pwd{flex:1;color:#06b6d4;font-family:monospace;font-size:1rem;word-break:break-all;min-height:24px;}
.copy{background:#a855f720;border:1px solid #a855f740;border-radius:8px;padding:6px 14px;color:#a855f7;cursor:pointer;font-size:0.85rem;white-space:nowrap;transition:all 0.15s;}
.copy:hover{background:#a855f7;color:#fff;}
.strength{height:6px;border-radius:3px;margin-bottom:20px;transition:all 0.3s;}
.section{margin-bottom:16px;}
label{display:flex;justify-content:space-between;color:#ccc;font-size:0.9rem;margin-bottom:8px;}
.val{color:#a855f7;font-weight:700;}
input[type=range]{width:100%;accent-color:#a855f7;}
.checks{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.check-row{display:flex;align-items:center;gap:8px;color:#ccc;font-size:0.88rem;cursor:pointer;}
checkbox{accent-color:#a855f7;}
.gen-btn{width:100%;background:#a855f7;border:none;border-radius:12px;padding:14px;color:#fff;font-size:1rem;font-weight:700;cursor:pointer;transition:all 0.2s;margin-top:4px;}
.gen-btn:hover{background:#9333ea;box-shadow:0 0 20px #a855f740;}
</style></head>
<body>
<div class="app">
<h2>🔐 Password Generator</h2>
<p class="sub">Generate strong, secure passwords instantly</p>
<div class="out"><div id="pwd">Click Generate!</div><button class="copy" onclick="copy()">Copy</button></div>
<div class="strength" id="str"></div>
<div class="section">
<label>Length: <span class="val" id="len-val">16</span></label>
<input type="range" id="len" min="6" max="32" value="16" oninput="document.getElementById('len-val').textContent=this.value">
</div>
<div class="section checks">
<label class="check-row"><input type="checkbox" id="upper" checked> Uppercase</label>
<label class="check-row"><input type="checkbox" id="lower" checked> Lowercase</label>
<label class="check-row"><input type="checkbox" id="nums" checked> Numbers</label>
<label class="check-row"><input type="checkbox" id="syms" checked> Symbols</label>
</div>
<button class="gen-btn" onclick="generate()">⚡ Generate Password</button>
</div>
<script>
function generate(){const len=parseInt(document.getElementById('len').value);const U=document.getElementById('upper').checked;const L=document.getElementById('lower').checked;const N=document.getElementById('nums').checked;const S=document.getElementById('syms').checked;let chars='';if(U)chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';if(L)chars+='abcdefghijklmnopqrstuvwxyz';if(N)chars+='0123456789';if(S)chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';if(!chars)chars='abcdefghijklmnopqrstuvwxyz';let pwd='';for(let i=0;i<len;i++)pwd+=chars[Math.floor(Math.random()*chars.length)];document.getElementById('pwd').textContent=pwd;const score=(U?1:0)+(L?1:0)+(N?1:0)+(S?1:0);const cols=['#dc2626','#f97316','#eab308','#22c55e'];const labels=['Weak','Fair','Good','Strong'];const s=document.getElementById('str');s.style.background=cols[score-1]||'#dc2626';s.style.width=(score/4*100)+'%';s.title=labels[score-1]||'Weak';}
function copy(){const t=document.getElementById('pwd').textContent;navigator.clipboard.writeText(t).then(()=>{const b=document.querySelector('.copy');b.textContent='✓ Copied';setTimeout(()=>b.textContent='Copy',2000);});}
generate();
<\/script></body></html>`;

const TICTACTOE_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a0a1a,#1a0a2e);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;}
h1{color:#a855f7;font-size:1.8rem;}
.status{color:#ccc;font-size:1rem;height:24px;}
.board{display:grid;grid-template-columns:repeat(3,90px);gap:8px;}
.cell{width:90px;height:90px;background:#1a1a2e;border:2px solid #a855f720;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;cursor:pointer;transition:all 0.15s;}
.cell:hover:empty{background:#a855f710;border-color:#a855f740;}
.cell.x{color:#a855f7;text-shadow:0 0 20px #a855f7;}
.cell.o{color:#06b6d4;text-shadow:0 0 20px #06b6d4;}
.cell.win{background:#a855f720;border-color:#a855f7;animation:pulse 0.5s ease;}
@keyframes pulse{0%{transform:scale(1);}50%{transform:scale(1.1);}100%{transform:scale(1);}}
.btns{display:flex;gap:12px;}
btn{padding:10px 24px;border-radius:10px;border:none;cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.15s;}
.btn-r{background:#a855f7;color:#fff;}
.btn-r:hover{background:#9333ea;}
.btn-ai{background:#1a1a2e;color:#a855f7;border:1px solid #a855f740;}
.btn-ai.active{background:#a855f720;}
.score{display:flex;gap:24px;}
.score-item{text-align:center;}
.score-item .n{font-size:1.8rem;font-weight:700;color:#a855f7;}
.score-item .l{color:#666;font-size:0.8rem;}
</style></head>
<body>
<h1>✕ Tic-Tac-Toe ○</h1>
<div class="score">
<div class="score-item"><div class="n" id="sx">0</div><div class="l">You (X)</div></div>
<div class="score-item"><div class="n" id="sd">0</div><div class="l">Draws</div></div>
<div class="score-item"><div class="n" id="so">0</div><div class="l">CPU (O)</div></div>
</div>
<p class="status" id="st">Your turn (X)</p>
<div class="board" id="board"></div>
<div class="btns">
<button class="btn-r" onclick="reset()">↺ New Game</button>
<button class="btn-ai" id="aiBtn" onclick="toggleAI()">🤖 vs CPU: ON</button>
</div>
<script>
let board=Array(9).fill(''),xTurn=true,gameOver=false,vsAI=true,scores={x:0,o:0,d:0};
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function render(){const b=document.getElementById('board');b.innerHTML=board.map((c,i)=>('<div class="cell '+c.toLowerCase()+'" onclick="click('+i+')">'+c+'</div>')).join('');}
function checkWin(b,p){return wins.find(w=>w.every(i=>b[i]===p));}
function click(i){if(board[i]||gameOver||(!xTurn&&vsAI))return;board[i]='X';xTurn=false;check();if(!gameOver&&vsAI)setTimeout(aiMove,300);render();}
function aiMove(){const empty=board.map((c,i)=>c?-1:i).filter(i=>i>=0);if(!empty.length)return;let best=-1;for(const i of empty){board[i]='O';if(checkWin(board,'O')){board[i]='O';xTurn=true;check();render();return;}board[i]='';}for(const i of empty){board[i]='X';if(checkWin(board,'X')){board[i]='O';xTurn=true;check();render();return;}board[i]='';}const c=empty.includes(4)?4:empty[Math.floor(Math.random()*empty.length)];board[c]='O';xTurn=true;check();render();}
function check(){const wx=checkWin(board,'X'),wo=checkWin(board,'O');if(wx){document.getElementById('st').textContent='🎉 You win!';wx.forEach(i=>document.querySelectorAll('.cell')[i]?.classList.add('win'));scores.x++;document.getElementById('sx').textContent=scores.x;gameOver=true;}else if(wo){document.getElementById('st').textContent='🤖 CPU wins!';wo.forEach(i=>document.querySelectorAll('.cell')[i]?.classList.add('win'));scores.o++;document.getElementById('so').textContent=scores.o;gameOver=true;}else if(board.every(c=>c)){document.getElementById('st').textContent="It's a draw!";scores.d++;document.getElementById('sd').textContent=scores.d;gameOver=true;}else{document.getElementById('st').textContent=xTurn?'Your turn (X)':'CPU thinking...';}}
function reset(){board=Array(9).fill('');xTurn=true;gameOver=false;document.getElementById('st').textContent='Your turn (X)';render();}
function toggleAI(){vsAI=!vsAI;document.getElementById('aiBtn').textContent='🤖 vs CPU: '+(vsAI?'ON':'OFF');document.getElementById('aiBtn').classList.toggle('active',vsAI);reset();}
render();
<\/script></body></html>`;

const MEMORY_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a0a1a,#1a0a2e);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:20px;}
h1{color:#a855f7;font-size:1.8rem;}
.info{display:flex;gap:30px;color:#ccc;font-size:0.9rem;}
.info span{color:#a855f7;font-weight:700;font-size:1.1rem;}
.grid{display:grid;grid-template-columns:repeat(4,70px);gap:10px;}
.card{width:70px;height:70px;cursor:pointer;perspective:600px;}
.inner{width:100%;height:100%;transition:transform 0.4s;transform-style:preserve-3d;position:relative;}
.card.flipped .inner,.card.matched .inner{transform:rotateY(180deg);}
.front,.back{position:absolute;width:100%;height:100%;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;backface-visibility:hidden;}
.front{background:#1a1a2e;border:2px solid #a855f740;}
.back{background:#a855f720;border:2px solid #a855f7;transform:rotateY(180deg);}
.card.matched .back{background:#22c55e20;border-color:#22c55e;}
.restart{background:#a855f7;border:none;border-radius:10px;padding:10px 24px;color:#fff;font-size:0.95rem;font-weight:700;cursor:pointer;transition:all 0.15s;}
.restart:hover{background:#9333ea;}
</style></head>
<body>
<h1>🧠 Memory Match</h1>
<div class="info">Moves: <span id="moves">0</span>&nbsp;&nbsp;Matches: <span id="matches">0</span>/8</div>
<div class="grid" id="grid"></div>
<button class="restart" onclick="init()">↺ New Game</button>
<script>
const EMOJIS=['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'];
let cards=[],flipped=[],matched=0,moves=0,lock=false;
function init(){const pairs=[...EMOJIS,...EMOJIS].sort(()=>Math.random()-0.5);cards=pairs;flipped=[];matched=0;moves=0;lock=false;document.getElementById('moves').textContent=0;document.getElementById('matches').textContent=0;const g=document.getElementById('grid');g.innerHTML=pairs.map((e,i)=>('<div class="card" id="c'+i+'" onclick="flip('+i+')"><div class="inner"><div class="front">?</div><div class="back">'+e+'</div></div></div>')).join('');}
function flip(i){if(lock||flipped.includes(i)||document.getElementById('c'+i).classList.contains('matched'))return;document.getElementById('c'+i).classList.add('flipped');flipped.push(i);if(flipped.length===2){moves++;document.getElementById('moves').textContent=moves;lock=true;setTimeout(()=>{const[a,b]=flipped;if(cards[a]===cards[b]){document.getElementById('c'+a).classList.add('matched');document.getElementById('c'+b).classList.add('matched');matched++;document.getElementById('matches').textContent=matched;if(matched===8)setTimeout(()=>alert('🎉 You won in '+moves+' moves!'),300);}else{document.getElementById('c'+a).classList.remove('flipped');document.getElementById('c'+b).classList.remove('flipped');}flipped=[];lock=false;},900);}}
init();
<\/script></body></html>`;

const PORTFOLIO_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:#0a0a1a;color:#fff;}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px;background:radial-gradient(ellipse at 30% 50%,#1a0a2e,#0a0a1a);position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;width:400px;height:400px;background:radial-gradient(circle,#a855f720,transparent);border-radius:50%;top:-100px;right:-100px;}
.hero-content{max-width:600px;}
.tag{color:#a855f7;font-size:0.9rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:16px;}
h1{font-size:3.5rem;font-weight:800;line-height:1.05;margin-bottom:20px;}
.grad{background:linear-gradient(135deg,#fff,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.bio{color:#888;font-size:1.05rem;line-height:1.7;margin-bottom:32px;}
.btns{display:flex;gap:14px;}
.btn-p{background:#a855f7;color:#fff;padding:13px 28px;border-radius:11px;text-decoration:none;font-weight:700;}
.btn-s{border:1px solid #333;color:#ccc;padding:13px 28px;border-radius:11px;text-decoration:none;}
.skills{padding:60px 40px;background:#0d0d1a;}
h2{font-size:1.8rem;margin-bottom:32px;text-align:center;}
.skill-list{max-width:500px;margin:0 auto;display:flex;flex-direction:column;gap:16px;}
.skill-row{}
.skill-name{display:flex;justify-content:space-between;color:#ccc;font-size:0.9rem;margin-bottom:6px;}
.bar-bg{background:#1a1a2e;border-radius:4px;height:8px;}
.bar{height:8px;border-radius:4px;background:linear-gradient(90deg,#a855f7,#06b6d4);box-shadow:0 0 10px #a855f740;}
.projects{padding:60px 40px;}
.proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:800px;margin:0 auto;}
.proj-card{background:#1a1a2e;border:1px solid #a855f720;border-radius:16px;padding:24px;transition:all 0.2s;}
.proj-card:hover{border-color:#a855f740;transform:translateY(-3px);}
.proj-icon{font-size:2rem;margin-bottom:12px;}
.proj-card h3{color:#e2e8f0;margin-bottom:8px;}
.proj-card p{color:#666;font-size:0.85rem;line-height:1.6;}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;}
.t{background:#a855f720;color:#a855f7;padding:2px 10px;border-radius:20px;font-size:0.75rem;}
</style></head>
<body>
<section class="hero">
<div class="hero-content">
<div class="tag">👋 Available for work</div>
<h1><span class="grad">Full-Stack</span><br>Developer</h1>
<p class="bio">I build fast, beautiful, and scalable web applications. Passionate about clean code, great UX, and solving real problems with technology.</p>
<div class="btns"><a href="#" class="btn-p">View My Work</a><a href="#" class="btn-s">Download CV</a></div>
</div>
</section>
<section class="skills">
<h2>Skills</h2>
<div class="skill-list">
<div class="skill-row"><div class="skill-name"><span>React / TypeScript</span><span>95%</span></div><div class="bar-bg"><div class="bar" style="width:95%"></div></div></div>
<div class="skill-row"><div class="skill-name"><span>Node.js / Backend</span><span>88%</span></div><div class="bar-bg"><div class="bar" style="width:88%"></div></div></div>
<div class="skill-row"><div class="skill-name"><span>UI / UX Design</span><span>82%</span></div><div class="bar-bg"><div class="bar" style="width:82%"></div></div></div>
<div class="skill-row"><div class="skill-name"><span>Database / SQL</span><span>78%</span></div><div class="bar-bg"><div class="bar" style="width:78%"></div></div></div>
</div>
</section>
<section class="projects">
<h2>Projects</h2>
<div class="proj-grid">
<div class="proj-card"><div class="proj-icon">🛒</div><h3>ShopFlow</h3><p>E-commerce platform with real-time inventory, Stripe payments, and admin dashboard.</p><div class="tags"><span class="t">React</span><span class="t">Node.js</span><span class="t">Stripe</span></div></div>
<div class="proj-card"><div class="proj-icon">📊</div><h3>DataPulse</h3><p>Analytics dashboard with live charts, CSV export, and team collaboration features.</p><div class="tags"><span class="t">TypeScript</span><span class="t">D3.js</span></div></div>
<div class="proj-card"><div class="proj-icon">🤖</div><h3>ChatBot AI</h3><p>Conversational AI assistant with context memory and multi-language support.</p><div class="tags"><span class="t">Python</span><span class="t">OpenAI</span></div></div>
<div class="proj-card"><div class="proj-icon">📱</div><h3>TaskMaster</h3><p>Cross-platform task manager with offline sync, reminders, and team workspaces.</p><div class="tags"><span class="t">React Native</span><span class="t">Firebase</span></div></div>
</div>
</section>
</body></html>`;

const DASHBOARD_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',sans-serif;background:#0a0a1a;color:#fff;display:flex;min-height:100vh;}
.sidebar{width:200px;background:#0d0d1a;border-right:1px solid #1a1a2e;padding:24px 16px;flex-shrink:0;}
.logo{color:#a855f7;font-size:1.1rem;font-weight:800;margin-bottom:32px;}
.nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;color:#666;cursor:pointer;font-size:0.88rem;margin-bottom:4px;transition:all 0.15s;}
.nav-item:hover,.nav-item.active{background:#a855f720;color:#a855f7;}
.main{flex:1;padding:28px;overflow:auto;}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;}
.header h1{font-size:1.5rem;}
.date{color:#666;font-size:0.85rem;}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;}
.stat{background:#1a1a2e;border:1px solid #a855f720;border-radius:14px;padding:20px;}
.stat-label{color:#666;font-size:0.8rem;margin-bottom:8px;}
.stat-val{font-size:1.8rem;font-weight:700;margin-bottom:4px;}
.stat-change{font-size:0.78rem;color:#22c55e;}
.stat-change.neg{color:#dc2626;}
.charts{display:grid;grid-template-columns:2fr 1fr;gap:16px;}
.chart-card{background:#1a1a2e;border:1px solid #a855f720;border-radius:14px;padding:20px;}
.chart-title{font-size:0.9rem;font-weight:600;margin-bottom:16px;color:#ccc;}
.activity{display:flex;flex-direction:column;gap:12px;}
.act-item{display:flex;align-items:center;gap:12px;padding:10px;background:#0d0d1a;border-radius:8px;}
.act-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.act-text{flex:1;font-size:0.83rem;color:#ccc;}
.act-time{font-size:0.75rem;color:#444;}
</style></head>
<body>
<aside class="sidebar">
<div class="logo">⚡ Dashboard</div>
<div class="nav-item active">📊 Overview</div>
<div class="nav-item">📈 Analytics</div>
<div class="nav-item">👥 Users</div>
<div class="nav-item">📦 Products</div>
<div class="nav-item">⚙️ Settings</div>
</aside>
<main class="main">
<div class="header"><h1>Overview</h1><div class="date">Friday, Mar 20, 2026</div></div>
<div class="stats">
<div class="stat"><div class="stat-label">Total Revenue</div><div class="stat-val" style="color:#a855f7">$48.2K</div><div class="stat-change">↑ 12.5% this month</div></div>
<div class="stat"><div class="stat-label">Active Users</div><div class="stat-val" style="color:#06b6d4">3,842</div><div class="stat-change">↑ 8.2% this week</div></div>
<div class="stat"><div class="stat-label">New Orders</div><div class="stat-val" style="color:#22c55e">284</div><div class="stat-change">↑ 4.1% today</div></div>
<div class="stat"><div class="stat-label">Churn Rate</div><div class="stat-val" style="color:#f97316">2.4%</div><div class="stat-change neg">↑ 0.3% this month</div></div>
</div>
<div class="charts">
<div class="chart-card">
<div class="chart-title">Revenue (Last 7 Days)</div>
<canvas id="chart" width="400" height="160"></canvas>
</div>
<div class="chart-card">
<div class="chart-title">Recent Activity</div>
<div class="activity">
<div class="act-item"><div class="act-dot" style="background:#22c55e"></div><div class="act-text">New user signed up</div><div class="act-time">2m ago</div></div>
<div class="act-item"><div class="act-dot" style="background:#a855f7"></div><div class="act-text">Order #1284 completed</div><div class="act-time">8m ago</div></div>
<div class="act-item"><div class="act-dot" style="background:#06b6d4"></div><div class="act-text">Payment received $340</div><div class="act-time">15m ago</div></div>
<div class="act-item"><div class="act-dot" style="background:#f97316"></div><div class="act-text">Server alert resolved</div><div class="act-time">1h ago</div></div>
<div class="act-item"><div class="act-dot" style="background:#22c55e"></div><div class="act-text">New review submitted</div><div class="act-time">2h ago</div></div>
</div>
</div>
</div>
</main>
<script>
const canvas=document.getElementById('chart'),ctx=canvas.getContext('2d');
const data=[3200,4100,3800,5200,4600,6100,5800];
const labels=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const max=Math.max(...data);
const pw=canvas.width,ph=canvas.height;
const pad={t:10,r:10,b:30,l:40};
const cw=pw-pad.l-pad.r,ch=ph-pad.t-pad.b;
const barW=cw/data.length*0.6,gap=cw/data.length;
ctx.fillStyle='#0d0d1a';ctx.fillRect(0,0,pw,ph);
ctx.strokeStyle='#1e1e3a';ctx.lineWidth=1;
for(let i=0;i<=4;i++){const y=pad.t+ch*(1-i/4);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pw-pad.r,y);ctx.stroke();ctx.fillStyle='#444';ctx.font='10px sans-serif';ctx.fillText('$'+(max*i/4/1000).toFixed(1)+'k',2,y+4);}
data.forEach((v,i)=>{const x=pad.l+i*gap+(gap-barW)/2;const bh=ch*(v/max);const y=pad.t+ch-bh;const g=ctx.createLinearGradient(0,y,0,y+bh);g.addColorStop(0,'#a855f7');g.addColorStop(1,'#7c3aed80');ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(x,y,barW,bh,4);ctx.fill();ctx.fillStyle='#666';ctx.font='10px sans-serif';ctx.fillText(labels[i],x+barW/2-8,ph-8);});
<\/script></body></html>`;

// ── Response Engine ────────────────────────────────────────────────────────
function getApeResponse(input: string): ApeResponse {
  const low = input.toLowerCase();

  // Greetings
  if (
    low.match(
      /^(hello|hi|hey|yo|sup|ape|who are you|what are you|namaste|হ্যালো|হাই)/,
    )
  )
    return {
      text: "👾 Hey! I'm **APE AI** — your Build-Anything AI assistant!\n\nI can create fully functional apps, games, tools, websites and more — all running live right here in the chat.\n\n**What I can build:**\n🎮 **Games** — Snake, Pong, Breakout, Tetris, Memory, Tic-Tac-Toe\n🌐 **Websites** — Landing pages, Portfolios, Dashboards\n🛠 **Tools** — Calculator, Todo app, Timer, Password generator\n💻 **Apps** — Any web app you can imagine!\n\nJust describe what you want and I'll build it! 🚀",
    };

  // Capabilities
  if (
    low.match(/what can you|capabilities|features|what do you|কি করতে|কী করতে/)
  )
    return {
      text: "🤖 **APE AI — Full Capabilities**\n\n**🎮 Games**\n• Snake, Pong, Breakout, Tetris\n• Tic-Tac-Toe (vs CPU), Memory Match\n• Platformer, Quiz game, Flappy Bird\n• Number guessing, Word games\n\n**🌐 Web Apps & Sites**\n• Landing pages, Portfolio sites\n• Dashboards with charts\n• Calculator, Todo list, Timer\n• Password generator, Color tools\n• Markdown editors, Forms\n\n**💻 Code Generation**\n• HTML/CSS/JavaScript\n• React components\n• Game engines\n• API integrations\n\n**🧠 Code Review**\n• Paste any code for analysis\n• Performance suggestions\n• Bug detection\n• Refactoring tips\n\nTry the quick prompts below or describe anything you want to build! 🚀",
    };

  // Ideas
  if (low.match(/idea|suggest|inspire|what should i|কি বানাবো/))
    return {
      text: "💡 **App Ideas to Build Today:**\n\n1. 🎵 **Music Visualizer** — Mic input creates dancing bars of color\n2. 🌦 **Weather Dashboard** — Beautiful cards with animated icons\n3. 🎨 **Drawing Canvas** — Paint app with brushes and colors\n4. 📖 **Flashcard Study App** — Create and flip study cards\n5. 🏋️ **Workout Timer** — HIIT interval timer with sound alerts\n6. 🍕 **Menu Builder** — Drag-and-drop menu for restaurants\n7. 🔢 **Math Quiz** — Timed arithmetic challenges\n8. 📝 **Note Taking App** — Sticky notes with colors\n\nSay any of these to build it! Or describe your own idea. 🎯",
    };

  // Snake
  if (low.match(/snake|saanp|সাপ/))
    return {
      text: "🐍 **Snake Game** — Arrow keys to play. Eat cyan food to grow!\n\n**Features:** Canvas rendering, collision detection, score tracking, auto-restart.",
      code: SNAKE_HTML,
      language: "html",
      demoType: "snake",
    };

  // Pong
  if (low.includes("pong"))
    return {
      text: "🏓 **Pong** — 2-player arcade classic!\n\n**Player 1:** W/S keys | **Player 2:** ↑↓ Arrow keys\n\n**Features:** Ball physics, speed increase, score tracking.",
      code: PONG_HTML,
      language: "html",
      demoType: "pong",
    };

  // Breakout
  if (low.match(/breakout|arkanoid|brick/))
    return {
      text: "🧱 **Breakout** — ←/→ Arrow keys to move paddle.\n\n**Features:** 40 colorful bricks, 3 lives, score tracking, speed increase.",
      code: BREAKOUT_HTML,
      language: "html",
      demoType: "breakout",
    };

  // Calculator
  if (low.match(/calculator|calc|calcu|ক্যালকুলেটর/))
    return {
      text: "🧮 **Calculator** — Fully functional with keyboard support!\n\n**Features:** All operations, percentage, sign toggle, expression history, keyboard shortcuts (0-9, operators, Enter=equals, Esc=clear).",
      code: CALCULATOR_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Todo
  if (low.match(/todo|to-do|to do|task list|টাস্ক/))
    return {
      text: "✅ **Todo List App** — Clean and functional task manager!\n\n**Features:** Add/complete/delete tasks, filter (All/Active/Done), task counter, smooth animations.",
      code: TODO_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Timer
  if (low.match(/timer|stopwatch|clock|countdown|ঘড়ি/))
    return {
      text: "⏱ **Timer + Stopwatch** — Dual-mode time tracker!\n\n**Features:**\n• Stopwatch with lap recording\n• Countdown timer (set any seconds)\n• Pause/Resume/Reset controls",
      code: TIMER_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Landing page
  if (low.match(/landing|landing page|website|homepage|home page|ল্যান্ডিং/))
    return {
      text: "🌐 **Landing Page Template** — Professional product landing page!\n\n**Sections:** Navigation, Hero with CTA, 6-feature grid, Footer.\n\nCustomize the brand name, headline, and feature cards for your product.",
      code: LANDING_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Portfolio
  if (low.match(/portfolio|resume|cv|personal site|পোর্টফোলিও/))
    return {
      text: "👤 **Developer Portfolio** — Stunning personal portfolio page!\n\n**Sections:** Hero with CTA, Skills with progress bars, 4-project grid with tech tags.\n\nReplace the placeholder content with your own info!",
      code: PORTFOLIO_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Password Generator
  if (low.match(/password|passgen|পাসওয়ার্ড/))
    return {
      text: "🔐 **Password Generator** — Secure passwords with one click!\n\n**Features:** Adjustable length (6-32), toggle uppercase/lowercase/numbers/symbols, strength meter, one-click copy.",
      code: PASSWORD_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Tic-Tac-Toe
  if (low.match(/tic.tac.toe|tictactoe|noughts|টিক্ট্যাক/))
    return {
      text: "✕ **Tic-Tac-Toe** — Play vs CPU or a friend!\n\n**Features:** Smart CPU opponent (blocks your wins!), score tracking, toggle vs CPU mode.",
      code: TICTACTOE_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Memory Match
  if (low.match(/memory|match|card.flip|মেমোরি/))
    return {
      text: "🧠 **Memory Match** — Classic card-flipping memory game!\n\n**Features:** 16 cards (8 emoji pairs), move counter, match counter, win detection, randomized each game.",
      code: MEMORY_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Dashboard
  if (low.match(/dashboard|analytics|admin|panel|ড্যাশবোর্ড/))
    return {
      text: "📊 **Analytics Dashboard** — Professional admin panel UI!\n\n**Features:** Sidebar navigation, 4 stat cards, bar chart (Canvas), recent activity feed.\n\nPerfect as a starter for any admin panel.",
      code: DASHBOARD_HTML,
      language: "html",
      demoType: "iframe",
    };

  // Quiz game
  if (low.match(/quiz|trivia|mcq/))
    return {
      text: "📝 **Quiz Game** — 5-question game dev trivia with score tracking!",
      code: `<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a0a1a,#1a0a2e);color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;}.quiz{max-width:500px;width:90%;background:#1a1a2e;border:1px solid #a855f7;border-radius:16px;padding:30px;box-shadow:0 0 30px rgba(168,85,247,0.3);}h2{color:#a855f7;margin-bottom:20px;font-size:1.4rem;}.q{font-size:1.05rem;margin-bottom:20px;line-height:1.5;}.opts{display:flex;flex-direction:column;gap:10px;}button{padding:12px;background:#1e1e3a;border:1px solid #333;border-radius:8px;color:#fff;cursor:pointer;text-align:left;transition:all 0.2s;}button:hover{background:#a855f7;border-color:#a855f7;}.correct{background:#16a34a!important;border-color:#16a34a!important;}.wrong{background:#dc2626!important;border-color:#dc2626!important;}.score{color:#06b6d4;font-size:1.2rem;margin-top:20px;text-align:center;}.next{margin-top:15px;width:100%;background:#a855f7;border:none;padding:12px;border-radius:8px;color:#fff;cursor:pointer;font-size:1rem;font-weight:bold;}</style></head><body><div class="quiz"><h2>🎮 Game Dev Quiz</h2><div class="q" id="q"></div><div class="opts" id="opts"></div><div class="score" id="sc" style="display:none"></div><button class="next" id="nx" style="display:none" onclick="next()">Next →</button></div><script>const qs=[{q:"What does FPS stand for?",a:"Frames Per Second",o:["Frames Per Second","Fast Processing Speed","Full Play System","Frame Position Set"]},{q:"Which is best for game animation?",a:"requestAnimationFrame",o:["setInterval","requestAnimationFrame","setTimeout","while(true)"]},{q:"What is a sprite?",a:"A 2D image used in games",o:["A 3D model","A 2D image used in games","A sound effect","A level design"]},{q:"What does 'hitbox' mean?",a:"Collision area of an object",o:["A boxing mechanic","Collision area of an object","A weapon zone","A level boundary"]},{q:"HTML element for 2D game graphics?",a:"canvas",o:["div","svg","canvas","game"]}];let cur=0,score=0,ans=false;function showQ(){ans=false;document.getElementById('nx').style.display='none';if(cur>=qs.length){document.getElementById('q').textContent='Done!';document.getElementById('opts').innerHTML='';document.getElementById('sc').style.display='block';document.getElementById('sc').textContent='🎉 Score: '+score+'/'+qs.length;return;}const q=qs[cur];document.getElementById('q').textContent=(cur+1)+'. '+q.q;document.getElementById('opts').innerHTML='';[...q.o].sort(()=>Math.random()-0.5).forEach(opt=>{const b=document.createElement('button');b.textContent=opt;b.onclick=()=>{if(ans)return;ans=true;document.querySelectorAll('.opts button').forEach(x=>{if(x.textContent===q.a)x.classList.add('correct');});if(opt===q.a)score++;else b.classList.add('wrong');document.getElementById('nx').style.display='block';};document.getElementById('opts').appendChild(b);});}function next(){cur++;showQ();}showQ();<\/script></body></html>`,
      language: "html",
      demoType: "iframe",
    };

  // Platformer
  if (low.match(/platformer|platform|jump|mario|side.scroll/))
    return {
      text: "🏃 **Platformer** — Arrow keys to move, Space/Up to jump!\n\n**Features:** Physics with gravity, platform collision, smooth movement.",
      code: `<!DOCTYPE html><html><head><style>body{background:#0a0a1a;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}canvas{border:2px solid #a855f7;border-radius:8px;}</style></head><body><canvas id="c" width="500" height="300"></canvas><script>const c=document.getElementById('c'),ctx=c.getContext('2d');const p={x:50,y:220,w:28,h:36,vx:0,vy:0,ground:false};const plats=[{x:0,y:270,w:500,h:30},{x:100,y:210,w:100,h:12},{x:280,y:150,w:100,h:12},{x:380,y:90,w:120,h:12}];const keys={};document.addEventListener('keydown',e=>keys[e.key]=true);document.addEventListener('keyup',e=>keys[e.key]=false);function loop(){if(keys['ArrowLeft'])p.vx=-4;else if(keys['ArrowRight'])p.vx=4;else p.vx*=0.8;if((keys['ArrowUp']||keys[' '])&&p.ground){p.vy=-11;p.ground=false;}p.vy+=0.5;p.x+=p.vx;p.y+=p.vy;p.ground=false;plats.forEach(pl=>{if(p.x<pl.x+pl.w&&p.x+p.w>pl.x&&p.y+p.h>pl.y&&p.y+p.h<pl.y+pl.h+12&&p.vy>0){p.y=pl.y-p.h;p.vy=0;p.ground=true;}});if(p.x<0)p.x=0;if(p.x>500-p.w)p.x=500-p.w;if(p.y>300){p.y=220;p.vy=0;}ctx.fillStyle='#0a0a1a';ctx.fillRect(0,0,500,300);plats.forEach(pl=>{const g=ctx.createLinearGradient(0,pl.y,0,pl.y+pl.h);g.addColorStop(0,'#a855f7');g.addColorStop(1,'#7c3aed');ctx.fillStyle=g;ctx.fillRect(pl.x,pl.y,pl.w,pl.h);});ctx.fillStyle='#06b6d4';ctx.shadowColor='#06b6d4';ctx.shadowBlur=15;ctx.fillRect(p.x,p.y,p.w,p.h);ctx.shadowBlur=0;ctx.fillStyle='#666';ctx.font='10px monospace';ctx.fillText('← → move  Space/↑ jump',10,295);requestAnimationFrame(loop);}loop();<\/script></body></html>`,
      language: "html",
      demoType: "iframe",
    };

  // Code review (detect pasted code)
  if (
    low.match(/function|const |var |let |def |class |<html|import /) &&
    input.length > 40
  )
    return {
      text: "🔍 **APE AI Code Review**\n\nAnalyzing your code...\n\n**✅ Strengths:**\n• Code structure is readable\n• Logic flow is clear\n\n**💡 Improvements:**\n• Add error handling (try/catch)\n• Use const over var where possible\n• Break large functions into smaller ones\n• Add descriptive comments\n\n**🚀 Performance Tips:**\n• Avoid creating objects inside loops\n• Cache DOM lookups outside loops\n• Use requestAnimationFrame for animations\n• Debounce expensive event handlers\n\nShare more code for a deeper review! 🎮",
    };

  // How to / learn
  if (low.match(/how to|how do|learn|tutorial|guide|শেখাও|শেখো/))
    return {
      text: "📚 **Quick Start: Build Your First Web App**\n\nHere's a working starter template with all the basics:",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #0a0a1a;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      padding: 40px 20px;
    }
    h1 { color: #a855f7; margin-bottom: 20px; }
    .card {
      background: #1a1a2e;
      border: 1px solid #a855f740;
      border-radius: 12px;
      padding: 24px;
      max-width: 400px;
      width: 100%;
    }
    button {
      background: #a855f7;
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      margin-top: 16px;
      width: 100%;
    }
    button:hover { background: #9333ea; }
    #output { margin-top: 16px; color: #06b6d4; }
  </style>
</head>
<body>
  <h1>🚀 My First App</h1>
  <div class="card">
    <p>Click the button to see magic happen!</p>
    <button onclick="doSomething()">✨ Click Me!</button>
    <div id="output"></div>
  </div>
  <script>
    let count = 0;
    function doSomething() {
      count++;
      document.getElementById('output').textContent =
        '🎉 You clicked ' + count + ' time' + (count !== 1 ? 's' : '') + '!';
    }
  <\/script>
</body>
</html>`,
      language: "html",
      demoType: "iframe",
    };

  // Default
  return {
    text: `🤖 **APE AI** — Build Anything AI\n\nI can create all of this:\n\n🎮 **Games:** Snake · Pong · Breakout · Tic-Tac-Toe · Memory Match · Platformer · Quiz\n🌐 **Websites:** Landing Page · Portfolio · Dashboard\n🛠 **Tools:** Calculator · Todo App · Timer · Password Generator\n💡 **Ideas:** Say "give me app ideas" for inspiration\n🔍 **Review:** Paste any code for analysis\n\nJust tell me what to build! 🚀`,
  };
}

// ── Canvas Demos (inline React) ─────────────────────────────────────────────

function SnakeDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const GRID = 15;
    const SIZE = 20;
    let snake = [{ x: 7, y: 7 }];
    let dir = { x: 1, y: 0 };
    let food = { x: 12, y: 5 };
    let score = 0;
    let running = true;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && dir.y !== 1) dir = { x: 0, y: -1 };
      if (e.key === "ArrowDown" && dir.y !== -1) dir = { x: 0, y: 1 };
      if (e.key === "ArrowLeft" && dir.x !== 1) dir = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && dir.x !== -1) dir = { x: 1, y: 0 };
    };
    window.addEventListener("keydown", onKey);
    const loop = setInterval(() => {
      if (!running) return;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (
        head.x < 0 ||
        head.x >= GRID ||
        head.y < 0 ||
        head.y >= GRID ||
        snake.some((s) => s.x === head.x && s.y === head.y)
      ) {
        snake = [{ x: 7, y: 7 }];
        dir = { x: 1, y: 0 };
        score = 0;
      } else {
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          score++;
          food = {
            x: Math.floor(Math.random() * GRID),
            y: Math.floor(Math.random() * GRID),
          };
        } else snake.pop();
      }
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, 300, 300);
      ctx.fillStyle = "#06b6d4";
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 10;
      ctx.fillRect(food.x * SIZE, food.y * SIZE, SIZE - 2, SIZE - 2);
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#a855f7" : "#7c3aed";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = i === 0 ? 15 : 4;
        ctx.fillRect(s.x * SIZE, s.y * SIZE, SIZE - 2, SIZE - 2);
      });
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff";
      ctx.font = "11px monospace";
      ctx.fillText(`Score: ${score}`, 5, 295);
    }, 150);
    return () => {
      running = false;
      clearInterval(loop);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{
        border: "2px solid oklch(0.72 0.22 295)",
        boxShadow: "0 0 20px oklch(0.72 0.22 295 / 0.6)",
        borderRadius: "8px",
      }}
    />
  );
}

function PongDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let p1 = { y: 90, s: 0 };
    let p2 = { y: 90, s: 0 };
    let ball = { x: 200, y: 115, vx: 3, vy: 2 };
    const keys: Record<string, boolean> = {};
    let running = true;
    window.addEventListener("keydown", (e) => {
      keys[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });
    const loop = setInterval(() => {
      if (!running) return;
      if (keys.w && p1.y > 0) p1.y -= 4;
      if (keys.s && p1.y < 180) p1.y += 4;
      if (keys.ArrowUp && p2.y > 0) p2.y -= 4;
      if (keys.ArrowDown && p2.y < 180) p2.y += 4;
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.y < 7 || ball.y > 223) ball.vy *= -1;
      if (ball.x < 22 && ball.y > p1.y && ball.y < p1.y + 50)
        ball.vx = Math.abs(ball.vx) * 1.05;
      if (ball.x > 378 && ball.y > p2.y && ball.y < p2.y + 50)
        ball.vx = -Math.abs(ball.vx) * 1.05;
      if (ball.x < 0) {
        p2.s++;
        ball = { x: 200, y: 115, vx: 3, vy: 2 };
      }
      if (ball.x > 400) {
        p1.s++;
        ball = { x: 200, y: 115, vx: -3, vy: 2 };
      }
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, 400, 230);
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "#333";
      ctx.beginPath();
      ctx.moveTo(200, 0);
      ctx.lineTo(200, 230);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#a855f7";
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 8;
      ctx.fillRect(10, p1.y, 8, 50);
      ctx.fillRect(382, p2.y, 8, 50);
      ctx.fillStyle = "#06b6d4";
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff";
      ctx.font = "18px monospace";
      ctx.fillText(`${p1.s}`, 175, 22);
      ctx.fillText(`${p2.s}`, 215, 22);
    }, 16);
    return () => {
      running = false;
      clearInterval(loop);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={230}
      style={{
        border: "2px solid oklch(0.72 0.22 295)",
        boxShadow: "0 0 20px oklch(0.72 0.22 295 / 0.6)",
        borderRadius: "8px",
      }}
    />
  );
}

function BreakoutDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const COLS = 8;
    const ROWS = 5;
    const BW = 40;
    const BH = 16;
    let paddle = { x: 140 };
    let ball = { x: 180, y: 200, vx: 2.5, vy: -3 };
    const colors = ["#a855f7", "#7c3aed", "#06b6d4", "#0891b2", "#22d3ee"];
    let bricks = Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, (_, c2) => ({
        x: c2 * (BW + 4) + 4,
        y: r * (BH + 4) + 28,
        alive: true,
        color: colors[r],
      })),
    ).flat();
    let score = 0;
    let lives = 3;
    const keys: Record<string, boolean> = {};
    let running = true;
    window.addEventListener("keydown", (e) => {
      keys[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });
    const loop = setInterval(() => {
      if (!running) return;
      if (keys.ArrowLeft && paddle.x > 0) paddle.x -= 5;
      if (keys.ArrowRight && paddle.x < 296) paddle.x += 5;
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x < 7 || ball.x > 353) ball.vx *= -1;
      if (ball.y < 7) ball.vy *= -1;
      if (ball.y > 248) {
        lives--;
        ball = { x: 180, y: 200, vx: 2.5, vy: -3 };
        if (lives <= 0) {
          bricks = bricks.map((b) => ({ ...b, alive: true }));
          lives = 3;
          score = 0;
        }
      }
      if (ball.y > 232 && ball.x > paddle.x && ball.x < paddle.x + 64)
        ball.vy *= -1;
      for (const b of bricks) {
        if (!b.alive) continue;
        if (
          ball.x > b.x &&
          ball.x < b.x + BW &&
          ball.y > b.y &&
          ball.y < b.y + BH
        ) {
          b.alive = false;
          ball.vy *= -1;
          score += 10;
        }
      }
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, 360, 260);
      for (const b of bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 6;
        ctx.fillRect(b.x, b.y, BW, BH);
      }
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#a855f7";
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 8;
      ctx.fillRect(paddle.x, 244, 64, 8);
      ctx.fillStyle = "#06b6d4";
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff";
      ctx.font = "11px monospace";
      ctx.fillText(`Score:${score}`, 5, 18);
      ctx.fillText(`Lives:${lives}`, 300, 18);
    }, 16);
    return () => {
      running = false;
      clearInterval(loop);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={260}
      style={{
        border: "2px solid oklch(0.72 0.22 295)",
        boxShadow: "0 0 20px oklch(0.72 0.22 295 / 0.6)",
        borderRadius: "8px",
      }}
    />
  );
}

// ── Code Block ───────────────────────────────────────────────────────────────
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        marginTop: "12px",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid oklch(0.72 0.22 295 / 0.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 12px",
          background: "oklch(0.18 0.05 295)",
          borderBottom: "1px solid oklch(0.72 0.22 295 / 0.3)",
        }}
      >
        <span
          style={{
            color: "oklch(0.72 0.22 295)",
            fontSize: "11px",
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
        >
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(code).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          style={{
            background: copied
              ? "oklch(0.55 0.18 145 / 0.3)"
              : "oklch(0.72 0.22 295 / 0.2)",
            border: "1px solid oklch(0.72 0.22 295 / 0.4)",
            borderRadius: "4px",
            color: copied ? "oklch(0.72 0.22 145)" : "oklch(0.72 0.22 295)",
            padding: "3px 10px",
            fontSize: "11px",
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre
        style={{
          background: "oklch(0.10 0.04 295)",
          margin: 0,
          padding: "14px",
          overflowX: "auto",
          color: "oklch(0.78 0.15 165)",
          fontSize: "12px",
          fontFamily: "'JetBrains Mono','Courier New',monospace",
          lineHeight: 1.6,
          maxHeight: "280px",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Typing Dots ───────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        padding: "6px 0",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "oklch(0.72 0.22 295)",
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            boxShadow: "0 0 6px oklch(0.72 0.22 295)",
          }}
        />
      ))}
    </div>
  );
}

// ── Formatted Text ────────────────────────────────────────────────────────────
function FormattedText({ text }: { text: string }) {
  return (
    <div style={{ lineHeight: 1.7 }}>
      {text.split("\n").map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static text rendering
          <div key={i} style={{ marginBottom: line === "" ? "6px" : "2px" }}>
            {parts.map((p, j) =>
              p.startsWith("**") && p.endsWith("**") ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: static text rendering
                <strong key={j} style={{ color: "oklch(0.82 0.22 295)" }}>
                  {p.slice(2, -2)}
                </strong>
              ) : (
                // biome-ignore lint/suspicious/noArrayIndexKey: static text rendering
                <span key={j}>{p}</span>
              ),
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Quick Prompts ─────────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  "Make a Snake game",
  "Build a Calculator",
  "Todo List App",
  "Build Pong",
  "Landing Page",
  "Create Breakout",
  "Timer / Clock",
  "Password Generator",
  "Tic-Tac-Toe",
  "Portfolio Page",
  "Memory Match Game",
  "Analytics Dashboard",
];

const WELCOME_MSG =
  "👾 Hey! I'm **APE AI** — your Build-Anything AI!\n\nI can create fully functional apps, games, tools and websites that run live right here in the chat.\n\n**What I build:**\n🎮 Games — Snake, Pong, Breakout, Tic-Tac-Toe, Memory Match, Platformer\n🌐 Websites — Landing pages, Portfolios, Dashboards\n🛠 Tools — Calculator, Todo, Timer, Password Generator\n💡 Ideas — Ask me for app inspiration\n🔍 Reviews — Paste code for analysis\n\nTry the quick prompts below or describe anything! 🚀";

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ApeAi() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "ai", text: WELCOME_MSG },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgId = useRef(1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages((prev) => [
      ...prev,
      { id: msgId.current++, role: "user", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);
    setTimeout(
      () => {
        const resp = getApeResponse(trimmed);
        setMessages((prev) => [
          ...prev,
          { id: msgId.current++, role: "ai", ...resp },
        ]);
        setIsTyping(false);
      },
      800 + Math.random() * 600,
    );
  };

  const resetChat = () => {
    setMessages([{ id: msgId.current++, role: "ai", text: WELCOME_MSG }]);
    setInput("");
    setIsTyping(false);
  };

  return (
    <div
      data-ocid="apeai.page"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, oklch(0.07 0.04 295) 0%, oklch(0.10 0.05 265) 50%, oklch(0.08 0.06 285) 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <style>{`
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0);opacity:0.5;} 30%{transform:translateY(-8px);opacity:1;} }
        @keyframes apeGlow { 0%,100%{box-shadow:0 0 20px oklch(0.72 0.22 295/0.3);} 50%{box-shadow:0 0 40px oklch(0.72 0.22 295/0.6),0 0 80px oklch(0.72 0.22 295/0.2);} }
        .ape-chip:hover{background:oklch(0.72 0.22 295/0.25)!important;border-color:oklch(0.72 0.22 295/0.8)!important;}
        .ape-send:hover{background:oklch(0.60 0.25 295)!important;}
        ::-webkit-scrollbar{width:6px;} ::-webkit-scrollbar-track{background:oklch(0.10 0.04 295);} ::-webkit-scrollbar-thumb{background:oklch(0.72 0.22 295/0.4);border-radius:3px;}
      `}</style>

      {/* Header */}
      <header
        style={{
          background: "oklch(0.10 0.05 295 / 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.72 0.22 295 / 0.3)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          animation: "apeGlow 3s ease-in-out infinite",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <img
          src="/assets/generated/ape-ai-logo-transparent.dim_200x200.png"
          alt="APE AI"
          style={{
            width: "48px",
            height: "48px",
            objectFit: "contain",
            filter: "drop-shadow(0 0 12px oklch(0.72 0.22 295))",
          }}
        />
        <div>
          <h1
            style={{
              color: "oklch(0.82 0.22 295)",
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            APE <span style={{ color: "oklch(0.72 0.25 200)" }}>AI</span>
          </h1>
          <p
            style={{
              color: "oklch(0.60 0.10 295)",
              fontSize: "0.75rem",
              margin: 0,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Build Anything AI
          </p>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            type="button"
            onClick={resetChat}
            style={{
              background: "oklch(0.72 0.22 295 / 0.15)",
              border: "1px solid oklch(0.72 0.22 295 / 0.4)",
              borderRadius: "8px",
              color: "oklch(0.72 0.22 295)",
              padding: "6px 14px",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            + New Chat
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "oklch(0.65 0.22 145)",
                boxShadow: "0 0 8px oklch(0.65 0.22 145)",
              }}
            />
            <span
              style={{
                color: "oklch(0.65 0.22 145)",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            {msg.role === "ai" && (
              <img
                src="/assets/generated/ape-ai-logo-transparent.dim_200x200.png"
                alt="APE AI"
                style={{
                  width: "32px",
                  height: "32px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 6px oklch(0.72 0.22 295))",
                  flexShrink: 0,
                  marginTop: "4px",
                }}
              />
            )}
            <div
              style={{
                maxWidth:
                  msg.demoType === "iframe"
                    ? "720px"
                    : msg.demoType
                      ? "480px"
                      : "72%",
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, oklch(0.42 0.24 295), oklch(0.52 0.25 280))"
                    : "oklch(0.12 0.04 295)",
                border:
                  msg.role === "ai"
                    ? "1px solid oklch(0.72 0.22 295 / 0.35)"
                    : "none",
                borderRadius:
                  msg.role === "user"
                    ? "20px 20px 4px 20px"
                    : "4px 20px 20px 20px",
                padding: "14px 18px",
                boxShadow:
                  msg.role === "ai"
                    ? "0 0 20px oklch(0.72 0.22 295 / 0.15)"
                    : "0 4px 16px oklch(0.42 0.24 295 / 0.4)",
                color: "oklch(0.92 0.04 295)",
                fontSize: "0.88rem",
              }}
            >
              <FormattedText text={msg.text} />
              {msg.demoType === "iframe" && msg.code && (
                <div style={{ marginTop: "14px" }}>
                  <p
                    style={{
                      color: "oklch(0.72 0.22 295)",
                      fontSize: "11px",
                      marginBottom: "8px",
                      fontWeight: 600,
                    }}
                  >
                    ▶ LIVE DEMO
                  </p>
                  <iframe
                    title="APE AI Live Demo"
                    srcDoc={msg.code}
                    sandbox="allow-scripts"
                    style={{
                      width: "100%",
                      height: "420px",
                      border: "2px solid oklch(0.72 0.22 295 / 0.5)",
                      borderRadius: "10px",
                      background: "#000",
                    }}
                  />
                  <CodeBlock code={msg.code} language={msg.language} />
                </div>
              )}
              {!msg.demoType && msg.code && (
                <CodeBlock code={msg.code} language={msg.language} />
              )}
              {msg.demoType === "snake" && (
                <div style={{ marginTop: "14px" }}>
                  <p
                    style={{
                      color: "oklch(0.72 0.22 295)",
                      fontSize: "11px",
                      marginBottom: "8px",
                      fontWeight: 600,
                    }}
                  >
                    ▶ LIVE DEMO — Arrow keys to play
                  </p>
                  <SnakeDemo />
                </div>
              )}
              {msg.demoType === "pong" && (
                <div style={{ marginTop: "14px" }}>
                  <p
                    style={{
                      color: "oklch(0.72 0.22 295)",
                      fontSize: "11px",
                      marginBottom: "8px",
                      fontWeight: 600,
                    }}
                  >
                    ▶ LIVE DEMO — W/S and ↑↓ keys
                  </p>
                  <PongDemo />
                </div>
              )}
              {msg.demoType === "breakout" && (
                <div style={{ marginTop: "14px" }}>
                  <p
                    style={{
                      color: "oklch(0.72 0.22 295)",
                      fontSize: "11px",
                      marginBottom: "8px",
                      fontWeight: 600,
                    }}
                  >
                    ▶ LIVE DEMO — ←/→ keys
                  </p>
                  <BreakoutDemo />
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            data-ocid="apeai.loading_state"
          >
            <img
              src="/assets/generated/ape-ai-logo-transparent.dim_200x200.png"
              alt="APE AI thinking"
              style={{
                width: "32px",
                height: "32px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 6px oklch(0.72 0.22 295))",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                background: "oklch(0.12 0.04 295)",
                border: "1px solid oklch(0.72 0.22 295 / 0.35)",
                borderRadius: "4px 20px 20px 20px",
                padding: "14px 18px",
              }}
            >
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <div
        style={{
          background: "oklch(0.10 0.05 295 / 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid oklch(0.72 0.22 295 / 0.25)",
          padding: "16px 20px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              data-ocid="apeai.toggle"
              className="ape-chip"
              onClick={() => sendMessage(prompt)}
              disabled={isTyping}
              style={{
                background: "oklch(0.72 0.22 295 / 0.12)",
                border: "1px solid oklch(0.72 0.22 295 / 0.4)",
                borderRadius: "20px",
                color: "oklch(0.72 0.22 295)",
                padding: "5px 14px",
                fontSize: "0.78rem",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.15s ease",
                opacity: isTyping ? 0.4 : 1,
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <textarea
            data-ocid="apeai.textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Describe anything to build — apps, games, tools, websites..."
            rows={2}
            style={{
              flex: 1,
              background: "oklch(0.14 0.05 295)",
              border: "1px solid oklch(0.72 0.22 295 / 0.35)",
              borderRadius: "12px",
              color: "oklch(0.92 0.04 295)",
              padding: "12px 16px",
              fontSize: "0.88rem",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              lineHeight: 1.5,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "oklch(0.72 0.22 295 / 0.7)";
              e.target.style.boxShadow = "0 0 16px oklch(0.72 0.22 295 / 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "oklch(0.72 0.22 295 / 0.35)";
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            type="button"
            data-ocid="apeai.submit_button"
            className="ape-send"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            style={{
              background: "oklch(0.52 0.25 295)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              padding: "12px 20px",
              fontSize: "1.2rem",
              cursor: !input.trim() || isTyping ? "not-allowed" : "pointer",
              opacity: !input.trim() || isTyping ? 0.4 : 1,
              transition: "all 0.15s ease",
              boxShadow: "0 0 16px oklch(0.52 0.25 295 / 0.4)",
              flexShrink: 0,
            }}
          >
            🚀
          </button>
        </div>
        <p
          style={{
            color: "oklch(0.45 0.08 295)",
            fontSize: "0.72rem",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          Enter to send · Shift+Enter for newline · Try the quick prompts above
        </p>
      </div>
    </div>
  );
}
