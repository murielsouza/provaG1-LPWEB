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
    exibir_label = 'exibir';
    alunoPesquisa = null;

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
              new Aluno(19282443, 'Jackson G. de Souza')];

    ocorrencias = [new Ocorrencia(this.alunos[0], '2018-03-05', 0, true, 'Ismael P. T. Júnior', 'Decepção...'  ),
                   new Ocorrencia(this.alunos[1], '2018-03-10', 1, false, null, '...')];

    constructor() {
        this.invocar_cache();
        this.atualizarEstatisticas();
    }

    salvar() {

            const o = new Ocorrencia(this.alunoPesquisa, this.data, this.tipo, this.comparecimento, this.responsavel, this.observacao);
            this.ocorrencias.push(o);
            this.armazenar_cache(o);
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
      for(let a of this.alunos) {
        if(a.matricula == matricula) {
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
            if (this.ocorrencias[i].data.indexOf("-04-") != -1) {
                this.cont_abril++;
            }
            if (this.ocorrencias[i].data.indexOf('-03-') != -1) {
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
            this.exibir_label = 'exibir';
        }
        else {
            this.exibir_ok = true;
            this.exibir_label = 'ocultar';
        }
    }

    armazenar_cache(ocorrencia) {
        localStorage.setItem(((Math.random()*1000)+1).toString(), JSON.stringify(ocorrencia));
    }
    invocar_cache() {
        for(const i in localStorage) {
            const o = JSON.parse(localStorage.getItem(i));
            if(o != undefined){
                this.ocorrencias.push(o);
            }
        }
    }
}
