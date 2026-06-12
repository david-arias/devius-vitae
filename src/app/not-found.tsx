import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-margin-mobile">
      <div className="text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">404</h1>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
          Página no encontrada
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full hover:bg-primary transition-colors duration-200 inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
