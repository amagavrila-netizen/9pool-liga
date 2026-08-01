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

function buatCoaching(data, pertandingan){

    const nomor1=data[1];
    const nomor2=data[2];


    let narasi="";


    if(Number(nomor1[7])>40){

        narasi=
        `${nomor1[1]} sedang menunjukkan performa sangat stabil. Fokus berikutnya adalah menjaga konsistensi dan menghindari kehilangan frame besar.`;

    }

    else{

        narasi=
        `Persaingan liga masih terbuka. Pemain papan atas harus fokus memenangkan pertandingan tipis karena setiap frame sangat menentukan klasemen.`;

    }


    document.getElementById("coach").innerHTML=`

    <div class="card">

    <h2>🎯 Coaching</h2>

    <p>${narasi}</p>

    </div>

    `;

}





//==========================================
// MENTAL
//==========================================

function buatMental(data){

    const leader=data[1];
    const rival=data[2];


    let narasi="";


    let jarak=
    Number(leader[8])-Number(rival[8]);


    if(jarak<=10){

        narasi=
        `Tekanan mental sedang tinggi. ${rival[1]} masih sangat dekat dengan ${leader[1]}. Setiap pertandingan memiliki nilai besar.`;

    }

    else{

        narasi=
        `${leader[1]} memiliki keuntungan psikologis karena berada di posisi puncak. Tantangan berikutnya adalah menjaga fokus.`;

    }



    document.getElementById("mental").innerHTML=`

    <div class="card">

    <h2>🧠 Mental Liga</h2>

    <p>${narasi}</p>

    </div>

    `;

}





//==========================================
// STRATEGY
//==========================================

function buatStrategy(data){

    const leader=data[1];


    let narasi=
    "";


    if(Number(leader[4])>5){

        narasi=
        `Strategi utama adalah mengurangi kekalahan. Margin kecil saat kalah dapat menjaga posisi klasemen.`;

    }

    else{

        narasi=
        `Pertahankan tekanan. Kemenangan beruntun akan menjadi faktor terbesar dalam perebutan gelar.`;

    }



    document.getElementById("strategy").innerHTML=`

    <div class="card">

    <h2>♟ Strategi</h2>

    <p>${narasi}</p>

    </div>

    `;

}





//==========================================
// PREDICTION
//==========================================

function buatPrediction(data){

    const satu=data[1];
    const dua=data[2];


    let narasi="";


    let selisih=
    Number(satu[8])-Number(dua[8]);


    if(selisih<10){

        narasi=
        `Liga masih sangat terbuka. Perebutan posisi pertama kemungkinan akan berubah apabila pemimpin klasemen kehilangan momentum.`;

    }

    else{

        narasi=
        `${satu[1]} menjadi kandidat kuat mempertahankan posisi puncak selama mampu menjaga performa saat ini.`;

    }



    document.getElementById("prediction").innerHTML=`

    <div class="card">

    <h2>🔮 Prediksi Liga</h2>

    <p>${narasi}</p>

    </div>

    `;

}
