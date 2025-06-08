
// Dados do carrinho
let carrinho = [];
let clienteLogado = null;

// Grid de lanches 
const lanches = [
  { id: 1, nome: "Boca Nervosa", preco: 27, img: "/assets/boca-nervosa.png" },
  { id: 2, nome: "Brutal Burger", preco: 30, img: "/assets/brutal-burger.png" },
  { id: 3, nome: "Burg Trovão", preco: 29, img: "/assets/burg-trovao.png" },
  { id: 4, nome: "Crunch Master", preco: 25, img: "/assets/crunch-master.png" },
  { id: 5, nome: "El Gran Toro", preco: 24, img: "/assets/el-gran-toro.png" },
  { id: 6, nome: "Fome de Leão", preco: 25, img: "/assets/fome-de-leao.png" },
  { id: 7, nome: "Giga Burger", preco: 29, img: "/assets/giga-burger.png" },
  { id: 8, nome: "King Bacon", preco: 28, img: "/assets/king-bacon.png" },
  { id: 9, nome: "Queijo Nebuloso", preco: 25, img: "/assets/queijo-nebuloso.png" },
  { id: 10, nome: "Titã do Sabor", preco: 26, img: "/assets/tita-do-sabor.png" },
  { id: 11, nome: "X-Absoluto", preco: 30, img: "/assets/x-absoluto.png" },
  { id: 12, nome: "X-Turbo", preco: 30, img: "/assets/x-turbo.png" }
];

// Renderiza os lanches na grid
function renderizarLanches() {
  const container = document.getElementById("lanchesContainer");
  container.innerHTML = "";

  lanches.forEach((lanche) => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${lanche.img}" class="card-img-top" alt="${lanche.nome}">
        <div class="card-body text-center">
          <h5 class="card-title">${lanche.nome}</h5>
          <p class="card-text">R$ ${lanche.preco.toFixed(2)}</p>
          <button class="btn btn-outline-success" onclick="adicionarAoCarrinho(${lanche.id})" ${
            clienteLogado ? "" : "disabled"
          }>Adicionar ao carrinho</button>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

document.getElementById("btnVerPedido").addEventListener("click", () => {
  renderizarCarrinho(); // mostra os itens no modal
});

// Adiciona um lanche ao carrinho
function adicionarAoCarrinho(id) {
  const lanche = lanches.find((l) => l.id === id);
  const itemExistente = carrinho.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.qtd++;
  } else {
    carrinho.push({ ...lanche, qtd: 1 });
  }

  atualizarBotaoVerPedido();
}

// Atualiza o botão "Ver Pedido"
function atualizarBotaoVerPedido() {
  const btn = document.getElementById("btnVerPedido");
  btn.disabled = carrinho.length === 0;
}

// Renderiza modal do carrinho
function renderizarCarrinho() {
  const conteudo = document.getElementById("conteudoCarrinho");

  if (carrinho.length === 0) {
    conteudo.innerHTML = "<div class='p-4'>Carrinho vazio.</div>";
    return;
  }

  let total = 0;
  let htmlItens = carrinho
    .map((item) => {
      total += item.preco * item.qtd;
      return `
        <div class="d-flex align-items-center mb-3">
          <img src="${item.img}" alt="${item.nome}" width="80" class="me-3">
          <div class="flex-grow-1">
            <h6>${item.nome}</h6>
            <p>R$ ${item.preco.toFixed(2)} x ${item.qtd}</p>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-secondary" onclick="alterarQtd(${item.id}, -1)">-</button>
              <input type="text" readonly class="form-control form-control-sm text-center" style="width: 40px;" value="${item.qtd}">
              <button class="btn btn-sm btn-secondary" onclick="alterarQtd(${item.id}, 1)">+</button>
              <button class="btn btn-sm btn-danger ms-2" onclick="removerItem(${item.id})">Excluir</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  conteudo.innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">Seu Pedido</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
    </div>
    <div class="modal-body">
      ${htmlItens}
      <hr>
      <div><strong>Total: R$ ${total.toFixed(2)}</strong></div>
      <div class="mt-3">
        <label class="form-label">Forma de pagamento:</label>
        <select class="form-select" id="formaPagamento">
          <option>Dinheiro</option>
          <option>PIX</option>
          <option>Débito</option>
          <option>Crédito</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-danger" onclick="limparCarrinho()">Limpar carrinho</button>
      <button class="btn btn-success" onclick="finalizarCompra()">Finalizar compra</button>
    </div>
  `;
}

// Altera a quantidade de um item
function alterarQtd(id, delta) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;

  item.qtd += delta;
  if (item.qtd <= 0) {
    carrinho = carrinho.filter((i) => i.id !== id);
  }

  atualizarBotaoVerPedido();
  renderizarCarrinho();
}

// Remove item do carrinho
function removerItem(id) {
  carrinho = carrinho.filter((item) => item.id !== id);
  atualizarBotaoVerPedido();
  renderizarCarrinho();
}

// Limpa todo o carrinho
function limparCarrinho() {
  carrinho = [];
  atualizarBotaoVerPedido();
  renderizarCarrinho();
}

// Finaliza a compra
function finalizarCompra() {
  const forma = document.getElementById("formaPagamento").value;
  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0).toFixed(2);

  alert(`Valor: R$ ${total}\nForma de pagamento: ${forma}\nCompra finalizada com sucesso!`);
  limparCarrinho();
  const modal = bootstrap.Modal.getInstance(document.getElementById("pedidoModal"));
  modal.hide();
}

// Login do cliente
document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();
  const usuario = document.getElementById("usuarioLogin").value;
  const senha = document.getElementById("senhaLogin").value;

  const dados = localStorage.getItem("cliente_" + usuario);
  if (!dados) {
    alert("Usuário não encontrado.");
    return;
  }

  const cliente = JSON.parse(dados);
  if (cliente.senha !== senha) {
    alert("Senha incorreta.");
    return;
  }

  clienteLogado = cliente;
  document.getElementById("mensagemLogin").classList.add("d-none");
  document.getElementById("boasVindas").classList.remove("d-none");
  document.getElementById("boasVindas").textContent = `Olá, ${cliente.nome}!`;

  renderizarLanches();

  const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
  modal.hide();
});

// Inicializa a página
renderizarLanches();
