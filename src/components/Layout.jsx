import Header from './Header'
import Footer from './Footer'
import CookieBanner from './CookieBanner'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Header />
      
      <main className="flex-1 min-w-0">
        {children}
      </main>

      <Footer />
      <CookieBanner />
    </div>
  )
}
