import { Link } from 'react-router-dom'
import { partners } from '../data/partners'
import { useLanguage } from '../context/LanguageContext'

const categoryKeys = ['grain', 'logistics', 'trade', 'equipment', 'financial']

export default function PartnersPage() {
  const { t } = useLanguage()

  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-green/5 to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{t('partners.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {t('partners.desc')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">{t('partners.categoriesTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {categoryKeys.map((key) => {
              const cat = t(`partners.categories.${key}`)
              return (
                <div key={key} className="p-6 bg-brand-cream rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-semibold text-brand-green mb-4">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <span className="text-brand-green mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-10">{t('partners.examplesTitle')}</h2>
          <div className="space-y-16">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="grid lg:grid-cols-3 gap-8 p-8 lg:p-12 bg-brand-cream rounded-2xl"
              >
                <div className="flex flex-col items-center lg:items-start">
                  <div className="w-32 h-32 rounded-xl bg-white flex items-center justify-center shadow-card mb-4">
                    <span className="text-4xl font-bold text-brand-green">{partner.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center lg:text-left">{partner.name}</h3>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <div className="p-4 bg-white rounded-xl border-l-4 border-brand-green">
                    <p className="text-sm font-medium text-brand-green mb-1">{t('partners.caseStudy')}</p>
                    <p className="text-gray-600">{partner.caseStudy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-green">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('partners.ctaTitle')}</h2>
          <p className="text-white/90 mb-6">
            {t('partners.ctaDesc')}
          </p>
          <Link to="/order" className="inline-flex px-8 py-3 bg-white text-brand-green font-semibold rounded-lg hover:bg-brand-cream transition-colors">
            {t('home.orderBtn')}
          </Link>
        </div>
      </section>
    </div>
  )
}
