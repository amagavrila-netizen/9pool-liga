//==================================================
// LIGA JURNAL ENGINE
// Versi 2.0
//==================================================


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

buatHeadline(klasemen);

buatHotPlayer(klasemen);

buatWarning(klasemen);

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

    if(data.length<3) return;

    const p1=data[1];
    const p2=data[2];
    const p3=data.length>3 ? data[3] : p2;

    const gap=
    Number(p1[8])-Number(p2[8]);

    let narasi="";

    if(gap<=5){

        narasi=`
        <b>${p2[1]}</b> terus memberikan tekanan kepada
        <b>${p1[1]}</b>.
        Selisih hanya <b>${gap}</b> frame sehingga
        perebutan puncak klasemen diperkirakan berlangsung
        hingga akhir musim.
        `;

    }

    else if(gap<=15){

        narasi=`
        <b>${p1[1]}</b> masih memimpin klasemen,
        namun <b>${p2[1]}</b> dan
        <b>${p3[1]}</b>
        masih berada dalam jarak yang dapat dikejar.
        `;

    }

    else{

        narasi=`
        <b>${p1[1]}</b> mulai menciptakan jarak yang cukup
        nyaman dari para pesaingnya.
        Konsistensi beberapa pertandingan berikutnya akan
        menjadi penentu peluang juara.
        `;

    }

    document.getElementById("headline").innerHTML=`

    <div class="card">

        <h2>🔥 Headline Hari Ini</h2>

        <p>${narasi}</p>

    </div>

    `;

}



//==================================================
// HOT PLAYER
//==================================================

function buatHotPlayer(data){

    if(data.length<2)return;

    let pemain=data[1];

    for(let i=2;i<data.length;i++){

        if(
            Number(data[i][7])>
            Number(pemain[7])
        ){

            pemain=data[i];

        }

    }

    document.getElementById("hotPlayer").innerHTML=`

    <div class="card">

        <h2>⭐ Player on Fire</h2>

        <p>

        <b>${pemain[1]}</b>

        sedang menjadi pemain dengan
        selisih frame terbaik yaitu

        <b>+${pemain[7]}</b>.

        Efisiensi kemenangan seperti ini biasanya
        menjadi salah satu indikator pemain yang
        sedang berada dalam performa terbaik.

        </p>

    </div>

    `;

}



//==================================================
// WARNING ZONE
//==================================================

function buatWarning(data){

    if(data.length<2)return;

    let pemain=data[1];

    for(let i=2;i<data.length;i++){

        if(
            Number(data[i][7])<
            Number(pemain[7])
        ){

            pemain=data[i];

        }

    }

    document.getElementById("warning").innerHTML=`

    <div class="card">

        <h2>⚠ Warning Zone</h2>

        <p>

        <b>${pemain[1]}</b>

        memiliki selisih frame

        <b>${pemain[7]}</b>.

        Mengurangi kekalahan dengan margin besar
        akan memberikan dampak signifikan terhadap
        posisi klasemen akhir.

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