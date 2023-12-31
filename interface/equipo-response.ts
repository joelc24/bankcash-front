// Generated by https://quicktype.io

export interface IEquipoResponse {
    equipos: IEquipo[];
}

export interface IEquipo {
    id:             number;
    nombre:         string;
    nombreCompleto: string;
    fundacion:      string;
}

export interface IEquipoCreate {
    nombre:         string;
    nombreCompleto: string;
    fundacion:      string;
    idCiudad:       string
}
