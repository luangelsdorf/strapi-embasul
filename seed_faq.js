const axios = require('axios');

const strapiUrl = 'http://127.0.0.1:1337';

const faqCategories = [
  { name: 'Produtos e Embalagens', slug: 'produtos-embalagens' },
  { name: 'Pedidos e Logística', slug: 'pedidos-logistica' },
  { name: 'Sustentabilidade e Qualidade', slug: 'sustentabilidade-qualidade' }
];

const faqItems = [
  {
    categorySlug: 'produtos-embalagens',
    question: 'Quais tipos de embalagem de papelão ondulado a Embasul fabrica?',
    answer: '<p>Nós fabricamos caixas maleta, caixas de corte e vinco, e acessórios de papelão ondulado para diversos setores, como alimentos, bebidas (vinhos, espumantes), higiene, entre outros. Trabalhamos com diversos tipos de ondas e test liners para garantir a máxima resistência.</p>',
    order: 1
  },
  {
    categorySlug: 'produtos-embalagens',
    question: 'Posso personalizar a impressão da minha embalagem?',
    answer: '<p>Sim! A Embasul possui impressoras flexográficas de alta resolução que permitem a personalização das caixas com o logotipo, informações do produto e design gráfico desejado, fortalecendo a sua marca no mercado.</p>',
    order: 2
  },
  {
    categorySlug: 'pedidos-logistica',
    question: 'Qual é a quantidade mínima para pedidos?',
    answer: '<p>Nossa produção é voltada para demandas industriais e comerciais (atacado). A quantidade mínima varia conforme as dimensões e o modelo da caixa. Entre em contato com a nossa equipe comercial para avaliarmos a sua necessidade específica e fazermos um orçamento.</p>',
    order: 1
  },
  {
    categorySlug: 'pedidos-logistica',
    question: 'A Embasul entrega em quais regiões?',
    answer: '<p>Atendemos clientes em todo o território nacional. Contamos com parceiros logísticos e soluções estratégicas de distribuição para garantir que o seu pedido chegue com segurança e pontualidade em qualquer estado do Brasil.</p>',
    order: 2
  },
  {
    categorySlug: 'sustentabilidade-qualidade',
    question: 'O papelão utilizado pela Embasul é reciclável?',
    answer: '<p>Sim, 100% dos nossos produtos são fabricados com matéria-prima reciclável e biodegradável. Além disso, as sobras geradas na fábrica durante o processo de corte retornam para a cadeia de reciclagem, garantindo a economia circular e o compromisso com o meio ambiente.</p>',
    order: 1
  },
  {
    categorySlug: 'sustentabilidade-qualidade',
    question: 'A empresa possui certificações de qualidade?',
    answer: '<p>A Embasul é certificada com a ISO 9001, o que atesta a padronização e o controle de excelência em todos os nossos processos produtivos, desde a entrada da matéria-prima até a expedição final do produto.</p>',
    order: 2
  }
];

async function main() {
  try {
    // 1. Create Categories
    const categoryIdMap = {};
    for (const cat of faqCategories) {
      console.log(`Creating FAQ Category: ${cat.name}...`);
      const payload = {
        data: {
          name: cat.name,
          slug: cat.slug,
          locale: 'pt-BR'
        }
      };
      const res = await axios.post(`${strapiUrl}/api/faq-categories`, payload);
      categoryIdMap[cat.slug] = res.data.data.id;
    }

    // 2. Create FAQ Items
    for (const item of faqItems) {
      console.log(`Creating FAQ Item: ${item.question}...`);
      const payload = {
        data: {
          question: item.question,
          answer: item.answer,
          order: item.order,
          category: categoryIdMap[item.categorySlug],
          locale: 'pt-BR'
        }
      };
      await axios.post(`${strapiUrl}/api/faq-items`, payload);
    }

    console.log('Duplicating to EN...');

    // 3. Duplicate Categories to EN
    for (const catSlug of Object.keys(categoryIdMap)) {
      const id = categoryIdMap[catSlug];
      const catObj = faqCategories.find(c => c.slug === catSlug);
      await axios.post(`${strapiUrl}/api/faq-categories/${id}/localizations`, {
        name: catObj.name,
        slug: `${catSlug}-en`,
        locale: 'en'
      }).catch(err => console.error(`Error duplicating FAQ category ${catSlug}:`, err.response?.data));
    }

    // 4. Duplicate FAQ Items to EN
    const itemsRes = await axios.get(`${strapiUrl}/api/faq-items?locale=pt-BR`);
    for (const item of itemsRes.data.data) {
      const attr = item.attributes;
      await axios.post(`${strapiUrl}/api/faq-items/${item.id}/localizations`, {
        question: attr.question,
        answer: attr.answer,
        order: attr.order,
        locale: 'en'
      }).catch(err => console.error(`Error duplicating FAQ item ${item.id}:`, err.response?.data));
    }

    console.log('Finished creating FAQ categories and items!');
  } catch (error) {
    console.error('Error:', error.response ? JSON.stringify(error.response.data) : error.message);
  }
}

main();
