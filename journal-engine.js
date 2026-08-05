//==================================================
// LIGA JURNAL ENGINE
// Versi 2.0
//==================================================
//==================================================
// AI ANALYZER ENGINE
//==================================================

let ligaData = {
    players: {},
    klasemen: [],
    pertandingan: []
};

//==================================================
// BUILD PLAYER DATABASE
//==================================================

function buildDatabase(klasemen, pertandingan){

    ligaData.players = {};
    ligaData.klasemen = klasemen;
    ligaData.pertandingan = pertandingan;

    //------------------------------------------
    // klasemen
    //------------------------------------------

    for(let i=1;i<klasemen.length;i++){

        const r = klasemen[i];

        if(!r || !r[1]) continue;

        ligaData.players[r[1]] = {

            nama : r[1],
            tier : Number(r[2]),
            main : Number(r[3]),
            menang : Number(r[4]),
            kalah : Number(r[5]),
            frameMenang : Number(r[6]),
            frameDiff : Number(r[7]),
            poin : Number(r[8]),

            frameKalah :
            Number(r[6])-
            Number(r[7]),

            rank : i,

            winRate : 0,

            last5 : [],

            streak : 0,

            current:"",

            menangTipis:0,
            kalahTipis:0,

            menangBesar:0,
            kalahBesar:0,

            upset:0,

            giantKiller:0,

            menangTierAtas:0,

            kalahTierBawah:0,

            form:0

        };

    }

    //------------------------------------------
    // pertandingan
    //------------------------------------------

    for(let i=1;i<pertandingan.length;i++){

        const row = pertandingan[i];

        if(!row) continue;

        const A=row[2];
        const B=row[5];

        if(!ligaData.players[A]) continue;
        if(!ligaData.players[B]) continue;

        const scoreA=Number(row[3]);
        const scoreB=Number(row[4]);

        const winner=row[6];
        const loser=row[7];

        const margin=
        Math.abs(scoreA-scoreB);

        //----------------------------------

        ligaData.players[winner].last5.push("W");

        ligaData.players[loser].last5.push("L");

        //----------------------------------

        if(margin==1){

            ligaData.players[winner].menangTipis++;

            ligaData.players[loser].kalahTipis++;

        }

        if(margin>=5){

            ligaData.players[winner].menangBesar++;

            ligaData.players[loser].kalahBesar++;

        }

        //----------------------------------

        const tierWinner=
        ligaData.players[winner].tier;

        const tierLoser=
        ligaData.players[loser].tier;

        if(tierWinner>tierLoser){

            ligaData.players[winner].giantKiller++;

            ligaData.players[loser].kalahTierBawah++;

        }

        if(tierWinner<tierLoser){

            ligaData.players[winner].menangTierAtas++;

        }

    }

    //------------------------------------------
    // hitung win rate
    //------------------------------------------

    Object.values(ligaData.players).forEach(p=>{

        if(p.main>0){

            p.winRate=
            p.menang/p.main;

        }

        p.last5=
        p.last5.slice(-5);

    });

    //------------------------------------------
    // streak
    //------------------------------------------

    Object.values(ligaData.players).forEach(p=>{

        let s=0;

        let current="";

        for(let i=p.last5.length-1;i>=0;i--){

            if(current===""){

                current=p.last5[i];

                s++;

            }

            else if(current==p.last5[i]){

                s++;

            }

            else{

                break;

            }

        }

        p.current=current;

        p.streak=s;

        p.form=
        p.last5.filter(x=>x=="W").length;

    });

}

//==================================================
// DATABASE COACHING
//==================================================

