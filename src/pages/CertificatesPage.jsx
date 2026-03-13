import { useLanguage } from '../context/LanguageContext'

export default function CertificatesPage() {
  const { t } = useLanguage()

  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-green/5 to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{t('certificates.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {t('certificates.comingSoon')}
          </p>
        </div>
      </section>
    </div>
  )
}
