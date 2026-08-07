//======================================================
// LIGA JURNAL
// EDISI TERBARU
//======================================================

const jurnal = [

{
title:"📰 LIGA JURNAL",
content:`

<div class="edition">

<h2>EDISI HARI INI</h2>

<p>

Berita • Analisis • Statistik • Cerita Liga

</p>

</div>

`
},

{
title:"🔥 PEMBURU RAKSASA ITU BERNAMA ALEX",
content:`

<p>

Banyak mata masih tertuju kepada Chad, Aken, atau Bang Jul.

Namun pekan ini justru ada satu nama yang diam-diam mengubah peta persaingan.

</p>

<p>

<b>Alex.</b>

</p>

<p>

Dalam beberapa pekan terakhir Alex berhasil mengalahkan <b>Iwan</b>, <b>Habib</b>, dan <b>Om Anto</b>.

Ketiga nama tersebut bukan pemain sembarangan.

</p>

<p>

Alex mungkin masih berada di papan tengah.

Namun bagi para unggulan, namanya mulai masuk daftar lawan yang tidak ingin ditemui.

</p>

`
},

{
title:"⚡ KEJUTAN DATANG DARI PAPAN BAWAH",
content:`

<p>

Bang Daniel kembali membuktikan bahwa posisi klasemen bukan jaminan kemenangan.

</p>

<p>

Ia berhasil menumbangkan <b>Iwan</b> dan juga mengalahkan <b>Bang Larosa</b>.

</p>

<p>

Dua kemenangan tersebut belum mengangkat posisinya secara signifikan.

Namun cukup untuk mengacaukan perjalanan para kandidat juara.

</p>

`
},

{
title:"🎱 MATCH OF THE WEEK",
content:`

<h3>

Bang Larosa 9 – 8 Alex

</h3>

<p>

Pertandingan berlangsung hingga frame terakhir.

</p>

<p>

Bang Larosa berhasil mempertahankan ketenangan pada saat yang paling menentukan.

Sementara Alex kembali menunjukkan bahwa dirinya kini mampu memaksa pemain papan atas bertarung sampai frame terakhir.

</p>

`
},

{
title:"📈 KUDA HITAM MULAI BERGERAK",
content:`

<h3>

Bang Aceng

</h3>

<p>

Baru memainkan sebelas pertandingan.

</p>

<p>

Sudah mengoleksi sembilan kemenangan.

</p>

<p>

Efisiensinya menjadi salah satu yang terbaik musim ini.

Jika mampu menjaga performanya, Bang Aceng berpotensi menjadi ancaman serius bagi kelompok papan atas.

</p>

`
},

{
title:"📊 LIGA SEMAKIN MERATA",
content:`

<p>

Semakin banyak pertandingan musim ini berakhir dengan skor tipis.

</p>

<p>

Skor 9-8 kini menjadi pemandangan yang semakin sering terlihat.

</p>

<p>

Hal ini menunjukkan bahwa kualitas antarpemain mulai semakin berimbang.

Mental dan pengambilan keputusan kini menjadi pembeda utama.

</p>

`
},

{
title:"👀 SIAPA LAWAN PALING TIDAK NYAMAN?",
content:`

<p>

Bukan selalu pemain yang berada di posisi pertama.

</p>

<p>

Habib mampu mencuri kemenangan dari pemain unggulan.

Ko Charles tetap menjadi lawan yang sulit ditaklukkan.

Alex mulai menjatuhkan pemain-pemain besar.

Bang Aceng terus mengumpulkan kemenangan.

</p>

<p>

Mereka adalah pemain yang mampu mengubah arah musim lawan-lawannya.

</p>

`
},

{
title:"🧠 MUSIM MULAI BERUBAH",
content:`

<p>

Pada awal musim, pemain unggulan relatif mudah mengendalikan pertandingan.

</p>

<p>

Kini kondisinya berbeda.

</p>

<p>

Pemain papan tengah mulai berani mengambil risiko.

Pemain papan bawah mulai percaya diri menghadapi siapa pun.

</p>

<p>

Liga tidak lagi dimenangkan hanya oleh pemain terbaik.

Liga akan dimenangkan oleh pemain yang mampu menjaga konsistensi hingga pertandingan terakhir.

</p>

`
},

{
title:"🔮 YANG PATUT DINANTIKAN",
content:`

<p>

Persaingan menuju akhir musim masih jauh dari selesai.

</p>

<p>

Pertanyaan terbesar bukan lagi siapa yang memimpin klasemen.

</p>

<p>

<b>

Siapa pemain berikutnya yang akan menjadi korban kejutan?

</b>

</p>

<p>

Karena jika tren musim ini terus berlanjut,

tidak ada satu pun pemain yang benar-benar aman setiap kali memasuki arena pertandingan.

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
