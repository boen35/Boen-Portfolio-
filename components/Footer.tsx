import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 text-center border-t border-gray-200 mt-12 flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      <p className="font-sans text-sm text-gray-500">
        Contact me at <a href="mailto:boen3five@gmail.com" className="hover:text-black transition-colors">boen3five@gmail.com</a>
      </p>
    </footer>
  );
};

export default Footer;