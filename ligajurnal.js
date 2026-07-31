fetch("liga.json")

.then(res=>res.json())

.then(data=>{

    document.getElementById("isiJurnal").innerHTML=

    buatNarasi(data);

});