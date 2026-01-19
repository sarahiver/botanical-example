import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const FooterSection = styled.footer`
  padding: 4rem 2rem 2rem;
  background: var(--cream-dark);
  border-top: 1px solid rgba(139,157,131,0.2);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const BrandCol = styled.div``;

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-style: italic;
  color: var(--forest);
  margin-bottom: 1rem;
`;

const Tagline = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.7;
  max-width: 280px;
  
  @media (max-width: 768px) { max-width: 100%; }
`;

const Column = styled.div``;

const ColumnTitle = styled.h4`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--sage-dark);
  margin-bottom: 1.5rem;
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 768px) { align-items: center; }
`;

const LinkItem = styled.li`
  a {
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: var(--text-light);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover { color: var(--sage-dark); }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139,157,131,0.3), transparent);
  margin-bottom: 2rem;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 600px) { flex-direction: column; text-align: center; }
`;

const Copyright = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  color: var(--text-light);
`;

const AdminLink = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  color: var(--text-light);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover { color: var(--sage-dark); }
`;

const PoweredBy = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  color: var(--text-light);
  
  a { color: var(--sage-dark); text-decoration: none; &:hover { text-decoration: underline; } }
`;

// Modal
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(45,59,45,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  opacity: ${p => p.isOpen ? 1 : 0};
  visibility: ${p => p.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const Modal = styled.div`
  background: var(--cream);
  border-radius: 30px;
  width: 100%;
  max-width: 400px;
  padding: 3rem;
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  background: var(--cream-dark);
  border: none;
  border-radius: 50%;
  color: var(--text-light);
  font-size: 1rem;
  cursor: pointer;
  
  &:hover { background: var(--sage-light); color: var(--cream); }
`;

const ModalTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--forest);
  margin-bottom: 0.5rem;
`;

const ModalSubtitle = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-family: 'Lato', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage-dark);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  color: var(--forest);
  background: var(--cream-dark);
  border: 1px solid rgba(139,157,131,0.3);
  border-radius: 10px;
  
  &:focus { outline: none; border-color: var(--sage); }
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 1rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cream);
  background: var(--sage);
  border: none;
  border-radius: 25px;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: var(--sage-dark); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const ErrorMessage = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  color: #C0392B;
  text-align: center;
  margin-top: 1rem;
`;

function Footer({
  coupleNames = 'Olivia & Benjamin',
  tagline = 'Mit Liebe und Freude feiern wir unseren besonderen Tag.',
  links = [
    { label: 'Unsere Geschichte', href: '#story' },
    { label: 'Hochzeit', href: '#location' },
    { label: 'RSVP', href: '#rsvp' },
  ],
  quickLinks = [
    { label: 'Galerie', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontakt', href: 'mailto:hochzeit@email.de' },
  ],
  onLogin = (email, password) => console.log('Login:', email, password),
  adminEmail = 'demo',
  adminPassword = 'demo',
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (email === adminEmail && password === adminPassword) {
      onLogin(email, password);
      setIsModalOpen(false);
    } else {
      setError('E-Mail oder Passwort ist falsch.');
    }
    setLoading(false);
  };

  return (
    <>
      <FooterSection>
        <Container>
          <FooterGrid>
            <BrandCol>
              <Logo>{coupleNames}</Logo>
              <Tagline>{tagline}</Tagline>
            </BrandCol>
            <Column>
              <ColumnTitle>Navigation</ColumnTitle>
              <LinkList>
                {links.map((link, i) => <LinkItem key={i}><a href={link.href}>{link.label}</a></LinkItem>)}
              </LinkList>
            </Column>
            <Column>
              <ColumnTitle>Mehr</ColumnTitle>
              <LinkList>
                {quickLinks.map((link, i) => <LinkItem key={i}><a href={link.href}>{link.label}</a></LinkItem>)}
              </LinkList>
            </Column>
          </FooterGrid>
          
          <Divider />
          
          <BottomRow>
            <Copyright>© {new Date().getFullYear()} {coupleNames}</Copyright>
            <AdminLink onClick={() => setIsModalOpen(true)}>🔒 Admin</AdminLink>
            <PoweredBy>Made with 🌿 by <a href="https://si-wedding.de" target="_blank" rel="noopener noreferrer">S&I Wedding</a></PoweredBy>
          </BottomRow>
        </Container>
      </FooterSection>
      
      <ModalOverlay isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <Modal onClick={e => e.stopPropagation()}>
          <ModalClose onClick={() => setIsModalOpen(false)}>✕</ModalClose>
          <ModalTitle>Admin-Bereich</ModalTitle>
          <ModalSubtitle>Melde dich an für RSVP-Daten und Fotos.</ModalSubtitle>
          <LoginForm onSubmit={handleLogin}>
            <FormGroup>
              <Label>E-Mail</Label>
              <Input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label>Passwort</Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </FormGroup>
            <LoginBtn type="submit" disabled={loading}>{loading ? 'Wird angemeldet...' : 'Anmelden'}</LoginBtn>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </LoginForm>
        </Modal>
      </ModalOverlay>
    </>
  );
}

export default Footer;
