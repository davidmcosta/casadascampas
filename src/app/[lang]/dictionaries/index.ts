


export const getDictionary = async (
  locale: 'en' | 'pt',
  page: 'home' | 'about' | 'contact' | 'products' | "aboutPage" | "footer" 
  | 'gallery' | 'blogPage' | 'featured' | "chooseUs" | "testimonials" | "blog" | "cartSidebar"
) => {
  return import(`./${locale}/${page}.js`).then((module) => module.default)
}

