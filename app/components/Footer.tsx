import { Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="17K Technologies Limited"
                width={250}
                height={188}
                className="w-12 h-auto shrink-0 object-contain rounded-lg"
              />
              <div>
                <div className="text-white">17K Technologies</div>
                <div className="text-xs text-cyan-400">Limited</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Transforming ideas into innovative digital experiences through cutting-edge technology and creative excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Services</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white mb-4">Connect With Us</h3>
            <div className="flex gap-3 mb-4">
              <a href="https://www.linkedin.com/company/17k-technologies-limited/posts/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="17K Technologies on LinkedIn (opens in a new tab)" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail size={16} />
              <span>seyiduncan40@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 17K Technologies Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
