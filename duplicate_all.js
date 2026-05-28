const fs = require('fs');
const path = require('path');
const axios = require('axios');

const strapiUrl = 'http://127.0.0.1:1337';
const apiDir = path.join(__dirname, 'src', 'api');

// Function to clean attributes based on schema
function cleanData(attributes, schemaAttrs) {
  const cleaned = {};
  
  for (const [key, value] of Object.entries(attributes)) {
    const attrSchema = schemaAttrs[key];
    if (!attrSchema || value === null || value === undefined) {
      if (key !== 'createdAt' && key !== 'updatedAt' && key !== 'publishedAt' && key !== 'locale' && key !== 'localizations') {
        cleaned[key] = value;
      }
      continue;
    }
    
    if (attrSchema.type === 'media' || attrSchema.type === 'relation') {
      if (value && value.data) {
        if (Array.isArray(value.data)) {
          cleaned[key] = value.data.map(item => item.id);
        } else {
          cleaned[key] = value.data.id;
        }
      } else {
        cleaned[key] = null;
      }
    } else if (attrSchema.type === 'component') {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(comp => {
          const { id, ...rest } = comp;
          return rest;
        });
      } else {
        const { id, ...rest } = value;
        cleaned[key] = rest;
      }
    } else if (attrSchema.type === 'dynamiczone') {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(comp => {
          const { id, ...rest } = comp;
          return rest;
        });
      }
    } else if (attrSchema.type === 'uid') {
      // Append -pt-br to UID to avoid unique constraints
      cleaned[key] = `${value}-pt-br`;
    } else {
      cleaned[key] = value;
    }
  }
  
  cleaned.locale = 'pt-BR';
  // If draftAndPublish is enabled, setting publishedAt will publish it immediately
  cleaned.publishedAt = new Date().toISOString();
  
  return cleaned;
}

async function duplicateSingleType(apiName, schema) {
  const endpointName = schema.info.singularName || apiName;
  const endpoint = `${strapiUrl}/api/${endpointName}`;
  
  console.log(`Processing SingleType: ${apiName}`);
  
  try {
    const resEn = await axios.get(`${endpoint}?locale=en&populate=deep,10`).catch(err => {
      console.log(`  Failed deep populate for ${apiName}, trying normal populate...`);
      return axios.get(`${endpoint}?locale=en&populate=*`);
    });
    const dataEn = resEn.data.data;
    
    if (!dataEn) {
      console.log(`  No EN data found for ${apiName}`);
      return;
    }
    
    // Check if pt-BR already exists by querying pt-BR
    let ptExists = false;
    try {
      const resPt = await axios.get(`${endpoint}?locale=pt-BR`);
      if (resPt.data.data && resPt.data.data.attributes && resPt.data.data.attributes.locale === 'pt-BR') {
        ptExists = true;
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Expected if it doesn't exist
        ptExists = false;
      } else {
        throw err;
      }
    }
    
    if (ptExists) {
      console.log(`  pt-BR already exists for ${apiName}`);
      return;
    }
    
    const cleaned = cleanData(dataEn.attributes || dataEn, schema.attributes);
    
    // Try POST /api/<pluralName>/localizations
    try {
      await axios.post(`${endpoint}/localizations`, cleaned);
      console.log(`  Successfully duplicated ${apiName} to pt-BR (without data wrapper)`);
    } catch (err1) {
      if (err1.response && err1.response.status === 400) {
        try {
          await axios.post(`${endpoint}/localizations`, { data: cleaned });
          console.log(`  Successfully duplicated ${apiName} to pt-BR (with data wrapper)`);
        } catch (err2) {
          console.error(`  Error POSTing to ${endpoint}/localizations with wrapper:`, err2.response?.data || err2.message);
        }
      } else {
        console.error(`  Error POSTing to ${endpoint}/localizations without wrapper:`, err1.response?.data || err1.message);
      }
    }
  } catch (error) {
    console.error(`  Error fetching ${apiName}:`, error.response ? JSON.stringify(error.response.data) : error.message);
  }
}

async function duplicateCollectionType(apiName, schema) {
  const pluralName = schema.info.pluralName || apiName;
  const endpoint = `${strapiUrl}/api/${pluralName}`;
  
  console.log(`Processing CollectionType: ${apiName}`);
  
  try {
    const resEn = await axios.get(`${endpoint}?locale=en&populate=deep,10`).catch(() => axios.get(`${endpoint}?locale=en&populate=*`));
    const entries = resEn.data.data;
    
    if (!entries || entries.length === 0) {
      console.log(`  No EN entries found for ${apiName}`);
      return;
    }
    
    for (const entry of entries) {
      if (entry.attributes.locale !== 'en') continue;
      
      const id = entry.id;
      // We should check if this specific entry has a pt-BR localization
      // populate=localizations would help, but we didn't explicitly ask for it.
      // We can check if localizations are present. If it has localizations, check if pt-BR is there.
      const localizations = entry.attributes.localizations?.data || [];
      if (localizations.some(loc => loc.attributes && loc.attributes.locale === 'pt-BR')) {
        console.log(`  Entry ${id} already has pt-BR localization`);
        continue;
      }
      
      const cleaned = cleanData(entry.attributes, schema.attributes);
      
      try {
        await axios.post(`${endpoint}/${id}/localizations`, cleaned);
        console.log(`  Successfully duplicated entry ${id} to pt-BR (without data wrapper)`);
      } catch (err1) {
        if (err1.response && err1.response.status === 400) {
          try {
            await axios.post(`${endpoint}/${id}/localizations`, { data: cleaned });
            console.log(`  Successfully duplicated entry ${id} to pt-BR (with data wrapper)`);
          } catch (err2) {
            throw err2;
          }
        } else {
          throw err1;
        }
      }
    }
  } catch (error) {
    console.error(`  Error duplicating ${apiName}:`, error.response ? JSON.stringify(error.response.data) : error.message);
  }
}

async function main() {
  const dirs = fs.readdirSync(apiDir);
  
  for (const dir of dirs) {
    const schemaPath = path.join(apiDir, dir, 'content-types', dir, 'schema.json');
    if (!fs.existsSync(schemaPath)) continue;
    
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    
    // Check if localized
    if (schema.pluginOptions && schema.pluginOptions.i18n && schema.pluginOptions.i18n.localized) {
      if (schema.kind === 'singleType') {
        await duplicateSingleType(dir, schema);
      } else if (schema.kind === 'collectionType') {
        await duplicateCollectionType(dir, schema);
      }
    }
  }
  
  console.log('Finished duplicating all localized content to pt-BR!');
}

main();
