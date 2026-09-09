import { Link } from 'react-router-dom';
import { Hexagon, Globe, Share2, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Trace Honey', href: '/trace' },
    { label: 'Smart Hives', href: '/dashboard/beekeeper' },
    { label: 'Blockchain', href: '/blockchain' },
    { label: 'QR Verify', href: '/verify' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Mission', href: '/about#mission' },
    { label: 'Technology', href: '/about#technology' },
    { label: 'Contact', href: '/about#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800/50" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center">
                <Hexagon className="w-4.5 h-4.5 text-charcoal-950" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold font-display text-white">
                Honey<span className="text-gradient-honey">Chain</span>
              </span>
            </Link>
            <p className="text-sm text-charcoal-500 leading-relaxed mb-6">
              From Hive to Home — Transparent, Traceable & Smart Honey.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, Share2, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-charcoal-800/60 text-charcoal-500 hover:text-honey-400 hover:bg-charcoal-800 transition-all" aria-label={`Social link ${i + 1}`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-charcoal-200 uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-charcoal-500 hover:text-honey-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-charcoal-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal-600">
            © {new Date().getFullYear()} HoneyChain. Transparent. Traceable. Smart.
          </p>
          <p className="text-xs text-charcoal-700">
            Built for Smart India Hackathon — Demo Prototype
          </p>
        </div>
      </div>
    </footer>
  );
}
