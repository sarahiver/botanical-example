import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--cream);
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.div`
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--forest);
  margin-bottom: 1rem;
`;

const Intro = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--text-light);
  line-height: 1.7;
`;

const GiftCard = styled.div`
  background: var(--cream-dark);
  border-radius: 30px;
  padding: 3rem;
  margin-top: 2rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
`;

const GiftIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const GiftTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--sage-dark);
  margin-bottom: 1rem;
`;

const GiftText = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const BankDetails = styled.div`
  background: var(--cream);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: left;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  
  .row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(139,157,131,0.2);
    &:last-child { border-bottom: none; }
    
    .label { color: var(--sage-dark); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; }
    .value { color: var(--forest); font-weight: 500; }
  }
`;

const WishlistLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: var(--sage);
  border-radius: 25px;
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cream);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--sage-dark);
    transform: translateY(-2px);
  }
`;

function Gifts({
  intro = 'Eure Anwesenheit ist das schönste Geschenk. Wenn ihr uns dennoch etwas schenken möchtet, freuen wir uns über einen Beitrag zu unserer Hochzeitsreise.',
  honeymoonText = 'Wir träumen von einer Reise durch die Toskana – zwischen Olivenhainen und Weinbergen.',
  bankDetails = { recipient: 'Olivia & Benjamin Weber', iban: 'DE89 3704 0044 0532 0130 00', bic: 'COBADEFFXXX', reference: 'Hochzeitsreise' },
  wishlistUrl = null,
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="gifts">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Geschenkideen</Eyebrow>
          <Title>Eure Geschenke</Title>
          <Intro>{intro}</Intro>
        </Header>
        
        <GiftCard visible={visible}>
          <GiftIcon>🌻</GiftIcon>
          <GiftTitle>Hochzeitsreise in die Toskana</GiftTitle>
          <GiftText>{honeymoonText}</GiftText>
          
          {bankDetails && (
            <BankDetails>
              <div className="row"><span className="label">Empfänger</span><span className="value">{bankDetails.recipient}</span></div>
              <div className="row"><span className="label">IBAN</span><span className="value">{bankDetails.iban}</span></div>
              <div className="row"><span className="label">BIC</span><span className="value">{bankDetails.bic}</span></div>
              <div className="row"><span className="label">Verwendungszweck</span><span className="value">{bankDetails.reference}</span></div>
            </BankDetails>
          )}
          
          {wishlistUrl && <WishlistLink href={wishlistUrl} target="_blank">Zur Wunschliste →</WishlistLink>}
        </GiftCard>
      </Container>
    </Section>
  );
}

export default Gifts;
