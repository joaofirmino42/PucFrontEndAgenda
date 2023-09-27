
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const getPessoas = async () => {
    let url = 'http://127.0.0.1:5000/pessoas';
    fetch(url, {
        method: 'get'
    }).then((response) => response.json())
        .then((data) => {
          
            data.pessoas.forEach(item => insertList(item.nome, item.telefone, item.anotacao,item.cep,item.logradouro,item.bairro,item.cidade,item.uf))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
const getPessoa= async () => {
    let url = 'http://127.0.0.1:5000/pessoa?nome=';
    fetch(url, {
        method: 'get'
    }).then((response) => response.json())
        .then((data) => {
          
            data.pessoas.forEach(item => insertList(item.nome, item.telefone, item.anotacao,item.cep,item.logradouro,item.bairro,item.cidade,item.uf))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
// getPessoas()
/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma pessoa
  --------------------------------------------------------------------------------------
*/
const adicionarPessoa = () => {
    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let anotacao = document.getElementById("anotacao").value;
    let cep = document.getElementById("cep").value;
    let logradouro = document.getElementById("logradouro").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let uf = document.getElementById("uf").value;
    if (nome=='') {
        alert("Escreva o nome da pessoa");
   
    }
     else {
        insertList(nome, telefone, anotacao, cep, logradouro,bairro,cidade,uf)
        postPessoa(nome, telefone, anotacao, cep, logradouro,bairro,cidade,uf)
        alert("Item adicionado!")
    }
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

const postPessoa = async (nome, telefone, anotacao, cep, logradouro,bairro,cidade,uf) => {
    
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('telefone', telefone);
    formData.append('anotacao', anotacao);
    formData.append('cep', cep);
    formData.append('logradouro', logradouro);
    formData.append('bairro', bairro);
    formData.append('cidade', cidade);
    formData.append('uf', uf);
    let url = 'http://127.0.0.1:5000/pessoa';
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then((response) => {
            response.json()
            getPessoas()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
/*
  --------------------------------------------------------------------------------------
  Função para atualizar uma pessoa
  --------------------------------------------------------------------------------------
*/
const atualizaPessoa = () => {
    let nome = document.getElementById("nomeUpdate").value;
    let telefone = document.getElementById("telefoneUpdate").value;
    let anotacao = document.getElementById("anotacaoUpdate").value;
    let cep = document.getElementById("cepUpdate").value;
    let logradouro = document.getElementById("logradouroUpdate").value;
    let bairro = document.getElementById("bairroUpdate").value;
    let cidade = document.getElementById("cidadeUpdate").value;
    let uf = document.getElementById("ufUpdate").value;
 
    if (nome=='') {
        alert("Escreva o nome da pessoa");
   
        
     
    }
    else {
        insertList(nome, telefone, anotacao, cep, logradouro,bairro,cidade,uf)
        putPessoa(nome, telefone, anotacao, cep, logradouro,bairro,cidade,uf)
        alert("Item adicionado!")
    }
}
const putPessoa = async (nome, telefone, anotacao, cep, logradouro,bairro,cidade,uf) => {
  
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('telefone', telefone);
    formData.append('anotacao', anotacao);
    formData.append('cep', cep);
    formData.append('logradouro', logradouro);
    formData.append('bairro', bairro);
    formData.append('cidade', cidade);
    formData.append('uf', uf);
    let url = 'http://127.0.0.1:5000/pessoa';
    fetch(url, {
        method: 'put',
        body: formData
    })
        .then((response) => {
            response.json()
            getPessoas()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}
/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/pessoa?nome=' + item;
    fetch(url, {
        method: 'delete'
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}
/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement.parentElement;
            const nomeItem = div.getElementsByTagName('td')[0].innerHTML
            if (confirm("Você tem certeza?")) {
                div.remove()
                deleteItem(nomeItem)
                alert("Removido!")
            }
        }
    }
}
/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nome, telefone, anotacao, cep, logradouro,bairro,cidade,uf) => {
    var item = [nome, telefone, anotacao]
    var table = document.getElementById('tabela');
    var row = table.insertRow();
    for (var i = 0; i < item.length; i++) {
        var cel = row.insertCell(i);
        cel.textContent = item[i]

    }
    insertButton(row.insertCell(-1))
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("anotacao").value = "";

    removeElement();
}
$(document).ready(function(){
/*
  --------------------------------------------------------------------------------------
  Função para consultar o  CEP
  --------------------------------------------------------------------------------------
*/
    $("#cep").blur(function(){

        var cepDigitado = $("#cep").val();

        if(cepDigitado.length==8){

            $.getJSON("https://viacep.com.br/ws/"+cepDigitado+"/json/",
                    function(dados){
                        $("#logradouro").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        //$("#numero").focus();
                    });

        }else{
            $("#logradouro").val("");
            $("#bairro").val("");
            $("#cidade").val("");
            $("#uf").val("");                    
        }

    });
    /*
  --------------------------------------------------------------------------------------
  Função para consultar o  CEP
  --------------------------------------------------------------------------------------
*/
    $("#cepUpdate").blur(function(){

        var cepDigitado = $("#cepUpdate").val();

        if(cepDigitado.length==8){

            $.getJSON("https://viacep.com.br/ws/"+cepDigitado+"/json/",
                    function(dados){
                        $("#logradouroUpdate").val(dados.logradouro);
                        $("#bairroUpdate").val(dados.bairro);
                        $("#cidadeUpdate").val(dados.localidade);
                        $("#ufUpdate").val(dados.uf);
                        //$("#numero").focus();
                    });

        }else{
            $("#logradouroUpdate").val("");
            $("#bairroUpdate").val("");
            $("#cidadeUpdate").val("");
            $("#ufUpdate").val("");                    
        }

    });

});
