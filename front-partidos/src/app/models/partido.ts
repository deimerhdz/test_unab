export class Partido {
    constructor(
        public id:number,
        public usuario: number,
        public local:number,
        public visitante: number,
        public fecha:number,
        public goles_local: number,
        public goles_visitante: number,
        
    ) {
        
    }
}