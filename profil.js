const url = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnTZ9Cl4EwRr65ViM0hneJYQHMOL5zVJDEQM7jXlu_rHHMl3qIWISaVAvoFxHcwgThaDKgPavET6EFYNmFJmq0bZ0RRBmA4sBmzbqyjLS8h1YkuHv0Lojb4y2sPP7h9cj5KDekMl-d5kNZxm3xzTmGbqp_D28vtnIaSANqvH7ZXixewSuT1zHLmAVVHZwgtEDJtZnzS6bAFop-WAL0Q4g8eAAMK_1Z6T3p0sC7Eue0ZeZBFYO6BjuC5NZInhgS4ves5l_SDmd_dip43nME-ILLdKlzEYVQ&lib=M6mR41w_2aTrlwjhBreE6fSJ67tG3SoUN";
const urlMatch = "https://script.google.com/macros/s/AKfycbyZV3WQjgQ85K57DcEBo9GvrgclJvvp6xVUg-WzLMNECs2U7YgTTPj8z06LkxPEhtf8/exec";

const params = new URLSearchParams(window.location.search);
const nama = params.get("nama");

document.getElementById("namaPemain").innerHTML = "👤 " + nama;

fetch(url)
.then(res => res.json())
.then(data => {

    let html = "";

    for(let i = 1; i < data.length; i++){

        if(data[i][1] == nama){

            html = `
                <div class="kartu-pemain">

                    <h2>${data[i][1]}</h2>

                    <p>🏅 Ranking : ${data[i][0]}</p>

                    <p>🎱 Main : ${data[i][2]}</p>

                    <p>🟢 Menang : ${data[i][3]}</p>

                    <p>🔴 Kalah : ${data[i][4]}</p>

                    <p>📈 Frame+ : ${data[i][5]}</p>

                    <p>📉 Frame- : ${data[i][6]}</p>

                    <p>➕ Selisih : ${data[i][7]}</p>

                    <p>⭐ Point : ${data[i][8]}</p>

                </div>
            `;

            break;
        }

    }

    document.getElementById("profil").innerHTML = html;

});
// ===============================
// RIWAYAT PERTANDINGAN
// ===============================

fetch(urlMatch)
.then(res => res.json())
.then(data => {

    let html = "";

    for(let i = 1; i < data.length; i++){

        let playerA = data[i][2];
        let skorA   = data[i][3];
        let skorB   = data[i][4];
        let playerB = data[i][5];
        let pemenang = data[i][6];
        let ronde    = data[i][1];

        if(playerA == nama || playerB == nama){

            let hasil = (pemenang == nama)
                ? "✅ Menang"
                : "❌ Kalah";

            html += `
                <div class="kartu-pemain">

                    <b>Ronde ${ronde}</b><br><br>

                    ${playerA}
                    <b>${skorA} - ${skorB}</b>
                    ${playerB}

                    <br><br>

                    ${hasil}

                </div>
            `;

        }

    }

    document.getElementById("riwayat").innerHTML = html;

});