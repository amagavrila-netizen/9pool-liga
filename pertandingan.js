const url = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS6WoVWincu7nBJyd9r01BsKoCQoa5MKvB8bkjvnuGygU0JZ8YrWT3L0s3Vuq38erG9Quxl2R3JVFNb-mxeshgDai_XAfZvaUl5k6j9mT45khcmhwgUh1DiUpPSv_lubHrEm0wqnYUlcYBuv8OU33AII-9EfnYdHR7YCZ1XfNKyAIdcSdagYVSmZNhA01HFFiXCFyv4M93ifUnykszCk5HWDtSk1prNwqFyd_uJ7xBR1lnizFiu0jvnsCmIk12jxrUpiQsu7-vsRHtvmqZx3GbCVGsXBQ&lib=MQ974VFXeXNHBp6rsCAsq0yJ67tG3SoUN";

fetch(url)

.then(res=>res.json())

.then(data=>{

let html="";

for(let i=1;i<data.length;i++){

html+=`

<tr>

<td>${data[i][0]}</td>

<td>${data[i][1]}</td>

<td>${data[i][2]}</td>

<td>${data[i][3]} - ${data[i][4]}</td>

<td>${data[i][5]}</td>

<td>${data[i][6]}</td>

</tr>

`;

}

document.getElementById("isi").innerHTML=html;

});