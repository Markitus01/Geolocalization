document.addEventListener('DOMContentLoaded',f_main);

const EL_MEU_LLOC = [];

function f_main()
{
    // https://developer.mozilla.org/es/docs/Web/API/Geolocation/getCurrentPosition
    // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
    let m = document.querySelector('#map');
    m.setAttribute('style','height:500px;width:700px;');
    
    if (navigator.geolocation) // cortesia, x navegador antics
    {
        //alert("navegador que té instal·lada la API Geolocation");
        // permís per geolocalització
        navigator.geolocation.getCurrentPosition(funcioOk,funcioKo);
    }
}

function funcioOk(p)
{
    EL_MEU_LLOC[0] = p.coords.latitude;
    EL_MEU_LLOC[1] = p.coords.longitude;
    f_dibuixarMapa();
}
function funcioKo(error)
{
    console.info(error.code);
    console.info(error.message);
}

function f_dibuixarMapa()
{
    
    let coordenades = EL_MEU_LLOC;
    console.info(coordenades);
    let zoom = 12; // com més gran, més aprop del lloc
    let map = L.map('map').setView(coordenades, zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    f_posarMarcador(map);
}

function f_posarMarcador(map)
{
    let m = L.marker(EL_MEU_LLOC).addTo(map);  

    m.bindPopup("<b>Aquí</b> és on som").openPopup();
    
    let pos = [];
    pos.push(...EL_MEU_LLOC);
    // latitud 90 -90
    // longitud 180 -180
    //pos[0]= pos[0]-0.002;// restar latitud desplaçament al sud
    pos[0]= pos[0]+0.05; // sumar latitud desplaçament al nord
    //pos[1]= pos[1]-0.02; // restar longitud desplaçament al oest
    //pos[1]= pos[1]+0.05; // sumar longitud desplaçament a l'est
    
    // PUNTS EXTREMS MAPA
    //pos=[75,180]; // nord,est
    //pos=[180,-75];// nord,oest
    //pos=[-75,180]; // sud,est
    //pos=[-75,-180]; // sud,oest
    
    console.info(pos);
    L.marker(pos).addTo(map).bindPopup("<i>Aquí no hi som</i>");
}
