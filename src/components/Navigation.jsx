import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/resume', label: 'RESUME' },
    { path: '/projects', label: 'PROJECTS' },
    { path: '/contact', label: 'CONTACT' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e0e0e0',
        zIndex: 10000,
        padding: '0 40px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#0a0a0a',
            textDecoration: 'none',
            letterSpacing: '1px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textTransform: 'uppercase'
          }}
        >
          Engineering Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center'
        }}
          className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: isActive(link.path) ? '#0a0a0a' : '#555',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '1px',
                transition: 'all 0.2s',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                borderBottom: isActive(link.path) ? '2px solid #8B5CF6' : '2px solid transparent',
                paddingBottom: '4px',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.color = '#8B5CF6';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.color = '#555';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#0a0a0a',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px'
          }}
          className="hamburger-btn"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid #e0e0e0',
          zIndex: 9999,
          padding: '20px',
          display: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
          className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                color: isActive(link.path) ? '#8B5CF6' : '#0a0a0a',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                padding: '15px 0',
                borderBottom: '1px solid #f0f0f0',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textTransform: 'uppercase'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;