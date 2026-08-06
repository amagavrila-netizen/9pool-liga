//======================================================
// LIGA JURNAL
// EDISI TERBARU
//======================================================

const jurnal = [

{
title:"🔥 Headline Hari Ini",
content:`

<p class="lead">

<b>Aken tetap sempurna, tetapi Chad masih memimpin persaingan menuju gelar juara.</b>

</p>

<p>

Kompetisi memasuki fase yang semakin menarik. Chad masih bertahan di puncak klasemen berkat akumulasi frame yang impresif, namun bayang-bayang Aken semakin nyata. Rekor sempurna tanpa kekalahan yang masih dipertahankan Aken menjadi ancaman serius bagi siapa pun yang ingin mengakhiri musim sebagai juara.

</p>

<p>

Sementara itu Bang Larosa terus menjaga konsistensi dan berhasil mempertahankan posisinya di kelompok teratas. Dengan sejumlah pertandingan penting yang masih tersisa, perebutan gelar juara dipastikan belum akan selesai dalam waktu dekat.

</p>

`
},

{
title:"🏆 Perebutan Gelar Juara",
content:`

<p>

Empat nama mulai memisahkan diri dari peserta lainnya.

</p>

<ul>

<li><b>Chad</b> masih memimpin klasemen berkat koleksi frame yang luar biasa.</li>

<li><b>Bang Larosa</b> terus memberikan tekanan melalui kemenangan-kemenangan penting.</li>

<li><b>Iwan</b> tetap berada dalam persaingan setelah menjaga konsistensi sepanjang musim.</li>

<li><b>Aken</b> menjadi ancaman terbesar karena belum sekalipun mengalami kekalahan.</li>

</ul>

<p>

Selisih poin memang mulai terlihat, tetapi liga masih menyisakan cukup banyak pertandingan sehingga perubahan klasemen masih sangat mungkin terjadi.

</p>

`
},

{
title:"⭐ Player of the Week",
content:`

<h3>Aken</h3>

<p>

Dua puluh pertandingan.

</p>

<p>

Dua puluh kemenangan.

</p>

<p>

Belum ada pemain lain yang mampu mempertahankan catatan sempurna selama musim ini. Konsistensi tersebut menjadikan Aken sebagai pemain paling bersinar pada pekan ini sekaligus salah satu kandidat terkuat dalam perebutan gelar juara.

</p>

`
},

{
title:"📈 Silent Climber",
content:`

<h3>Bang Larosa</h3>

<p>

Tidak banyak sorotan yang mengarah kepadanya, tetapi hasil demi hasil terus dikumpulkan dengan konsisten.

</p>

<p>

Kemenangan tipis atas Alex mungkin hanya bernilai satu kemenangan di atas kertas, tetapi nilainya jauh lebih besar bagi persaingan papan atas. Dalam fase liga seperti sekarang, kemenangan dengan tekanan tinggi sering kali lebih berharga daripada kemenangan besar.

</p>

`
},

{
title:"🎱 Match of the Week",
content:`

<h3>Bang Larosa 9 – 8 Alex</h3>

<p>

Salah satu pertandingan paling menegangkan pekan ini berlangsung hingga frame terakhir.

</p>

<p>

Bang Larosa berhasil menjaga ketenangan pada momen-momen penentuan dan mengamankan kemenangan dengan selisih satu frame. Pertandingan ini menjadi contoh bahwa fokus dan mental tetap menjadi pembeda utama ketika kemampuan kedua pemain relatif seimbang.

</p>

`
},
{
title:"⚡ Kejutan Pekan Ini",
content:`

<h3>Alex menumbangkan Iwan dalam duel dramatis.</h3>

<p>

Liga kembali membuktikan bahwa tidak ada pertandingan yang benar-benar mudah. Alex berhasil mencuri perhatian setelah mengalahkan Iwan melalui pertandingan yang berlangsung hingga frame terakhir.

</p>

<p>

Hasil tersebut menjadi salah satu kejutan terbesar pekan ini sekaligus menunjukkan bahwa pemain papan tengah masih mampu mengguncang persaingan papan atas kapan saja.

</p>

`
},

{
title:"📊 Statistik Menarik",
content:`

<ul>

<li>Chad menjadi pemain pertama yang menembus <b>210 frame</b> musim ini.</li>

<li>Aken masih mempertahankan rekor sempurna tanpa kekalahan.</li>

<li>Semakin banyak pertandingan berakhir dengan selisih hanya satu frame.</li>

<li>Persaingan posisi empat besar semakin rapat dibanding pekan-pekan sebelumnya.</li>

</ul>

`
},

{
title:"👀 Player to Watch",
content:`

<h3>Bang Aceng</h3>

<p>

Performa Bang Aceng mulai menunjukkan peningkatan yang konsisten. Hasil-hasil positif dalam beberapa pertandingan terakhir membuatnya layak menjadi salah satu pemain yang patut diperhatikan pada pekan berikutnya.

</p>

<p>

Jika tren ini terus berlanjut, bukan tidak mungkin ia akan naik beberapa posisi di klasemen.

</p>

`
},

{
title:"🧠 Analisis Liga",
content:`

<p>

Musim mulai memasuki fase ketika setiap frame memiliki nilai yang semakin besar.

</p>

<p>

Kemenangan besar memang tetap penting, tetapi kemenangan tipis atas pesaing langsung sering kali menjadi pembeda pada akhir musim. Konsistensi mulai mengalahkan permainan spektakuler.

</p>

<p>

Beberapa pemain mulai memasuki jadwal yang lebih berat sehingga setiap pertandingan akan memiliki dampak besar terhadap persaingan klasemen.

</p>

`
},

{
title:"🔮 Prediksi Pekan Berikutnya",
content:`

<p>

Sorotan utama masih akan tertuju kepada Chad sebagai pemimpin klasemen.

</p>

<p>

Namun tekanan datang dari Bang Larosa yang terus mengumpulkan kemenangan, Iwan yang tetap berada dalam persaingan, serta Aken yang masih mempertahankan rekor sempurna. Apabila tren ini berlanjut, perebutan gelar juara diperkirakan akan berlangsung hingga pekan-pekan terakhir liga.

</p>

`
},

{
title:"😊 Fun Fact Liga",
content:`

<p>

Semakin banyak pertandingan musim ini yang harus ditentukan pada frame terakhir.

</p>

<p>

Hal tersebut menunjukkan bahwa kualitas pemain semakin merata. Selisih kemampuan antar peserta mulai mengecil sehingga hampir setiap pertandingan mampu menghasilkan kejutan.

</p>

`
}

];

//======================================================
// RENDER
//======================================================

function renderJournal(){

    const container=document.getElementById("journal");

    if(!container) return;

    let html="";

    jurnal.forEach(item=>{

        html+=`

        <section class="card journal-card">

            <h2>${item.title}</h2>

            ${item.content}

        </section>

        `;

    });

    container.innerHTML=html;

}

document.addEventListener("DOMContentLoaded",renderJournal);
