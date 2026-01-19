import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

// ═══════════════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--cream-dark);
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Eyebrow = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--sage-dark);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: var(--forest);
`;

const IntroText = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: var(--text-light);
  line-height: 1.8;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.2s;
`;

const Card = styled.div`
  background: var(--cream);
  border-radius: var(--radius-xl);
  padding: 3rem;
  text-align: center;
  border: 1px solid rgba(139, 157, 131, 0.2);
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.3s;
`;

const CardIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const CardTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--forest);
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const BankDetails = styled.div`
  background: var(--sage-muted);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 1.5rem;
`;

const BankRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(139, 157, 131, 0.15);
  
  &:last-child { border-bottom: none; }
  
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
`;

const BankLabel = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage-dark);
`;

const BankValue = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--forest);
  font-weight: 500;
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--sage);
  color: var(--cream);
  border: none;
  border-radius: var(--radius-xl);
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--sage-dark);
    transform: translateY(-2px);
  }
  
  &.copied {
    background: var(--forest);
  }
`;

const WishlistLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--sage-dark);
  border: 1px solid var(--sage);
  border-radius: var(--radius-xl);
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--sage);
    color: var(--cream);
  }
`;

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function Gifts({
  intro = 'Eure Anwesenheit ist das schönste Geschenk. Wenn ihr uns dennoch etwas schenken möchtet, freuen wir uns über einen Beitrag zu unserer Hochzeitsreise.',
  honeymoonText = 'Wir träumen von einer Reise durch die Toskana – zwischen Olivenhainen, Weinbergen und kleinen Dörfern voller Geschichte.',
  bankDetails = {
    recipient: 'Olivia & Benjamin Weber',
    iban: 'DE89 3704 0044 0532 0130 00',
    bic: 'COBADEFFXXX',
    reference: 'Hochzeitsreise O&B',
  },
  wishlistUrl = null,
}) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const copyIBAN = () => {
    navigator.clipboard.writeText(bankDetails.iban.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section ref={sectionRef} id="gifts">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Geschenke</Eyebrow>
          <Title>Von Herzen</Title>
        </Header>

        <IntroText visible={visible}>{intro}</IntroText>

        <Card visible={visible}>
          <CardIcon>🌸</CardIcon>
          <CardTitle>Unsere Hochzeitsreise</CardTitle>
          <CardText>{honeymoonText}</CardText>
          
          <BankDetails>
            <BankRow>
              <BankLabel>Empfänger</BankLabel>
              <BankValue>{bankDetails.recipient}</BankValue>
            </BankRow>
            <BankRow>
              <BankLabel>IBAN</BankLabel>
              <BankValue>{bankDetails.iban}</BankValue>
            </BankRow>
            <BankRow>
              <BankLabel>BIC</BankLabel>
              <BankValue>{bankDetails.bic}</BankValue>
            </BankRow>
            <BankRow>
              <BankLabel>Verwendungszweck</BankLabel>
              <BankValue>{bankDetails.reference}</BankValue>
            </BankRow>
          </BankDetails>
          
          <CopyButton onClick={copyIBAN} className={copied ? 'copied' : ''}>
            {copied ? '✓ Kopiert!' : '📋 IBAN kopieren'}
          </CopyButton>
          
          {wishlistUrl && (
            <WishlistLink href={wishlistUrl} target="_blank" rel="noopener noreferrer">
              Zur Wunschliste
              <span>→</span>
            </WishlistLink>
          )}
        </Card>
      </Container>
    </Section>
  );
}

export default Gifts;
