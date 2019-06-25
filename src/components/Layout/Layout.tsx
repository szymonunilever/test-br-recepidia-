import { Link } from 'gatsby';
import React, { ReactNode } from 'react';

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div>
      <header>
        <h1>
          <Link to={'/'}>{title}</Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  );
};

export default Layout;

interface LayoutProps {
  location?: Location;
  title: string;
  children?: ReactNode | ReactNode[];
}
