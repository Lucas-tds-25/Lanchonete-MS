
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
