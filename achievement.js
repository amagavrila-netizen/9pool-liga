// ============================================
// 9 POOL LIGA - ACHIEVEMENTS SYSTEM FINAL
// ============================================


const klasemenURL =
"https://script.google.com/macros/s/AKfycbweEZmfiYZG9bOtKyQKar7bcW-Zv8sC75bvliYN7Eurq94veGujyNfWTxfCDvAfGn7Ndg/exec";


const pertandinganURL =
"https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS6WoVWincu7nBJyd9r01BsKoCQoa5MKvB8bkjvnuGygU0JZ8YrWT3L0s3Vuq38erG9Quxl2R3JVFNb-mxeshgDai_XAfZvaUl5k6j9mT45khcmhwgUh1DiUpPSv_lubHrEm0wqnYUlcYBuv8OU33AII-9EfnYdHR7YCZ1XfNKyAIdcSdagYVSmZNhA01HFFiXCFyv4M93ifUnykszCk5HWDtSk1prNwqFyd_uJ7xBR1lnizFiu0jvnsCmIk12jxrUpiQsu7-vsRHtvmqZx3GbCVGsXBQ&lib=MQ974VFXeXNHBp6rsCAsq0yJ67tG3SoUN";



Promise.all([

fetch(klasemenURL).then(r=>r.json()),

fetch(pertandinganURL).then(r=>r.json())

])

.then(([kelas,match])=>{


let players=parsePlayers(kelas);

let games=parseGames(match);


let achievements=[

king(players),

mvp(players),

perfect(players,games),

finisher(players),

giant(players,games),

iron(players),

middle(players),

bottom(players),

clutch(players,games),

hall(players)

];


render(achievements);


})

.catch(err=>{

console.log(err);

document.getElementById("achievement-list").innerHTML=
"<h3>Gagal memuat achievement</h3>";

});





// =========================
// PARSER
// =========================


function parsePlayers(data){

return data.slice(1)

.filter(x=>x[1])

.map(x=>({

rank:+x[0],

name:x[1],

played:+x[2],

win:+x[3],

lose:+x[4],

plus:+x[5],

minus:+x[6],

diff:+x[7],

point:+x[8]

}));

}



function parseGames(data){

return data.slice(1)

.filter(x=>x[2])

.map(x=>({

a:x[2],

sa:+x[3],

sb:+x[4],

b:x[5],

winner:x[6],

loser:x[7]

}));

}





// =========================
// GENERATOR
// =========================


function make(title,badge,desc,calc,data){


data=data
.filter(x=>x.name)
.slice(0,3);


if(data.length===0){

data=[
{
name:"Belum ada pemain",
score:0
}
];

}


return {

title,

badge,

desc,

calc,

players:data

};

}





// =========================
// 1 KING
// =========================


function king(p){


return make(

"🏆 King of The League",

"LEGEND",

"Penguasa liga dengan performa terbaik secara keseluruhan.",

"Poin(Frame) tertinggi.",


[...p].sort((a,b)=>b.point-a.point)

);


}







// =========================
// 2 MVP
// =========================


function mvp(p){


let data=p.map(x=>({

...x,

score:

x.point*0.4+

x.win*3+

(x.win/x.played)*20+

x.diff*0.2


}))


.sort((a,b)=>b.score-a.score);



return make(

"⭐ MVP",

"ELITE",

"Pemain paling lengkap yang menggabungkan kemenangan, konsistensi, dan kualitas permainan.",

"Point 40% + Menang 30% + Win Rate 20% + Selisih Frame 10%.",

data

);


}






// =========================
// 3 PERFECT DOMINATOR
// =========================


function perfect(p,g){


let obj={};


g.forEach(x=>{


let sel=Math.abs(x.sa-x.sb);


if(sel>=5){

obj[x.winner]=(obj[x.winner]||0)+sel;

}

});


let data=p.map(x=>({

...x,

score:obj[x.name]||0

}))


.sort((a,b)=>b.score-a.score);



return make(

"💥 Perfect Dominator",

"PERFECT GAME",

"Pemain yang mampu menghasilkan kemenangan telak dan menghancurkan perlawanan lawan.",

"Selisih kemenangan besar termasuk 9-0, 9-1, dan dominasi frame.",

data

);


}








