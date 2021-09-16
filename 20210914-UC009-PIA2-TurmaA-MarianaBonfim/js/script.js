function cadastrar() {

    var vNom = document.getElementById("fNom").value;
    var vCPF = document.getElementById("fCPF").value;
    var vTel = document.getElementById("fTel").value;
    var vCel = document.getElementById("fCel").value;
    var vLog = document.getElementById("fLog").value;
    var vNum = document.getElementById("fNum").value;
    var vCom = document.getElementById("fCom").value;
    var vBai = document.getElementById("fBai").value;
    var vCid = document.getElementById("fCid").value;
    var vEst = document.getElementById("fEst").value;

    if (vNom != "") {
        if (vCPF.value != "" && vCPF.checkValidity()) {
            if (vTel.value != "" && vTel.checkValidity()) {
                if (vCel.value != "" && vCel.checkValidity()) {
                    if (vCep.value != "" && vCep.checkValidity()) {
                        if (vLog.value != "" && vLog.checkValidity()) {
                            if (vNum.value != "" && vNum.checkValidity()) {
                                if (vCom.value != "" && vCom.checkValidity()) {
                                    if (vBai.value != "" && vBai.checkValidity()) {
                                        if (vCid.value != "" && vCid.checkValidity()) {
                                            if (vEst.value != "" && vEst.checkValidity()) {
                                                return true;
                                            } else {
                                                alert("Informe um CPF válido")
                                                return false;
                                            }
                                        } else {
                                            alert("Informe um Telefone válido")
                                            return false;
                                        }
                                    } else {
                                        alert("Informe um Celular válido")
                                        return false;
                                    }
                                } else {
                                    alert("Informe um CEP válido")
                                    return false;
                                }
                            } else {
                                alert("Informe o Logradouro")
                                return false;
                            }
                        } else {
                            alert("Informe o Número")
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            }
        } else {
            alert("Informe o Bairro")
            return false;
        }
    } else {
        alert("Informe a Cidade")
        return false;
    }
    alert("Informe o Estado")
    return false;
}



function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('fLog').value = ("");
    document.getElementById('fBai').value = ("");
    document.getElementById('fCid').value = ("");
    document.getElementById('fEst').value = ("");

}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('fLog').value = (conteudo.logradouro);
        document.getElementById('fBai').value = (conteudo.bairro);
        document.getElementById('fCid').value = (conteudo.localidade);
        document.getElementById('fEst').value = (conteudo.uf);

    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('fLog').value = "...";
            document.getElementById('fBai').value = "...";
            document.getElementById('fCid').value = "...";
            document.getElementById('fEst').value = "...";


            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};