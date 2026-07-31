fetch("jurnal.json")
.then(res => res.json())
.then(data => {

document.getElementById("isiJurnal").innerHTML = `

<h2>📰 Liga Jurnal</h2>

<p>${data.tanggal}</p>

<hr>

<h2>${data.headline}</h2>

<p>${data.highlight}</p>

<hr>

<h3>⭐ Player of the Day</h3>

<p><b>${data.playerOfDay}</b></p>

<p>${data.playerStory}</p>

<hr>

<h3>⚠️ Warning</h3>

<p>${data.warning}</p>

<hr>

<h3>🎯 Strategy Corner</h3>

<p>${data.strategy}</p>

<hr>

<h3>🧠 Mental Coaching</h3>

<p>${data.mental}</p>

<hr>

<h3>📊 Fakta Hari Ini</h3>

<p>${data.fact}</p>

`;

});