const coachingDatabase=[

{
judul:"Pre-shot Routine",
isi:"Rutinitas sebelum melakukan stroke adalah fondasi permainan yang konsisten. Selalu tentukan garis tembak terlebih dahulu, lakukan practice stroke dengan tempo yang sama, berhenti sejenak, kemudian lakukan stroke tanpa ragu. Rutinitas yang konsisten membantu menjaga performa saat tekanan meningkat."
},

{
judul:"Pocket Speed",
isi:"Usahakan object ball masuk dengan kecepatan secukupnya. Pocket speed memberikan toleransi yang lebih besar dibanding memukul terlalu keras sekaligus mempermudah kontrol cue ball menuju posisi berikutnya."
},

{
judul:"Bridge Stabil",
isi:"Panjang bridge yang konsisten membuat timing dan arah cue menjadi lebih mudah diulang. Hindari mengubah panjang bridge tanpa alasan teknis yang jelas."
},

{
judul:"Follow Through",
isi:"Biarkan cue tetap bergerak lurus setelah mengenai cue ball. Follow-through yang penuh membantu menjaga arah pukulan sekaligus menghasilkan transfer tenaga yang lebih konsisten."
},

{
judul:"Cue Ball Control",
isi:"Potting hanyalah langkah pertama. Permainan yang baik dibangun dari kemampuan menempatkan cue ball pada posisi yang memudahkan shot berikutnya."
},

{
judul:"Pattern Play",
isi:"Biasakan merencanakan dua hingga tiga bola berikutnya sebelum melakukan stroke. Semakin baik perencanaan, semakin sedikit recovery shot yang harus dilakukan."
},

{
judul:"Safety",
isi:"Tidak semua posisi layak dipaksakan untuk dipot. Safety yang baik sering kali memberikan peluang menang lebih besar dibanding mencoba shot dengan probabilitas rendah."
},

{
judul:"Straight Stroke",
isi:"Jagalah cue tetap bergerak lurus sepanjang garis tembak. Stroke sederhana, stabil, dan mudah diulang selalu lebih bernilai daripada gerakan yang rumit."
},

{
judul:"Decision Making",
isi:"Jika terdapat dua pilihan dengan peluang hampir sama, pilih keputusan dengan risiko yang lebih kecil. Liga panjang lebih sering dimenangkan oleh pemain yang konsisten mengambil keputusan yang benar."
},

{
judul:"Tempo",
isi:"Gunakan tempo yang sama pada setiap bola, termasuk bola penentu. Jangan mengubah kecepatan practice stroke hanya karena tekanan pertandingan meningkat."
},

{
judul:"Center Ball",
isi:"Mayoritas posisi sebenarnya dapat diselesaikan menggunakan center ball. Semakin sedikit spin yang digunakan, semakin sederhana kontrol cue ball yang diperoleh."
},

{
judul:"Shot Commitment",
isi:"Setelah mengambil keputusan, jalankan stroke dengan penuh keyakinan. Keraguan yang muncul tepat sebelum memukul sering menjadi penyebab utama miss."
}

];


//==================================================
// DATABASE MENTAL
//==================================================

const mentalDatabase=[

{
judul:"Satu Bola pada Satu Waktu",
isi:"Jangan memikirkan hasil akhir pertandingan. Fokuskan perhatian sepenuhnya pada satu shot yang sedang dimainkan. Banyak keputusan kecil yang benar akan menghasilkan pertandingan yang baik."
},

{
judul:"Tetap Tenang",
isi:"Rasa gugup merupakan bagian alami dari kompetisi. Tujuannya bukan menghilangkan rasa gugup, melainkan tetap menjalankan rutinitas yang sama di bawah tekanan."
},

{
judul:"Percaya Rutinitas",
isi:"Saat mulai ragu, jangan mengubah teknik yang telah dilatih. Percayalah pada rutinitas karena konsistensi lebih penting daripada improvisasi."
},

{
judul:"Tempo Sendiri",
isi:"Jangan mengikuti tempo lawan. Bermain terlalu cepat atau terlalu lambat hanya karena lawan akan mengganggu ritme permainan sendiri."
},

{
judul:"Move On",
isi:"Shot yang gagal sudah menjadi masa lalu. Segera alihkan perhatian menuju posisi berikutnya tanpa membawa emosi dari kesalahan sebelumnya."
},

{
judul:"Bahasa Tubuh",
isi:"Postur tubuh yang tenang membantu menjaga fokus sendiri sekaligus mengurangi rasa percaya diri lawan."
},

{
judul:"Nikmati Proses",
isi:"Target utama bukan memenangkan setiap pertandingan, melainkan meningkatkan kualitas setiap keputusan yang diambil di meja."
},

{
judul:"Frame demi Frame",
isi:"Liga panjang dimenangkan melalui akumulasi frame. Jangan terburu-buru mengejar kemenangan besar apabila permainan aman masih dapat menghasilkan poin."
},

{
judul:"Berani Mengambil Jeda",
isi:"Sebelum shot penting, beri diri sendiri satu jeda singkat untuk memastikan keputusan sudah benar. Jeda kecil sering menghasilkan keputusan yang jauh lebih baik."
},

{
judul:"Tetap Objektif",
isi:"Satu miss tidak menentukan kualitas permainan Anda. Nilailah performa berdasarkan keseluruhan pertandingan, bukan hanya satu kesalahan."
},

{
judul:"Percaya Stroke",
isi:"Begitu stance selesai dibangun, biarkan stroke bekerja. Jangan mencoba mengoreksi arah cue pada saat terakhir."
},

{
judul:"Momentum",
isi:"Momentum bukan muncul karena keberuntungan, melainkan karena rangkaian keputusan yang baik dilakukan secara berulang."
}

];


