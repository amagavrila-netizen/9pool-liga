const url = "https://script.google.com/macros/s/AKfycbweEZmfiYZG9bOtKyQKar7bcW-Zv8sC75bvliYN7Eurq94veGujyNfWTxfCDvAfGn7Ndg/exec";

fetch(url )
  .then(res => res.json())
  .then(data => {
    let html = "";

    for (let i = 1; i < data.length; i++) {
      // Mengubah nilai Avg Margin menjadi angka dan membatasi 3 desimal
      // Jika data kosong atau bukan angka, akan tetap menampilkan data asli atau 0.000
      let avgMargin = data[i][9];
      let formattedAvg = !isNaN(avgMargin) ? Number(avgMargin).toFixed(3) : avgMargin;

      html += `
        <tr>
          <td>${data[i][0]}</td>   <!-- Rank -->
          <td>${data[i][1]}</td>   <!-- Nama -->
          <td>${data[i][2]}</td>   <!-- Main -->
          <td>${data[i][3]}</td>   <!-- Menang -->
          <td>${data[i][4]}</td>   <!-- Kalah -->
          <td>${data[i][5]}</td>   <!-- Frame+ -->
          <td>${data[i][6]}</td>   <!-- Frame- -->
          <td>${data[i][7]}</td>   <!-- Selisih -->
          <td>${data[i][8]}</td>   <!-- Point -->
          <td>${formattedAvg}</td> <!-- Avg Margin (Dibatasi 3 Desimal) -->
          <td>${data[i][10]}</td>  <!-- Penalti -->
        </tr>
      `;
    }

    document.getElementById("isi").innerHTML = html;
  })
  .catch(err => console.error("Gagal mengambil data:", err));
