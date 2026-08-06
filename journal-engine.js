//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 1
// HEADER + DATABASE + CONFIG
//==================================================

"use strict";

//==================================================
// CONFIG
//==================================================

const CONFIG={

version:"3.1",

topStoryCount:5,

lastMatchCount:10,

minMatchForRanking:5,

minWinRate:60,

hotMomentum:80,

dangerMomentum:35,

closeMargin:1,

bigMargin:6

};

//==================================================
// GOOGLE SHEET
//==================================================

const klasemenURL =
"https://script.google.com/macros/s/AKfycbweEZmfiYZG9bOtKyQKar7bcW-Zv8sC75bvliYN7Eurq94veGujyNfWTxfCDvAfGn7Ndg/exec";

const pertandinganURL =
"https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS6WoVWincu7nBJyd9r01BsKoCQoa5MKvB8bkjvnuGygU0JZ8YrWT3L0s3Vuq38erG9Quxl2R3JVFNb-mxeshgDai_XAfZvaUl5k6j9mT45khcmhwgUh1DiUpPSv_lubHrEm0wqnYUlcYBuv8OU33AII-9EfnYdHR7YCZ1XfNKyAIdcSdagYVSmZNhA01HFFiXCFyv4M93ifUnykszCk5HWDtSk1prNwqFyd_uJ7xBR1lnizFiu0jvnsCmIk12jxrUpiQsu7-vsRHtvmqZx3GbCVGsXBQ&lib=MQ974VFXeXNHBp6rsCAsq0yJ67tG3SoUN";

//==================================================
// GLOBAL DATABASE
//==================================================

const players={};

const matches=[];

const league={};

const events=[];

const stories=[];

//==================================================
// COACHING DATABASE
//==================================================

const coachingDatabase=[

{
title:"Pre-shot Routine",
text:"Rutinitas yang sama menghasilkan stroke yang sama. Jangan mengubah tempo hanya karena tekanan pertandingan meningkat."
},

{
title:"Pocket Speed",
text:"Object ball yang masuk dengan pocket speed memberikan toleransi lebih besar sekaligus mempermudah cue ball control."
},

{
title:"Center Ball",
text:"Mayoritas posisi dapat diselesaikan menggunakan center ball. Spin hanya digunakan ketika benar-benar diperlukan."
},

{
title:"Follow Through",
text:"Biarkan cue tetap bergerak lurus setelah mengenai cue ball. Jangan berhenti saat kontak terjadi."
},

{
title:"Bridge",
text:"Bridge yang stabil membuat arah cue lebih mudah diulang pada setiap stroke."
},

{
title:"Tempo",
text:"Ritme permainan yang sama dari bola pertama hingga bola terakhir adalah ciri pemain yang matang."
},

{
title:"Decision Making",
text:"Jika dua pilihan memiliki peluang yang hampir sama, pilih keputusan dengan risiko paling kecil."
},

{
title:"Pattern Play",
text:"Selalu rencanakan minimal dua bola berikutnya sebelum melakukan stroke."
},

{
title:"Safety",
text:"Safety yang baik sering memberikan peluang menang lebih besar dibanding memaksakan pot yang sulit."
},

{
title:"Cue Ball Control",
text:"Posisi cue ball lebih penting daripada sekadar memasukkan object ball."
}

];

//==================================================
// MENTAL DATABASE
//==================================================

const mentalDatabase=[

{
title:"Satu Bola",
text:"Mainkan satu bola pada satu waktu. Jangan memikirkan skor akhir."
},

{
title:"Percaya Rutinitas",
text:"Saat gugup, jangan mengubah teknik. Percaya pada rutinitas yang sudah dilatih."
},

{
title:"Tempo Sendiri",
text:"Jangan mengikuti tempo lawan. Mainkan ritme permainan Anda sendiri."
},

{
title:"Move On",
text:"Kesalahan sudah selesai. Fokus pada shot berikutnya."
},

{
title:"Bahasa Tubuh",
text:"Tubuh yang tenang membantu pikiran tetap tenang."
},

{
title:"Frame demi Frame",
text:"Liga panjang dimenangkan melalui akumulasi frame, bukan satu pertandingan."
},

{
title:"Komitmen",
text:"Setelah keputusan dibuat, jalankan stroke tanpa keraguan."
},

{
title:"Momentum",
text:"Momentum dibangun dari keputusan yang benar secara berulang."
}

];
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 2
// TEMPLATE DATABASE
//==================================================

