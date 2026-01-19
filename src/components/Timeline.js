import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, var(--cream-dark) 0%, var(--cream) 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 900px;
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
  font-weight: 300;
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

const TimelineWrapper = styled.div`
  position: relative;
  
  /* Organic curved line */
  &::before {
    content: '';
    position: absolute;
    left: 100px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, var(--sage), var(--sage), transparent);
    
    @media (max-width: 600px) {
      left: 40px;
    }
  }
`;

const TimelineEvent = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  position: relative;
  
  /* Entry animation */
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateX(${p => p.visible ? 0 : '-30px'});
  transition: all 0.6s ease;
  transition-delay: ${p => p.index * 0.1}s;
  
  &:last-child { margin-bottom: 0; }
  
  @media (max-width: 600px) {
    gap: 1.25rem;
  }
`;

const TimeColumn = styled.div`
  width: 80px;
  flex-shrink: 0;
  text-align: right;
  padding-top: 0.75rem;
  
  @media (max-width: 600px) {
    width: 50px;
  }
`;

const Time = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: var(--sage-dark);
`;

const MarkerColumn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 40px;
  flex-shrink: 0;
`;

const Marker = styled.div`
  width: 40px;
  height: 40px;
  background: ${p => p.highlight ? 'var(--sage)' : 'var(--cream)'};
  border: 2px solid var(--sage);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 2;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${p => p.index * 0.2}s;
  
  ${TimelineEvent}:hover & {
    transform: scale(1.15);
    box-shadow: 0 4px 20px rgba(139,157,131,0.3);
  }
`;

const ContentColumn = styled.div`
  flex: 1;
  padding-bottom: 0.5rem;
`;

const EventCard = styled.div`
  background: var(--cream);
  border: 1px solid rgba(139,157,131,0.2);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--sage);
    box-shadow: 0 8px 30px rgba(139,157,131,0.15);
    transform: translateY(-3px);
  }
`;

const EventTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--forest);
  margin-bottom: 0.5rem;
`;

const EventDesc = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: ${p => p.location ? '0.75rem' : '0'};
`;

const EventLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  color: var(--sage-dark);
  
  svg {
    width: 14px;
    height: 14px;
    fill: var(--sage);
  }
`;

const Note = styled.div`
  margin-top: 3rem;
  padding: 1.5rem 2rem;
  background: rgba(139,157,131,0.08);
  border-radius: 20px;
  text-align: center;
  border: 1px dashed rgba(139,157,131,0.3);
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.6s ease;
  transition-delay: 0.8s;
  
  p {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-style: italic;
    color: var(--text-light);
  }
`;

function Timeline({
  events = [
    { time: '15:00', icon: '🌿', title: 'Freie Trauung', description: 'Unter der alten Linde im Garten', location: 'Botanischer Garten', highlight: true },
    { time: '16:00', icon: '🥂', title: 'Sektempfang', description: 'Stoßt mit uns an zwischen blühenden Rosen', location: 'Rosengarten', highlight: false },
    { time: '17:30', icon: '📸', title: 'Gruppenfoto', description: 'Ein Moment für die Ewigkeit', location: 'Große Wiese', highlight: false },
    { time: '18:30', icon: '🍽️', title: 'Dinner', description: 'Genießt ein nachhaltiges Menü aus regionalen Zutaten', location: 'Orangerie', highlight: true },
    { time: '21:00', icon: '💃', title: 'Tanz & Feier', description: 'Lasst uns gemeinsam in die Nacht tanzen', location: 'Orangerie', highlight: false },
  ],
  note = 'Zeiten sind flexibel – wir lassen uns vom Tag tragen.',
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="timeline">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Der Tag</Eyebrow>
          <Title>Ablauf</Title>
        </Header>
        
        <TimelineWrapper>
          {events.map((event, i) => (
            <TimelineEvent key={i} index={i} visible={visible}>
              <TimeColumn>
                <Time>{event.time}</Time>
              </TimeColumn>
              
              <MarkerColumn>
                <Marker highlight={event.highlight} index={i}>{event.icon}</Marker>
              </MarkerColumn>
              
              <ContentColumn>
                <EventCard>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDesc location={event.location}>{event.description}</EventDesc>
                  {event.location && (
                    <EventLocation>
                      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      {event.location}
                    </EventLocation>
                  )}
                </EventCard>
              </ContentColumn>
            </TimelineEvent>
          ))}
        </TimelineWrapper>
        
        {note && <Note visible={visible}><p>{note}</p></Note>}
      </Container>
    </Section>
  );
}

export default Timeline;
