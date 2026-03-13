import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const navItems = [
  { path: '/catalog', labelKey: 'nav.catalog', fullLabelKey: 'nav.catalogFull' },
  { path: '/about', labelKey: 'nav.about', fullLabelKey: 'nav.aboutFull' },
  { path: '/partners', labelKey: 'nav.partners', fullLabelKey: 'nav.partnersFull' },
  { path: '/certificates', labelKey: 'nav.certificates', fullLabelKey: 'nav.certificatesFull' },
  { path: '/contacts', labelKey: 'nav.contacts', fullLabelKey: 'nav.contactsFull' },
  { path: '/order', labelKey: 'nav.order', fullLabelKey: 'nav.orderFull' },
]

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [langOpen, setLangOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-soft">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-brand-green hover:bg-brand-cream rounded-lg transition-colors"
            aria-label={t('nav.menu')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-90 transition-opacity">
            <img src="/icons/aqnietlogo.png" alt="AI-AR" className="w-12 h-12 object-contain" />
            <span className="font-bold text-xl text-brand-green hidden sm:block">AI-AR</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path === '/catalog' && location.pathname.startsWith('/catalog'))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-green text-white' : 'text-gray-700 hover:bg-brand-cream hover:text-brand-green'
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a href="tel:+77012178289" className="hidden md:flex items-center gap-2 text-brand-green font-medium link-hover">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +7 701 217 8289
          </a>

          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-brand-green transition-colors"
            >
              {lang === 'kk' ? 'KK' : 'RU'}
              <svg className={`w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 mt-1 py-1 w-24 bg-white rounded-lg shadow-lg border border-gray-100 z-20">
                  <button
                    onClick={() => { setLang('kk'); setLangOpen(false) }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-cream ${lang === 'kk' ? 'text-brand-green font-medium' : 'text-gray-600'}`}
                  >
                    KK
                  </button>
                  <button
                    onClick={() => { setLang('ru'); setLangOpen(false) }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-cream ${lang === 'ru' ? 'text-brand-green font-medium' : 'text-gray-600'}`}
                  >
                    RU
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
          <nav className="absolute left-0 right-0 top-full mt-0 bg-white border-b border-gray-100 shadow-lg z-50 lg:hidden">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === item.path || (item.path === '/catalog' && location.pathname.startsWith('/catalog'))
                      ? 'bg-brand-green text-white'
                      : 'text-gray-700 hover:bg-brand-cream hover:text-brand-green'
                  }`}
                >
                  {t(item.fullLabelKey)}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
