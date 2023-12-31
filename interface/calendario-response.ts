// Generated by https://quicktype.io

import { IEquipo } from "./equipo-response";

export interface ICalendarioResponse {
    calendario: Calendario[];
}

export interface Calendario {
    id:                number;
    fechaPartido:      string;
    fecha:             number;
    hora:              string;
    idEquipoLocal:     number;
    idEquipoVisitante: number;
    equipoLocal:       IEquipo;
    equipoVisitante:   IEquipo;
}


