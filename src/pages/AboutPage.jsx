import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck, IconShield, IconChart } from '../components/Icons'
import { useLanguage } from '../context/LanguageContext'

const heroSlides = [
  '/photos/ai-arzavod.jpg',
  '/photos/tablai-ar.jpg',
]

export default function AboutPage() {
  const { t } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const missionItems = [
    { key: 'quality', Icon: IconCheck },
    { key: 'reliability', Icon: IconShield },
    { key: 'development', Icon: IconChart },
  ]

  const productionItems = ['capacity', 'cycle', 'assortment', 'control']

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-end lg:items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeSlide === i ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: i === 0 ? 'center' : 'center 25%',
                backgroundRepeat: 'no-repeat',
              }}
              role="img"
              aria-label={`${t('about.slide')} ${i + 1}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20" />
        </div>
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-white/95 leading-relaxed">
              {t('about.heroDesc')}
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-colors"
          aria-label={t('about.prevSlide')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-colors"
          aria-label={t('about.nextSlide')}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                activeSlide === i ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`${t('about.slide')} ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('about.historyTitle')}</h2>
              <div className="space-y-4 text-gray-600">
                <p>{t('about.history1')}</p>
                <p>{t('about.history2')}</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img
                src="/photos/ai-arzavod.jpg"
                alt="AI-AR"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{t('about.missionTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {missionItems.map(({ key, Icon }) => {
              const item = t(`about.mission.${key}`)
              return (
                <div key={key} className="bg-white p-8 rounded-2xl shadow-card">
                  <div className="w-12 h-12 mb-4 text-brand-green">
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">{t('about.productionTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productionItems.map((key) => {
              const item = t(`about.production.${key}`)
              return (
                <div key={key} className="p-6 bg-brand-cream rounded-xl">
                  <div className="text-2xl font-bold text-brand-green">{item.value} {item.unit}</div>
                  <div className="text-gray-600 mt-1">{item.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-green">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xl text-white mb-6">{t('about.ctaDesc')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/catalog" className="px-6 py-3 bg-white text-brand-green font-medium rounded-lg hover:bg-brand-cream transition-colors">
              {t('nav.catalog')}
            </Link>
            <Link to="/contacts" className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              {t('nav.contacts')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
