
let agenda = [];
let currentIndex = 0;
let isEditing = false;


function login() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    let mensagemErro = document.getElementById('mensagemErro');

    if (usuario === 'admin' && senha === 'admin') {
        window.location.href = "agenda.html";
    } else {
        mensagemErro.textContent = "Usuário ou senha incorretos. Tente novamente.";
        document.getElementById('mensagemErro').style.color="red"
        document.getElementById('usuario').style.borderColor="red"
        document.getElementById('senha').style.borderColor="red"
    }
    
}

window.onload = function() {
    limparInputs();
    desabilitarCampos();
    document.getElementById('btIncluir').disabled = false;
    document.getElementById('btEditar').disabled = true;
    document.getElementById('btSalvar').disabled = true;
    document.getElementById('btCancelar').disabled = true;
    document.getElementById('btExcluir').disabled = true;
    document.getElementsByClassName('btBusca').disabled = true;
    document.getElementById('btEditar').classList.add('btDisable')
    document.getElementById('btSalvar').classList.add('btDisable')
    document.getElementById('btCancelar').classList.add('btDisable')
    document.getElementById('btExcluir').classList.add('btDisable')
}


function habilitarCampos() {
    document.getElementById('nome').disabled = false;
    document.getElementById('sobrenome').disabled = false;
    document.getElementById('endereco').disabled = false;
    document.getElementById('telefone').disabled = false;
}


function desabilitarCampos() {
    document.getElementById('nome').disabled = true;
    document.getElementById('sobrenome').disabled = true;
    document.getElementById('endereco').disabled = true;
    document.getElementById('telefone').disabled = true;
}

function limparInputs() {
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('telefone').value = '';
}

function incluir() {

    document.getElementById('btExcluir').classList.add('btDisable');
    document.getElementById('btEditar').classList.add('btDisable');
    document.getElementById('btIncluir').classList.add('btDisable');
    document.getElementById('btSalvar').disabled = false;
    document.getElementById('btCancelar').disabled = false;
    document.getElementById('btSalvar').classList.remove('btDisable');
    document.getElementById('btCancelar').classList.remove('btDisable');
    
    
    limparInputs();
    habilitarCampos()
    isEditing = false;

}

function cancelar() {
    document.getElementById('btSalvar').disabled = true;
    document.getElementById('btCancelar').disabled = true;
    document.getElementById('btSalvar').classList.add('botaoAzul');
    document.getElementById('btSalvar').classList.add('btDisable');
    document.getElementById('btCancelar').classList.add('btDisable');
    document.getElementById('btEditar').classList.add('btDisable');
    document.getElementById('btIncluir').classList.remove('btDisable');
    document.getElementById('btEditar').disabled = true;
    isEditing = false;
    verificarArrayVazio();
    desabilitarCampos();
    
}

function salvar() {
    document.getElementById('btExcluir').disabled = false;
    document.getElementById('btSalvar').disabled = true;
    document.getElementById('btEditar').disabled = false;
    document.getElementById('btExcluir').classList.remove('btDisable');
    document.getElementById('btEditar').classList.remove('btDisable');
    document.getElementById('btCancelar').disabled = true;
    document.getElementById('btCancelar').classList.add('btDisable');
    document.getElementById('btSalvar').classList.add('btDisable');
    document.getElementById('btIncluir').classList.remove('btDisable');
    let nome = document.getElementById('nome').value.trim();
    let sobrenome = document.getElementById('sobrenome').value.trim();
    let endereco = document.getElementById('endereco').value.trim();
    let telefone = document.getElementById('telefone').value.trim();

    if (!nome || !sobrenome || !endereco || !telefone) {
        alert('Por favor, preencha todos os campos antes de salvar ou cancele o cadastro.');
        document.getElementById('btCancelar').classList.add('btDisable');
        document.getElementById('btExcluir').classList.add('btDisable');
        document.getElementById('btEditar').classList.add('btDisable');
        document.getElementById('btEditar').disabled = true;
        document.getElementById('btCancelar').disabled = false;
        return;
    }

    let cadastro = {
        nome: nome,
        sobrenome: sobrenome,
        endereco: endereco,
        telefone: telefone
    };

    if (isEditing) {
        agenda[currentIndex] = cadastro;
    } else {
        agenda.push(cadastro);
        currentIndex = agenda.length - 1;
    }

    isEditing = false;
    desabilitarCampos()
}

