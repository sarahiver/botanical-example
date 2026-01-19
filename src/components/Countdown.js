import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--forest);
  position: relative;
  overflow: hidden;
`;

// Decorative background leaves
const BgLeaf = styled.div`
  position: absolute;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  opacity: 0.05;
  top: ${p => p.top};
  left: ${p => p.left};
  right: ${p => p.right};
  animation: ${float} ${p => p.duration}s ease-in-out infinite;
  animation-delay: ${p => p.delay}s;
  
  svg {
    width: 100%;
    height: 100%;
    fill: var(--sage-light);
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  margin-bottom: 4rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;

const Eyebrow = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--sage-light);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: var(--cream);
`;

const CountdownGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
  
  @media (max-width: 600px) {
    gap: 0.75rem;
  }
`;

const CountdownItem = styled.div`
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '40px'});
  transition: all 0.8s ease;
  transition-delay: ${p => 0.1 + p.index * 0.1}s;
`;

const NumberCircle = styled.div`
  width: 130px;
  height: 130px;
  background: rgba(245,241,235,0.08);
  border: 1px solid rgba(139,157,131,0.3);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.4s ease;
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${p => p.index * 0.5}s;
  
  &:hover {
    background: rgba(245,241,235,0.12);
    border-color: rgba(139,157,131,0.5);
    transform: scale(1.05);
  }
  
  /* Decorative ring */
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border: 1px dashed rgba(139,157,131,0.2);
    border-radius: 50%;
  }
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    
    &::before { inset: -5px; }
  }
`;

const Number = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  color: var(--cream);
  line-height: 1;
  
  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const Label = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.6rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--sage-light);
  margin-top: 0.5rem;
  
  @media (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

const Message = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(245,241,235,0.7);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.8;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.6s;
`;

const LeafDivider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.5s;
  
  .line {
    width: 40px;
    height: 1px;
    background: rgba(139,157,131,0.4);
  }
  
  svg {
    width: 24px;
    height: 24px;
    fill: var(--sage);
    animation: ${float} 4s ease-in-out infinite;
  }
`;

const LeafSVG = () => (
  <svg viewBox="0 0 100 100">
    <path d="M50 5 C20 25 10 60 50 95 C90 60 80 25 50 5 Z" />
  </svg>
);

function Countdown({
  weddingDate = '2025-06-21T15:00:00',
  message = 'Bald beginnt unser gemeinsames Abenteuer – und wir können es kaum erwarten, es mit euch zu teilen.',
}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(weddingDate) - new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    { value: timeLeft.days, label: 'Tage' },
    { value: timeLeft.hours, label: 'Stunden' },
    { value: timeLeft.minutes, label: 'Minuten' },
    { value: timeLeft.seconds, label: 'Sekunden' },
  ];

  return (
    <Section ref={sectionRef}>
      <BgLeaf size={150} top="10%" left="5%" duration={8} delay={0}><LeafSVG /></BgLeaf>
      <BgLeaf size={100} top="60%" right="8%" duration={10} delay={2}><LeafSVG /></BgLeaf>
      <BgLeaf size={80} top="80%" left="15%" duration={7} delay={1}><LeafSVG /></BgLeaf>
      
      <Container>
        <Header visible={visible}>
          <Eyebrow>Countdown</Eyebrow>
          <Title>Noch so viele Momente</Title>
        </Header>
        
        <CountdownGrid>
          {items.map((item, i) => (
            <CountdownItem key={i} index={i} visible={visible}>
              <NumberCircle index={i}>
                <Number>{String(item.value).padStart(2, '0')}</Number>
                <Label>{item.label}</Label>
              </NumberCircle>
            </CountdownItem>
          ))}
        </CountdownGrid>
        
        <LeafDivider visible={visible}>
          <div className="line" />
          <LeafSVG />
          <div className="line" />
        </LeafDivider>
        
        <Message visible={visible}>{message}</Message>
      </Container>
    </Section>
  );
}

export default Countdown;
