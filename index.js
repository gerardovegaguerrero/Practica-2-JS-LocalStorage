/*var firebaseConfig = {
    apiKey: "AIzaSyBUux9hbIu6wtouqW0WeJPysp9uI2mcBQs",
    authDomain: "problema1-cb966.firebaseapp.com",
    databaseURL: "https://problema1-cb966-default-rtdb.firebaseio.com",
    projectId: "problema1-cb966",
    storageBucket: "problema1-cb966.appspot.com",
    messagingSenderId: "306122848199",
    appId: "1:306122848199:web:97bb698a47f77d19114be2",
    measurementId: "G-7XLENFRFF7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
*/

function resetFields(){
    document.getElementById("Idlibro").value='';
    document.getElementById("Idtitulo").value='';
    document.getElementById("Idautor").value='';
    document.getElementById("Idgenero").value='selecciona';
    document.getElementById("Idcritica").value='selecciona';
}
function createR() {
    document.getElementById("Idlibro").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Idlibro").value;
    var nombre = document.getElementById("Idtitulo").value;
    var autor = document.getElementById("Idautor").value;
    var genero = document.getElementById("Idgenero").value;
    var critica = document.getElementById("Idcritica").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var libro = {
            id, //matricula:id
            nombre,
            autor,
            genero,
            critica,
        }

        //console.log(alumno);
        var lista_libros=JSON.parse(localStorage.getItem("libros"));

        if(lista_libros==null)
        { 
            var lista_libros = [];
        }
        
        const existe = lista_libros.some(element=>element.id==id); 

        if(!existe||document.getElementById("Idlibro").disabled==true)
        {
            
            if(document.getElementById("Idlibro").disabled==true)
            {
                var lista_libros=lista_libros.filter(libro=>libro.id!=id);

            }
                
            lista_libros.push(libro);
            var temporal = lista_libros.sort((a,b) => a.id-b.id);
            localStorage.setItem("libros", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese libro","warning");
        }

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Idlibro").disabled = false;
  
}

function read(){
    document.getElementById("Table1").innerHTML='';

    const lista_libros = JSON.parse(localStorage.getItem("libros"));
    
     
    if(lista_libros)
    {
        lista_libros.forEach((libro)=>printRow(libro));
    }

}

function printRow(libro){
    
    if(libro!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = libro.id;
        cell2.innerHTML = libro.nombre; 
        cell3.innerHTML = libro.autor;
        cell4.innerHTML = libro.genero; 
        cell5.innerHTML = libro.critica; 
        cell6.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${libro.id})">Eliminar</button>`;
        cell7.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+libro.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_libros = JSON.parse(localStorage.getItem("libros"));
    var temporal=lista_libros.filter(libro=>libro.id!=id);
    localStorage.setItem("libros", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("libros");
    }
  
    read();
    
}

function seekR(id){
    const lista_libros = JSON.parse(localStorage.getItem("libros"));
    var libro=lista_libros.filter(libro=>libro.id==id);
    //console.log(alumno[0]);
    updateR(libro[0]);
}

function updateR(libro){
    if(libro!=null)
    {
        document.getElementById("Idlibro").value=libro.id;
        document.getElementById("Idlibro").disabled = true;
        document.getElementById("Idtitulo").value=libro.nombre;
        document.getElementById("Idautor").value=libro.autor;
        document.getElementById("Idgenero").value=libro.genero;
        document.getElementById("Idcritica").value=libro.critica;
    }
}


//Para consulta por genero
function readQ(){
    document.getElementById("Table22").innerHTML='';
    var c = document.getElementById("Idgenero").value;

    const lista_libros = JSON.parse(localStorage.getItem("libros"));
    var librosC=lista_libros.filter(libro=>libro.genero==c);
    if(librosC)
    {
        librosC.forEach((libro)=>printRowQ(libro));
    }
    //console.log(librosC)
}


function printRowQ(libro){

    var table = document.getElementById("Table22"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = libro.id;
    cell2.innerHTML = libro.nombre; 
    cell3.innerHTML = libro.autor;
    cell4.innerHTML = libro.genero;
    cell5.innerHTML = libro.critica;  
   
}