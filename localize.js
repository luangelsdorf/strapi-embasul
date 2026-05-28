const axios = require('axios');

async function main() {
  try {
    // Fetch existing entries
    const response = await axios.get('http://127.0.0.1:1337/api/portfolio?populate=*&locale=all');
    const entries = response.data.data;
    
    console.log(`Found ${entries.length} entries to duplicate.`);
    
    for (const entry of entries) {
      if (entry.attributes.locale !== 'en') {
        console.log(`Skipping entry ${entry.id} as it is locale: ${entry.attributes.locale}`);
        continue;
      }
      
      const id = entry.id;
      const attr = entry.attributes;
      
      // Extract media IDs
      const coverId = attr.cover?.data?.id;
      const galleryIds = attr.gallery?.data?.map(img => img.id) || [];
      
      // Prepare payload
      const payloadWithoutData = {
        title: attr.title,
        slug: `${attr.slug}-pt-br`,
        text: attr.text,
        cover: coverId,
        gallery: galleryIds,
        locale: 'pt-BR',
        publishedAt: new Date().toISOString()
      };
      
      console.log(`Duplicating entry ${id} (${attr.title}) to pt-BR...`);
      
      try {
        const res = await axios.post(`http://127.0.0.1:1337/api/portfolio/${id}/localizations`, payloadWithoutData);
        console.log(`Successfully duplicated: new id ${res.data.id || res.data.data?.id}`);
      } catch (err) {
        console.error(`Attempt failed. Error:`, JSON.stringify(err.response?.data));
        throw err;
      }
    }
    console.log('Finished duplicating entries to pt-BR.');
  } catch (error) {
    console.error('Error:', error.response ? JSON.stringify(error.response.data) : error.message);
  }
}

main();
