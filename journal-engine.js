function buatNarasi(data){

    let html="";

    //---------------------------------
    // KLASMEN
    //---------------------------------

    let klasemen=data.klasemen;

    klasemen.sort((a,b)=>b.point-a.point);

    let nomor1=klasemen[0];

    html+=`
    <h2>🔥 Sorotan Hari Ini</h2>

    <p>
    <b>${nomor1.nama}</b> masih memimpin klasemen dengan
    <b>${nomor1.point}</b> poin.
    Konsistensi menjadi kekuatan utamanya.
    </p>
    `;

    //---------------------------------
    // PENGEJAR
    //---------------------------------

    if(klasemen.length>=2){

        let kedua=klasemen[1];

        let selisih=nomor1.point-kedua.point;

        html+=`

        <p>

        Jarak dengan posisi kedua tinggal

        <b>${selisih}</b>

        frame.

        Persaingan perebutan puncak klasemen masih sangat terbuka.

        </p>

        `;
    }

    //---------------------------------
    // PALING PRODUKTIF
    //---------------------------------

    let produktif=[...klasemen];

    produktif.sort((a,b)=>b.framePlus-a.framePlus);

    html+=`

    <h2>🎯 Mesin Frame</h2>

    <p>

    ${produktif[0].nama}

    menjadi pemain paling produktif

    dengan

    <b>${produktif[0].framePlus}</b>

    frame.

    </p>

    `;

    //---------------------------------
    // PERTANDINGAN TERAKHIR
    //---------------------------------

    let last=data.match[data.match.length-1];

    html+=`

    <h2>📰 Hasil Terbaru</h2>

    <p>

    ${last.winner}

    mengalahkan

    ${last.loser}

    dengan skor

    <b>${last.scoreA}-${last.scoreB}</b>

    </p>

    `;

    //---------------------------------
    // MOTIVASI
    //---------------------------------

    html+=`

    <h2>💡 Insight Hari Ini</h2>

    <p>

    Liga belum selesai.

    Satu kemenangan besar dapat mengubah posisi klasemen secara signifikan.

    Bermainlah satu rack demi satu rack.

    </p>

    `;

    return html;

}