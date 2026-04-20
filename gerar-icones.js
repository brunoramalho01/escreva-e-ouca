const { createCanvas } = require('canvas');
const fs = require('fs');

function gerarIcone(tamanho, arquivo) {
  const c = createCanvas(tamanho, tamanho);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#7a4a28';
  ctx.fillRect(0, 0, tamanho, tamanho);
  ctx.font = `bold ${tamanho * 0.55}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✍️', tamanho / 2, tamanho / 2);
  fs.writeFileSync(arquivo, c.toBuffer('image/png'));
  console.log(`Gerado: ${arquivo}`);
}

try {
  gerarIcone(192, 'icon-192.png');
  gerarIcone(512, 'icon-512.png');
} catch (e) {
  console.log('canvas não instalado — usando fallback SVG como PNG');
}
