document.getElementById("generate-pix").addEventListener("click", async () => {
  const pixOutput = document.getElementById("pix-output");

  pixOutput.innerHTML = "<p>Gerando QR Code PIX, aguarde...</p>";

  try {
    // Exemplo: Chamada simulada para a API Mercado Pago — substitua pela sua API real
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer SUA_CHAVE_DE_API" // coloque sua chave real aqui
      },
      body: JSON.stringify({
        transaction_amount: 10.0,
        description: "Pacote Básico - R$10,00",
        payment_method_id: "pix",
        payer: {
          email: "cliente@exemplo.com",
          first_name: "Cliente"
        }
      })
    });

    const data = await response.json();

    if (data.status === "pending") {
      pixOutput.innerHTML = `
        <p>Escaneie o QR Code abaixo para pagar:</p>
        <img src="${data.point_of_interaction.transaction_data.qr_code_base64}" alt="QR Code PIX" />
        <p>Aguardando confirmação do pagamento...</p>
      `;

      // Começa a monitorar o pagamento
      monitorPayment(data.id);
    } else {
      pixOutput.innerHTML = `<p>Erro ao gerar pagamento: ${data.message}</p>`;
    }
  } catch (error) {
    pixOutput.innerHTML = `<p>Erro na requisição: ${error.message}</p>`;
  }
});

async function monitorPayment(paymentId) {
  const pixOutput = document.getElementById("pix-output");

  const interval = setInterval(async () => {
    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: "Bearer SUA_CHAVE_DE_API" // sua chave real aqui também
        }
      });
      const data = await response.json();

      if (data.status === "approved") {
        clearInterval(interval);

        // Mostra o link para o pacote — substitua pela URL real do seu produto
        pixOutput.innerHTML = `
          <p>Pagamento aprovado! 🎉</p>
          <p>Seu link de acesso ao <strong>Pacote Básico</strong> está abaixo:</p>
          <a href="https://seusite.com/link-do-pacote" target="_blank" rel="noopener noreferrer" class="btn-link">Acessar Pacote</a>
        `;
      }
    } catch (error) {
      clearInterval(interval);
      pixOutput.innerHTML = `<p>Erro ao verificar pagamento: ${error.message}</p>`;
    }
  }, 5000); // checa a cada 5 segundos
}
