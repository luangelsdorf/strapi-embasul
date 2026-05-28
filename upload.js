const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const productsDir = '/home/luangelsdorf/Documents/Projects/Embasul/strapi-embasul/products';
const dadosPath = path.join(productsDir, 'dados.txt');

async function main() {
  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.jpeg')).sort();
  const dadosLines = fs.readFileSync(dadosPath, 'utf-8').split('\n').filter(l => l.trim().length > 0);
  
  if (files.length !== dadosLines.length) {
    console.error(`Mismatch: ${files.length} files vs ${dadosLines.length} lines in dados.txt`);
    return;
  }
  
  const uploadResults = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const line = dadosLines[i];
    
    // Line format: "caixa-de-cha-montada-em-angulo - Embalagem de papelão..."
    const splitIndex = line.indexOf(' - ');
    if (splitIndex === -1) {
      console.error(`Line format error: ${line}`);
      continue;
    }
    
    const newName = line.substring(0, splitIndex).trim();
    const altText = line.substring(splitIndex + 3).trim();
    
    const filePath = path.join(productsDir, file);
    
    const formData = new FormData();
    formData.append('files', fs.createReadStream(filePath), { filename: newName + '.jpeg' });
    formData.append('fileInfo', JSON.stringify({
      alternativeText: altText,
      caption: altText,
      name: newName
    }));
    
    console.log(`Uploading ${file} as ${newName}...`);
    
    try {
      const response = await axios.post('http://127.0.0.1:1337/api/upload', formData, {
        headers: formData.getHeaders()
      });
      const uploadedFile = response.data[0];
      
      const groupPrefixMatch = file.match(/^(.*?)-\d+\.jpeg$/);
      let groupName = file;
      if (groupPrefixMatch) {
        groupName = groupPrefixMatch[1];
      } else {
        groupName = file.replace('.jpeg', '');
      }

      uploadResults.push({
        originalFile: file,
        id: uploadedFile.id,
        group: groupName,
        name: newName
      });
      console.log(`Successfully uploaded ${file} -> id: ${uploadedFile.id}`);
    } catch (error) {
      console.error(`Error uploading ${file}:`, error.response ? error.response.data : error.message);
    }
  }
  
  // Grouping
  const groups = {};
  for (const item of uploadResults) {
    if (!groups[item.group]) {
      groups[item.group] = [];
    }
    groups[item.group].push(item);
  }
  
  // Create portfolio entries
  for (const groupName of Object.keys(groups)) {
    const items = groups[groupName];
    const galleryIds = items.map(item => item.id);
    const coverId = galleryIds[0];
    
    // Format title. E.g., 'caixa-cha' -> 'Caixa Cha'
    const title = groupName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const slug = groupName;
    
    const data = {
      data: {
        title: title,
        slug: slug,
        cover: coverId,
        gallery: galleryIds,
        text: `<p>Galeria de imagens para o produto ${title}</p>`,
        publishedAt: new Date().toISOString()
      }
    };
    
    console.log(`Creating portfolio entry for group ${groupName}...`);
    try {
      const res = await axios.post('http://127.0.0.1:1337/api/portfolio', data);
      console.log(`Created portfolio entry: id ${res.data.data.id}`);
    } catch (error) {
      console.error(`Error creating entry for ${groupName}:`, error.response ? JSON.stringify(error.response.data) : error.message);
    }
  }
  
  console.log('Script finished successfully!');
}

main().catch(err => console.error('Unexpected error:', err));
