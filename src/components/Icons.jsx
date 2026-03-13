/** SVG-иконки для категорий продукции и разделов */

export function IconFlour({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 4v40" />
      <path d="M16 12l8 6 8-6M16 24l8 6 8-6M16 36l8 6 8-6" />
      <path d="M10 18h4M34 18h4M12 30h4M32 30h4" />
    </svg>
  )
}

export function IconBran({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8c-6 0-10 4-10 10v12c0 4 4 8 10 8s10-4 10-8V18c0-6-4-10-10-10z" />
      <path d="M24 14v20M18 20h12M18 28h12" />
      <ellipse cx="24" cy="24" rx="6" ry="4" />
    </svg>
  )
}

export function IconCereals({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 16h32l-4 24H12L8 16z" />
      <path d="M8 16l4-8h24l4 8" />
      <path d="M16 16v24M24 16v24M32 16v24" />
    </svg>
  )
}

export function IconPasta({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8l4 32M24 8l4 32M36 8l4 32" />
      <path d="M8 12l32 4M8 24l32 4M8 36l32 4" />
      <path d="M14 10l20 28M34 10L14 38" />
    </svg>
  )
}

export function IconWholesale({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 42V18L24 6l16 12v24" />
      <path d="M8 18l16 12 16-12M24 6v14" />
      <rect x="12" y="26" width="8" height="16" rx="1" />
      <rect x="28" y="26" width="8" height="16" rx="1" />
    </svg>
  )
}

export function IconCheck({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export function IconShield({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

export function IconChart({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

/** Компонент иконки по ID категории */
export function CategoryIcon({ categoryId, className = "w-12 h-12" }) {
  const props = { className }
  switch (categoryId) {
    case 'flour': return <IconFlour {...props} />
    case 'bran': return <IconBran {...props} />
    case 'cereals': return <IconCereals {...props} />
    case 'pasta': return <IconPasta {...props} />
    case 'wholesale': return <IconWholesale {...props} />
    default: return <IconPasta {...props} />
  }
}
