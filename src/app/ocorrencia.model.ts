import {Aluno} from '../../../../../Desktop/G1 - LPWEB/G1-app/src/app/aluno.model';
import {TipoDeOcorrencia} from '../../../../../Desktop/G1 - LPWEB/G1-app/src/app/tipo-de-ocorrencia.model';

export class Ocorrencia {
    aluno: Aluno;
    data: string;
    compareceram: boolean;
    responsavel: string;
    tipo: number;
    observação: string;

    constructor(aluno: Aluno, data: string, tipo: number, compareceram: boolean, responsavel?: string, observacao?: string){
        this.aluno = aluno;
        this.data = data;
        this.tipo = tipo;
        this.compareceram = compareceram;
        this.responsavel = responsavel;
        this.observação = observacao;
    }
}