//==================================================
// DATA SOURCE
//==================================================

const klasemenURL =
"https://script.google.com/macros/s/AKfycbweEZmfiYZG9bOtKyQKar7bcW-Zv8sC75bvliYN7Eurq94veGujyNfWTxfCDvAfGn7Ndg/exec";

const pertandinganURL =
"https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS6WoVWincu7nBJyd9r01BsKoCQoa5MKvB8bkjvnuGygU0JZ8YrWT3L0s3Vuq38erG9Quxl2R3JVFNb-mxeshgDai_XAfZvaUl5k6j9mT45khcmhwgUh1DiUpPSv_lubHrEm0wqnYUlcYBuv8OU33AII-9EfnYdHR7YCZ1XfNKyAIdcSdagYVSmZNhA01HFFiXCFyv4M93ifUnykszCk5HWDtSk1prNwqFyd_uJ7xBR1lnizFiu0jvnsCmIk12jxrUpiQsu7-vsRHtvmqZx3GbCVGsXBQ&lib=MQ974VFXeXNHBp6rsCAsq0yJ67tG3SoUN";


//==================================================
// LOAD DATA
//==================================================

Promise.all([

fetch(klasemenURL).then(r=>r.json()),

fetch(pertandinganURL).then(r=>r.json())

])

.then(([klasemen,pertandingan])=>{

buildDatabase(klasemen, pertandingan);

buatHeadline(klasemen);

buatHotPlayer();

buatWarning();

buatTrend(pertandingan);

buatCoaching();

buatMental();

buatStrategy(klasemen);

buatPrediction(klasemen);

buatMatchOfTheDay(pertandingan);

})
.catch(err=>console.log(err));
//==================================================
// HEADLINE
//==================================================

