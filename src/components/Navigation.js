import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${p => p.scrolled ? '0.8rem 0' : '1.2rem 0'};
  background: ${p => p.scrolled ? 'rgba(245,241,235,0.95)' : 'transparent'};
  backdrop-filter: ${p => p.scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${p => p.scrolled ? '0 2px 20px rgba(45,59,45,0.08)' : 'none'};
  transition: all 0.4s ease;
  animation: ${fadeIn} 0.8s ease;
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 3rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Logo = styled.a`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--forest);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--sage);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.li`
  a {
    font-family: 'Lato', sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--text-light);
    position: relative;
    padding: 0.3rem 0;
    transition: color 0.3s ease;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--sage);
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: var(--forest);
      
      &::after {
        width: 100%;
      }
    }
  }
`;

const DateBadge = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--sage-dark);
  padding: 0.5rem 1.2rem;
  background: rgba(139,157,131,0.1);
  border-radius: 30px;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

// Mobile Menu
const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--forest);
    border-radius: 2px;
    transition: all 0.3s ease;
    
    ${p => p.isOpen && `
      &:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
      &:nth-child(2) { opacity: 0; }
      &:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
    `}
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 900px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--cream);
    padding: 6rem 2rem 2rem;
    transform: translateY(${p => p.isOpen ? '0' : '-100%'});
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 998;
  }
`;

const MobileNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const MobileNavLink = styled.li`
  opacity: ${p => p.isOpen ? 1 : 0};
  transform: translateY(${p => p.isOpen ? 0 : '20px'});
  transition: all 0.4s ease;
  transition-delay: ${p => p.index * 0.08}s;
  
  a {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-style: italic;
    color: var(--forest);
    padding: 1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--sage);
    }
  }
`;

const MobileDateBadge = styled.div`
  text-align: center;
  margin-top: 2rem;
  opacity: ${p => p.isOpen ? 1 : 0};
  transition: opacity 0.4s ease;
  transition-delay: 0.5s;
  
  span {
    font-family: 'Lato', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-light);
    display: block;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-style: italic;
    color: var(--sage-dark);
  }
`;

function Navigation({
  coupleNames = 'Olivia & Benjamin',
  weddingDate = '21. Juni 2025',
  links = [
    { label: 'Unsere Geschichte', href: '#story' },
    { label: 'Hochzeit', href: '#location' },
    { label: 'Ablauf', href: '#timeline' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Galerie', href: '#gallery' },
  ],
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  return (
    <>
      <Nav scrolled={scrolled}>
        <NavInner>
          <Logo href="#top">{coupleNames}</Logo>
          
          <NavLinks>
            {links.map((link, i) => (
              <NavLink key={i}>
                <a href={link.href}>{link.label}</a>
              </NavLink>
            ))}
          </NavLinks>
          
          <DateBadge>{weddingDate}</DateBadge>
          
          <MobileMenuBtn 
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span /><span /><span />
          </MobileMenuBtn>
        </NavInner>
      </Nav>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavLinks>
          {links.map((link, i) => (
            <MobileNavLink key={i} index={i} isOpen={mobileMenuOpen}>
              <a href={link.href} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </a>
            </MobileNavLink>
          ))}
        </MobileNavLinks>
        <MobileDateBadge isOpen={mobileMenuOpen}>
          <span>Save the Date</span>
          <p>{weddingDate}</p>
        </MobileDateBadge>
      </MobileMenu>
    </>
  );
}

export default Navigation;
