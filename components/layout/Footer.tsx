export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs text-gray-400 space-x-3">
          <span>© {new Date().getFullYear()} ClearDMV</span>
          <span>·</span>
          <span>Not affiliated with any government agency</span>
          <span>·</span>
          <a href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="https://tollfighter.com" className="hover:text-gray-700 transition-colors">TollFighter</a>
        </p>
      </div>
    </footer>
  );
}
