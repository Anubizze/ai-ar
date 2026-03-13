import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(() => {
    return !localStorage.getItem('cookies-accepted')
  })

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100/98 backdrop-blur-sm border-t border-gray-200 px-4 py-4 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          {t('cookie.text')}{' '}
          <a href="#" className="text-brand-green font-medium hover:underline">{t('cookie.policy')}</a>
        </p>
        <button
          onClick={acceptCookies}
          className="btn-primary shrink-0"
        >
          {t('cookie.accept')}
        </button>
      </div>
    </div>
  )
}
