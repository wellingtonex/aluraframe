class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade  = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        let data = new Date(this._inputData.value.split('-'));
        console.log(data);
        console.log(data.getTime());
        let negociacao = new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);
        console.log(negociacao.data);
        console.log(negociacao.quantidade);
        console.log(negociacao.valor);
    }
}