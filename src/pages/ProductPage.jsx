import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products, productCategories } from '../data/products'
import { CategoryIcon } from '../components/Icons'
import { useLanguage } from '../context/LanguageContext'

export default function ProductPage() {
  const { t } = useLanguage()
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const [selectedImage, setSelectedImage] = useState(0)
  const productImages = product?.images || (product?.image ? [product.image] : [])

  const getProductName = (p) => {
    const tr = t(`products.${p.id}`)
    return (typeof tr === 'object' && tr?.name) ? tr.name : p.name
  }

  const getProductDesc = (p) => {
    const tr = t(`products.${p.id}`)
    return (typeof tr === 'object' && tr?.desc) ? tr.desc : p.description
  }

  const getCategoryName = (catId) => {
    const tr = t(`categories.${catId}`)
    return (typeof tr === 'object' && tr?.name) ? tr.name : productCategories.find(c => c.id === catId)?.name ?? catId
  }

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p className="text-xl text-gray-500">{t('product.notFound')}</p>
        <Link to="/catalog" className="mt-4 inline-block text-brand-green hover:underline">{t('product.backToCatalog')}</Link>
      </div>
    )
  }

  const category = productCategories.find(c => c.id === product.category)

  return (
    <div>
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/catalog" className="hover:text-brand-green">{t('nav.catalog')}</Link>
            <span>/</span>
            <Link to={`/catalog/${category?.slug}`} className="hover:text-brand-green">{getCategoryName(product.category)}</Link>
            <span>/</span>
            <span className="text-gray-800">{getProductName(product)}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square max-w-lg rounded-2xl bg-gradient-to-br from-brand-cream to-brand-wheat overflow-hidden mb-4">
                {productImages.length > 0 ? (
                  <img
                    src={productImages[selectedImage]}
                    alt={getProductName(product)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-green/60">
                    <CategoryIcon categoryId={product.category} className="w-40 h-40" />
                  </div>
                )}
              </div>
              {productImages.length > 1 && (
                <div className="flex gap-2">
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-brand-green' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full mb-4">
                {getCategoryName(product.category)}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">{getProductName(product)}</h1>
              <p className="text-lg text-gray-600 mb-8">{getProductDesc(product)}</p>

              {product.characteristics?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3">{t('product.characteristics')}</h3>
                  <ul className="space-y-2">
                    {product.characteristics.map((char) => (
                      <li key={char} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-brand-green shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.packaging?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3">{t('product.packaging')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.packaging.map((pkg) => (
                      <span key={pkg} className="px-4 py-2 bg-brand-cream rounded-lg text-gray-700 font-medium">
                        {pkg}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link to="/order" className="btn-primary inline-flex">
                {t('product.orderBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('product.relatedTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="flex gap-4 p-4 bg-white rounded-xl hover:shadow-card transition-shadow"
                >
                  <div className="w-20 h-20 rounded-lg bg-brand-cream flex items-center justify-center shrink-0 overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={getProductName(p)} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-brand-green">
                        <CategoryIcon categoryId={p.category} className="w-10 h-10" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 hover:text-brand-green">{getProductName(p)}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{getProductDesc(p)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