function editar() {
    document.getElementById('btExcluir').disabled = true;
    document.getElementById('btExcluir').classList.add('btDisable');
    document.getElementById('btSalvar').disabled = false;
    document.getElementById('btSalvar').classList.remove('btDisable');
    document.getElementById('btIncluir').classList.add('btDisable');
    document.getElementById('btCancelar').disabled = false;
    document.getElementById('btCancelar').classList.remove('btDisable');

    isEditing = true;

    habilitarCampos()
}

function excluir() {
    if (agenda.length > 0) {
        agenda.splice(currentIndex, 1);


        if (agenda.length > 0) {
            if (currentIndex >= agenda.length) {
                currentIndex = agenda.length - 1;
            }
            let cadastro = agenda[currentIndex];
            document.getElementById('nome').value = cadastro.nome;
            document.getElementById('sobrenome').value = cadastro.sobrenome;
            document.getElementById('endereco').value = cadastro.endereco;
            document.getElementById('telefone').value = cadastro.telefone;
        } else {
            limparInputs();
            document.getElementById('btEditar').disabled = true;
            document.getElementById('btExcluir').disabled = true;
            verificarArrayVazio();
        }
    } else {
        alert('Nenhum valor armazenado.');
    }
}


function verificarInputs() {
    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let endereco = document.getElementById('endereco').value;
    let telefone = document.getElementById('telefone').value;
    let editarButton = document.getElementById('btEditar');

    if (nome || sobrenome || endereco || telefone) {
        editarButton.disabled = false;
    } else {
        editarButton.disabled = true;
    }
}

function verificarArrayVazio() {
    let botoes = document.querySelectorAll('#botaoVermelho, #botaoAzul, #botaoBranco, #botaoAmarelo');
    if (agenda.length === 0) {
        botoes.forEach(botao => {
            botao.classList.add('btDisable');
            botao.disabled = true;
        });
    }
}


function primeira() {
    if (agenda.length > 0) {
        currentIndex = 0;
        const primeiroCadastro = agenda[0];
        document.getElementById('nome').value = primeiroCadastro.nome;
        document.getElementById('sobrenome').value = primeiroCadastro.sobrenome;
        document.getElementById('endereco').value = primeiroCadastro.endereco;
        document.getElementById('telefone').value = primeiroCadastro.telefone;
    } else {
        alert('Não há contatos salvos');
    }
}

function avanca() {
    if (agenda.length > 0) {
        currentIndex++;
        if (currentIndex >= agenda.length) {
            currentIndex = agenda.length - 1;
        }
        const cadastro = agenda[currentIndex];
        document.getElementById('nome').value = cadastro.nome;
        document.getElementById('sobrenome').value = cadastro.sobrenome;
        document.getElementById('endereco').value = cadastro.endereco;
        document.getElementById('telefone').value = cadastro.telefone;
    } else {
        alert('Não há contatos salvos');
    }
}

function recua() {
    if (agenda.length > 0) {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        const cadastro = agenda[currentIndex];
        document.getElementById('nome').value = cadastro.nome;
        document.getElementById('sobrenome').value = cadastro.sobrenome;
        document.getElementById('endereco').value = cadastro.endereco;
        document.getElementById('telefone').value = cadastro.telefone;
    } else {
        alert('Não há contatos salvos');
    }
}

function ultima() {
    if (agenda.length > 0) {
        currentIndex = agenda.length - 1;
        const ultimoCadastro = agenda[currentIndex];
        document.getElementById('nome').value = ultimoCadastro.nome;
        document.getElementById('sobrenome').value = ultimoCadastro.sobrenome;
        document.getElementById('endereco').value = ultimoCadastro.endereco;
        document.getElementById('telefone').value = ultimoCadastro.telefone;
    } else {
        alert('Não há contatos salvos');
    }
}