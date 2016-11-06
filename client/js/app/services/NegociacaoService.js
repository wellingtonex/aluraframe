class NegociaoService {

    obterNegociacoesDaSemana() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log('Obtendo negociações do servidor.')
                    JSON.parse(xhr.responseText).map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)
                    );
                } else {
                    console.log('não foi possivel obter a negociações do servidor.')
                }
            }
        }
        xhr.send();
    }
}