function buatHeadline(data){

    const p = Object.values(ligaData.players);

    if(p.length<5) return;

    const rank =
    [...p].sort((a,b)=>a.rank-b.rank);

    const leader = rank[0];
    const second = rank[1];
    const third = rank[2];

    const headline=[];

    //---------------------------------------
    // Persaingan Juara
    //---------------------------------------

    if(leader.poin-second.poin<=5){

        headline.push(`
        <b>${second.nama}</b> terus membayangi
        <b>${leader.nama}</b>.
        Selisih hanya
        <b>${leader.poin-second.poin}</b>
        frame membuat perebutan posisi pertama
        semakin panas.
        `);

    }

    //---------------------------------------
    // Dominasi Pemuncak
    //---------------------------------------

    if(leader.winRate>=0.80){

        headline.push(`
        <b>${leader.nama}</b>
        tampil sangat konsisten dengan win rate

        <b>${Math.round(leader.winRate*100)}%</b>.

        Konsistensi seperti ini mulai
        menciptakan tekanan bagi seluruh pesaing.
        `);

    }

    //---------------------------------------
    // Persaingan Top 5
    //---------------------------------------

    if(rank.length>=6){

        const gap=
        rank[4].poin-
        rank[5].poin;

        if(Math.abs(gap)<=5){

            headline.push(`
            Persaingan memasuki
            <b>zona Top 5</b>
            mulai memanas.

            Selisih frame yang tipis membuat
            satu kemenangan besar dapat langsung
            mengubah posisi klasemen.
            `);

        }

    }

    //---------------------------------------
    // Pemain Paling Panas
    //---------------------------------------

    const hot=
    [...p].sort((a,b)=>b.form-a.form)[0];

    if(hot.form>=4){

        headline.push(`
        <b>${hot.nama}</b>

        sedang berada dalam performa terbaik.

        Ia memenangkan

        <b>${hot.form}</b>

        dari lima pertandingan terakhir.
        `);

    }

    //---------------------------------------
    // Giant Killer
    //---------------------------------------

    const giant=
    [...p].sort((a,b)=>

    b.giantKiller-
    a.giantKiller

    )[0];

    if(giant.giantKiller>=2){

        headline.push(`
        <b>${giant.nama}</b>

        mulai dikenal sebagai

        <b>Giant Killer</b>.

        Ia telah beberapa kali
        mengalahkan pemain yang berada
        di tier lebih tinggi.
        `);

    }

    //---------------------------------------
    // Win Rate Tinggi
    //---------------------------------------

    const efisien=
    [...p]

    .filter(x=>x.main>=8)

    .sort((a,b)=>

    b.winRate-a.winRate

    )[0];

    if(efisien){

        headline.push(`
        Efisiensi permainan

        <b>${efisien.nama}</b>

        layak mendapat perhatian.

        Dengan win rate

        <b>${Math.round(efisien.winRate*100)}%</b>,

        ia menjadi salah satu pemain
        paling konsisten musim ini.
        `);

    }

    //---------------------------------------
    // Comeback
    //---------------------------------------

    const naik=
    [...p]

    .filter(x=>x.form>=4 && x.rank>5)

    .sort((a,b)=>b.form-a.form)[0];

    if(naik){

        headline.push(`
        Jangan abaikan

        <b>${naik.nama}</b>.

        Performa beberapa pertandingan terakhir
        menunjukkan bahwa ia mulai
        mengancam kelompok papan atas.
        `);

    }

    //---------------------------------------
    // Warning Leader
    //---------------------------------------

    if(leader.current=="L"){

        headline.push(`
        Kekalahan terakhir

        <b>${leader.nama}</b>

        membuka kembali peluang
        bagi para pesaing untuk
        mengejar posisi puncak klasemen.
        `);

    }

    //---------------------------------------
    // Random
    //---------------------------------------

    const berita=

    headline[
        Math.floor(
            Math.random()*headline.length
        )
    ];

    document.getElementById("headline").innerHTML=`

    <div class="card">

        <h2>🔥 Headline Hari Ini</h2>

        <p>

        ${berita}

        </p>

    </div>

    `;

}


//==================================================
// HOT PLAYER
//==================================================

