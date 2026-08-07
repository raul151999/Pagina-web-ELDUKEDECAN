const fs = require('fs');

const csvFile = 'C:\\Users\\andre\\OneDrive\\Escritorio\\DEV\\eldukedecan\\productos_nuevos.csv';
const mdFile = 'C:\\Users\\andre\\.gemini\\antigravity\\brain\\5ffd27f3-f6cd-4b33-bd9b-6db9d9a3a1f1\\descripciones_productos.md';

const raw = fs.readFileSync(csvFile, 'utf-8');
const lines = raw.split('\n');

const brands = {};

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  // Custom simple CSV parser to handle quotes
  let cols = [];
  let current = '';
  let inQuotes = false;
  
  for (let char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      cols.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  cols.push(current); // push last column
  
  if (cols.length < 4) continue;
  
  let marca = cols[0];
  let prodName = cols[2];
  let desc = cols[3];
  
  if (!brands[marca]) {
    brands[marca] = [];
  }
  
  brands[marca].push({ name: prodName, desc: desc });
}

let mdContent = `# Descripciones de Productos para Copiar y Pegar\n\n`;
mdContent += `Aquí tienes las descripciones generadas para todos tus productos. Solo busca el producto que necesitas, copia el texto y pégalo en tu Google Sheets.\n\n`;

for (const [marca, products] of Object.entries(brands)) {
  mdContent += `## ${marca}\n\n`;
  for (const p of products) {
    mdContent += `**${p.name}**\n`;
    mdContent += `> ${p.desc}\n\n`;
  }
  mdContent += `---\n\n`;
}

// Ensure the metadata for the artifact is written at the top of the file so it renders correctly
// Actually, write_to_file will handle creating the file, we just write the content directly.
fs.writeFileSync(mdFile, mdContent);
console.log('Markdown generated at', mdFile);
