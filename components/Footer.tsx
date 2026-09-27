export default function Footer() {
  const links = {
    Models: ['GT-X', 'GT Sport', 'GT Touring', 'Heritage Edition'],
    Company: ['About VELOX', 'Design Studio', 'Motorsport', 'Careers'],
    Owners: ['My VELOX', 'Service', 'Accessories', 'Warranty'],
    Legal: ['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Sitemap'],
  };

  return (
    <footer className="bg-[#000000] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-20">
        {/* Top row */}
        <div className="grid md:grid-cols-5 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display font-light text-2xl tracking-[0.5em] text-white block mb-4">
              VELOX
            </span>
            <p className="text-white/25 text-[11px] leading-6 tracking-wide">
              Precision Engineered.<br />
              Luxury Defined.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {['X', 'IG', 'YT', 'LI'].map(s => (
                <button
                  key={s}
                  className="w-8 h-8 glass rounded-full text-[9px] text-white/30 hover:text-gold hover:border-gold/30 flex items-center justify-center tracking-wider transition-all duration-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="md:col-span-1">
              <p className="text-[10px] text-white/25 tracking-[0.4em] uppercase mb-5">{category}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[12px] text-white/40 hover:text-white/80 tracking-wide transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 tracking-wide">
            © 2024 VELOX Automotive GmbH. All rights reserved.
          </p>
          <p className="text-[10px] text-white/15 tracking-wide">
            All performance figures are manufacturer&rsquo;s estimates under controlled conditions.
          </p>
        </div>
      </div>
    </footer>
  );
}
