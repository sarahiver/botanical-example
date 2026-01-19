import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--cream-dark);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  color: var(--forest);
`;

const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const LocationCard = styled.div`
  background: var(--cream);
  border-radius: 30px;
  overflow: hidden;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '40px'});
  transition: all 0.8s ease;
  transition-delay: ${p => p.index * 0.15}s;
  
  &:hover {
    box-shadow: 0 20px 50px rgba(45,59,45,0.12);
    transform: translateY(-5px);
    
    .image img { transform: scale(1.05); }
  }
`;

const LocationImage = styled.div`
  aspect-ratio: 16/10;
  overflow: hidden;
  background: var(--cream-dark);
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--cream-dark), var(--cream));
  
  span {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-style: italic;
    color: var(--sage-light);
  }
`;

const TypeBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--cream);
  border-radius: 20px;
  font-family: 'Lato', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage-dark);
`;

const LocationContent = styled.div`
  padding: 2rem;
`;

const LocationName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--forest);
  margin-bottom: 1rem;
`;

const LocationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  color: var(--text-light);
  
  .icon { font-size: 1rem; }
`;

const MapButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid var(--sage);
  border-radius: 25px;
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage-dark);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--sage);
    color: var(--cream);
  }
`;

const InfoBox = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: var(--cream);
  border-radius: 20px;
  text-align: center;
  border: 1px dashed var(--sage-light);
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.4s;
`;

const InfoTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--sage-dark);
  margin-bottom: 0.75rem;
`;

const InfoText = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.7;
`;

function Locations({
  locations = [
    { type: 'Trauung', name: 'Botanischer Garten', address: 'Menzinger Str. 65, München', time: '15:00 Uhr', description: 'Freie Trauung unter der alten Linde.', image: null, mapUrl: 'https://maps.google.com' },
    { type: 'Feier', name: 'Die Orangerie', address: 'Menzinger Str. 65, München', time: '18:00 Uhr', description: 'Festliches Dinner zwischen exotischen Pflanzen.', image: null, mapUrl: 'https://maps.google.com' },
  ],
  infoTitle = 'Anreise',
  infoText = 'Parkplätze stehen begrenzt zur Verfügung. Wir empfehlen die Anreise mit öffentlichen Verkehrsmitteln (U1 bis Rotkreuzplatz).',
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="location">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Wo wir feiern</Eyebrow>
          <Title>Die Orte</Title>
        </Header>
        
        <LocationsGrid>
          {locations.map((loc, i) => (
            <LocationCard key={i} index={i} visible={visible}>
              <LocationImage className="image">
                <TypeBadge>{loc.type}</TypeBadge>
                {loc.image ? <img src={loc.image} alt={loc.name} /> : <Placeholder><span>{loc.type}</span></Placeholder>}
              </LocationImage>
              <LocationContent>
                <LocationName>{loc.name}</LocationName>
                <LocationDetails>
                  <DetailRow><span className="icon">📍</span>{loc.address}</DetailRow>
                  <DetailRow><span className="icon">🕐</span>{loc.time}</DetailRow>
                  {loc.description && <DetailRow><span className="icon">💚</span>{loc.description}</DetailRow>}
                </LocationDetails>
                {loc.mapUrl && <MapButton href={loc.mapUrl} target="_blank">Route planen →</MapButton>}
              </LocationContent>
            </LocationCard>
          ))}
        </LocationsGrid>
        
        {infoText && (
          <InfoBox visible={visible}>
            <InfoTitle>{infoTitle}</InfoTitle>
            <InfoText>{infoText}</InfoText>
          </InfoBox>
        )}
      </Container>
    </Section>
  );
}

export default Locations;
