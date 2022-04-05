const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message:'¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear mantenimiento `
            },
            {
                value: '2',
                name: `${'2.'.green} Crear Trabajo de Emergencia `
            },
            {
                value: '3',
                name: `${'3.'.green} Trabajos Pendientes`
            },
            {
                value: '4',
                name: `${'4.'.green} Trabajos en Linea `
            },
            {
                value: '5',
                name: `${'5.'.green} Trabajos en ET `
            },
            {
                value: '6',
                name: `${'6.'.green} Trabajos Terminados`
            },
            {
                value: '7',
                name: `${'7.'.green} Trabajos de Emergencia`
            },
            {
                value: '8',
                name: `${'8.'.green} Marcar como terminados Trabajos`
            },
            {
                value: '9',
                name: `${'9.'.green} Eliminar Trabajos`
            },
            {
                value: '12',
                name: `${'10.'.green} Listar Mapro Transener `
            },
            {
                value: '0',
                name: `${'0.'.red} Salir `
            },
            
        ]
    }
]


const inquirerMenu = async()=>{

    console.clear();
    console.log('==========================='.green);
    console.log('  SELECCIONE UNA OPCIÓN    '.white);
    console.log('===========================\n'.green);    

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
} 

const pause = async()=>{
    
    await inquirer.prompt([
    {   
        name: 'pausa',
        message: `Presione ${'ENTER'.green} para continuar...\n`
    }])
}

const leerInputMantenimiento = async(message1,message2,message3,message4,message5)=>{
    const question1 = [
        {
            type: 'input',
            name: 'ets',
            message:message1,
            validate(value){
                if(value.length === '0'){
                    return 'Por favor ingrese el nombre de la ET o si es linea ET1-ET2...\n';            
                }
                return true;
            }
        }
    ];
    const question2 = [
        {
            type: 'list',
            name: 'tctfsoet',
            message:message2,
            choices:['TCT','F/S','Trabajo en ET']
        }
    ];
    const question3 = [
        {
            type: 'input',
            name: 'desc',
            message:message3,
            default:'-'
        }
    ];
    const question4 = [
        {
            type: 'list',
            name: 'operador',
            message:message4,
            choices:['TRANSNOA','DISTRIBUIDORA','TRANSENER','TERCEROS']
        }
    ];
    const question5 = [
        {
            type: 'input',
            name: 'personal',
            message:message5
        }
    ];


    const {ets} = await inquirer.prompt(question1);
    const { tctfsoet } = await inquirer.prompt(question2);
    const { desc } = await inquirer.prompt(question3);
    const { operador } = await inquirer.prompt(question4);
    const { personal } = await inquirer.prompt(question5);

    const etsM = ets.toUpperCase();
    const descM = desc.toUpperCase();
    const personalM = personal.toUpperCase();
    let array = [etsM,tctfsoet,descM,operador,personalM];
    
    return array;
}
const listadoTrabajoBorrar = async(trabajos=[])=>{
    
    const choices = trabajos.map((trabajo,i) =>{
        const idx = `${i+1}.`.green;

        return {
            value: trabajo.id,
            name:` ${idx} ${trabajo.ets} -- ${trabajo.tipoMaproOEmergencia} // ${trabajo.operador}\n       ${trabajo.desc} `
        }
    });

    choices.unshift({
        value:'0',
        name:' 0. '.green + 'Cancelar'
    });

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices:choices

        }
    ]    

    const { id } = await inquirer.prompt(preguntas);
    return id;
}
const confirmar = async (message)=>{
    const question =[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const listadoTrabajoChecklist = async(trabajos=[])=>{
    
    const choices = trabajos.map((trabajo,i) =>{
        const idx = `${i+1}.`.green;

        return {
            value: trabajo.id,
            name:` ${idx} ${trabajo.ets} -- ${trabajo.tipoMaproOEmergencia} // ${trabajo.operador}\n       ${trabajo.desc} `,
            checked:(trabajo.completado) ? true : false
        }
    });

    const pregunta = [
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices:choices

        }
    ]    

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    leerInputMantenimiento,
    listadoTrabajoBorrar,
    confirmar,
    listadoTrabajoChecklist
}