const { v4 }= require('uuid');

class Mantenimiento {
    constructor(tipoMaproOEmergencia,ets,tctfsoet,desc,operador,personal){
        this.id = v4();
        this.tipoMaproOEmergencia =tipoMaproOEmergencia;
        this.ets=ets;
        this.tctfsoet=tctfsoet;
        this.desc = desc;
        this.operador = operador;
        this.completado = null;
        this.personal=personal;
    } 
}



module.exports= Mantenimiento;