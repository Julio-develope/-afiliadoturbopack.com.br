document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".comentario-form");
  const nomeInput = document.getElementById("nome");
  const comentarioInput = document.getElementById("comentario");
  const lista = document.querySelector(".comentarios-lista");

  let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  function renderizarComentarios() {
    // Remove só os comentários adicionados pelo JS anteriormente (com a classe .js)
    lista.querySelectorAll(".comentario.js").forEach(el => el.remove());

    comentarios.forEach(({ nome, texto }) => {
      const div = document.createElement("div");
      div.classList.add("comentario", "js"); // marca os comentários do JS
      div.innerHTML = `<strong>${nome}:</strong><p>${texto}</p>`;
      lista.appendChild(div);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const texto = comentarioInput.value.trim();

    // Validação de limite - opcional pois maxlength já ajuda
    if (nome.length > 30) {
      alert("O nome deve ter no máximo 30 caracteres.");
      return;
    }

    if (texto.length > 300) {
      alert("O comentário deve ter no máximo 300 caracteres.");
      return;
    }

    // Verifica se o nome já comentou
    const jaComentou = comentarios.some(c => c.nome.toLowerCase() === nome.toLowerCase());
    if (jaComentou) {
      alert("Você já enviou um comentário. Apenas um comentário por nome é permitido.");
      return;
    }

    if (nome && texto) {
      comentarios.push({ nome, texto });
      localStorage.setItem("comentarios", JSON.stringify(comentarios));
      renderizarComentarios();

      nomeInput.value = "";
      comentarioInput.value = "";
    }
  });

  renderizarComentarios();
});



  document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('nav-menu').classList.toggle('active');
  });




 