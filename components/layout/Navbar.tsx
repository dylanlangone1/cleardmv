import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">ClearDMV</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="https://tollfighter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:block"
          >
            From TollFighter →
          </Link>
        </div>
      </div>
    </header>
  );
}
