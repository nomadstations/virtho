import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, setIsCartOpen }) => {
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-50/30 overflow-visible">
      <Header setIsCartOpen={setIsCartOpen} />
      {/* Ensure main acts as a flex child and grows without clipping */}
      <main className="flex-grow flex flex-col w-full overflow-visible relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;