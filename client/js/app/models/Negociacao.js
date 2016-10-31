class Negociacao {

    constructor(data, quantidade, valor){
        this._data = new Date(data.getTime());
        this._quantidade = quantidade
        this._valor = valor;
        Object.freeze(this);
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get quantidade() {
        return _quantidade;
    }

    get data() {
        return new Date(_data.getTime());
    }

    get valor() {
        return _valor;
    }

}