class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade  = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();
        let data = DateHelper.textoParaData(this._inputData.value);                
        let negociacao = new Negociacao(data, this._inputQuantidade.value, this._inputValor.value);
        console.log(DateHelper.dataParaTexto(negociacao.data));
        console.log(negociacao.quantidade);
        console.log(negociacao.valor);
    }
}