const templates={

headline:{

streak:[

"{nama} sedang menikmati performa terbaik setelah membukukan {streak} kemenangan beruntun.",

"Performa {nama} terus menanjak. Rekor kemenangan beruntun kini mencapai {streak} pertandingan.",

"Belum ada tanda-tanda laju {nama} akan berhenti. Ia kembali memperpanjang streak menjadi {streak} laga.",

"{nama} menjadi pemain paling panas pekan ini dengan {streak} kemenangan berturut-turut.",

"Momentum {nama} semakin sulit dihentikan setelah kembali menambah kemenangan menjadi {streak}."

],

momentum:[

"{nama} sedang berada dalam performa terbaik musim ini.",

"Grafik permainan {nama} menunjukkan peningkatan yang sangat konsisten.",

"{nama} berhasil menjaga kualitas permainan dalam beberapa pertandingan terakhir.",

"Momentum positif masih mengiringi perjalanan {nama}.",

"{nama} tampil semakin percaya diri pada setiap pertandingan."

],

warning:[

"{nama} perlu segera bangkit agar tidak semakin tertinggal di klasemen.",

"Tekanan mulai menghampiri {nama} setelah beberapa hasil kurang memuaskan.",

"{nama} membutuhkan kemenangan untuk mengembalikan kepercayaan dirinya.",

"Beberapa pertandingan berikutnya akan sangat menentukan bagi {nama}.",

"Situasi mulai sulit bagi {nama} apabila tren ini terus berlanjut."

],

closer:[

"{nama} beberapa kali menunjukkan kemampuan menyelesaikan pertandingan ketat.",

"{nama} tampil sangat tenang ketika pertandingan memasuki fase penentuan.",

"Dalam pertandingan dengan margin tipis, {nama} menunjukkan mental yang kuat.",

"{nama} berhasil mengubah tekanan menjadi kemenangan penting.",

"{nama} menjadi salah satu pemain paling berbahaya pada frame-frame akhir."

],

leader:[

"{nama} masih bertahan di puncak klasemen dan menjaga jarak dari para pesaing.",

"Posisi pertama masih menjadi milik {nama}, namun tekanan terus berdatangan.",

"{nama} berhasil mempertahankan status sebagai pemimpin klasemen.",

"Persaingan belum selesai, tetapi {nama} masih memimpin liga.",

"{nama} tetap menjadi pemain yang harus dikejar musim ini."

],

silent:[

"{nama} perlahan naik tanpa banyak mendapat sorotan.",

"Tanpa banyak perhatian, {nama} terus mengumpulkan poin penting.",

"Konsistensi membawa {nama} terus memperbaiki posisi klasemen.",

"{nama} diam-diam menjadi ancaman baru di papan tengah.",

"Kenaikan peringkat {nama} terjadi berkat hasil yang stabil."

]

},

prediction:[

"Apabila mampu mempertahankan performa saat ini, {nama} berpeluang naik ke posisi yang lebih tinggi.",

"Pertandingan berikutnya akan menjadi ujian penting bagi {nama}.",

"Momentum saat ini memberikan peluang besar bagi {nama} untuk terus menanjak.",

"{nama} diperkirakan masih akan menjadi salah satu pemain yang paling konsisten.",

"Performa {nama} layak terus diperhatikan dalam beberapa ronde ke depan."

],

insight:[

"Selisih frame mulai menjadi faktor yang sangat menentukan posisi klasemen.",

"Persaingan papan tengah semakin ketat sehingga setiap kemenangan menjadi sangat berharga.",

"Beberapa pemain mulai menunjukkan peningkatan performa secara konsisten.",

"Konsistensi lebih berharga daripada satu kemenangan besar.",

"Liga mulai memasuki fase ketika setiap pertandingan memiliki dampak besar terhadap klasemen."

]

};

//==================================================
// RANDOM HELPER
//==================================================

function randomTemplate(list){

    return list[

        Math.floor(

            Math.random()*list.length

        )

    ];

}

