import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products, productCategories } from '../data/products'
import { useLanguage } from '../context/LanguageContext'

export default function OrderPage() {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    company: '',
    inn: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    items: [],
    consent: false,
  })
  const [selections, setSelections] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const getProductName = (product) => {
    const tr = t(`products.${product.id}`)
    return (typeof tr === 'object' && tr?.name) ? tr.name : product.name
  }

  const getCategoryName = (catId) => {
    const tr = t(`categories.${catId}`)
    return (typeof tr === 'object' && tr?.name) ? tr.name : productCategories.find(c => c.id === catId)?.name ?? catId
  }

  const addItem = (productId, quantity, packaging) => {
    const product = products.find(p => p.id === productId)
    if (!product || !packaging || quantity < 1) return
    const existing = formData.items.find(i => i.productId === productId && i.packaging === packaging)
    if (existing) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(i =>
          i.productId === productId && i.packaging === packaging
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { productId, productName: getProductName(product), quantity, packaging }],
      }))
    }
  }

  const handleAddClick = (product) => {
    const sel = selections[product.id] || {}
    const pkg = sel.packaging || product.packaging?.[0]
    const qty = parseInt(sel.quantity) || 1
    if (pkg) addItem(product.id, qty, pkg)
  }

  const updateSelection = (productId, field, value) => {
    setSelections(prev => ({ ...prev, [productId]: { ...prev[productId], [field]: value } }))
  }

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('order.successTitle')}</h1>
          <p className="text-gray-600 mb-8">
            {t('order.successDesc')}
          </p>
          <Link to="/catalog" className="btn-primary">{t('order.backToCatalog')}</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-green/5 to-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{t('order.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {t('order.desc')}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex gap-4 mb-12">
            {[1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  step === s ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">{s}</span>
                {s === 1 ? t('order.step1') : t('order.step2')}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">{t('order.selectProducts')}</h2>
                <div className="space-y-4">
                  {productCategories.map((cat) => (
                    <div key={cat.id} className="border border-gray-200 rounded-xl p-4">
                      <h3 className="font-medium text-gray-800 mb-3">{getCategoryName(cat.id)}</h3>
                      <div className="space-y-2">
                        {products
                          .filter(p => p.category === cat.id)
                          .map((product) => (
                            <div key={product.id} className="flex flex-wrap items-center gap-2">
                              <span className="text-gray-600 flex-1 min-w-[200px]">{getProductName(product)}</span>
                              <select
                                value={selections[product.id]?.packaging || ''}
                                onChange={(e) => updateSelection(product.id, 'packaging', e.target.value)}
                                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                              >
                                <option value="">{t('order.packaging')}</option>
                                {product.packaging?.map((p) => (
                                  <option key={p} value={p}>{p}</option>
                                ))}
                              </select>
                              <input
                                type="number"
                                min="1"
                                placeholder={t('order.quantity')}
                                value={selections[product.id]?.quantity || ''}
                                onChange={(e) => updateSelection(product.id, 'quantity', e.target.value)}
                                className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => handleAddClick(product)}
                                className="px-3 py-1.5 bg-brand-green text-white text-sm rounded-lg hover:bg-brand-green-light"
                              >
                                {t('order.add')}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {formData.items.length > 0 && (
                  <div className="bg-brand-cream rounded-xl p-4">
                    <h3 className="font-medium text-gray-800 mb-3">{t('order.inOrder')}</h3>
                    <ul className="space-y-2">
                      {formData.items.map((item, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <span>{item.productName} — {item.packaging} × {item.quantity}</span>
                          <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:underline text-sm">
                            {t('order.remove')}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between">
                  <Link to="/catalog" className="text-brand-green hover:underline">{t('order.selectFromCatalog')}</Link>
                  <button type="button" onClick={() => setStep(2)} className="btn-primary">
                    {t('order.next')}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">{t('order.step2')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('order.company')}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('order.inn')}</label>
                    <input
                      type="text"
                      name="inn"
                      value={formData.inn}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('order.contactPerson')}</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('order.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contacts.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('order.address')}</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('order.comment')}</label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                      placeholder={t('order.commentPlaceholder')}
                    />
                  </div>
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
                    {t('order.consent')}
                  </label>
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="text-brand-green hover:underline">
                    {t('order.back')}
                  </button>
                  <button type="submit" className="btn-primary">
                    {t('order.submit')}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
