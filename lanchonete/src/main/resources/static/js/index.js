//
//document.getElementById("telefone").addEventListener("input", function (e) {
//  let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
//
//  if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos
//
//  if (valor.length > 6) {
//    valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
//  } else if (valor.length > 2) {
//    valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
//  } else if (valor.length > 0) {
//    valor = `(${valor}`;
//  }
//  e.target.value = valor;
//});
//
//// Validação e cadastro
//document.getElementById("formCadastro").addEventListener("submit", function (e) {
//  e.preventDefault();
//
//  const nome = document.getElementById("nome").value;
//  const endereco = document.getElementById("endereco").value;
//  const telefone = document.getElementById("telefone").value;
//  const usuario = document.getElementById("usuario").value;
//  const senha = document.getElementById("senha").value;
//
//  // Validação do telefone
//  const telefoneValido = /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
//  if (!telefoneValido) {
//    alert("Telefone inválido. Use o formato (XX) XXXXX-XXXX.");
//    return;
//  }
//
//  // Evita cadastro duplicado
//  if (localStorage.getItem("cliente_" + usuario)) {
//    alert("Usuário já cadastrado. Tente outro nome de usuário.");
//    return;
//  }
//
//  const cliente = { nome, endereco, telefone, usuario, senha };
//
//  // Salva no localStorage
//  localStorage.setItem("cliente_" + usuario, JSON.stringify(cliente));
//
//  alert("Cadastro realizado com sucesso!");
//  document.getElementById("formCadastro").reset();
//  const modal = bootstrap.Modal.getInstance(document.getElementById('cadastroModal'));
//  modal.hide();
//});

document.addEventListener("DOMContentLoaded", function () {
  const telefoneInput = document.getElementById("telefone");

  if (telefoneInput) {
    telefoneInput.addEventListener("input", function (e) {
      let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

      if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

      if (valor.length > 6) {
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
      } else if (valor.length > 2) {
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
      } else if (valor.length > 0) {
        valor = `(${valor}`;
      }
      e.target.value = valor;
    });
  }
});

//const cliente = {
//  nome: document.getElementById("nome").value,
//  usuario: document.getElementById("usuario").value,
//  senha: document.getElementById("senha").value,
//};
//localStorage.setItem("cliente_" + cliente.usuario, JSON.stringify(cliente));

document.querySelector("form").addEventListener("submit", function (e) {
  const cliente = {
    nome: document.getElementById("nome").value,
    usuario: document.getElementById("usuario").value,
    senha: document.getElementById("senha").value
  };
  localStorage.setItem("cliente_" + cliente.usuario, JSON.stringify(cliente));
});


