fetch("jurnal.json")

.then(res=>res.json())

.then(data=>{

document.getElementById("isiJurnal").innerHTML=`

<h2>📰 Liga Jurnal</h2>

<p><b>${data.tanggal}</b></p>

<hr>

<h3>🔥 Highlight Hari Ini</h3>

<p>${data.highlight}</p>

<hr>

<h3>📈 Naik Daun</h3>

<p>${data.naik}</p>

<hr>

<h3>🎯 Strategy Corner</h3>

<p>${data.strategy}</p>

<hr>

<h3>🧠 Mental Coaching</h3>

<p>${data.mental}</p>

`;

});