function buatHotPlayer(){

    const p = Object.values(ligaData.players);

    const kandidat=[];

    //--------------------------------------------------
    // Win Rate Tertinggi
    //--------------------------------------------------

    const winRate=
    [...p]
    .filter(x=>x.main>=8)
    .sort((a,b)=>b.winRate-a.winRate)[0];

    kandidat.push({

        judul:"🔥 Win Rate Tertinggi",

        isi:`
        <b>${winRate.nama}</b>

        mencatat win rate

        <b>${Math.round(winRate.winRate*100)}%</b>.

        Konsistensi seperti ini menjadi modal besar
        untuk bertahan di papan atas.
        `

    });

    //--------------------------------------------------
    // Form Terbaik
    //--------------------------------------------------

    const form=
    [...p]
    .sort((a,b)=>b.form-a.form)[0];

    kandidat.push({

        judul:"📈 Sedang Panas",

        isi:`

        <b>${form.nama}</b>

        memenangkan

        <b>${form.form}</b>

        dari lima pertandingan terakhir.

        Tren positif ini membuatnya menjadi salah satu
        pemain paling berbahaya saat ini.

        `

    });

    //--------------------------------------------------
    // Giant Killer
    //--------------------------------------------------

    const giant=
    [...p]
    .sort((a,b)=>b.giantKiller-a.giantKiller)[0];

    if(giant.giantKiller>0){

        kandidat.push({

            judul:"💣 Giant Killer",

            isi:`

            <b>${giant.nama}</b>

            beberapa kali berhasil
            mengalahkan pemain
            tier yang lebih tinggi.

            Ia mulai menjadi ancaman
            bagi unggulan liga.

            `

        });

    }

    //--------------------------------------------------
    // Raja 9-8
    //--------------------------------------------------

    const clutch=
    [...p]
    .sort((a,b)=>b.menangTipis-a.menangTipis)[0];

    kandidat.push({

        judul:"🎯 Raja Duel Ketat",

        isi:`

        <b>${clutch.nama}</b>

        paling sering memenangkan
        pertandingan ketat.

        Mental seperti ini
        sering menjadi pembeda
        pada akhir musim.

        `

    });

    //--------------------------------------------------
    // Dominasi Besar
    //--------------------------------------------------

    const dominan=
    [...p]
    .sort((a,b)=>b.menangBesar-a.menangBesar)[0];

    kandidat.push({

        judul:"🚀 Dominan",

        isi:`

        <b>${dominan.nama}</b>

        paling sering menang
        dengan margin besar.

        Hal ini menunjukkan
        kemampuannya mengendalikan pertandingan
        sejak awal.

        `

    });

    //--------------------------------------------------
    // Efisien
    //--------------------------------------------------

    const frame=
    [...p]
    .sort((a,b)=>b.frameDiff-a.frameDiff)[0];

    kandidat.push({

        judul:"⭐ Efisiensi Frame",

        isi:`

        Dengan selisih frame

        <b>+${frame.frameDiff}</b>,

        <b>${frame.nama}</b>

        menjadi salah satu pemain
        paling efisien musim ini.

        `

    });

    //--------------------------------------------------
    // Comeback
    //--------------------------------------------------

    const comeback=
    [...p]
    .filter(x=>x.rank>8)
    .sort((a,b)=>b.form-a.form)[0];

    if(comeback){

        kandidat.push({

            judul:"📢 Mulai Bangkit",

            isi:`

            Jangan remehkan

            <b>${comeback.nama}</b>.

            Performanya beberapa pertandingan terakhir
            menunjukkan tanda-tanda kebangkitan.

            `

        });

    }

    //--------------------------------------------------
    // Tier Rendah Berbahaya
    //--------------------------------------------------

    const underdog=
    [...p]
    .filter(x=>x.tier>=3)
    .sort((a,b)=>b.winRate-a.winRate)[0];

    kandidat.push({

        judul:"⚡ Underdog",

        isi:`

        Di antara pemain Tier 3 dan 4,

        <b>${underdog.nama}</b>

        tampil paling konsisten.

        Ia berpotensi menjadi
        pengganggu serius
        bagi papan atas.

        `

    });

    //--------------------------------------------------

    const pilih=

    kandidat[
        Math.floor(
            Math.random()*kandidat.length
        )
    ];

    document.getElementById("hotPlayer").innerHTML=`

    <div class="card">

    <h2>${pilih.judul}</h2>

    <p>

    ${pilih.isi}

    </p>

    </div>

    `;

}


//==================================================
// WARNING ZONE
//==================================================

