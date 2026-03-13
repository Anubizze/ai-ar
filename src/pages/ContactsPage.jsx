import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const contacts = [
  { departmentKey: 'reception', roleKey: '', name: '', phones: ['+7701 217 8289', '+7722 234 2369'], email: 'info@ai.ar.kz' },
  { departmentKey: 'accounting', roleKey: 'chiefAccountant', name: 'Смирнова Лариса Викторовна', phones: ['+7708 754 0105'], email: 'glav.bukhgalter@ai.ar.kz' },
  { departmentKey: 'procurement', roleKey: 'headOfDept', name: 'Есмаганбетов Ернур Нурпеисович', phones: ['+7778 424 5668'], email: 'menedzher_po_zakupu@ai.ar.kz' },
  { departmentKey: 'supply', roleKey: 'headOfDept', name: 'Баймолдаев Мейргазы Сейсенгазыевич', phones: ['+7775 213 6699'], email: 'info@ai.ar.kz' },
  { departmentKey: 'marketing', roleKey: '', name: '', phones: ['+7777 070 770'], email: 'info@mr.ru' },
  { departmentKey: 'legal', roleKey: 'lawyer', name: 'Бримжанова Карлыгаш Уразовна', phones: ['+7707 659 1777'], email: 'yurist@ai.ar.kz' },
  { departmentKey: 'hrDeputy', roleKey: '', name: 'Бримжанова Карлыгаш Уразовна', phones: ['+7707 659 1777'], email: 'yurist@ai.ar.kz' },
  { departmentKey: 'logistics', roleKey: 'logistician', name: 'Мукатаев Азат Кайратович', phones: ['+7707 442 1995'], email: 'logist@ai.ar.kz' },
  { departmentKey: 'roadTransport', roleKey: '', name: '', phones: ['+7777 070 770'], email: 'info@mr.ru' },
  { departmentKey: 'recruitment', roleKey: '', name: '', phones: ['+7777 070 770'], email: 'info@mr.ru' },
]

export default function ContactsPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    city: '',
    name: '',
    email: '',
    message: '',
    consent: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-green/5 to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{t('contacts.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {t('contacts.desc')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-8">{t('contacts.infoTitle')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {contacts.map((c) => (
                  <div key={c.departmentKey} className="p-6 bg-brand-cream/50 rounded-xl border border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-3">{t(`contacts.departments.${c.departmentKey}`)}</h3>
                    {(c.roleKey || c.name) && (
                      <div className="flex items-start gap-2 mb-2">
                        <svg className="w-4 h-4 text-brand-green mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-gray-600 text-sm">
                          {[c.roleKey ? t(`contacts.departments.${c.roleKey}`) : '', c.name].filter(Boolean).join(' — ')}
                        </p>
                      </div>
                    )}
                    <div className="space-y-1.5">
                      {c.phones.map((phone) => (
                        <div key={phone} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-brand-green hover:underline text-sm">{phone}</a>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${c.email}`} className="text-brand-green hover:underline text-sm break-all">{c.email}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-cream rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contacts.formTitle')}</h2>
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-800">{t('contacts.thanks')}</p>
                  <p className="text-gray-600 mt-1">{t('contacts.thanksDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contacts.city')}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                      placeholder={t('contacts.cityPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contacts.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contacts.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contacts.message')}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none"
                      placeholder={t('contacts.messagePlaceholder')}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="mt-1 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      {t('contacts.consent')}{' '}
                      <a href="#" className="text-brand-green hover:underline">{t('contacts.consentLink')}</a>
                    </label>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    {t('contacts.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
