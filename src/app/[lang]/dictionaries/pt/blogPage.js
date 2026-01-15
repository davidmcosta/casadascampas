const blogPage = {
  blog: {
    metadata: {
      title: "Blogue - Arte Funerária e Monumentos | Casadas Campus",
      description: "Descubra artigos sobre arte funerária, manutenção de monumentos, tipos de mármore e personalização de lápides. Três décadas de experiência.",
      keywords: "arte funerária, monumentos funerários, lápides, mármore, blogue, Casadas Campus"
    },
    hero: {
      title: "Blogue",
      subtitle: "Arte e Tradição Funerária",
      description: "Conhecimento e experiência em arte funerária. Três décadas partilhadas através de artigos especializados."
    },
    search: {
      placeholder: "Pesquisar artigos...",
      categories: {
        all: "Todos",
        Art: "Arte",
        Materials: "Materiais",
        Maintenance: "Manutenção",
        Personalization: "Personalização",
        History: "História",
        Design: "Design"
      },
      results: "{count} artigo{plural}"
    },
    featured: {
      title: "Artigos em Destaque"
    },
    articles: {
      title: "Artigos Especializados",
      description: "Conhecimento aprofundado sobre arte funerária e monumentos",
      readMore: "Ler mais",
      loading: "A carregar artigos...",
      empty: "Nenhum artigo encontrado.",
      details: {
        author: "Autor",
        date: "Data",
        readTime: "Tempo de leitura",
        views: "Visualizações",
        share: "Partilhar",
        contact: "Contacto",
        fullArticle: "Ler Artigo Completo"
      },
      posts: [
        {
          id: 1,
          title: 'A Arte da Escultura Funerária: Tradição e Modernidade',
          slug: 'arte-escultura-funeraria-tradicao-modernidade',
          excerpt: 'Como a arte funerária evoluiu combinando técnicas tradicionais com design contemporâneo.',
          content: 'A escultura funerária representa uma das formas mais respeitadas de arte monumental. A nossa oficina preserva técnicas centenárias enquanto incorpora elementos modernos para criar peças únicas que honram a memória. Cada mármore é cuidadosamente selecionado, cada detalhe esculpido com precisão artesanal que três décadas de experiência proporcionam. Utilizamos ferramentas tradicionais e modernas para garantir a perfeição em cada obra.',
          date: '2024-05-20',
          readTime: '5 min',
          author: 'João Silva',
          category: 'Arte',
          tags: ['escultura', 'mármore', 'tradição', 'arte funerária'],
          image: 'images/articles/art.jpg',
          views: 1245,
          featured: true
        },
        {
          id: 2,
          title: 'Escolher o Mármore Perfeito: Guia Completo',
          slug: 'escolher-marmore-perfeito-guia-completo',
          excerpt: 'Descubra os diferentes tipos de mármore e como escolher o material ideal para o seu monumento.',
          content: 'O mármore é mais do que uma pedra — é um símbolo de eternidade e elegância. Explicamos as características de cada tipo, desde o clássico Carrara até aos mármores portugueses de Estremoz. Cada tipo tem particularidades: o Carrara oferece pureza e elegância, enquanto o mármore português apresenta veios únicos e grande resistência. A escolha adequada do mármore é fundamental para a durabilidade e beleza do monumento.',
          date: '2024-05-15',
          readTime: '4 min',
          author: 'Maria Santos',
          category: 'Materiais',
          tags: ['mármore', 'materiais', 'qualidade', 'Carrara'],
          image: 'images/img8.jpg',
          views: 892,
          featured: false
        },
        {
          id: 3,
          title: 'Manutenção de Monumentos: Cuidados Essenciais',
          slug: 'manutencao-monumentos-funerarios-cuidados',
          excerpt: 'Aprenda a preservar a beleza dos monumentos funerários ao longo dos anos.',
          content: 'A manutenção adequada garante que os monumentos permaneçam belos por gerações. A limpeza regular com água e sabão neutro, a aplicação de selantes protetores e a inspeção periódica são fundamentais. Utilizamos produtos específicos que respeitam a composição do mármore e do granito. O cuidado preventivo é sempre mais eficaz do que a restauração posterior.',
          date: '2024-05-10',
          readTime: '3 min',
          author: 'António Rodrigues',
          category: 'Manutenção',
          tags: ['manutenção', 'conservação', 'limpeza', 'preservação'],
          image: 'images/img10.png',
          views: 634,
          featured: false
        },
        {
          id: 4,
          title: 'Personalização de Lápides: Tornar Cada Memória Única',
          slug: 'personalizacao-lapides-memoria-unica',
          excerpt: 'Explore as opções de personalização para criar lápides verdadeiramente especiais.',
          content: 'Cada vida é única e merece ser celebrada de forma especial. Oferecemos personalização com fotografias em porcelana, símbolos religiosos personalizados, epitáfios em várias línguas e elementos artísticos. A nossa equipa trabalha com as famílias para garantir que cada detalhe honre adequadamente a memória. A personalização permite expressar a individualidade e os valores da pessoa homenageada.',
          date: '2024-05-05',
          readTime: '4 min',
          author: 'Isabel Fernandes',
          category: 'Personalização',
          tags: ['personalização', 'lápides', 'memória', 'porcelana'],
          image: 'images/articles/memory.jpg',
          views: 1087,
          featured: true
        },
        {
          id: 5,
          title: 'Simbolismo na Arte Funerária Portuguesa',
          slug: 'simbolismo-arte-funeraria-portuguesa',
          excerpt: 'Compreenda o significado dos símbolos tradicionais na arte funerária em Portugal.',
          content: 'A arte funerária portuguesa é rica em simbolismo. Anjos representam proteção espiritual, flores simbolizam a beleza da vida, cruzes expressam fé na ressurreição. Livros representam conhecimento, âncoras simbolizam esperança. Compreender estes símbolos ajuda as famílias a escolher elementos que melhor representem os seus entes queridos. Cada símbolo carrega séculos de tradição e significado espiritual.',
          date: '2024-04-28',
          readTime: '5 min',
          author: 'Carlos Mendes',
          category: 'História',
          tags: ['simbolismo', 'história', 'tradição', 'Portugal'],
          image: 'images/blog/img12.jpg',
          views: 756,
          featured: false
        },
        {
          id: 6,
          title: 'Tendências Modernas no Design Funerário',
          slug: 'tendencias-modernas-design-funerario',
          excerpt: 'Descubra as tendências atuais no design de monumentos funerários.',
          content: 'O design funerário moderno abraça linhas simples e materiais inovadores, mantendo respeito e dignidade. As tendências incluem formas geométricas minimalistas, a combinação de materiais como mármore com bronze e a integração de elementos tecnológicos. O design contemporâneo reinterpreta a tradição para as gerações atuais, oferecendo novas formas de expressar memória e homenagem.',
          date: '2024-04-22',
          readTime: '4 min',
          author: 'Ana Costa',
          category: 'Design',
          tags: ['design moderno', 'tendências', 'inovação', 'minimalismo'],
          image: 'images/articles/modern.jpg',
          views: 923,
          featured: true
        }
      ]
    },
    sidebar: {
      experience: {
        title: "Três Décadas de Experiência",
        description: "Especialistas em monumentos funerários, combinando técnicas tradicionais com design moderno para criar memoriais únicos e duradouros.",
        link: "A Nossa História"
      },
      services: {
        title: "Os Nossos Serviços",
        items: [
          {
            title: "Monumentos",
            description: "Criação personalizada"
          },
          {
            title: "Lápides",
            description: "Design exclusivo"
          },
          {
            title: "Restauro",
            description: "Conservação profissional"
          }
        ]
      },
      help: {
        title: "Precisa de Ajuda?",
        description: "A nossa equipa está pronta para criar o monumento perfeito para homenagear a sua memória especial.",
        contact: "Contactar Agora",
        phone: "+351 234 567 890"
      },
      materials: {
        title: "Materiais de Qualidade",
        description: "Trabalhamos com os melhores materiais para garantir durabilidade e beleza.",
        link: "Ver Materiais"
      },
      recent: {
        title: "Artigos Recentes",
        link: "Ver Todos os Artigos"
      }
    },
    newsletter: {
      title: "Mantenha-se Informado",
      description: "Receba as nossas últimas publicações sobre arte funerária",
      placeholder: "O seu e-mail",
      button: "Subscrever"
    },
    cta: {
      title: "Precisa de Ajuda Especializada?",
      description: "A nossa equipa está pronta para criar o monumento perfeito. Contacte-nos para uma consulta personalizada.",
      contact: "Contactar Agora",
      products: "Ver Produtos"
    }
  }
};

export default blogPage