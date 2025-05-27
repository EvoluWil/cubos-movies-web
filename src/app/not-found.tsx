import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-5xl font-bold text-mauve-950 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-mauve-950 mb-2">
        Página não encontrada
      </h2>
      <p className="text-mauve-700 mb-6 text-center max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="px-6 py-2 rounded bg-brand-700 text-white font-bold hover:bg-brand-800 transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
