window.addEventListener('DOMContentLoaded', () => {
  const pixKey = '11122233344@pix.example.com';
  const amount = 19.90;
  const merchantName = 'Seu Negócio Ltda';
  const merchantCity = 'Cidade';
  const description = 'Pagamento do Pacote Utensílios de Cozinha';

  // Atualiza o texto da chave
  document.getElementById('pixKey').textContent = pixKey;

  // Gera o QR Code com a lib pix-payload-js
  const { PixPayload } = window['pix-payload-js'];
  const pixPayload = new PixPayload({
    key: pixKey,
    amount,
    merchantName,
    merchantCity,
    description,
  });

  const payload = pixPayload.getPayload();

  new QRCode(document.getElementById('qrcode'), {
    text: payload,
    width: 200,
    height: 200,
  });

  // Copiar chave PIX
  const copyBtn = document.getElementById('copyPixBtn');
  const copyMsg = document.getElementById('copyMsg');

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      copyMsg.style.display = 'block';
      setTimeout(() => {
        copyMsg.style.display = 'none';
      }, 3000);
    }).catch(() => {
      copyMsg.textContent = 'Erro ao copiar a chave.';
      copyMsg.style.display = 'block';
    });
  });
});
