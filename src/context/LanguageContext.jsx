import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const STORAGE_KEY = 'ai-ar-lang'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'kk'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = (newLang) => {
    if (translations[newLang]) setLangState(newLang)
  }

  const t = (path) => {
    const keys = path.split('.')
    let value = translations[lang]
    for (const key of keys) {
      value = value?.[key]
    }
    return value ?? path
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