function buatWarning(){

    const p = Object.values(ligaData.players);

    const warning=[];

    //--------------------------------------------------
    // Frame Difference Terburuk
    //--------------------------------------------------

    const frame=
    [...p]
    .sort((a,b)=>a.frameDiff-b.frameDiff)[0];

    warning.push({

        judul:"⚠ Tekanan Selisih Frame",

        isi:`

        <b>${frame.nama}</b>

        masih memiliki selisih frame

        <b>${frame.frameDiff}</b>.

        Mengurangi kekalahan dengan margin besar
        akan jauh lebih berpengaruh dibanding
        mengejar kemenangan spektakuler.

        `

    });

    //--------------------------------------------------
    // Kalah Beruntun
    //--------------------------------------------------

    const lose=
    [...p]
    .filter(x=>x.current=="L")
    .sort((a,b)=>b.streak-a.streak)[0];

    if(lose){

        warning.push({

            judul:"📉 Kehilangan Momentum",

            isi:`

            <b>${lose.nama}</b>

            sedang mengalami

            <b>${lose.streak}</b>

            kekalahan beruntun.

            Satu kemenangan saja
            dapat mengembalikan
            kepercayaan dirinya.

            `

        });

    }

    //--------------------------------------------------
    // Sering Kalah Tipis
    //--------------------------------------------------

    const clutch=
    [...p]
    .sort((a,b)=>b.kalahTipis-a.kalahTipis)[0];

    if(clutch.kalahTipis>1){

        warning.push({

            judul:"😓 Kurang Beruntung",

            isi:`

            <b>${clutch.nama}</b>

            beberapa kali kalah
            dengan selisih satu frame.

            Sedikit peningkatan pada
            bola-bola penentu dapat
            mengubah hasil pertandingan.

            `

        });

    }

    //--------------------------------------------------
    // Tier Atas Sering Tumbang
    //--------------------------------------------------

    const tier=
    [...p]
    .filter(x=>x.tier<=2)
    .sort((a,b)=>b.kalahTierBawah-a.kalahTierBawah)[0];

    if(tier.kalahTierBawah>0){

        warning.push({

            judul:"⚡ Waspada",

            isi:`

            <b>${tier.nama}</b>

            sudah beberapa kali
            dikalahkan pemain tier
            di bawahnya.

            Persaingan musim ini
            semakin tidak mudah
            diprediksi.

            `

        });

    }

    //--------------------------------------------------
    // Win Rate Rendah
    //--------------------------------------------------

    const rendah=
    [...p]
    .filter(x=>x.main>=8)
    .sort((a,b)=>a.winRate-b.winRate)[0];

    warning.push({

        judul:"🚨 Perlu Bangkit",

        isi:`

        Win rate

        <b>${rendah.nama}</b>

        baru mencapai

        <b>${Math.round(rendah.winRate*100)}%</b>.

        Konsistensi menjadi pekerjaan
        rumah terbesarnya.

        `

    });

    //--------------------------------------------------
    // Banyak Kalah Besar
    //--------------------------------------------------

    const besar=
    [...p]
    .sort((a,b)=>b.kalahBesar-a.kalahBesar)[0];

    if(besar.kalahBesar>0){

        warning.push({

            judul:"🛡 Saatnya Memperbaiki Defense",

            isi:`

            <b>${besar.nama}</b>

            cukup sering mengalami
            kekalahan dengan margin besar.

            Mengurangi satu atau dua frame
            yang hilang di setiap pertandingan
            akan sangat membantu klasemen.

            `

        });

    }

    //--------------------------------------------------

    const pilih=

    warning[
        Math.floor(
            Math.random()*warning.length
        )
    ];

    document.getElementById("warning").innerHTML=`

    <div class="card">

        <h2>${pilih.judul}</h2>

        <p>

        ${pilih.isi}

        </p>

    </div>

    `;

}


//==================================================
// TREN 5 PERTANDINGAN TERAKHIR
//==================================================

function buatTrend(data){

    const form={};

    for(let i=1;i<data.length;i++){

        const winner=data[i][6];
        const loser=data[i][7];

        if(!winner||!loser)continue;

        if(!form[winner])form[winner]=[];
        if(!form[loser])form[loser]=[];

        form[winner].push("W");
        form[loser].push("L");

    }

    let nama="";
    let menang=-1;

    Object.keys(form).forEach(player=>{

        const lima=form[player].slice(-5);

        const total=
        lima.filter(x=>x==="W").length;

        if(total>menang){

            menang=total;
            nama=player;

        }

    });

    document.getElementById("trend").innerHTML=`

    <div class="card">

        <h2>📈 Tren Liga</h2>

        <p>

        <b>${nama}</b>

        sedang berada dalam performa terbaik.

        Dari lima pertandingan terakhir,

        ia memenangkan

        <b>${menang}</b>

        pertandingan.

        </p>

    </div>

    `;

}
//==================================================
// MATCH OF THE DAY
//==================================================

