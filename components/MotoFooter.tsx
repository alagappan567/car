import Link from 'next/link';

export default function MotoFooter() {
  const links = {
    RS1: ['Specifications', 'Configure', 'Dealers', 'Track Days'],
    Racing: ['Factory Team', 'Race Results', 'Rider Academy', 'Sponsorship'],
    Support: ['Owner Portal', 'Service', 'Parts', 'Warranty'],
    Legal: ['Privacy', 'Terms', 'Cookies', 'Sitemap'],
  };

  return (
    <footer className="bg-[#000000] border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-6 md:px-14 py-20">
        <div className="grid md:grid-cols-5 gap-12 pb-16 border-b border-white/[0.05]">
          <div className="md:col-span-1">
            <Link href="/" className="font-display font-light text-2xl tracking-[0.4em] text-white block mb-1">
              VELOX
            </Link>
            <p className="text-red-500/50 text-[10px] tracking-[0.3em] uppercase font-mono mb-4">MOTO RS1</p>
            <p className="text-white/20 text-[11px] leading-6 tracking-wide">
              Born on the Track.<br />
              Built for the Road.
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="md:col-span-1">
              <p className="text-[10px] text-white/20 tracking-[0.4em] uppercase mb-5 font-mono">{category}</p>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-[12px] text-white/35 hover:text-white/70 tracking-wide transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-white/15 tracking-wide">© 2024 VELOX Motorsport GmbH. All rights reserved.</p>
          <p className="text-[10px] text-white/10 tracking-wide">All performance figures are manufacturer estimates under controlled conditions.</p>
        </div>
      </div>
    </footer>
  );
}
