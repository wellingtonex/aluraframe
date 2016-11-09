import {HttpService} from './HttpService';
import {Negociacao} from '../models/Negociacao';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {ConnectionFactory} from './ConnectionFactory';
export class NegociacaoService {
    
    constructor() {
        
        this._http = new HttpService();
    }
    
    obterNegociacoesDaSemana() {
               
        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });  
    }
    
    obterNegociacoesDaSemanaAnterior() {
               
        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });   
    }
    
    obterNegociacoesDaSemanaRetrasada() {
               
        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });  
        
    }
    
    _obterNegociacoes() {
        
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
	}

    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação')
        });
    }

    listaTodos() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel obter as negociações.')
        });
    }

    apagaTodos() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao. apagaTodos())
            .then(() => 'Negocições apagadas com sucesso.')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel apagar as negociações.');
            });
    }

    importa(listaAtual) {
        return this._obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                !listaAtual.some(negocicaoExistente => 
                    JSON.stringify(negociacao) == JSON.stringify(negocicaoExistente)))
            ).catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel importar as negociações.');
            });
    }
}