function buatMatchOfTheDay(data){

    const daftar=[];

    for(let i=1;i<data.length;i++){

        const row=data[i];

        if(
            row &&
            row[0]!=="" &&
            !isNaN(row[0]) &&
            row[2] &&
            row[5]
        ){

            daftar.push(row);

        }

    }

    if(daftar.length===0){

        document.getElementById("matchOfTheDay").innerHTML="";

        return;

    }

    // Ambil 10 pertandingan terbaru
    const terakhir=daftar.slice(-10);

    // Cari pertandingan dengan margin paling kecil
    let terbaik=terakhir[0];

    let marginTerbaik=Math.abs(

        Number(terbaik[3])-

        Number(terbaik[4])

    );

    for(let i=1;i<terakhir.length;i++){

        const margin=Math.abs(

            Number(terakhir[i][3])-

            Number(terakhir[i][4])

        );

        if(margin<marginTerbaik){

            marginTerbaik=margin;
            terbaik=terakhir[i];

        }

    }

    const ronde=terbaik[1];

    const playerA=terbaik[2];
    const scoreA=Number(terbaik[3]);

    const scoreB=Number(terbaik[4]);
    const playerB=terbaik[5];

    const winner=terbaik[6];

    let narasi="";

    if(marginTerbaik===1){

        narasi=`
        Pertandingan paling dramatis pada pekan ini.

        <b>${winner}</b>

        berhasil memenangkan duel ketat dengan selisih
        hanya satu frame.
        `;

    }

    else if(marginTerbaik<=3){

        narasi=`
        <b>${winner}</b>

        harus bekerja keras sebelum akhirnya
        mengamankan kemenangan penting.
        `;

    }

    else{

        narasi=`
        <b>${winner}</b>

        tampil dominan sejak awal pertandingan
        dan berhasil menjaga keunggulan hingga selesai.
        `;

    }

    document.getElementById("matchOfTheDay").innerHTML=`

    <div class="card">

        <h2>🎱 Match of the Day</h2>

        <p>

        <b>Ronde ${ronde}</b>

        <br><br>

        ${playerA}

        <b>${scoreA} - ${scoreB}</b>

        ${playerB}

        <br><br>

        ${narasi}

        </p>

    </div>

    `;

}
//==================================================
// COACHING HARI INI
//==================================================

function buatCoaching(){

    const materi =
    coachingDatabase[
        Math.floor(
            Math.random()*coachingDatabase.length
        )
    ];

    let html = `

    <div class="card">

        <h2>🎯 Coaching Hari Ini</h2>

        <h3>${materi.judul}</h3>

        <p>${materi.isi}</p>

        <hr>

    `;

    html += `

        <h3>🏆 Player Rank 1–10</h3>

        <p>

        Fokus utama adalah mempertahankan standar permainan.

        Kurangi risiko yang tidak perlu,

        jaga tempo tetap sama,

        manfaatkan safety ketika peluang pot kecil,

        dan usahakan setiap kemenangan menghasilkan

        selisih frame yang baik.

        </p>

    `;

    html += `

        <h3>📈 Player Rank 11–20</h3>

        <p>

        Kelompok ini masih memiliki peluang besar

        untuk naik klasemen.

        Prioritas latihan adalah

        meningkatkan konsistensi,

        memperbaiki cue ball control,

        serta mengubah peluang menjadi kemenangan.

        </p>

    `;

    html += `

        <h3>🌱 Player Rank 21+</h3>

        <p>

        Bangun fondasi permainan.

        Fokus pada stroke lurus,

        center ball,

        pocket speed,

        dan mengurangi kesalahan sendiri.

        Kemajuan kecil yang dilakukan secara konsisten

        akan menghasilkan kenaikan peringkat.

        </p>

    `;

    html += `

    </div>

    `;

    document.getElementById("coach").innerHTML = html;

}
//==================================================
// MENTAL GAME
//==================================================

