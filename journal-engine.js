// ===============================
// DATA SOURCE
// ===============================

const klasemenURL =
"https://script.google.com/macros/s/AKfycbweEZmfiYZG9bOtKyQKar7bcW-Zv8sC75bvliYN7Eurq94veGujyNfWTxfCDvAfGn7Ndg/exec";

const pertandinganURL =
"https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS6WoVWincu7nBJyd9r01BsKoCQoa5MKvB8bkjvnuGygU0JZ8YrWT3L0s3Vuq38erG9Quxl2R3JVFNb-mxeshgDai_XAfZvaUl5k6j9mT45khcmhwgUh1DiUpPSv_lubHrEm0wqnYUlcYBuv8OU33AII-9EfnYdHR7YCZ1XfNKyAIdcSdagYVSmZNhA01HFFiXCFyv4M93ifUnykszCk5HWDtSk1prNwqFyd_uJ7xBR1lnizFiu0jvnsCmIk12jxrUpiQsu7-vsRHtvmqZx3GbCVGsXBQ&lib=MQ974VFXeXNHBp6rsCAsq0yJ67tG3SoUN";

Promise.all([
    fetch(klasemenURL).then(r => r.json()),
    fetch(pertandinganURL).then(r => r.json())
])
.then(([klasemen, pertandingan]) => {

    buatHeadline(klasemen);

    buatHotPlayer(klasemen);

    buatWarning(klasemen);

    buatTrend(pertandingan);

    buatMatchOfTheDay(pertandingan);

    buatCoaching(klasemen, pertandingan);

    buatMental(klasemen);

    buatStrategy(klasemen);

    buatPrediction(klasemen);

})
.catch(err=>{
    console.log(err);
});

//==========================================
// HEADLINE
//==========================================

function buatHeadline(data){

    const juara=data[1];
    const runner=data[2];
    const ketiga=data[3];

    const selisih=
    Number(juara[8])-Number(runner[8]);

    let narasi="";

    if(selisih<=5){

        narasi=
        `<b>${runner[1]}</b> terus menekan <b>${juara[1]}</b> di puncak klasemen. Selisih hanya <b>${selisih}</b> frame sehingga perebutan gelar diperkirakan berlangsung hingga akhir liga.`;

    }

    else if(selisih<=15){

        narasi=
        `<b>${juara[1]}</b> masih memimpin klasemen dengan nyaman, namun <b>${runner[1]}</b> dan <b>${ketiga[1]}</b> masih memiliki peluang mengejar apabila mampu menjaga konsistensi.`;

    }

    else{

        narasi=
        `<b>${juara[1]}</b> mulai menciptakan jarak dari para pesaingnya. Konsistensi akan menjadi kunci untuk mempertahankan posisi puncak hingga akhir musim.`;

    }

    document.getElementById("headline").innerHTML=`

    <div class="card">

        <h2>🔥 Headline Hari Ini</h2>

        <p>${narasi}</p>

    </div>

    `;

}



//==========================================
// HOT PLAYER
//==========================================

function buatHotPlayer(data){

    let terbaik=data[1];

    for(let i=2;i<data.length;i++){

        if(Number(data[i][7])>Number(terbaik[7])){

            terbaik=data[i];

        }

    }

    document.getElementById("hotPlayer").innerHTML=`

    <div class="card">

        <h2>⭐ Player on Fire</h2>

        <p>

        <b>${terbaik[1]}</b>

        memiliki selisih frame terbaik di liga yaitu

        <b>+${terbaik[7]}</b>.

        Hal ini menunjukkan kemampuan mengubah kemenangan menjadi poin dengan sangat efisien.

        </p>

    </div>

    `;

}



//==========================================
// WARNING ZONE
//==========================================

function buatWarning(data){

    let terburuk=data[1];

    for(let i=2;i<data.length;i++){

        if(Number(data[i][7])<Number(terburuk[7])){

            terburuk=data[i];

        }

    }

    document.getElementById("warning").innerHTML=`

    <div class="card">

        <h2>⚠ Warning Zone</h2>

        <p>

        <b>${terburuk[1]}</b>

        saat ini memiliki selisih frame

        <b>${terburuk[7]}</b>.

        Fokus utama berikutnya adalah mengurangi kekalahan dengan margin besar. Bahkan ketika kalah, setiap frame tetap sangat berharga bagi klasemen akhir.

        </p>

    </div>

    `;

}
//==========================================
// FORM TERAKHIR
//==========================================

