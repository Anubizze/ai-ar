import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products, productCategories } from '../data/products'
import { CategoryIcon } from '../components/Icons'
import { useLanguage } from '../context/LanguageContext'

export default function CatalogPage() {
  const { t } = useLanguage()
  const { category } = useParams()
  const [filter, setFilter] = useState(category || 'all')

  useEffect(() => {
    if (category) setFilter(category)
    else setFilter('all')
  }, [category])

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter)

  const getProductName = (product) => {
    const tr = t(`products.${product.id}`)
    return (typeof tr === 'object' && tr?.name) ? tr.name : product.name
  }

  const getProductDesc = (product) => {
    const tr = t(`products.${product.id}`)
    return (typeof tr === 'object' && tr?.desc) ? tr.desc : product.description
  }

  const getCategoryName = (catId) => {
    const tr = t(`categories.${catId}`)
    return (typeof tr === 'object' && tr?.name) ? tr.name : productCategories.find(c => c.id === catId)?.name ?? catId
  }

  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-green/5 to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{t('catalog.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {t('catalog.desc')}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2 mb-12">
            <Link
              to="/catalog"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-brand-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t('catalog.all')}
            </Link>
            {productCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.slug}`}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === cat.id
                    ? 'bg-brand-green text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {getCategoryName(cat.id)}
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card hover:border-brand-green/20 transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-brand-cream to-brand-wheat flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={getProductName(product)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <span className="text-brand-green/60 group-hover:text-brand-green/80 transition-colors">
                      <CategoryIcon categoryId={product.category} className="w-24 h-24" />
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-brand-green uppercase tracking-wider">
                    {getCategoryName(product.category)}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1 group-hover:text-brand-green transition-colors line-clamp-2">
                    {getProductName(product)}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{getProductDesc(product)}</p>
                  <div className="mt-4 flex items-center gap-2 text-brand-green font-medium text-sm">
                    {t('catalog.more')}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 px-6">
              <p className="text-xl text-gray-700 font-medium">
                {filter === 'bran' ? t('catalog.comingSoon') : t('catalog.noProducts')}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 mb-4">{t('catalog.consultation')}</p>
          <Link to="/order" className="btn-primary">{t('home.orderBtn')}</Link>
        </div>
      </section>
    </div>
  )
}
