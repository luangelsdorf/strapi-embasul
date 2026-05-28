const axios = require('axios');

const strapiUrl = 'http://127.0.0.1:1337';

const categoriesData = [
  { name: 'Inovação & Tecnologia', slug: 'inovacao-tecnologia' },
  { name: 'Qualidade & Processos', slug: 'qualidade-processos' },
  { name: 'Sustentabilidade', slug: 'sustentabilidade' }
];

const postsData = [
  {
    title: 'O Papel da Inteligência Artificial no Design de Embalagens',
    slug: 'inteligencia-artificial-design-embalagens',
    content: '<p>A inteligência artificial está revolucionando a forma como criamos designs de embalagens. Na Embasul, utilizamos tecnologias avançadas para otimizar os processos de corte, vinco e layout, garantindo que as embalagens não apenas protejam o produto, mas também se destaquem no ponto de venda. Com o uso de AI, somos capazes de prever tendências e adaptar o design às necessidades de mercado, criando soluções personalizadas e eficientes.</p>',
    categorySlug: 'inovacao-tecnologia'
  },
  {
    title: 'Certificação ISO 9001: Garantia de Qualidade na Embasul',
    slug: 'certificacao-iso-9001',
    content: '<p>A qualidade é o pilar fundamental de nossa produção. Com a certificação ISO 9001, atestamos nosso compromisso com a excelência em todos os processos de fabricação de papelão ondulado. Nossos rígidos controles de qualidade asseguram que cada caixa entregue aos nossos clientes atenda aos mais altos padrões de resistência, durabilidade e acabamento, superando as expectativas do mercado e as normas vigentes.</p>',
    categorySlug: 'qualidade-processos'
  },
  {
    title: 'Práticas Sustentáveis na Produção de Papelão Ondulado',
    slug: 'praticas-sustentaveis-papelao-ondulado',
    content: '<p>A preocupação com o meio ambiente faz parte do nosso DNA. Implementamos diversas iniciativas para reduzir o impacto ambiental de nossa produção, desde a seleção de matérias-primas certificadas até o reaproveitamento de resíduos fabris. A reciclagem e a economia circular são conceitos que vivenciamos diariamente, buscando sempre um futuro mais verde para as próximas gerações, oferecendo uma embalagem 100% reciclável.</p>',
    categorySlug: 'sustentabilidade'
  },
  {
    title: 'Flexografia de Alta Resolução: Valorizando a Sua Marca',
    slug: 'flexografia-alta-resolucao',
    content: '<p>A impressão de uma embalagem é a primeira comunicação com o seu cliente. A Embasul investe continuamente em impressoras flexográficas de alta tecnologia que proporcionam uma definição incrível para logomarcas, códigos de barras e informações de produto. Nossa impressão de alta qualidade ajuda a posicionar sua marca no mercado de forma profissional e atrativa, garantindo legibilidade e vivacidade das cores.</p>',
    categorySlug: 'inovacao-tecnologia'
  }
];

async function main() {
  try {
    // 1. Fetch some image ID for covers
    console.log('Fetching media files...');
    const mediaRes = await axios.get(`${strapiUrl}/api/upload/files?pagination[limit]=4`);
    const mediaFiles = mediaRes.data;
    if (mediaFiles.length === 0) {
      console.error('No images found in Strapi media library to use as covers.');
      return;
    }

    const coverIds = mediaFiles.map(f => f.id);

    // 2. Create Categories
    const categoryIdMap = {};
    for (const cat of categoriesData) {
      console.log(`Creating category: ${cat.name}...`);
      const res = await axios.post(`${strapiUrl}/api/post-categories`, {
        data: {
          name: cat.name,
          slug: cat.slug,
          locale: 'pt-BR'
        }
      });
      categoryIdMap[cat.slug] = res.data.data.id;
    }

    // 3. Create Posts
    for (let i = 0; i < postsData.length; i++) {
      const post = postsData[i];
      const coverId = coverIds[i % coverIds.length];
      
      console.log(`Creating post: ${post.title}...`);
      const payload = {
        data: {
          title: post.title,
          slug: post.slug,
          content: post.content,
          cover: coverId,
          category: categoryIdMap[post.categorySlug],
          publishedDate: new Date().toISOString(),
          locale: 'pt-BR',
          publishedAt: new Date().toISOString()
        }
      };

      const res = await axios.post(`${strapiUrl}/api/posts`, payload);
      console.log(`Post created with ID: ${res.data.data.id}`);
    }
    
    // We can also duplicate to 'en' automatically.
    console.log('Duplicating to EN...');
    for (const catSlug of Object.keys(categoryIdMap)) {
      const id = categoryIdMap[catSlug];
      await axios.post(`${strapiUrl}/api/post-categories/${id}/localizations`, {
        name: categoriesData.find(c => c.slug === catSlug).name,
        slug: `${catSlug}-en`,
        locale: 'en'
      }).catch(err => console.error(`Error duplicating category ${catSlug}:`, err.response?.data));
    }
    
    const postsRes = await axios.get(`${strapiUrl}/api/posts?locale=pt-BR`);
    for (const p of postsRes.data.data) {
      await axios.post(`${strapiUrl}/api/posts/${p.id}/localizations`, {
        title: p.attributes.title,
        slug: `${p.attributes.slug}-en`,
        content: p.attributes.content,
        publishedDate: p.attributes.publishedDate,
        locale: 'en',
        publishedAt: new Date().toISOString()
      }).catch(err => console.error(`Error duplicating post ${p.id}:`, err.response?.data));
    }

    console.log('Finished creating posts and categories!');
  } catch (error) {
    console.error('Error:', error.response ? JSON.stringify(error.response.data) : error.message);
  }
}

main();
