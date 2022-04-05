require('colors') 


const mostrarMenu = () => {

    return new Promise((resolve)=>{
        console.clear();
        console.log('==========================='.green);
        console.log('  SELECCIONE UNA OPCIÓN    '.green);
        console.log('===========================\n'.green);
    
        
        console.log(`${'1.'.blue} Crear mantenimiento `);
        console.log(`${'2.'.blue} Crear mantenimiento de Emergencia `);
        console.log(`${'3.'.green} Listar mapros y trabajos de emergencia del dia `);
        console.log(`${'4.'.green} Listar mapro de LAT  `);
        console.log(`${'5.'.green} Listar mapro ET `);
        console.log(`${'6.'.green} Listar Mapro terminados`);
        console.log(`${'7.'.green} Listar trabajos de emergencia`);
        console.log(`${'8.'.green} Marcar como terminados mapro o trabajo de emergencia`);
        console.log(`${'9.'.green} Eliminar Mapro o trabajo de emergencia`);
        console.log(`${'10.'.green} Crear generacion indisponible `);
        console.log(`${'11.'.green} Listar generacion indisponible `);
        console.log(`${'12.'.green} Listar Mapro transener `);
        console.log(`${'0.'.red} Salir `);
    
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccion un opción...',(opt)=>{
                readline.close();
                resolve(opt);
        })
    
    });


}

const pause = ()=>{
    return new Promise(resolve =>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`\nPresione ${'ENTER'.green} para continuar...\n`,()=>{
            readline.close();
            resolve();
        })

    });
    
}



module.exports = {
    mostrarMenu,
    pause
}