// =======================================
// 9 POOL LIGA - HALL OF FAME ACHIEVEMENT
// FINAL DISTRIBUTION SYSTEM
// =======================================


const klasemenURL =
"https://script.google.com/macros/s/AKfycbweEZmfiYZG9bOtKyQKar7bcW-Zv8sC75bvliYN7Eurq94veGujyNfWTxfCDvAfGn7Ndg/exec";


const pertandinganURL =
"https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS6WoVWincu7nBJyd9r01BsKoCQoa5MKvB8bkjvnuGygU0JZ8YrWT3L0s3Vuq38erG9Quxl2R3JVFNb-mxeshgDai_XAfZvaUl5k6j9mT45khcmhwgUh1DiUpPSv_lubHrEm0wqnYUlcYBuv8OU33AII-9EfnYdHR7YCZ1XfNKyAIdcSdagYVSmZNhA01HFFiXCFyv4M93ifUnykszCk5HWDtSk1prNwqFyd_uJ7xBR1lnizFiu0jvnsCmIk12jxrUpiQsu7-vsRHtvmqZx3GbCVGsXBQ&lib=MQ974VFXeXNHBp6rsCAsq0yJ67tG3SoUN";


// maksimal 2 gelar per pemain

let achievementCount={};





Promise.all([

fetch(klasemenURL).then(r=>r.json()),

fetch(pertandinganURL).then(r=>r.json())

])


.then(([kelas,match])=>{


let players=parsePlayers(kelas);

let games=parseGames(match);


let achievements=[];


// URUTAN GENGSI


achievements.push(
king(players)
);


achievements.push(
mvp(players)
);


achievements.push(
perfectDominator(players,games)
);


achievements.push(
finisher(players)
);


achievements.push(
giantKiller(players,games)
);


achievements.push(
winStreak(players,games)
);


achievements.push(
predator(players)
);


achievements.push(
risingStar(players)
);


achievements.push(
mostActive(players)
);


achievements.push(
hallOfFame(players)
);



renderAchievements(achievements);



document.getElementById("lastUpdated").innerHTML=

"🕒 Terakhir diperbarui : "+
new Date().toLocaleString("id-ID");



});







// =======================================
// PARSER
// =======================================


function parsePlayers(data){


return data.slice(1)

.filter(x=>x[1])

.map(x=>({


rank:Number(x[0]),

name:x[1],

played:Number(x[2]),

win:Number(x[3]),

lose:Number(x[4]),

plus:Number(x[5]),

minus:Number(x[6]),

diff:Number(x[7]),

point:Number(x[8])


}));

}


function parseGames(data){


return data.slice(1)

.filter(x=>x[2])

.map(x=>({


a:x[2],

sa:Number(x[3]),

sb:Number(x[4]),

b:x[5],

winner:x[6],

loser:x[7]


}));

}







// =======================================
// SISTEM DISTRIBUSI GELAR
// =======================================


function availablePlayers(players){


return players.filter(p=>{


return (achievementCount[p.name]||0)<2;


});


}



function registerTitles(players){


players.slice(0,3)

.forEach(p=>{


if(!achievementCount[p.name])

achievementCount[p.name]=0;


achievementCount[p.name]++;


});


}







function createAchievement(
icon,
title,
badge,
description,
calculation,
ranking
){


let winners=ranking

.filter(p=>p.name)

.slice(0,3);



registerTitles(winners);



if(winners.length===0){


winners=[{

name:"Belum ada pemain",

score:0

}];


}



return {


icon,

title,

badge,

description,

calculation,

winners


};


}







// =======================================
// 1 KING OF THE LEAGUE
// =======================================


function king(players){


let ranking=[...players]

.sort((a,b)=>b.point-a.point);



return createAchievement(

"🏆",

"King of The League",

"LEGEND",

"Penguasa liga dengan performa terbaik secara keseluruhan.",

"Poin(Frame) tertinggi.",

ranking

);


}

