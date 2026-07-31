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

    const last=data[data.length-1];

    const ronde=last[1];
    const playerA=last[2];
    const scoreA=Number(last[3]);
    const scoreB=Number(last[4]);
    const playerB=last[5];
    const winner=last[6];

    let narasi="";

    const margin=Math.abs(scoreA-scoreB);

    if(margin==1){

        narasi=
        `Pertandingan berlangsung sangat dramatis. <b>${winner}</b> berhasil menang dengan selisih hanya satu frame.`;

    }

    else if(margin<=3){

        narasi=
        `<b>${winner}</b> harus bekerja keras sebelum akhirnya mengamankan kemenangan penting.`;

    }

    else{

        narasi=
        `<b>${winner}</b> tampil sangat dominan dan mengendalikan pertandingan sejak awal.`;

    }

    document.getElementById("matchDay").innerHTML=`

    <div class="card">

        <h2>🎱 Match of the Day</h2>

        <p>

        <b>Ronde ${ronde}</b>

        <br><br>

        ${playerA}

        <b>${scoreA}</b>

        -

        <b>${scoreB}</b>

        ${playerB}

        <br><br>

        ${narasi}

        </p>

    </div>

    `;

}