function buatTrend(pertandingan){

    let form={};

    for(let i=1;i<pertandingan.length;i++){

        let winner=pertandingan[i][6];
        let loser=pertandingan[i][7];

        if(!form[winner]) form[winner]=[];
        if(!form[loser]) form[loser]=[];

        form[winner].push("W");
        form[loser].push("L");

    }

    let terbaik="";
    let terbanyak=0;

    for(let pemain in form){

        let lima=form[pemain].slice(-5);

        let menang=lima.filter(x=>x=="W").length;

        if(menang>terbanyak){

            terbanyak=menang;
            terbaik=pemain;

        }

    }

    document.getElementById("trend").innerHTML=`

    <div class="card">

    <h2>📈 Tren Liga</h2>

    <p>

    <b>${terbaik}</b>

    sedang berada dalam performa terbaik.

    Dalam 5 pertandingan terakhir ia memenangkan

    <b>${terbanyak}</b> pertandingan.

    </p>

    </div>

    `;

}
//==========================================
// MATCH OF THE DAY
// Mengambil pertandingan terbaru dari 10 pertandingan terakhir
//==========================================

function buatMatchOfTheDay(data){

    let pertandinganValid=[];


    // ambil pertandingan yang memiliki nomor ronde
    for(let i=1;i<data.length;i++){

        if(
            data[i][0] &&
            !isNaN(data[i][0]) &&
            data[i][2] &&
            data[i][5]
        ){

            pertandinganValid.push(data[i]);

        }

    }


    if(pertandinganValid.length===0){

        document.getElementById("prediction").innerHTML="";

        return;

    }



    // hanya lihat 10 pertandingan terakhir
    let terakhir = pertandinganValid.slice(-10);



    // cari pertandingan paling dramatis
    let terbaik = terakhir[0];
    let marginTerbaik = Math.abs(
        Number(terbaik[3])-Number(terbaik[4])
    );


    for(let i=1;i<terakhir.length;i++){

        let margin =
        Math.abs(
            Number(terakhir[i][3])-
            Number(terakhir[i][4])
        );


        if(margin < marginTerbaik){

            terbaik=terakhir[i];
            marginTerbaik=margin;

        }

    }



    const ronde   = terbaik[1];
    const playerA = terbaik[2];
    const scoreA  = terbaik[3];
    const scoreB  = terbaik[4];
    const playerB = terbaik[5];
    const winner  = terbaik[6];


    let narasi="";


    if(marginTerbaik==1){

        narasi=
        `Pertandingan paling dramatis. 
        <b>${winner}</b> berhasil memenangkan duel ketat 
        dengan selisih hanya satu frame.`;

    }

    else if(marginTerbaik<=3){

        narasi=
        `<b>${winner}</b> harus berjuang keras 
        sebelum akhirnya mengamankan kemenangan penting.`;

    }

    else{

        narasi=
        `<b>${winner}</b> tampil dominan dan berhasil 
        mengontrol pertandingan sejak awal.`;

    }



    document.getElementById("prediction").innerHTML=`

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
//==========================================
// COACHING
//==========================================

function buatCoaching(data){

    let html="";

    for(let i=1;i<data.length;i++){

        let rank=i;
        let nama=data[i][1];
        let menang=Number(data[i][3]);
        let kalah=Number(data[i][4]);
        let selisih=Number(data[i][7]);


        if(rank<=10){

            html += `
            <p>
            🥇 <b>${nama}</b>:
            Pertahankan standar permainan.
            Fokus berikutnya adalah menjaga konsistensi kemenangan
            dan menghindari kekalahan dengan margin besar.
            </p>
            `;

        }

        else if(rank<=20){

            html += `
            <p>
            📈 <b>${nama}</b>:
            Peluang naik klasemen masih terbuka.
            Prioritas utama adalah mengubah pertandingan ketat menjadi kemenangan
            dan mengambil poin dari pemain papan atas.
            </p>
            `;

        }

        else{

            html += `
            <p>
            🚀 <b>${nama}</b>:
            Jangan mengejar kemenangan besar terlebih dahulu.
            Bangun momentum dengan mengurangi kesalahan,
            karena setiap frame dapat memperbaiki posisi klasemen.
            </p>
            `;

        }

    }


    document.getElementById("coach").innerHTML=

    `
    <div class="card">

    <h2>🎯 Coaching Liga</h2>

    ${html}

    </div>
    `;

}



//==========================================
// MENTAL
//==========================================

function buatMental(data){

    const pertama=data[1];
    const kedua=data[2];


    let jarak=
    Number(pertama[8])-Number(kedua[8]);


    let narasi;


    if(jarak<=5){

        narasi=
        `
        Perebutan puncak sangat panas.
        <b>${kedua[1]}</b> hanya terpaut sedikit dari
        <b>${pertama[1]}</b>.
        Setiap pertandingan memiliki nilai penting.
        Jangan bermain terburu-buru.
        `;

    }

    else{

        narasi=
        `
        <b>${pertama[1]}</b> memiliki ruang aman sementara.
        Namun tekanan terbesar adalah menjaga fokus,
        karena liga masih panjang dan momentum dapat berubah.
        `;

    }


    document.getElementById("mental").innerHTML=

    `
    <div class="card">

    <h2>🧠 Mental Liga</h2>

    <p>${narasi}</p>

    </div>
    `;

}



//==========================================
// STRATEGI
//==========================================

function buatStrategi(data){


let top=data[1];

let narasi="";


if(Number(top[7])>30){

narasi=
`
Pemimpin klasemen memiliki keunggulan besar.
Strategi terbaik adalah bermain aman,
mengurangi risiko kesalahan,
dan menjaga kemenangan rutin.
`;

}

else{

narasi=
`
Persaingan sangat ketat.
Strategi terbaik adalah mencari kemenangan beruntun
karena perubahan kecil dapat mengubah posisi klasemen.
`;

}



document.getElementById("strategy").innerHTML=

`
<div class="card">

<h2>♟ Strategi Liga</h2>

<p>${narasi}</p>

</div>
`;

}



//==========================================
// PREDIKSI
//==========================================

function buatPrediksi(data){

let pertama=data[1];
let kedua=data[2];


let prediksi="";


let jarak=
Number(pertama[8])-Number(kedua[8]);


if(jarak<=5){

prediksi=
`
Liga sangat terbuka.
Perebutan juara kemungkinan akan berubah
apabila pemimpin klasemen kehilangan momentum.
`;

}

else{

prediksi=
`
Pemimpin klasemen memiliki peluang besar,
namun konsistensi tetap menjadi faktor utama
hingga pertandingan terakhir.
`;

}



document.getElementById("prediction").innerHTML=

`
<div class="card">

<h2>🔮 Prediksi Liga</h2>

<p>${prediksi}</p>

</div>

`;

}
//==========================================
// COACHING RANK
//==========================================

function buatCoaching(data){

    let rank1_10 = `
    Pemain papan atas sudah memiliki fondasi permainan yang kuat.
    Fokus berikutnya bukan hanya mencari kemenangan,
    tetapi meningkatkan kualitas keputusan.

    Prioritas latihan:
    - Menjaga tempo stroke tetap stabil saat tekanan tinggi.
    - Memilih safety ketika peluang pot terlalu kecil.
    - Memperbaiki kontrol cue ball agar kemenangan semakin meyakinkan.
    `;


    let rank10_20 = `
    Pemain kelompok menengah memiliki potensi besar untuk naik peringkat.
    Perbedaan utama dengan papan atas biasanya berada pada konsistensi.

    Prioritas latihan:
    - Kurangi kesalahan mudah setelah mendapatkan peluang.
    - Bangun rutinitas sebelum setiap pukulan.
    - Latih penyelesaian bola 7, 8, dan 9 agar kemenangan tidak terlepas.
    `;


    let rank20_30 = `
    Pemain kelompok ini harus membangun fondasi permainan terlebih dahulu.

    Fokus utama:
    - Membuat stroke lebih lurus dan sederhana.
    - Mengutamakan pukulan center ball.
    - Melatih kontrol tenaga daripada memaksakan pukulan sulit.

    Kemajuan kecil setiap hari akan menghasilkan peningkatan besar dalam klasemen.
    `;


    document.getElementById("coach").innerHTML=`

    <div class="card">

    <h2>🎯 Coaching Liga</h2>

    <h3>🏆 Player Rank 1 - 10</h3>
    <p>${rank1_10}</p>


    <h3>📈 Player Rank 10 - 20</h3>
    <p>${rank10_20}</p>


    <h3>🌱 Player Rank 20 - 30</h3>
    <p>${rank20_30}</p>


    </div>

    `;

}
//==========================================
// COACHING PLAYER
//==========================================

function buatCoaching(data){

    let teks="";

    teks += `
    <div class="card">

    <h2>🎯 Coaching Hari Ini</h2>

    `;


    teks += `
    <p>
    <b>Player Rank 1-10</b><br>
    Fokus utama adalah menjaga standar permainan.
    Jangan mengejar kemenangan dengan risiko tinggi.
    Pertahankan rutinitas pre-shot, kontrol tempo,
    dan minimalkan kesalahan pada bola mudah.
    Konsistensi adalah pembeda pemain papan atas.
    </p>
    `;


    teks += `
    <p>
    <b>Player Rank 11-20</b><br>
    Prioritas peningkatan adalah mengubah peluang menjadi poin.
    Perbaiki keputusan safety, kontrol cue ball,
    serta kemampuan menutup pertandingan ketika sudah unggul.
    Setiap frame memiliki nilai penting untuk mengejar klasemen.
    </p>
    `;


    teks += `
    <p>
    <b>Player Rank 21-30</b><br>
    Fokus pembangunan fondasi permainan.
    Utamakan akurasi potting, pukulan aman,
    dan mengurangi kesalahan sendiri.
    Kemenangan kecil yang konsisten akan memperbaiki posisi.
    </p>
    `;


    teks += `
    </div>
    `;


    document.getElementById("coach").innerHTML=teks;

}



//==========================================
// MENTAL GAME
//==========================================

function buatMental(data){

document.getElementById("mental").innerHTML=`

<div class="card">

<h2>🧠 Mental Game</h2>

<p>
Tekanan terbesar dalam liga bukan hanya berasal dari lawan,
tetapi dari keputusan sendiri ketika pertandingan memasuki
frame-frame akhir.

Tetap gunakan tempo yang sama saat latihan maupun pertandingan.
Jangan mempercepat stroke ketika menghadapi bola penting.
Pemain yang mampu menjaga ketenangan biasanya memenangkan
lebih banyak frame krusial.
</p>

</div>

`;

}



//==========================================
// STRATEGI
//==========================================

function buatStrategi(data){

const leader=data[1];
const posisi2=data[2];

const selisih=
Number(leader[8])-Number(posisi2[8]);


let teks="";


if(selisih<=5){

teks=
`
Persaingan papan atas sangat ketat.
Strategi terbaik adalah bermain lebih agresif,
karena setiap kemenangan dapat langsung mengubah posisi klasemen.
`;

}

else if(selisih<=15){

teks=
`
Jarak klasemen masih dapat dikejar.
Prioritaskan kemenangan konsisten daripada mencoba
permainan spektakuler dengan risiko tinggi.
`;

}

else{

teks=
`
Pemimpin klasemen memiliki jarak yang cukup besar.
Fokus utama pemain lain adalah membangun momentum,
mengurangi kekalahan besar, dan mengambil keuntungan
dari pertandingan berikutnya.
`;

}


document.getElementById("strategy").innerHTML=

`

<div class="card">

<h2>♟ Strategi Liga</h2>

<p>${teks}</p>

</div>

`;

}



//==========================================
// PREDIKSI
//==========================================

function buatPrediksi(data){

const leader=data[1];

const runner=data[2];


document.getElementById("prediction").innerHTML=

`

<div class="card">

<h2>🔮 Prediksi Fase Berikutnya</h2>


<p>

Dengan kondisi klasemen saat ini,
<b>${leader[1]}</b> berada pada posisi terbaik.

Namun perkembangan liga masih dapat berubah.
<b>${runner[1]}</b> dan pesaing lainnya masih memiliki peluang
apabila mampu menjaga konsistensi kemenangan.

Pertandingan berikutnya akan sangat menentukan perubahan
peta persaingan.

</p>

</div>

`;

}