// =======================================
// 2 MVP
// =======================================


function mvp(players){


let ranking=availablePlayers(players)

.map(p=>({

...p,

score:

(p.point*0.4)+

(p.win*3)+

((p.win/p.played)*20)+

(p.diff*0.2)


}))


.sort((a,b)=>b.score-a.score);



return createAchievement(

"⭐",

"MVP",

"ELITE",

"Pemain paling lengkap yang menggabungkan kemenangan, konsistensi, dan kualitas permainan.",

"Point 40% + Menang 30% + Win Rate 20% + Selisih Frame 10%.",

ranking

);


}






// =======================================
// 3 PERFECT DOMINATOR
// =======================================


function perfectDominator(players,games){


let score={};



games.forEach(g=>{


let diff=Math.abs(g.sa-g.sb);



if(diff>=5){


score[g.winner]=(score[g.winner]||0)+diff;


}



});




let ranking=availablePlayers(players)

.map(p=>({

...p,

score:score[p.name]||0


}))


.filter(p=>p.score>0)

.sort((a,b)=>b.score-a.score);



return createAchievement(

"💥",

"Perfect Dominator",

"PERFECT GAME",

"Pemain yang mampu menghancurkan lawan dengan kemenangan telak dan dominasi mutlak.",

"Menang dengan selisih besar seperti 9-0, 9-1, dan kemenangan dominan lainnya.",

ranking

);


}







// =======================================
// 4 THE FINISHER
// =======================================


function finisher(players){


let ranking=availablePlayers(players)

.map(p=>({


...p,


score:

(p.win*10)+

Math.max(p.diff,0)



}))


.sort((a,b)=>b.score-a.score);



return createAchievement(

"🎯",

"The Finisher",

"SHARPSHOOTER",

"Pemain yang paling efektif mengubah peluang menjadi kemenangan.",

"Jumlah kemenangan + dominasi selisih frame.",

ranking

);


}







// =======================================
// 5 GIANT KILLER
// =======================================


function giantKiller(players,games){


let ranks={};


players.forEach(p=>{

ranks[p.name]=p.rank;

});


let score={};



games.forEach(g=>{


if(

ranks[g.winner] &&

ranks[g.loser]

){


let value=

ranks[g.loser]-ranks[g.winner];



if(value>0){


score[g.winner]=

(score[g.winner]||0)+value;


}



}


});




let ranking=availablePlayers(players)

.map(p=>({


...p,

score:score[p.name]||0


}))


.filter(p=>p.score>0)

.sort((a,b)=>b.score-a.score);



return createAchievement(

"🎲",

"Giant Killer",

"GIANT SLAYER",

"Pemain yang mampu menjatuhkan lawan dengan peringkat lebih tinggi.",

"Akumulasi nilai ranking lawan kuat yang berhasil dikalahkan.",

ranking

);


}







// =======================================
// 6 WIN STREAK MASTER
// =======================================


function winStreak(players,games){


let streak={};

let best={};



players.forEach(p=>{

streak[p.name]=0;

best[p.name]=0;

});



games.forEach(g=>{


let winner=g.winner;


let loser=g.loser;



if(streak[winner]!=undefined){


streak[winner]++;

best[winner]=

Math.max(best[winner],streak[winner]);


}



if(streak[loser]!=undefined){

streak[loser]=0;

}



});



let ranking=availablePlayers(players)

.map(p=>({


...p,

score:best[p.name]||0


}))


.filter(p=>p.score>0)

.sort((a,b)=>b.score-a.score);



return createAchievement(

"🔥",

"Win Streak Master",

"UNSTOPPABLE",

"Pemain dengan mental juara yang mampu mempertahankan kemenangan beruntun.",

"Jumlah kemenangan beruntun terbaik.",

ranking

);


}







// =======================================
// 7 PREDATOR
// =======================================


