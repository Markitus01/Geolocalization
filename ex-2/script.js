document.addEventListener('DOMContentLoaded', main_f);

const EL_MEU_LLOC = [];

function main_f()
{
    let m = document.querySelector('#mapa');
    m.setAttribute('style','height:500px;width:700px;');
    
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(funcioOk,funcioKo);
    }
}

function funcioOk(p)
{
    EL_MEU_LLOC[0] = p.coords.latitude;
    EL_MEU_LLOC[1] = p.coords.longitude;
    galiza_f();
}
function funcioKo(error)
{
    console.info(error.code);
    console.info(error.message);
}

function galiza_f()
{
    //Ens cetrem a GAlicia
    let map = L.map('mapa').setView([42.69726354061793, -7.844192453400587], 8);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Capitals provincials de galicia
    const CAPITALS = [
        { nom: 'Pontevedra', coords: [42.42892240794763, -8.638355735884941] },
        { nom: 'Lugo', coords: [43.01447712002843, -7.55984696828094] },
        { nom: 'A Coruña', coords: [43.35751214729478, -8.41680762766716] },
        { nom: 'Ourense', coords: [42.33829529516764, -7.862741489536784] }
    ];

    // Ordenem
    CAPITALS.sort((a, b) => a.nom.localeCompare(b.nom));

    // Afegim marcadors
    CAPITALS.forEach(capital => {
        L.marker(capital.coords).addTo(map).bindPopup(capital.nom);
    });

    // Crear polilínea entre las capitales
    let puntsLinea = CAPITALS.map(capital => capital.coords);
    let linea = L.polyline(puntsLinea, { color: 'blue' }).addTo(map);

    // Afegim la fletxa per indicar l'ordre (ho he mirat a chatGPT), ens cal afegir la llibreria al html
    let arrowHead = L.polylineDecorator(linea, {
        patterns: [
            { offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({ pixelSize: 10, polygon: false, pathOptions: { color: 'blue' } }) }
        ]
    }).addTo(map);
}