function buatMental(){

    const materi =
    mentalDatabase[
        Math.floor(
            Math.random()*mentalDatabase.length
        )
    ];

    document.getElementById("mental").innerHTML=`

    <div class="card">

        <h2>🧠 Mental Game</h2>

        <h3>${materi.judul}</h3>

        <p>

        ${materi.isi}

        </p>

        <hr>

        <p>

        <b>Pengingat Hari Ini</b>

        <br><br>

        ✔ Bermain dengan tempo yang sama dari awal sampai akhir.

        <br>

        ✔ Jangan mempercepat stroke pada bola penting.

        <br>

        ✔ Percaya pada rutinitas yang sudah dilatih.

        <br>

        ✔ Fokus hanya pada satu shot yang sedang dimainkan.

        <br>

        ✔ Setelah stroke selesai, segera move on ke posisi berikutnya.

        </p>

    </div>

    `;

}
//==================================================
// STRATEGI MINGGU INI
//==================================================

function buatStrategy(data){

    if(data.length<3)return;

    const leader=data[1];
    const runner=data[2];

    const gap=
    Number(leader[8])-
    Number(runner[8]);

    let judul="";
    let isi="";

    if(gap<=5){

        judul="🔥 Liga Masih Sangat Terbuka";

        isi=`
        Perebutan posisi puncak masih sangat ketat.

        Setiap frame mempunyai nilai yang besar.

        Bermain terlalu agresif justru dapat
        merugikan klasemen.

        Prioritaskan keputusan yang memiliki
        probabilitas paling tinggi.
        `;

    }

    else if(gap<=15){

        judul="⚔ Saatnya Mengejar";

        isi=`
        Pemimpin klasemen masih dapat dikejar.

        Fokus utama bukan mencari kemenangan besar,
        tetapi menjaga kemenangan secara konsisten.

        Menang dengan kehilangan frame sesedikit mungkin
        akan memberi dampak besar terhadap klasemen.
        `;

    }

    else{

        judul="👑 Pemimpin Mulai Menjauh";

        isi=`
        Pemuncak klasemen mulai menciptakan jarak.

        Pemain lain sebaiknya tidak terburu-buru.

        Bangun momentum sedikit demi sedikit,
        kurangi kekalahan besar,
        dan manfaatkan setiap peluang
        untuk memperbaiki selisih frame.
        `;

    }

    document.getElementById("strategy").innerHTML=`

    <div class="card">

        <h2>♟ Strategi Minggu Ini</h2>

        <h3>${judul}</h3>

        <p>${isi}</p>

    </div>

    `;

}
//==================================================
// AI PREDICTION
//==================================================

function buatPrediction(data){

    if(data.length<3)return;

    const leader=data[1];
    const runner=data[2];

    const gap=
    Number(leader[8])-
    Number(runner[8]);

    let judul="";
    let isi="";

    if(gap<=5){

        judul="🏆 Perebutan Gelar Masih Terbuka";

        isi=`
        Selisih antarpemimpin klasemen masih sangat tipis.

        Satu kemenangan atau satu kekalahan saja
        dapat mengubah posisi puncak.

        Liga diperkirakan akan berlangsung ketat
        hingga pekan-pekan terakhir.
        `;

    }

    else if(gap<=15){

        judul="👑 Pemimpin Memiliki Keunggulan";

        isi=`
        Pemuncak klasemen mulai memperoleh keuntungan.

        Namun jarak tersebut masih realistis
        untuk dikejar apabila pesaing mampu
        menjaga kemenangan secara konsisten.

        Efisiensi frame akan menjadi faktor penting.
        `;

    }

    else{

        judul="🚀 Peluang Juara Sangat Besar";

        isi=`
        Pemimpin klasemen telah menciptakan
        jarak yang cukup nyaman.

        Apabila performanya tetap stabil,
        peluang mempertahankan posisi pertama
        sangat tinggi.

        Tantangan terbesar kini adalah menjaga
        konsistensi hingga akhir musim.
        `;

    }

    document.getElementById("prediction").innerHTML=`

    <div class="card">

        <h2>🔮 Prediksi AI</h2>

        <h3>${judul}</h3>

        <p>${isi}</p>

    </div>

    `;

}
