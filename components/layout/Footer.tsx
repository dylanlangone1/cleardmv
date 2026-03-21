export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} ClearDMV · Not affiliated with any government agency ·{' '}
          <a href="https://tollfighter.app" className="hover:text-gray-700 transition-colors">
            TollFighter
          </a>
        </p>
      </div>
    </footer>
  );
}
