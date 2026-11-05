const W=1920,H=1080,TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
const out=v=>1-Math.pow(1-clamp(v),3);
function glow(c,x,y,r,color,a){c.save();c.globalAlpha=a;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.restore()}
function label(c,s,x,y,size,color='#fff',alpha=1,spacing=0,align='center'){
 c.save();c.globalAlpha=alpha;c.fillStyle=color;c.font=`900 ${size}px Arial,Helvetica,sans-serif`;c.textAlign=align;c.textBaseline='middle';
 if(!spacing)c.fillText(s,x,y);else{let xx=x-(c.measureText(s).width+(s.length-1)*spacing)/2;for(const ch of s){c.fillText(ch,xx,y);xx+=c.measureText(ch).width+spacing}}
 c.restore();
}
function stroke(c,x1,y1,x2,y2,color,w=2,a=1){c.save();c.globalAlpha=a;c.strokeStyle=color;c.lineWidth=w;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.restore()}
function bg(c,t,variant){
 const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'#071a31');g.addColorStop(.48,'#07111f');g.addColorStop(1,'#02050c');c.fillStyle=g;c.fillRect(0,0,W,H);
 glow(c,960,520,710,'#037cb6',.20);glow(c,variant===1?420:1450,260,460,'#0c4fa0',.13);glow(c,1450,820,450,'#00b4d6',.07);
 for(let i=0;i<50;i++){const y=(i*31+t*(120+(i%4)*65))%1220-70,x=((i*197+t*(160+(i%5)*35))%2450)-250;stroke(c,x,y,x-90-(i%5)*37,y+5,'#46d9ff',1,.035+(i%3)*.018)}
 for(let i=0;i<100;i++){let x=(i*127+Math.floor(t*21)*53)%W,y=(i*311+Math.floor(t*17)*71)%H;c.fillStyle=`rgba(180,225,255,${(i%4+1)*.009})`;c.fillRect(x,y,2,2)}
}
function bolt(c,x,y,scale,alpha=1){c.save();c.translate(x,y);c.scale(scale,scale);c.globalAlpha=alpha;const p=[[-6,-170],[70,-55],[20,-47],[86,53],[-39,166],[-7,43],[-64,52],[-8,-47],[-57,-40]];c.beginPath();p.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b));c.closePath();c.shadowColor='#5ceaff';c.shadowBlur=44;c.fillStyle='#c1f6ff';c.fill();c.shadowBlur=0;c.strokeStyle='#fff';c.lineWidth=4;c.stroke();c.restore()}
function can(c,x,y,scale,rot=0,alpha=1){
 c.save();c.translate(x,y);c.rotate(rot);c.scale(scale,scale);c.globalAlpha=alpha;
 const g=c.createLinearGradient(-110,0,110,0);g.addColorStop(0,'#540817');g.addColorStop(.16,'#ef3545');g.addColorStop(.39,'#c9162d');g.addColorStop(.68,'#760b1b');g.addColorStop(.9,'#dc2335');g.addColorStop(1,'#470714');
 c.beginPath();c.moveTo(-83,-220);c.quadraticCurveTo(-96,-201,-90,-168);c.lineTo(-105,-112);c.lineTo(-105,154);c.quadraticCurveTo(-105,204,-77,220);c.lineTo(77,220);c.quadraticCurveTo(105,204,105,154);c.lineTo(105,-112);c.lineTo(90,-168);c.quadraticCurveTo(96,-201,83,-220);c.closePath();c.fillStyle=g;c.fill();
 c.fillStyle='#b8c5d0';c.fillRect(-84,-228,168,19);c.fillRect(-97,195,194,15);c.fillStyle='#586673';c.fillRect(-84,-224,168,5);c.fillRect(-96,197,192,4);
 c.beginPath();c.ellipse(0,-220,81,11,0,0,TAU);c.fillStyle='#a2aeb9';c.fill();c.beginPath();c.ellipse(0,-222,55,6,0,0,TAU);c.fillStyle='#26303a';c.fill();
 const shine=c.createLinearGradient(-87,0,-35,0);shine.addColorStop(0,'rgba(255,255,255,0)');shine.addColorStop(.55,'rgba(255,220,225,.23)');shine.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=shine;c.fillRect(-88,-190,55,370);
 label(c,'Red Bull',0,-88,34);label(c,'ENERGY',0,-27,56,'#fff',1,3);label(c,'DRINK',0,30,25,'#fff',1,8);
 c.beginPath();c.arc(0,103,47,0,TAU);c.fillStyle='#ffd42b';c.fill();c.fillStyle='#bd1228';c.beginPath();c.ellipse(-18,105,25,11,-.3,0,TAU);c.fill();c.beginPath();c.ellipse(18,105,25,11,.3,0,TAU);c.fill();
 c.restore();
}
function vignette(c){const g=c.createRadialGradient(960,520,270,960,520,1050);g.addColorStop(0,'transparent');g.addColorStop(1,'rgba(0,0,0,.64)');c.fillStyle=g;c.fillRect(0,0,W,H)}
function impact(c,t){for(const beat of [.12,.75,1.5,2.25]){const d=t-beat;if(d>=0&&d<.55){const p=d/.55;c.save();c.globalAlpha=(1-p)*.28;c.strokeStyle='#4de2ff';c.lineWidth=2+(1-p)*3;c.beginPath();c.ellipse(960,540,140+p*620,(140+p*620)*.54,0,0,TAU);c.stroke();c.restore()}}}
export function frame(canvas,scene,t){
 const c=canvas.getContext('2d');t=clamp(t,0,3);bg(c,t,scene);
 const enter=out(t/.75),fade=1-smooth((t-2.62)/.38);
 if(scene===1){
   bolt(c,960,515,1.45-.18*enter,1-smooth((t-1.65)/.45));
   for(let i=0;i<10;i++){let a=t*1.8+i*TAU/10,r=300+Math.sin(t*5+i)*33,x=960+Math.cos(a)*r,y=530+Math.sin(a)*r*.62;glow(c,x,y,55,'#48eaff',.25);c.fillStyle='#c3f8ff';c.beginPath();c.arc(x,y,3+i%3,0,TAU);c.fill()}
   const p=out((t-.2)/1.0);can(c,960+720*(1-p),535,.72*p,-.32*(1-p),smooth(t/.28));
   label(c,'WHEN THE NIGHT',960,140,29,'#9ceaff',fade,8);label(c,'NEEDS A SPARK',960,198,56,'#fff',fade,4);
 }else if(scene===2){
   can(c,960,520,.89,.06*Math.sin(t*2),fade);
   for(let i=0;i<20;i++){let a=TAU*i/20+t*.42,ri=245,ro=460+Math.sin(t*6+i)*28;stroke(c,960+Math.cos(a)*ri,520+Math.sin(a)*ri*.62,960+Math.cos(a)*ro,520+Math.sin(a)*ro*.62,'#51e5ff',2,.12)}
   label(c,'BREAK THROUGH',960,156,31,'#9ceaff',smooth(t/.4)*fade,10);label(c,'THE ORDINARY',960,220,66,'#fff',smooth((t-.15)/.45)*fade,4);
   bolt(c,415,566,.65,.75*smooth(t/.4));
 }else if(scene===3){
   glow(c,960,518,480,'#16cfff',.25+.1*Math.sin(t*5));
   for(let i=0;i<28;i++){let a=TAU*i/28+t*.18,r=300+Math.sin(t*4+i)*35;stroke(c,960+Math.cos(a)*260,520+Math.sin(a)*150,960+Math.cos(a)*r,520+Math.sin(a)*r*.65,'#7beaff',2,.2)}
   can(c,960,550,.84,Math.sin(t*2)*.055,fade);
   label(c,'FIND YOUR',960,145,31,'#9ceaff',smooth(t/.35)*fade,10);label(c,'WIIINGS',960,205,77,'#fff',smooth((t-.12)/.4)*fade,10);
   bolt(c,1390,510,.58,.8*smooth(t/.35));
 }else{
   can(c,1340,535,.88,.02*Math.sin(t*2),fade);
   glow(c,1335,540,380,'#08b9e8',.18);
   const a=smooth(t/.5)*fade;
   label(c,'RED BULL',160,178,31,'#9ceaff',a,10,'left');
   stroke(c,160,225,770,225,'#56e4ff',2,a*.9);
   label(c,'GIVE WINGS',160,340,76,'#fff',a,1,'left');
   label(c,'TO YOUR WORLD.',160,430,49,'#fff',a,2,'left');
   label(c,'ENERGY THAT TAKES YOU FURTHER',160,516,21,'#9fcbe0',a*.85,4,'left');
   bolt(c,170,650,.53,a*.9);
   label(c,'OWN THE MOMENT',160,800,23,'#72dff8',a*.85,7,'left');
   stroke(c,160,851,740,851,'#56e4ff',1,a*.55);
 }
 impact(c,t);vignette(c);
}
