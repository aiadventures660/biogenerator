
import React from 'react';
import { Brain, Facebook, Twitter, Linkedin, Github, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return <footer className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32 pb-12 overflow-hidden py-[43px]">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 max-w-7xl mx-auto">
          <div className="group">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Instagram className="h-6 w-6" />
              </div>
              <span className="ml-3 text-xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent py-[10px] my-0">
                Bio Generator
              </span>
            </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-6">
              Create stunning social media bios with AI generation, fancy fonts, symbols, and perfect formatting.
              Stand out with a bio that's uniquely you across all platforms.
              </p>
            <div className="flex space-x-4">
              {[{
              icon: Facebook,
              href: "#"
            }, {
              icon: Twitter,
              href: "#"
            }, {
              icon: Linkedin,
              href: "#"
            }, {
              icon: Github,
              href: "#"
            }, {
              icon: Instagram,
              href: "#"
            }].map((social, idx) => <a key={idx} href={social.href} className="w-10 h-10 rounded-xl bg-white/90 dark:bg-gray-800/90 border border-black/10 dark:border-gray-600/50 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg">
                  <social.icon size={18} />
                </a>)}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">Features</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/features/ai-bio-generation" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  AI Bio Generation
                </Link>
              </li>
              <li>
                <Link to="/features/fancy-font-styles" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Fancy Font Styles
                </Link>
              </li>
              <li>
                <Link to="/features/symbol-library" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Symbol Library
                </Link>
              </li>
              <li>
                <Link to="/features/template-collection" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Template Collection
                </Link>
              </li>
              <li>
                <Link to="/features/live-preview" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Live Preview
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">Resources</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/resources/bio-templates" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Bio Templates
                </Link>
              </li>
              <li>
                <Link to="/resources/style-guide" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Style Guide
                </Link>
              </li>
              <li>
                <Link to="/resources/tips-and-tricks" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Tips & Tricks
                </Link>
              </li>
              <li>
                <Link to="/resources/examples" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Examples
                </Link>
              </li>
              <li>
                <Link to="/resources/faq" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/contact-us" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-black/10 dark:border-gray-600/50 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} Social Bio Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};

export default Footer;
