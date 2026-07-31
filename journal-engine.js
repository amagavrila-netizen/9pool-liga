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
//==========================================

function buatMatchOfTheDay(data){

    let terbaik = null;
    let skorTerbaik = -9999;

    for(let i=1;i<data.length;i++){

        let row = data[i];

        if(row[0]=="" || row[0]==null) continue;

        let scoreA = Number(row[3]);
        let scoreB = Number(row[4]);

        if(isNaN(scoreA) || isNaN(scoreB)) continue;

        let margin = Math.abs(scoreA-scoreB);

        let skor = 0;

        // Semakin tipis semakin menarik
        if(margin==1) skor+=100;
        else if(margin==2) skor+=80;
        else if(margin==3) skor+=60;
        else if(margin==4) skor+=40;
        else skor+=20;

        // Total frame tinggi = duel panjang
        skor += scoreA + scoreB;

        // Kedua pemain Tier 1-3 lebih menarik
        const namaA=row[2];
        const namaB=row[5];

        if(
            namaA.includes("1") ||
            namaA.includes("2") ||
            namaA.includes("3")
        ) skor+=10;

        if(
            namaB.includes("1") ||
            namaB.includes("2") ||
            namaB.includes("3")
        ) skor+=10;

        if(skor>skorTerbaik){

            skorTerbaik=skor;
            terbaik=row;

        }

    }

    if(terbaik==null){

        document.getElementById("prediction").innerHTML="";
        return;

    }

    const ronde=terbaik[1];
    const playerA=terbaik[2];
    const scoreA=Number(terbaik[3]);
    const scoreB=Number(terbaik[4]);
    const playerB=terbaik[5];
    const winner=terbaik[6];

    const margin=Math.abs(scoreA-scoreB);

    let narasi="";

    if(margin==1){

        narasi=
        `Pertandingan paling dramatis sejauh ini. <b>${winner}</b> berhasil mencuri kemenangan hanya dengan selisih satu frame. Duel berlangsung hingga bola terakhir dan menjadi salah satu pertandingan terbaik musim ini.`;

    }

    else if(margin<=3){

        narasi=
        `<b>${winner}</b> menunjukkan mental yang kuat dalam pertandingan yang berlangsung ketat. Kedua pemain saling mengejar hingga frame-frame akhir sebelum kemenangan berhasil diamankan.`;

    }

    else{

        narasi=
        `<b>${winner}</b> tampil lebih konsisten sepanjang pertandingan dan mampu mengendalikan tempo permainan hingga memastikan kemenangan dengan cukup meyakinkan.`;

    }

    document.getElementById("prediction").innerHTML=`

    <div class="card">

        <h2>🎱 Match of the Day</h2>

        <p>

        <b>Ronde ${ronde}</b>

        <br><br>

        <b>${playerA}</b>

        ${scoreA}

        -

        ${scoreB}

        <b>${playerB}</b>

        <br><br>

        ${narasi}

        </p>

    </div>

    `;

}