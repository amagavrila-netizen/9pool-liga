const url = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnTZ9Cl4EwRr65ViM0hneJYQHMOL5zVJDEQM7jXlu_rHHMl3qIWISaVAvoFxHcwgThaDKgPavET6EFYNmFJmq0bZ0RRBmA4sBmzbqyjLS8h1YkuHv0Lojb4y2sPP7h9cj5KDekMl-d5kNZxm3xzTmGbqp_D28vtnIaSANqvH7ZXixewSuT1zHLmAVVHZwgtEDJtZnzS6bAFop-WAL0Q4g8eAAMK_1Z6T3p0sC7Eue0ZeZBFYO6BjuC5NZInhgS4ves5l_SDmd_dip43nME-ILLdKlzEYVQ&lib=M6mR41w_2aTrlwjhBreE6fSJ67tG3SoUN";

let semuaPemain = [];

fetch(url)
.then(response => response.json())
.then(data => {

    semuaPemain = data;

    tampilkan(data);

});

function tampilkan(data){

    let html = "";

    // Mulai dari baris kedua (baris pertama adalah header)
    for(let i=1;i<data.length;i++){

        html += `
        <div class="kartu-pemain">
            <h3>👤 ${data[i][1]}</h3>

            <p>🎱 Main : ${data[i][2]}</p>
            <p>🟢 Menang : ${data[i][3]}</p>
            <p>🔴 Kalah : ${data[i][4]}</p>
            <p>⭐ Point : ${data[i][8]}</p>

            <a href="profil.html?nama=${encodeURIComponent(data[i][1])}">
    <button>Lihat Profil</button>
</a>
        </div>
        `;

    }

    document.getElementById("daftar").innerHTML = html;

}

function cariPemain(){

    let keyword = document.getElementById("cari").value.toLowerCase();

    let hasil = [];

    hasil.push(semuaPemain[0]); // Header

    for(let i=1;i<semuaPemain.length;i++){

        if(semuaPemain[i][1].toLowerCase().includes(keyword)){

            hasil.push(semuaPemain[i]);

        }

    }

    tampilkan(hasil);

}