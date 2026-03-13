import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="font-bold text-white text-lg">AI-AR</Link>
            <p className="mt-2 text-sm">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">{t('footer.navigation')}</h4>
            <ul className="space-y-2">
              <li><Link to="/catalog" className="hover:text-white transition-colors">{t('nav.catalog')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">{t('nav.partners')}</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">{t('nav.contacts')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">{t('footer.contacts')}</h4>
            <p className="mb-1">Улица Жанатай улы, 1/1, Семей</p>
            <p><a href="tel:+77012178289" className="hover:text-white">+7 701 217 8289</a></p>
            <p><a href="mailto:info@ai.ar.kz" className="hover:text-white">info@ai.ar.kz</a></p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">{t('footer.documents')}</h4>
            <ul className="space-y-2">
              <li><Link to="/certificates" className="hover:text-white transition-colors">{t('nav.certificates')}</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {new Date().getFullYear()} AI-AR. {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <a href="https://abai-it.kz/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Abai IT Valley">
              <img src="/logoAIV.jpeg" alt="Abai IT Valley" className="h-8 object-contain" />
            </a>
            <a href="#" className="text-sm text-brand-green hover:underline">{t('footer.sitemap')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
