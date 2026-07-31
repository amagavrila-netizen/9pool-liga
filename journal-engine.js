const klasemenURL =
"https://script.google.com/macros/s/AKfycbweEZmfiYZG9bOtKyQKar7bcW-Zv8sC75bvliYN7Eurq94veGujyNfWTxfCDvAfGn7Ndg/exec";

const pertandinganURL =
"https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnS6WoVWincu7nBJyd9r01BsKoCQoa5MKvB8bkjvnuGygU0JZ8YrWT3L0s3Vuq38erG9Quxl2R3JVFNb-mxeshgDai_XAfZvaUl5k6j9mT45khcmhwgUh1DiUpPSv_lubHrEm0wqnYUlcYBuv8OU33AII-9EfnYdHR7YCZ1XfNKyAIdcSdagYVSmZNhA01HFFiXCFyv4M93ifUnykszCk5HWDtSk1prNwqFyd_uJ7xBR1lnizFiu0jvnsCmIk12jxrUpiQsu7-vsRHtvmqZx3GbCVGsXBQ&lib=MQ974VFXeXNHBp6rsCAsq0yJ67tG3SoUN";

Promise.all([
    fetch(klasemenURL).then(r => r.json()),
    fetch(pertandinganURL).then(r => r.json())
])
.then(([klasemen, pertandingan]) => {

    buatHeadline(klasemen);

});
function buatHeadline(data){

    const juara = data[1];

    document.getElementById("headline").innerHTML = `
        <div class="card">
            <h2>🔥 Headline Hari Ini</h2>

            <p>

            <b>${juara[1]}</b>

            masih memimpin klasemen dengan

            <b>${juara[8]}</b> poin.

            Liga mulai memasuki fase yang semakin ketat.

            </p>

        </div>
    `;

}