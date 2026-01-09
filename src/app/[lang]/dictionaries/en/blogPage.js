const blogPage = {
  blog: {
    metadata: {
      title: "Blog - Funeral Art and Monuments | Casadas Campus",
      description: "Discover articles about funeral art, monument maintenance, types of marble, and headstone customization. Three decades of experience.",
      keywords: "funeral art, funeral monuments, headstones, marble, blog, Casadas Campus"
    },
    hero: {
      title: "Blog",
      subtitle: "Funeral Art and Tradition",
      description: "Knowledge and experience in funeral art. Three decades shared through expert articles."
    },
    search: {
      placeholder: "Search articles...",
      categories: {
        all: "All",
        Art: "Art",
        Materials: "Materials",
        Maintenance: "Maintenance",
        Personalization: "Personalization",
        History: "History",
        Design: "Design"
      },
      results: "{count} article{plural}"
    },
    featured: {
      title: "Featured Articles"
    },
    articles: {
      title: "Expert Articles",
      description: "In-depth knowledge about funeral art and monuments",
      readMore: "Read more",
      loading: "Loading articles...",
      empty: "No articles found.",
      details: {
        author: "Author",
        date: "Date",
        readTime: "Read time",
        views: "Views",
        share: "Share",
        contact: "Contact",
        fullArticle: "Read Full Article"
      },
      posts: [
        {
          id: 1,
          title: "The Art of Funeral Sculpture: Tradition and Modernity",
          slug: "funeral-sculpture-art-tradition-modernity",
          excerpt: "How funeral art has evolved by blending traditional techniques with contemporary design.",
          content: "Funeral sculpture represents one of the most respected forms of monumental art. Our workshop preserves centuries-old techniques while incorporating modern elements to create unique pieces that honor memory. Each marble is carefully selected, each detail sculpted with the artisanal precision that three decades of experience provides. We use both traditional and modern tools to ensure perfection in every piece.",
          date: "2024-05-20",
          readTime: "5 min",
          author: "João Silva",
          category: "Art",
          tags: ["sculpture", "marble", "tradition", "funeral art"],
          image: "images/articles/art.jpg",
          views: 1245,
          featured: true
        },
        {
          id: 2,
          title: "Choosing the Perfect Marble: Complete Guide",
          slug: "choosing-perfect-marble-complete-guide",
          excerpt: "Discover the different types of marble and how to choose the ideal material for your monument.",
          content: "Marble is more than a stone — it's a symbol of eternity and elegance. We explain the characteristics of each type, from classic Carrara to Portuguese marbles from Estremoz. Each type has its own traits: Carrara offers purity and elegance, while Portuguese marble features unique veins and great strength. Choosing the right marble is essential for the durability and beauty of the monument.",
          date: "2024-05-15",
          readTime: "4 min",
          author: "Maria Santos",
          category: "Materials",
          tags: ["marble", "materials", "quality", "Carrara"],
          image: "images/img8.jpg",
          views: 892,
          featured: false
        },
        {
          id: 3,
          title: "Monument Maintenance: Essential Care",
          slug: "monument-maintenance-essential-care",
          excerpt: "Learn how to preserve the beauty of funeral monuments over time.",
          content: "Proper maintenance ensures that monuments remain beautiful for generations. Regular cleaning with water and neutral soap, applying protective sealants, and periodic inspection are key. We use specific products that respect the composition of marble and granite. Preventive care is always more effective than later restoration.",
          date: "2024-05-10",
          readTime: "3 min",
          author: "António Rodrigues",
          category: "Maintenance",
          tags: ["maintenance", "preservation", "cleaning", "upkeep"],
          image: "images/img10.png",
          views: 634,
          featured: false
        },
        {
          id: 4,
          title: "Headstone Personalization: Making Each Memory Unique",
          slug: "headstone-personalization-unique-memory",
          excerpt: "Explore customization options to create truly special headstones.",
          content: "Every life is unique and deserves to be celebrated in a special way. We offer customization with porcelain photos, personalized religious symbols, epitaphs in various languages, and artistic elements. Our team works with families to ensure that every detail properly honors the memory. Personalization allows for expressing the individuality and values of the honored person.",
          date: "2024-05-05",
          readTime: "4 min",
          author: "Isabel Fernandes",
          category: "Personalization",
          tags: ["personalization", "headstones", "memory", "porcelain"],
          image: "images/articles/memory.jpg",
          views: 1087,
          featured: true
        },
        {
          id: 5,
          title: "Symbolism in Portuguese Funeral Art",
          slug: "symbolism-portuguese-funeral-art",
          excerpt: "Understand the meaning of traditional symbols in Portuguese funeral art.",
          content: "Portuguese funeral art is rich in symbolism. Angels represent spiritual protection, flowers symbolize the beauty of life, crosses express faith in resurrection. Books represent knowledge, anchors symbolize hope. Understanding these symbols helps families choose elements that best represent their loved ones. Each symbol carries centuries of tradition and spiritual meaning.",
          date: "2024-04-28",
          readTime: "5 min",
          author: "Carlos Mendes",
          category: "History",
          tags: ["symbolism", "history", "tradition", "Portugal"],
          image: "images/img12.jpg",
          views: 756,
          featured: false
        },
        {
          id: 6,
          title: "Modern Trends in Funeral Design",
          slug: "modern-trends-funeral-design",
          excerpt: "Discover current trends in the design of funeral monuments.",
          content: "Modern funeral design embraces clean lines and innovative materials while maintaining respect and dignity. Trends include minimalist geometric shapes, mixing materials like marble and bronze, and integrating technological elements. Contemporary design reinterprets tradition for today's generations, offering new ways to express memory and tribute.",
          date: "2024-04-22",
          readTime: "4 min",
          author: "Ana Costa",
          category: "Design",
          tags: ["modern design", "trends", "innovation", "minimalism"],
          image: "images/articles/modern.jpg",
          views: 923,
          featured: true
        }
      ]
    },
    sidebar: {
      experience: {
        title: "Three Decades of Experience",
        description: "Experts in funeral monuments, blending traditional techniques with modern design to create unique and lasting memorials.",
        link: "Our Story"
      },
      services: {
        title: "Our Services",
        items: [
          {
            title: "Monuments",
            description: "Custom creations"
          },
          {
            title: "Headstones",
            description: "Exclusive design"
          },
          {
            title: "Restoration",
            description: "Professional preservation"
          }
        ]
      },
      help: {
        title: "Need Help?",
        description: "Our team is ready to create the perfect monument to honor your special memory.",
        contact: "Contact Now",
        phone: "+351 234 567 890"
      },
      materials: {
        title: "Quality Materials",
        description: "We work with the best materials to ensure durability and beauty.",
        link: "View Materials"
      },
      recent: {
        title: "Recent Articles",
        link: "View All Articles"
      }
    },
    newsletter: {
      title: "Stay Informed",
      description: "Receive our latest posts about funeral art",
      placeholder: "Your email",
      button: "Subscribe"
    },
    cta: {
      title: "Need Expert Help?",
      description: "Our team is ready to create the perfect monument. Contact us for a personalized consultation.",
      contact: "Contact Now",
      products: "View Products"
    }
  }
};

export default blogPage