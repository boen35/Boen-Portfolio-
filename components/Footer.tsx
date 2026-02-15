import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 text-center border-t border-gray-200 mt-24">
      <p className="font-sans text-sm text-gray-500">
        © {new Date().getFullYear()} Immersive Studio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;