// =========================
// 4 FINISHER
// =========================


function finisher(p){


return make(

"🎯 The Finisher",

"SHARPSHOOTER",

"Pemain yang paling efektif mengubah peluang menjadi kemenangan.",

"Jumlah kemenangan + selisih frame.",

[...p].map(x=>({

...x,

score:x.win*10+x.diff

}))

.sort((a,b)=>b.score-a.score)

);

}







// =========================
// 5 GIANT KILLER
// =========================


function giant(p,g){


let rank={};

p.forEach(x=>rank[x.name]=x.rank);


let score={};


g.forEach(x=>{


if(rank[x.winner] && rank[x.loser]){


let val=rank[x.loser]-rank[x.winner];


if(val>0)

score[x.winner]=(score[x.winner]||0)+val;

}

});



return make(

"🎲 Giant Killer",

"GIANT SLAYER",

"Pemain yang mampu menjatuhkan lawan dengan peringkat lebih tinggi.",

"Total ranking lawan kuat yang berhasil dikalahkan.",

p.map(x=>({

...x,

score:score[x.name]||0

}))

.sort((a,b)=>b.score-a.score)

);


}







// =========================
// 6 IRON
// =========================


function iron(p){


return make(

"🧱 Iron Defense",

"UNBREAKABLE",

"Pemain dengan pertahanan terbaik dan sulit ditembus.",

"Main dibanding frame yang hilang.",

p.map(x=>({

...x,

score:x.played*100/(x.minus||1)

}))

.sort((a,b)=>b.score-a.score)

);

}






// =========================
// 7 MID
// =========================


function middle(p){


return make(

"👑 Mid Table Emperor",

"MIDDLE KING",

"Penguasa papan tengah yang bertahan dalam persaingan ketat.",

"Performa pemain posisi tengah.",

p.filter(x=>x.rank>=5&&x.rank<=15)

.sort((a,b)=>b.point-a.point)

);


}







// =========================
// 8 BOTTOM
// =========================


function bottom(p){


return make(

"🌱 Bottom Fighter",

"NEVER GIVE UP",

"Pemain yang terus berjuang dan menciptakan kejutan.",

"Kemenangan + aktivitas pertandingan.",

p.filter(x=>x.rank>=16)

.sort((a,b)=>b.win-a.win)

);


}







// =========================
// 9 CLUTCH
// =========================


function clutch(p,g){


let obj={};


g.forEach(x=>{


if(Math.abs(x.sa-x.sb)<=2)

obj[x.winner]=(obj[x.winner]||0)+1;


});


return make(

"💣 Clutch Player",

"ICE COLD",

"Pemain yang mampu menang dalam kondisi pertandingan paling menegangkan.",

"Kemenangan dengan selisih tipis.",

p.map(x=>({

...x,

score:obj[x.name]||0

}))

.sort((a,b)=>b.score-a.score)

);


}






// =========================
// 10 HALL OF FAME
// =========================


function hall(p){


return make(

"🏅 Hall of Fame",

"IMMORTAL",

"Pemain yang meninggalkan sejarah dalam perjalanan liga.",

"Akumulasi prestasi keseluruhan.",

[...p].sort((a,b)=>b.point-a.point)

);


}








// =========================
// DISPLAY
// =========================


function render(data){


let html="";


data.forEach(a=>{


html+=`

<div class="hall-card">


<h2>
${a.title}
</h2>


<h4>
${a.badge}
</h4>


<p>
${a.desc}
</p>


<div class="podium">


${a.players.map((p,i)=>`

<div class="player-rank">


<div class="medal">

${i==0?"🥇":i==1?"🥈":"🥉"}

</div>


<h3>${p.name}</h3>


<div class="score">

${Math.round(p.score || p.point || 0)}

</div>


</div>


`).join("")}


</div>



<div class="formula">

<b>📊 Cara Perhitungan</b>

<p>${a.calc}</p>

</div>


</div>

`;

});


document.getElementById("achievement-list").innerHTML=html;


}