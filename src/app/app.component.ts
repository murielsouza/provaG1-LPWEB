import { Component } from '@angular/core';
import {Ocorrencia} from './ocorrencia.model';
import {Aluno} from './aluno.model';
import {TipoDeOcorrencia} from './tipo-de-ocorrencia.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    selecionado = false;
    matricula = null;
    nome = null;
    observacao = null;
    data = null;
    comparecimento = false;
    tipo = null;
    responsavel = null;
    salvar_ok = false;
    salvar_not_ok = false;
    exibir_ok = false;
    alunoPesquisa = null;
    dataInicial = null;
    dataFinal = null;
    qtdIntervalo = 0;

    contadores = [0, 0, 0, 0];
    porcentagens = [0, 0, 0, 0];
    cont_abril = 0;
    cont_marco = 0;
    relacao_ocorrencias = 0;

    tipos = [new TipoDeOcorrencia(0, 'indisciplina em sala de aula'),
        new TipoDeOcorrencia(1, 'comportamento inadequado com colegas'),
        new TipoDeOcorrencia(2, 'baixo índice de rendimento'),
        new TipoDeOcorrencia(3, 'indicação de atenção por assunto familiar, psicológico e/ou social')
    ];

    alunos = [new Aluno(118341210, 'Luara A. da Silva'),
        new Aluno(120895810, 'Muriel S. da Cruz'),
        new Aluno(111106110, 'Ismael P. Torres Jr.'),
        new Aluno(19282443, 'Jackson G. de Souza'),
        new Aluno(106025010, 'Vinicius O. Cavichioli')];

    ocorrencias = [new Ocorrencia(this.alunos[0], new Date(2018, 2, 12), 1, true, 'Ismael P. T. Júnior', 'Decepção...'),
        new Ocorrencia(this.alunos[1], new Date(2018, 2, 30), 1, false, null, '...'),
        new Ocorrencia(this.alunos[3], new Date(2018, 2, 15), 3, true, 'Mom Gomes de Souza', '...'),
        new Ocorrencia(this.alunos[2], new Date(2018, 3, 19), 3, false, null, '...'),
        new Ocorrencia(this.alunos[4], new Date(2018, 2, 8), 2, true, 'Milton O. Cavichioli', '...')];

    constructor() {
        //this.invocar_cache();
        this.ocorrencias.sort((a, b) => a.data > b.data);
        this.atualizarEstatisticas();
    }

    salvar() {

        const o = new Ocorrencia(this.alunoPesquisa, new Date(this.data.split('-', 3)), this.tipo, this.comparecimento, this.responsavel, this.observacao);
        this.ocorrencias.push(o);
        this.armazenar_cache();
        this.salvar_ok = true;
        this.atualizarEstatisticas();


        this.matricula = null;
        this.nome = null;
        this.tipo = null;
        this.comparecimento = null;
        this.responsavel = null;
        this.observacao = null;
        this.alunoPesquisa = null;
        this.selecionado = false;
    }

    pesquisaIntervalos() {
        const inicial = new Date(this.dataInicial.split('-', 3));
        const final = new Date(this.dataFinal.split('-', 3));
        this.qtdIntervalo = 0;
        for (var i = 0; i < this.ocorrencias.length; i++) {
            const dataOcorrencia = this.ocorrencias[i].data;
            if (dataOcorrencia >= inicial && dataOcorrencia <= final) {
                this.qtdIntervalo++;
            }
        }
    }

    selecionar(status) {
        this.selecionado = status;
    }

    cancelar() {
        this.matricula = null;
        this.nome = null;
        this.tipo = null;
        this.comparecimento = null;
        this.responsavel = null;
        this.observacao = null;
        this.alunoPesquisa = null;
    }

    verificarAluno(matricula) {
        for (let a of this.alunos) {
            if (a.matricula == matricula) {
                this.alunoPesquisa = a;
                this.salvar_not_ok = false;
                return true;
            }
        }
        this.salvar_not_ok = true;
        return false;
    }

    atualizarEstatisticas() {
        this.contadores = [0, 0, 0, 0];
        this.cont_abril = 0;
        this.cont_marco = 0;
        for (var i = 0; i < this.ocorrencias.length; i++) {
            this.contadores[this.ocorrencias[i].tipo]++;
            if (this.ocorrencias[i].data.getMonth() == 3) { //sempre -1 porque mês começa do zero em Javascript
                this.cont_abril++;
            }
            if (this.ocorrencias[i].data.getMonth() == 2) {
                this.cont_marco++;
            }
        }
        if (this.cont_marco != 0) {
            this.relacao_ocorrencias = (this.cont_abril - this.cont_marco) / this.cont_marco * 100;
        }
        for (var i = 0; i < 4; i++) {
            this.porcentagens[i] = this.contadores[i] / this.ocorrencias.length * 100;
        }
    }

    exibir_estatisticas() {
        if (this.exibir_ok) {
            this.exibir_ok = false;
        }
        else {
            this.exibir_ok = true;
        }
    }

    armazenar_cache() {
        localStorage.setItem('ocorrencias', JSON.stringify(this.ocorrencias));
        localStorage.setItem('alunos', JSON.stringify(this.alunos));
        localStorage.setItem('tipoOcorrencias', JSON.stringify(this.tipos));
    }

    invocar_cache() {
        for (const i in localStorage) {
            alert(i);
            const obj = JSON.parse(localStorage.getItem(i));
            if (obj != undefined) {
                if (obj[0] instanceof Ocorrencia) {
                    for (let o of obj) {
                        o.data = new Date(o.data);
                        this.ocorrencias.push(o);
                    }
                }
                if (obj[0] instanceof Aluno) {
                    for (let a of obj) {
                        this.alunos.push(a);
                    }
                }
                if (obj[0] instanceof Aluno) {
                    for (let t of obj) {
                        this.tipos.push(t);
                    }
                }
            }
        }
    }
}