function fillTemplate(template,data){

    let text=template;

    Object.keys(data).forEach(key=>{

        text=text.replaceAll(

            "{"+key+"}",

            data[key]

        );

    });

    return text;

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 3
// UTILITY FUNCTIONS
//==================================================

function average(total,count){

    if(count===0) return 0;

    return total/count;

}

function percent(value,total){

    if(total===0) return 0;

    return Math.round((value/total)*100);

}

function clamp(value,min,max){

    return Math.max(

        min,

        Math.min(max,value)

    );

}

function number(value){

    const n=Number(value);

    return isNaN(n)?0:n;

}

function last(array,n){

    return array.slice(-n);

}

function randomItem(array){

    return array[

        Math.floor(

            Math.random()*array.length

        )

    ];

}

function sortDesc(array,key){

    return array.sort(

        (a,b)=>b[key]-a[key]

    );

}

function sortAsc(array,key){

    return array.sort(

        (a,b)=>a[key]-b[key]

    );

}

function getPlayers(){

    return Object.values(players);

}

function getPlayer(name){

    return players[name];

}

function addEvent(

    type,

    score,

    title,

    content,

    player=""

){

    events.push({

        type,

        score,

        title,

        content,

        player

    });

}

function getEvents(){

    return [...events]

    .sort(

        (a,b)=>b.score-a.score

    );

}

function clearEvents(){

    events.length=0;

}

function clearStories(){

    stories.length=0;

}

function byMomentum(){

    return [...getPlayers()]

    .sort(

        (a,b)=>b.momentum-a.momentum

    );

}

function byNews(){

    return [...getPlayers()]

    .sort(

        (a,b)=>b.newsScore-a.newsScore

    );

}

function byRank(){

    return [...getPlayers()]

    .sort(

        (a,b)=>a.rank-b.rank

    );

}

function safeHTML(id,html){

    const el=document.getElementById(id);

    if(!el) return;

    el.innerHTML=html;

}

function makeCard(

    icon,

    title,

    body

){

    return `

    <div class="card">

        <h2>${icon} ${title}</h2>

        ${body}

    </div>

    `;

}

function cardText(text){

    return `<p>${text}</p>`;

}

function formatWinRate(player){

    return percent(

        player.win,

        player.play

    );

}

function formatMargin(player){

    return (

        player.margin>0

        ? "+"+player.margin

        : player.margin

    );

}

function isBigWin(match){

    return match.margin>=CONFIG.bigMargin;

}

function isCloseMatch(match){

    return match.margin<=CONFIG.closeMargin;

}

function latestMatches(player,count=5){

    return last(

        player.history,

        count

    );

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 4
// PLAYER ENGINE
//==================================================

function buildPlayers(klasemen, pertandingan){

    // Reset
    Object.keys(players).forEach(key=>delete players[key]);

    //------------------------------------------------
    // Ambil data klasemen
    //------------------------------------------------

    for(let i=1;i<klasemen.length;i++){

        const row=klasemen[i];

        if(!row || row.length===0) continue;

        const nama=String(row[1]).trim();

        players[nama]={

            nama:nama,

            rank:number(row[0]),

            play:number(row[2]),

            win:number(row[3]),

            lose:number(row[4]),

            framePlus:number(row[5]),

            frameMinus:number(row[6]),

            margin:number(row[7]),

            point:number(row[8]),

            avgMargin:number(row[9]),

            penalty:number(row[10]),

            //------------------------------------------------
            // Akan dihitung engine
            //------------------------------------------------

            winRate:0,

            momentum:50,

            confidence:50,

            consistency:50,

            danger:0,

            newsScore:0,

            streak:0,

            streakType:"",

            closeWin:0,

            closeLose:0,

            bigWin:0,

            bigLose:0,

            history:[],

            last5:[]

        };

    }

    //------------------------------------------------
    // Ambil histori pertandingan
    //------------------------------------------------

    for(let i=1;i<pertandingan.length;i++){

        const row=pertandingan[i];

        if(!row || row.length===0) continue;

        const playerA=String(row[2]).trim();

        const playerB=String(row[5]).trim();

        const scoreA=number(row[3]);

        const scoreB=number(row[4]);

        const winner=String(row[6]).trim();

        const loser=String(row[7]).trim();

        if(players[playerA]){

            players[playerA].history.push({

                result:winner===playerA?"W":"L",

                scoreFor:scoreA,

                scoreAgainst:scoreB,

                opponent:playerB

            });

        }

        if(players[playerB]){

            players[playerB].history.push({

                result:winner===playerB?"W":"L",

                scoreFor:scoreB,

                scoreAgainst:scoreA,

                opponent:playerA

            });

        }

    }

    //------------------------------------------------
    // Hitung statistik lanjutan
    //------------------------------------------------

    Object.values(players).forEach(player=>{

        //--------------------------------------------
        // Win Rate
        //--------------------------------------------

        player.winRate=

        percent(

            player.win,

            player.play

        );

        //--------------------------------------------
        // Last 5
        //--------------------------------------------

        player.last5=

        latestMatches(

            player,

            5

        );

        //--------------------------------------------
        // Close Win / Close Lose
        //--------------------------------------------

        player.last5.forEach(match=>{

            const margin=Math.abs(

                match.scoreFor-

                match.scoreAgainst

            );

            if(match.result==="W"){

                if(margin<=1)

                    player.closeWin++;

                if(margin>=6)

                    player.bigWin++;

            }

            else{

                if(margin<=1)

                    player.closeLose++;

                if(margin>=6)

                    player.bigLose++;

            }

        });

    });

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 5
// PLAYER ANALYSIS ENGINE
//==================================================

function analyzePlayers(){

    Object.values(players).forEach(player=>{

        //------------------------------------------------
        // STREAK
        //------------------------------------------------

        player.streak=0;
        player.streakType="";

        if(player.history.length>0){

            const lastResult=
            player.history[
                player.history.length-1
            ].result;

            player.streakType=lastResult;

            for(

                let i=player.history.length-1;

                i>=0;

                i--

            ){

                if(

                    player.history[i].result===lastResult

                ){

                    player.streak++;

                }

                else{

                    break;

                }

            }

        }

        //------------------------------------------------
        // MOMENTUM
        //------------------------------------------------

        let momentum=50;

        player.last5.forEach(match=>{

            if(match.result==="W"){

                momentum+=10;

            }

            else{

                momentum-=10;

            }

        });

        momentum+=player.streak*3;

        momentum-=player.bigLose*5;

        momentum+=player.bigWin*5;

        player.momentum=

        clamp(

            Math.round(momentum),

            0,

            100

        );

        //------------------------------------------------
        // CONSISTENCY
        //------------------------------------------------

        let consistency=40;

        consistency+=player.winRate*0.4;

        consistency-=player.closeLose*3;

        consistency-=player.bigLose*2;

        consistency+=player.closeWin*2;

        player.consistency=

        clamp(

            Math.round(consistency),

            0,

            100

        );

        //------------------------------------------------
        // CONFIDENCE
        //------------------------------------------------

        let confidence=50;

        confidence+=player.streak*6;

        confidence+=player.bigWin*4;

        confidence-=player.bigLose*5;

        confidence+=

        player.winRate*0.2;

        player.confidence=

        clamp(

            Math.round(confidence),

            0,

            100

        );

        //------------------------------------------------
        // DANGER
        //------------------------------------------------

        let danger=0;

        if(

            player.streakType==="L"

        ){

            danger+=

            player.streak*15;

        }

        danger+=

        player.bigLose*5;

        player.danger=

        clamp(

            Math.round(danger),

            0,

            100

        );

        //------------------------------------------------
        // NEWS SCORE
        //------------------------------------------------

        let news=0;

        news+=player.momentum;

        news+=player.confidence;

        news+=player.consistency;

        news+=player.bigWin*8;

        news+=player.closeWin*4;

        news-=player.bigLose*5;

        if(

            player.streakType==="W"

        ){

            news+=player.streak*10;

        }

        if(

            player.streakType==="L"

        ){

            news+=player.streak*6;

        }

        if(player.rank<=3){

            news+=15;

        }

        if(player.rank<=10){

            news+=5;

        }

        player.newsScore=

        Math.round(news);

    });

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 6
// MATCH ENGINE
//==================================================

function buildMatches(pertandingan){

    matches.length=0;

    for(let i=1;i<pertandingan.length;i++){

        const row=pertandingan[i];

        if(!row || row.length===0) continue;

        const match={

            id:number(row[0]),

            round:number(row[1]),

            playerA:String(row[2]).trim(),

            scoreA:number(row[3]),

            scoreB:number(row[4]),

            playerB:String(row[5]).trim(),

            winner:String(row[6]).trim(),

            loser:String(row[7]).trim(),

            margin:Math.abs(

                number(row[3])-

                number(row[4])

            ),

            closeMatch:false,

            bigWin:false,

            upset:false,

            quality:0

        };

        //------------------------------------------------
        // CLOSE MATCH
        //------------------------------------------------

        match.closeMatch=

        match.margin<=CONFIG.closeMargin;

        //------------------------------------------------
        // BIG WIN
        //------------------------------------------------

        match.bigWin=

        match.margin>=CONFIG.bigMargin;

        //------------------------------------------------
        // QUALITY SCORE
        //------------------------------------------------

        let score=50;

        if(match.closeMatch)

            score+=20;

        if(match.bigWin)

            score+=10;

        const pWinner=

        players[match.winner];

        const pLoser=

        players[match.loser];

        if(

            pWinner &&

            pLoser

        ){

            //--------------------------------------------
            // Upset
            //--------------------------------------------

            if(

                pWinner.rank>

                pLoser.rank

            ){

                match.upset=true;

                score+=25;

            }

            //--------------------------------------------
            // Mengalahkan Top 3
            //--------------------------------------------

            if(

                pLoser.rank<=3

            ){

                score+=15;

            }

            //--------------------------------------------
            // Duel Top 10
            //--------------------------------------------

            if(

                pWinner.rank<=10 &&

                pLoser.rank<=10

            ){

                score+=10;

            }

        }

        match.quality=score;

        matches.push(match);

    }

    //------------------------------------------------
    // Urutkan berdasarkan nomor pertandingan
    //------------------------------------------------

    matches.sort(

        (a,b)=>a.id-b.id

    );

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 7
// LEAGUE ENGINE
//==================================================

function buildLeague(){

    const list=getPlayers();

    //------------------------------------------------
    // BASIC
    //------------------------------------------------

    league.totalPlayers=list.length;

    league.totalMatches=matches.length;

    league.totalFrames=0;

    league.totalWins=0;

    league.totalLosses=0;

    league.averageWinRate=0;

    league.averageMargin=0;

    league.averageMomentum=0;

    //------------------------------------------------
    // ACCUMULATE
    //------------------------------------------------

    let totalMargin=0;

    let totalMomentum=0;

    let totalWinRate=0;

    list.forEach(player=>{

        league.totalFrames+=player.framePlus;

        league.totalWins+=player.win;

        league.totalLosses+=player.lose;

        totalMargin+=player.margin;

        totalMomentum+=player.momentum;

        totalWinRate+=player.winRate;

    });

    league.averageMargin=

    average(

        totalMargin,

        list.length

    );

    league.averageMomentum=

    average(

        totalMomentum,

        list.length

    );

    league.averageWinRate=

    average(

        totalWinRate,

        list.length

    );

    //------------------------------------------------
    // LEADER
    //------------------------------------------------

    const rank=

    byRank();

    league.leader=

    rank[0]||null;

    league.runnerUp=

    rank[1]||null;

    league.third=

    rank[2]||null;

    //------------------------------------------------
    // HOT PLAYER
    //------------------------------------------------

    league.hotPlayer=

    byMomentum()[0]||null;

    //------------------------------------------------
    // NEWS PLAYER
    //------------------------------------------------

    league.newsPlayer=

    byNews()[0]||null;

    //------------------------------------------------
    // TEMPERATURE
    //------------------------------------------------

    const hot=list.filter(

        p=>p.momentum>=80

    ).length;

    const cold=list.filter(

        p=>p.momentum<=30

    ).length;

    if(hot>=8){

        league.temperature={

            icon:"🔥",

            title:"Sangat Panas",

            value:90

        };

    }

    else if(hot>=5){

        league.temperature={

            icon:"🌤",

            title:"Kompetitif",

            value:70

        };

    }

    else if(cold>=5){

        league.temperature={

            icon:"❄",

            title:"Lesu",

            value:30

        };

    }

    else{

        league.temperature={

            icon:"⚖",

            title:"Stabil",

            value:50

        };

    }

    //------------------------------------------------
    // PERSAINGAN
    //------------------------------------------------

    if(

        league.leader &&

        league.runnerUp

    ){

        const gap=

        league.leader.point-

        league.runnerUp.point;

        league.pointGap=gap;

        if(gap<=5){

            league.competition=

            "Sangat Ketat";

        }

        else if(gap<=15){

            league.competition=

            "Masih Terbuka";

        }

        else{

            league.competition=

            "Mulai Didominasi";

        }

    }

    //------------------------------------------------
    // LAST MATCH
    //------------------------------------------------

    if(matches.length){

        league.lastMatch=

        matches[

            matches.length-1

        ];

    }

    //------------------------------------------------
    // BEST MATCH
    //------------------------------------------------

    const sorted=[

        ...matches

    ].sort(

        (a,b)=>

        b.quality-a.quality

    );

    league.bestMatch=

    sorted[0]||null;

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 8
// EVENT ENGINE
//==================================================

function generateEvents(){

    clearEvents();

    //------------------------------------------------
    // PLAYER EVENTS
    //------------------------------------------------

    getPlayers().forEach(player=>{

        //--------------------------------------------
        // WIN STREAK
        //--------------------------------------------

        if(
            player.streakType==="W" &&
            player.streak>=3
        ){

            addEvent(

                "streak",

                90+player.streak,

                "Hot Streak",

                fillTemplate(

                    randomTemplate(

                        templates.headline.streak

                    ),

                    {

                        nama:player.nama,

                        streak:player.streak

                    }

                ),

                player.nama

            );

        }

        //--------------------------------------------
        // LOSING STREAK
        //--------------------------------------------

        if(
            player.streakType==="L" &&
            player.streak>=3
        ){

            addEvent(

                "warning",

                70+player.streak,

                "Warning",

                fillTemplate(

                    randomTemplate(

                        templates.headline.warning

                    ),

                    {

                        nama:player.nama

                    }

                ),

                player.nama

            );

        }

        //--------------------------------------------
        // MOMENTUM
        //--------------------------------------------

        if(player.momentum>=85){

            addEvent(

                "momentum",

                player.momentum,

                "Momentum",

                fillTemplate(

                    randomTemplate(

                        templates.headline.momentum

                    ),

                    {

                        nama:player.nama

                    }

                ),

                player.nama

            );

        }

        //--------------------------------------------
        // LEADER
        //--------------------------------------------

        if(player.rank===1){

            addEvent(

                "leader",

                80,

                "Leader",

                fillTemplate(

                    randomTemplate(

                        templates.headline.leader

                    ),

                    {

                        nama:player.nama

                    }

                ),

                player.nama

            );

        }

        //--------------------------------------------
        // SILENT CLIMBER
        //--------------------------------------------

        if(

            player.rank>=6 &&

            player.rank<=15 &&

            player.momentum>=75 &&

            player.winRate>=60

        ){

            addEvent(

                "silent",

                65,

                "Silent Climber",

                fillTemplate(

                    randomTemplate(

                        templates.headline.silent

                    ),

                    {

                        nama:player.nama

                    }

                ),

                player.nama

            );

        }

        //--------------------------------------------
        // CLUTCH PLAYER
        //--------------------------------------------

        if(player.closeWin>=3){

            addEvent(

                "clutch",

                60,

                "Clutch Player",

                fillTemplate(

                    randomTemplate(

                        templates.headline.closer

                    ),

                    {

                        nama:player.nama

                    }

                ),

                player.nama

            );

        }

    });

    //------------------------------------------------
    // MATCH EVENTS
    //------------------------------------------------

    matches.forEach(match=>{

        //--------------------------------------------
        // UPSET
        //--------------------------------------------

        if(match.upset){

            addEvent(

                "upset",

                85,

                "Upset",

                `${match.winner} membuat kejutan dengan mengalahkan ${match.loser}.`,

                match.winner

            );

        }

        //--------------------------------------------
        // BIG WIN
        //--------------------------------------------

        if(match.bigWin){

            addEvent(

                "bigwin",

                60,

                "Dominan",

                `${match.winner} menang telak ${match.scoreA}-${match.scoreB} atas ${match.loser}.`,

                match.winner

            );

        }

        //--------------------------------------------
        // CLOSE MATCH
        //--------------------------------------------

        if(match.closeMatch){

            addEvent(

                "close",

                65,

                "Pertandingan Ketat",

                `${match.winner} mengamankan kemenangan dramatis atas ${match.loser} hanya dengan selisih satu frame.`,

                match.winner

            );

        }

    });

    //------------------------------------------------
    // LEAGUE EVENTS
    //------------------------------------------------

    if(league.pointGap<=5){

        addEvent(

            "league",

            95,

            "Liga Memanas",

            "Persaingan menuju gelar juara semakin ketat. Selisih poin antarpemuncak klasemen sangat tipis."

        );

    }

    if(

        league.temperature.value>=80

    ){

        addEvent(

            "temperature",

            70,

            "Liga Panas",

            "Banyak pemain sedang berada dalam performa terbaik sehingga setiap pertandingan menjadi semakin sulit diprediksi."

        );

    }

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 9
// STORY ENGINE
//==================================================

function buildStories(){

    clearStories();

    const sorted=getEvents();

    sorted.forEach(event=>{

        stories.push({

            type:event.type,

            title:event.title,

            text:event.content,

            score:event.score,

            player:event.player

        });

    });

}

function getHeadlineStory(){

    return stories[0] || null;

}

function getSecondStory(){

    return stories[1] || null;

}

function getThirdStory(){

    return stories[2] || null;

}

function getStory(index){

    return stories[index] || null;

}

//==================================================
// AI HEADLINE
//==================================================

function renderHeadline(){

    const story=getHeadlineStory();

    if(!story) return;

    safeHTML(

        "headline",

        makeCard(

            "🔥",

            "Headline Hari Ini",

            cardText(story.text)

        )

    );

}

//==================================================
// TOP STORY
//==================================================

function renderTopStory(){

    const story=getSecondStory();

    if(!story) return;

    safeHTML(

        "topStory",

        makeCard(

            "📰",

            "Top Story",

            cardText(story.text)

        )

    );

}

//==================================================
// AI INSIGHT
//==================================================

function renderInsight(){

    const story=getThirdStory();

    if(!story) return;

    let insight=

    randomTemplate(

        templates.insight

    );

    safeHTML(

        "insight",

        makeCard(

            "🧠",

            "AI Insight",

            cardText(

                insight+

                "<br><br>"+

                story.text

            )

        )

    );

}

//==================================================
// STORY OF THE WEEK
//==================================================

function renderStoryOfWeek(){

    if(stories.length<4) return;

    const story=getStory(3);

    safeHTML(

        "storyWeek",

        makeCard(

            "⭐",

            "Story of The Week",

            cardText(

                story.text

            )

        )

    );

}

//==================================================
// QUICK NEWS
//==================================================

function renderQuickNews(){

    let html="";

    stories

    .slice(4,9)

    .forEach(story=>{

        html+=`

        <li>

        ${story.text}

        </li>

        `;

    });

    if(html==="") return;

    safeHTML(

        "quickNews",

        `

        <div class="card">

        <h2>🗞 Quick News</h2>

        <ul>

        ${html}

        </ul>

        </div>

        `

    );

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 10
// AI ENGINE
//==================================================

function renderLeagueInsight(){

    if(!league.leader) return;

    let title="";
    let text="";

    if(league.pointGap<=5){

        title="Liga Sangat Kompetitif";

        text=
        "Persaingan menuju gelar juara masih sangat terbuka. Selisih poin antarpemimpin klasemen sangat tipis sehingga satu pertandingan saja dapat mengubah posisi puncak.";

    }

    else if(league.pointGap<=15){

        title="Persaingan Masih Terbuka";

        text=
        "Pemuncak klasemen mulai menciptakan jarak, namun peluang mengejar masih terbuka bagi para pesaing yang mampu menjaga konsistensi.";

    }

    else{

        title="Pemuncak Mulai Mendominasi";

        text=
        "Keunggulan pemimpin klasemen mulai terlihat jelas. Tantangan terbesar pemain lain adalah mengejar tanpa kehilangan terlalu banyak frame.";

    }

    safeHTML(

        "leagueInsight",

        makeCard(

            "🌎",

            title,

            cardText(text)

        )

    );

}

//==================================================
// LEAGUE TEMPERATURE
//==================================================

function renderTemperature(){

    safeHTML(

        "temperature",

        makeCard(

            league.temperature.icon,

            "League Temperature",

            cardText(

                `Kondisi liga saat ini berada pada level <b>${league.temperature.title}</b>.`

            )

        )

    );

}

//==================================================
// AI POWER RANKING
//==================================================

function renderPowerRanking(){

    const list=

    byNews().slice(0,5);

    let html="<ol>";

    list.forEach(player=>{

        html+=`

        <li>

        <b>${player.nama}</b>

        <br>

        News Score :

        ${player.newsScore}

        </li>

        `;

    });

    html+="</ol>";

    safeHTML(

        "powerRanking",

        makeCard(

            "⚡",

            "AI Power Ranking",

            html

        )

    );

}

//==================================================
// WATCH LIST
//==================================================

function renderWatchList(){

    const list=

    byMomentum()

    .slice(0,3);

    let html="";

    list.forEach(player=>{

        html+=`

        <p>

        🔥

        <b>${player.nama}</b>

        memiliki momentum

        <b>${player.momentum}</b>.

        </p>

        `;

    });

    safeHTML(

        "watchList",

        makeCard(

            "👀",

            "Watch List",

            html

        )

    );

}

//==================================================
// SURPRISE PLAYER
//==================================================

function renderSurprise(){

    const candidate=

    getPlayers()

    .filter(

        p=>

        p.rank>10 &&

        p.momentum>=75

    )

    .sort(

        (a,b)=>

        b.momentum-a.momentum

    )[0];

    if(!candidate) return;

    safeHTML(

        "surprise",

        makeCard(

            "🎲",

            "Surprise Candidate",

            cardText(

                `${candidate.nama} berpotensi menjadi kejutan pada ronde berikutnya berdasarkan peningkatan performanya.`

            )

        )

    );

}

//==================================================
// AI PREDICTION
//==================================================

function renderPrediction(){

    const leader=

    league.leader;

    if(!leader) return;

    let text="";

    if(

        leader.winRate>=80

    ){

        text=

        `${leader.nama} masih menjadi kandidat terkuat untuk mempertahankan posisi puncak klasemen apabila mampu menjaga konsistensi permainannya.`;

    }

    else if(

        league.pointGap<=5

    ){

        text=

        "Perebutan gelar juara diperkirakan berlangsung hingga pekan terakhir karena selisih poin antarpemimpin sangat tipis.";

    }

    else{

        text=

        "Masih banyak pertandingan tersisa sehingga peluang perubahan klasemen tetap terbuka.";

    }

    safeHTML(

        "prediction",

        makeCard(

            "🔮",

            "Prediksi AI",

            cardText(text)

        )

    );

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 11
// HOT PLAYER
// WARNING
// TREND
// MATCH OF THE DAY
// COACHING
// MENTAL
//==================================================

//==================================================
// HOT PLAYER
//==================================================

function renderHotPlayer(){

    const player=byMomentum()[0];

    if(!player) return;

    safeHTML(

        "hotPlayer",

        makeCard(

            "⭐",

            "Player On Fire",

            cardText(

                `<b>${player.nama}</b> sedang berada dalam performa terbaik.

                <br><br>

                Momentum :

                <b>${player.momentum}</b>

                <br>

                Win Rate :

                <b>${player.winRate}%</b>

                <br>

                Streak :

                <b>${player.streakType}${player.streak}</b>`

            )

        )

    );

}

//==================================================
// WARNING
//==================================================

function renderWarning(){

    const list=

    getPlayers()

    .sort(

        (a,b)=>b.danger-a.danger

    );

    if(list.length===0) return;

    const player=list[0];

    safeHTML(

        "warning",

        makeCard(

            "⚠",

            "Warning Zone",

            cardText(

                `<b>${player.nama}</b>

                memiliki indeks bahaya

                <b>${player.danger}</b>.

                Momentum perlu segera diperbaiki agar tidak kehilangan posisi klasemen.`

            )

        )

    );

}

//==================================================
// TREND
//==================================================

function renderTrend(){

    const list=

    byMomentum()

    .slice(0,5);

    let html="<ol>";

    list.forEach(player=>{

        html+=`

        <li>

        ${player.nama}

        -

        ${player.momentum}

        </li>

        `;

    });

    html+="</ol>";

    safeHTML(

        "trend",

        makeCard(

            "📈",

            "Momentum Ranking",

            html

        )

    );

}

//==================================================
// MATCH OF THE DAY
//==================================================

function renderMatchOfTheDay(){

    if(!league.bestMatch) return;

    const m=

    league.bestMatch;

    let text="";

    if(m.closeMatch){

        text=

        `${m.winner}

        memenangkan pertandingan dramatis

        melawan

        ${m.loser}

        dengan selisih hanya

        ${m.margin}

        frame.`;

    }

    else if(m.bigWin){

        text=

        `${m.winner}

        tampil dominan

        dan mencatat kemenangan besar

        atas

        ${m.loser}.`;

    }

    else{

        text=

        `${m.winner}

        berhasil mengamankan kemenangan penting

        atas

        ${m.loser}.`;

    }

    safeHTML(

        "matchOfTheDay",

        makeCard(

            "🎱",

            "Match of the Day",

            `

            <p>

            <b>Ronde ${m.round}</b>

            <br><br>

            ${m.playerA}

            <b>${m.scoreA}</b>

            -

            <b>${m.scoreB}</b>

            ${m.playerB}

            <br><br>

            ${text}

            </p>

            `

        )

    );

}

//==================================================
// COACHING
//==================================================

function renderCoaching(){

    const materi=

    randomItem(

        coachingDatabase

    );

    safeHTML(

        "coach",

        makeCard(

            "🎯",

            materi.title,

            cardText(

                materi.text

            )

        )

    );

}

//==================================================
// MENTAL
//==================================================

function renderMental(){

    const materi=

    randomItem(

        mentalDatabase

    );

    safeHTML(

        "mental",

        makeCard(

            "🧠",

            materi.title,

            cardText(

                materi.text

            )

        )

    );

}
//==================================================
// JOURNAL ENGINE 3.1
// BAGIAN 12
// RENDER ENGINE
// MAIN ENGINE
//==================================================

//==================================================
// RENDER JOURNAL
//==================================================

function renderJournal(){

    buildStories();

    //------------------------------------------------
    // BERITA
    //------------------------------------------------

    renderHeadline();

    renderTopStory();

    renderInsight();

    renderStoryOfWeek();

    renderQuickNews();

    //------------------------------------------------
    // AI
    //------------------------------------------------

    renderLeagueInsight();

    renderTemperature();

    renderPowerRanking();

    renderWatchList();

    renderSurprise();

    renderPrediction();

    //------------------------------------------------
    // PLAYER
    //------------------------------------------------

    renderHotPlayer();

    renderWarning();

    renderTrend();

    renderMatchOfTheDay();

    //------------------------------------------------
    // EDUKASI
    //------------------------------------------------

    renderCoaching();

    renderMental();

}

//==================================================
// MAIN
//==================================================

function startJournal(

    klasemen,

    pertandingan

){

    //------------------------------------------------
    // RESET
    //------------------------------------------------

    matches.length=0;

    events.length=0;

    stories.length=0;

    Object.keys(players).forEach(key=>{

        delete players[key];

    });

    //------------------------------------------------
    // BUILD ENGINE
    //------------------------------------------------

    buildPlayers(

        klasemen,

        pertandingan

    );

    analyzePlayers();

    buildMatches(

        pertandingan

    );

    buildLeague();

    generateEvents();

    //------------------------------------------------
    // RENDER
    //------------------------------------------------

    renderJournal();

}

//==================================================
// LOAD GOOGLE SHEET
//==================================================

Promise.all([

    fetch(klasemenURL)

    .then(

        response=>response.json()

    ),

    fetch(pertandinganURL)

    .then(

        response=>response.json()

    )

])

.then(([

    klasemen,

    pertandingan

])=>{

    startJournal(

        klasemen,

        pertandingan

    );

})

.catch(error=>{

    console.error(

        "Journal Engine Error",

        error

    );

});

//==================================================
// END OF FILE
//==================================================
