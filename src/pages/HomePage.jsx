import { Link } from 'react-router-dom'
import { productCategories } from '../data/products'
import { CategoryIcon } from '../components/Icons'
import { useLanguage } from '../context/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()
  const stats = ['years', 'tons', 'partners', 'products'].map(k => t(`home.stats.${k}`))

  return (
    <div>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/photos/heroai-ar.png"
            alt="AI-AR"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green/95 via-brand-green/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/50 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/95 leading-tight mb-6">
                {t('home.heroTitle')}
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-xl">
                {t('home.heroDesc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog" className="btn-primary bg-white text-brand-green hover:bg-brand-cream">
                  {t('home.catalogBtn')}
                </Link>
                <Link to="/order" className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                  {t('home.orderBtn')}
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-4">
                {productCategories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/catalog/${cat.slug}`}
                    className="group block p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <span className="mb-2 block text-white/90"><CategoryIcon categoryId={cat.id} className="w-10 h-10" /></span>
                    <span className="text-lg font-semibold text-white group-hover:underline">{t(`categories.${cat.id}.name`)}</span>
                    <span className="block text-sm text-white/70 mt-1">{t('home.viewAssortment')} →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors">
          <span className="text-sm mb-2">{t('home.learnMore')}</span>
          <div className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center animate-bounce">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </a>
      </section>

      <section id="stats" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t('home.statsTitle')}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-brand-green mb-2">{stat.value}</div>
                <div className="text-lg font-medium text-gray-800">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('home.catalogTitle')}</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            {t('home.catalogDesc')}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog/${category.slug}`}
                className="group bg-white rounded-2xl p-8 shadow-card hover:shadow-soft transition-all duration-300 border border-gray-100 hover:border-brand-green/30"
              >
                <div className="w-16 h-16 rounded-xl bg-brand-green/10 flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors text-brand-green">
                  <CategoryIcon categoryId={category.id} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-brand-green transition-colors">{t(`categories.${category.id}.name`)}</h3>
                <p className="text-gray-600 text-sm mb-4">{t(`categories.${category.id}.desc`)}</p>
                <span className="text-brand-green font-medium text-sm flex items-center gap-1">
                  {t('home.viewAssortmentShort')}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/catalog" className="btn-outline">{t('home.fullCatalog')}</Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-brand-green">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('home.ctaDesc')}
          </p>
          <Link to="/order" className="inline-flex px-8 py-4 bg-white text-brand-green font-semibold rounded-lg hover:bg-brand-cream transition-colors">
            {t('home.orderBtn')}
          </Link>
        </div>
      </section>
    </div>
  )
}
