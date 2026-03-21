export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} ClearDMV · Not affiliated with any government agency ·{' '}
          <a href="https://tollfighter.app" className="hover:text-slate-300 transition-colors">
            TollFighter
          </a>
        </p>
      </div>
    </footer>
  );
}