function predator(players){



let ranking=availablePlayers(players)

.filter(p=>p.played>=3)

.map(p=>({


...p,


score:p.diff


}))


.sort((a,b)=>b.score-a.score);



return createAchievement(

"🎱",

"Predator",

"DEADLY",

"Pemain dengan kemampuan menyerang paling efektif melalui tekanan frame yang tinggi.",

"Selisih frame positif terbesar.",

ranking

);


}







// =======================================
// 8 RISING STAR
// =======================================


function risingStar(players){



let ranking=availablePlayers(players)

.filter(p=>

p.rank>3 &&

p.played>=3 &&

p.played<=6

)


.map(p=>({


...p,


score:

((p.win/p.played)*100)+

p.point


}))


.sort((a,b)=>b.score-a.score);



return createAchievement(

"🚀",

"Rising Star",

"FUTURE STAR",

"Pemain yang menunjukkan perkembangan luar biasa dan berpotensi menjadi bintang berikutnya.",

"Performa kemenangan, aktivitas, dan kualitas permainan pemain berkembang.",

ranking

);


}







// =======================================
// 9 MOST ACTIVE
// =======================================


function mostActive(players){



let ranking=availablePlayers(players)

.filter(p=>p.played>=3)

.map(p=>({


...p,

score:p.played


}))


.sort((a,b)=>b.score-a.score);



return createAchievement(

"🎮",

"Most Active",

"WARRIOR",

"Pemain yang paling aktif hadir dan bertarung dalam kompetisi.",

"Jumlah pertandingan yang dimainkan.",

ranking

);


}







// =======================================
// 10 HALL OF FAME
// =======================================


function hallOfFame(players){



let ranking=players

.map(p=>({


...p,


score:

achievementCount[p.name]||0


}))


.sort((a,b)=>b.score-a.score);



return createAchievement(

"🏅",

"Hall of Fame",

"IMMORTAL",

"Pemain yang meninggalkan jejak prestasi dalam perjalanan 9 Pool Liga.",

"Jumlah penghargaan yang berhasil diraih.",

ranking

);


}









// =======================================
// RENDER HALL OF FAME
// =======================================


function renderAchievements(data){


let html="";


html+=`

<div class="hall-intro">


<h2>
🏅 HALL OF FAME 9 POOL LIGA
</h2>


<p>

Di sinilah nama-nama besar tercatat dalam sejarah 9 Pool Liga.

Setiap kemenangan lahir dari perjuangan, setiap frame memiliki cerita, dan setiap pertandingan menjadi bukti mental seorang juara.

Hall of Fame bukan hanya milik mereka yang berada di puncak klasemen, tetapi juga untuk para petarung yang menunjukkan keberanian, konsistensi, kejutan luar biasa, serta semangat pantang menyerah.

Dari penguasa liga hingga kuda hitam yang muncul memberikan kejutan, setiap pemain memiliki kesempatan mengukir legenda mereka sendiri.

Seluruh penghargaan dihitung secara otomatis berdasarkan data pertandingan dan klasemen terbaru.

Siapa berikutnya yang akan menulis namanya dalam sejarah?

</p>


</div>


`;



data.forEach(a=>{

html+=`

<div class="hall-card">


<div class="hall-title">

<h2>
${a.icon} ${a.title}
</h2>

<span>
${a.badge}
</span>

</div>



<p>
${a.description}
</p>



<div class="podium">


${a.winners.map((p,i)=>`

<div class="player-rank rank-${i+1}">


<div class="medal">

${

i==0?"🥇":

i==1?"🥈":

"🥉"

}

</div>


<h3>
${p.name}
</h3>


<div class="score">

${Math.round(p.score || p.point || 0)}

</div>


</div>


`).join("")}



</div>



<div class="formula">

<b>
📊 Cara Perhitungan
</b>

<p>
${a.calculation}
</p>


</div>


</div>


`;

});


document.getElementById("achievement-list").innerHTML=html;


}