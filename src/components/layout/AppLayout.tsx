import React from 'react';

type AppLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children, header, footer }) => {
  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {header && (
        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto px-4">
            {header}
          </div>
        </header>
      )}
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      {footer && (
        <footer className="bg-white py-4 border-t border-gray-200">
          <div className="container mx-auto px-4">
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
};

export default AppLayout;