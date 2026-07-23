const url = "https://script.google.com/macros/s/AKfycbweEZmfiYZG9bOtKyQKar7bcW-Zv8sC75bvliYN7Eurq94veGujyNfWTxfCDvAfGn7Ndg/exec";

fetch(url)
.then(res => res.json())
.then(data => {

let html = "";

for(let i=1;i<data.length;i++){

html += `
<tr>

<td>${data[i][0]}</td>
<td>${data[i][1]}</td>
<td>${data[i][2]}</td>
<td>${data[i][3]}</td>
<td>${data[i][4]}</td>
<td>${data[i][5]}</td>
<td>${data[i][6]}</td>
<td>${data[i][7]}</td>
<td>${data[i][8]}</td>

</tr>
`;

}

document.getElementById("isi").innerHTML = html;

});