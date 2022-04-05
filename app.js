require('colors');

const { guardarDB, leerDB } = require('./helper/guardarArchivos');
const { inquirerMenu, 
        pause,
        leerInputMantenimiento,
        listadoTrabajoBorrar,
        confirmar,
        listadoTrabajoChecklist 
} = require('./helper/inquirer');


const TrabajosMaproEmergencia = require('./models/trabajos');


const main = async()=>{

    let opt ='';
    const trabajos = new TrabajosMaproEmergencia();

    const infoDB=leerDB();

    if(infoDB){
        //establecer tareas.
        trabajos.cargarMantenimientodejson(infoDB);
    }

    do{
        // console.log para limpiar consola... 
        console.log('\x1Bc');
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //Crear mantenimiento.
                const variable = await leerInputMantenimiento('Ingrese el nombre de la et ET O si es en linea ET1-ET2\n','Ingrese si es TCT-F/S-ESTACION...todo en mayusculas\n','Descripcion del trabajo\n','Trabajos de ....\n','Ingrese el personal involucrado\n');
                const [ets,tctfsoet,desc,operador,personal ]= variable;
                
                trabajos.crearMapro('Mapro',ets,tctfsoet,desc,operador,personal);
                
                
            break;
            case '2':
                //Crear mantenimiento de Emergencia.
                const variableEmergencia = await leerInputMantenimiento('Ingrese el nombre de la ET O si es en linea ET1-ET2\n','Ingrese si es TCT-F/S-ESTACION...todo en mayusculas\n','Descripcion del trabajo\n','Trabajos de ....\n','Ingrese el personal involucrado\n');
                const [etse,tctfsoete,desce,operadore,personale ]= variableEmergencia;
                trabajos.crearMapro('Emergencia',etse,tctfsoete,desce,operadore,personale);    
            break;
            case '3':
                //listar mapro y trabajos de emergencia.
                trabajos.listarTrabajos(trabajos.trabajosArr);               
            break;
            case '4':
                //listar mapro de LAT.
                trabajos.listarTrabajosLat(trabajos.trabajosArr);                 
            break;
            case '5':
                //listar mapro de ET.
                trabajos.listarTrabajosEt(trabajos.trabajosArr);
            break;
            case '6':
                //listar trabajos terminados.
                trabajos.listarTrabajosTerminados(trabajos.trabajosArr);                   
            break;
            case '7':
                //listar trabajos terminados.
                trabajos.listarTrabajosEmergencia(trabajos.trabajosArr);                   
            break; 
            case '8':
                //listar trabajos completados.
                const ids = await listadoTrabajoChecklist(trabajos.trabajosArr);                   
                trabajos.toggleCompletadas(ids);
            break; 
            case '9':
                //listar trabajos terminados.
                const id = await listadoTrabajoBorrar(trabajos.trabajosArr);
                if(id !=='0'){
                    const ok = await confirmar('¿Quiere eliminar el Trabajo?');
                    if(ok){
                        trabajos.borrarTrabajo(id);
                        console.log('Trabajo BORRADO');
                    } 
                }
                             
            break;  
            case '12':
                //Listar trabajos transener
                trabajos.listarTrabajosTransener(trabajos.trabajosArr);                   
            break;            
        }
        if(opt !== '0'){
            // console.log(trabajos);
            await pause();
        }
        
        guardarDB(trabajos.trabajosArr);

    }while(opt !== '0');
} 

main();