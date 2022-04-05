const Mantenimiento = require('./tarea')
const colors = require('colors/safe');


class TrabajosMaproEmergencia {
    constructor(){
        this._listadoMaproyEmergencia={};
    }

    borrarTrabajo(id=''){
        if(this._listadoMaproyEmergencia[id]){
            delete this._listadoMaproyEmergencia[id];
        }
    }

    get trabajosArr(){
        const trabajosArr = [];
        //CONVERTIMOS EN UN 
        Object.keys(this._listadoMaproyEmergencia).forEach(key =>{
            const trabajo = this._listadoMaproyEmergencia[key];
            trabajosArr.push(trabajo);
        })


        return trabajosArr;
    }

    cargarMantenimientodejson(mantenimientos=[]){
        mantenimientos.forEach((instancia)=>{
            this._listadoMaproyEmergencia[instancia.id]=instancia;
        }) 
    }

    crearMapro(tipoMaproOEmergencia='',ets='',tctfsoet='',desc='',operador='',personal=''){
        const mapro = new Mantenimiento(tipoMaproOEmergencia,ets,tctfsoet,desc,operador,personal);
        this._listadoMaproyEmergencia[mapro.id] = mapro;
    }
    listarTrabajos(array){  
        console.log('======================================'.green);
        console.log('----------Trabajos en Curso-----------'.white);
        console.log('======================================'.green);
        let i=0;
        array.forEach((key)=>{        
            if(!key.completado){
                i+=1
                console.log(`${colors.green.bold(i + '.')}\n`);
                console.log(`${colors.green.bold('ET o LAT:')} ${key.ets} ${colors.green.bold('--')} ${key.tipoMaproOEmergencia}${colors.green.bold('/')} ${key.operador}\n`);
                if(key.tctfsoet === 'F/S'){
                    console.log(`${colors.green.bold('Condiciones:')} F/s, Seccionado y PAT.\n`);
    
                }else if(key.tctfsoet === 'TCT'){
                    console.log(`${colors.green.bold('Condiciones:')} Recierre anulados en ambos ext.\n`);
                }else{
                    console.log(`${colors.green.bold('Descripcion:')} ${key.desc}\n`);
                }
                console.log(`${colors.green.bold('Personal')} ${key.personal}\n`);           
                
                console.log(`====================================\n`.bold.red);                
            }
        })
    };
    listarTrabajosLat(array){
        console.log('======================================'.green);
        console.log('----------Trabajos en Linea-----------'.white);
        console.log('======================================'.green);
        let i=0;
        array.forEach((key)=>{
            if(key.tctfsoet === 'TCT'|| key.tctfsoet === 'F/S' ){
                i+=1 ;
                let estado;
                if(key.completado){
                    estado='Terminado'.red
                }else{
                    estado = 'En Curso'.green.bold
                }
                console.log(`${colors.green.bold(i + '.')} ${estado}\n`);
                console.log(`${colors.green.bold('LAT:')} ${key.ets} ${colors.green.bold('--')} ${key.tipoMaproOEmergencia}${colors.green.bold('/')} ${key.operador}\n`);
                if(key.tctfsoet === 'F/S'){
                    console.log(`${colors.green.bold('Condiciones:')} F/s, Seccionado y PAT.\n`);
                    console.log(`${colors.green.bold('Descripcion:')} ${key.desc}\n`);
                }else{
                    console.log(`${colors.green.bold('Condiciones:')} Recierre anulados en ambos ext.\n`);
                    console.log(`${colors.green.bold('Descripcion:')} ${key.desc}\n`);
                };
                console.log(`${colors.green.bold('Enregado a ')} ${key.personal}\n`);           
                
                console.log(`====================================\n`.bold.red);
            }
            
        })                   
    }
    listarTrabajosTerminados(array){
        console.log('======================================'.green);
        console.log('---------Trabajos TERMINADOS----------'.white);
        console.log('======================================'.green);    
        let i=0;
        array.forEach((key)=>{
            if(key.completado){
                i+=1;
                console.log(`${colors.green.bold(i + '.')}\n`);
                console.log(`${colors.green.bold('ET O LAT:')} ${key.ets} ${colors.green.bold('--')} ${key.tipoMaproOEmergencia}${colors.green.bold('/')} ${key.operador}\n`);
                console.log(`${colors.green.bold('Descripcion:')} ${key.desc}\n`);
                if(key.tctfsoet === 'F/S'){
                    console.log(`${colors.green.bold('Condiciones:')} F/s, Seccionado y PAT.\n`);
                }else if(key.tctfsoet === 'TCT'){
                    console.log(`${colors.green.bold('Condiciones:')} Recierre anulados en ambos ext.\n`);
                }else{
                    
                }
                console.log(`${colors.green.bold('Enregado a ')} ${key.personal}\n`);           
                
                console.log(`====================================\n`.bold.red);
            }
            
        })                   
    };
    listarTrabajosEt(array){
        let i=0;
        console.log('======================================'.green);
        console.log('------------Trabajos en ET------------'.white);
        console.log('======================================'.green);
        array.forEach((key)=>{
            if(key.tctfsoet === 'Trabajo en ET'){
                
                i+=1;
                let estado;
                if(key.completado){
                    estado='Terminado'.red
                }else{
                    estado = 'En Curso'.green.bold
                }
                console.log(`${colors.green.bold(i + '.')} ${estado}\n`);
                console.log(`${colors.green.bold('LAT:')} ${key.ets} ${colors.green.bold('--')} ${key.tipoMaproOEmergencia}${colors.green.bold('/')} ${key.operador}\n`);
                console.log(`${colors.green.bold('Descripcion:')} ${key.desc}\n`); 
                console.log(`${colors.green.bold('Personal')} ${key.personal}\n`);                  
                console.log(`====================================\n`.bold.red);
                
                // console.log(`${colors.green.bold(i + '.')}\n`);
                // console.log(`${colors.green.bold('ET:')} ${key.ets} ${colors.green.bold('--')} ${key.tipoMaproOEmergencia}${colors.green.bold('/')} ${key.operador}\n`);
                // console.log(`${colors.green.bold('Descripcion:')} ${key.desc}\n`);
                // console.log(`${colors.green.bold('Enregado a ')} ${key.personal}\n`);               
                // console.log(`====================================\n`.bold.red);
            }
            
        })                   
    };
    listarTrabajosEmergencia(array){
        let i=0;
        console.log('======================================'.green);
        console.log('--------Trabajos de Emergencia--------'.white);
        console.log('======================================'.green);
        array.forEach((key)=>{
            if(key.tipoMaproOEmergencia === 'Emergencia'){
                let estado;
                if(key.completado){
                    estado='Terminado'.red
                }else{
                    estado = 'En Curso'.green.bold
                }
                console.log(`${colors.green.bold(i + '.')} ${estado}\n`);
                console.log(`${colors.green.bold('ET o LAT:')} ${key.ets} ${colors.green.bold('--')} ${key.tipoMaproOEmergencia}${colors.green.bold('/')} ${key.operador}\n`);
                if(key.tctfsoet === 'F/S'){
                    console.log(`${colors.green.bold('Condiciones:')} F/s, Seccionado y PAT.\n`);
    
                }else if(key.tctfsoet === 'TCT'){
                    console.log(`${colors.green.bold('Condiciones:')} Recierre anulados en ambos ext.\n`);
                }else{
                    console.log(`${colors.green.bold('Descripcion:')} ${key.desc}\n`);
                }
                console.log(`${colors.green.bold('Personal')} ${key.personal}\n`);           
                
                console.log(`====================================\n`.bold.red);                
            }
        })    
    };
    listarTrabajosTransener(array){
        let i=0;
        console.log('======================================'.green);
        console.log('----------Trabajos Transener----------'.white);
        console.log('======================================'.green);
        array.forEach((key)=>{
            if(key.operador === 'TRANSENER'){
                i+=1
                console.log(`====================================\n`.bold.red)
                console.log(`${colors.green.bold(i)}. ${colors.green.bold('Trabajo de:')} ${key.operador}\n`);
                console.log(`${colors.green.bold('ET o Linea:')} ${key.ets} ${colors.green.bold('Tipo:')} ${key.tipoMaproOEmergencia}\n`);
                if(key.tctfsoet === 'F/S'){
                    console.log(`${colors.green.bold('Condiciones:')} F/s, Seccionado y PAT.\n`);
                }else if(key.tctfsoet === 'TCT'){
                    console.log(`${colors.green.bold('Condiciones:')} Recierre anulados en ambos ext.\n`);
                }else{
                    console.log(`${colors.green.bold('Se realiza en:')} Estacion Transformadora \n`);
                }           
                console.log(`${colors.green.bold('Descripcion:')} ${key.desc}\n`);
                console.log(`====================================\n`.bold.red);
            }                
        })   
    }
    toggleCompletadas(ids=[]){
        ids.forEach(id=>{
            const trabajo = this._listadoMaproyEmergencia[id];
            if(!trabajo.completado){
                trabajo.completado = new Date().toISOString();
            }
        })
        this.trabajosArr.forEach(tarea =>{

            if(!ids.includes(tarea.id)){
                const tareas = this._listadoMaproyEmergencia[tarea.id];
                tareas.completado = null;
            }
        });
    }
     
}

module.exports = TrabajosMaproEmergencia;