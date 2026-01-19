import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--cream);
`;

const Container = styled.div`
  max-width: 1000px;
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

const AlphabetNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.2s;
`;

const AlphabetLetter = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  background: ${p => p.active ? 'var(--sage)' : p.hasEntry ? 'var(--cream-dark)' : 'transparent'};
  color: ${p => p.active ? 'var(--cream)' : p.hasEntry ? 'var(--sage-dark)' : 'var(--cream-dark)'};
  border: 1px solid ${p => p.hasEntry ? 'var(--sage-light)' : 'var(--cream-dark)'};
  border-radius: 50%;
  cursor: ${p => p.hasEntry ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  
  ${p => p.hasEntry && !p.active && `
    &:hover {
      background: var(--sage-light);
      color: var(--cream);
    }
  `}
`;

const ABCGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ABCCard = styled.div`
  background: var(--cream-dark);
  border-radius: 20px;
  padding: 1.5rem;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '20px'});
  transition: all 0.6s ease;
  transition-delay: ${p => p.index * 0.05}s;
  
  &:hover {
    box-shadow: 0 10px 30px rgba(45,59,45,0.1);
    transform: translateY(-3px);
  }
`;

const CardLetter = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-style: italic;
  color: var(--sage-light);
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: var(--sage-dark);
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.7;
`;

function WeddingABC({
  entries = [
    { letter: 'A', title: 'Anfahrt', text: 'Der Botanische Garten ist gut mit U-Bahn erreichbar. Parkplätze sind begrenzt.' },
    { letter: 'B', title: 'Blumen', text: 'Bitte keine Blumen mitbringen – die Natur ist unsere Deko.' },
    { letter: 'D', title: 'Dresscode', text: 'Festlich in natürlichen, gedeckten Farben. Kein Weiß/Creme.' },
    { letter: 'F', title: 'Fotos', text: 'Unplugged Trauung, bei der Feier gerne fotografieren!' },
    { letter: 'K', title: 'Kinder', text: 'Herzlich willkommen! Es gibt einen Spielbereich.' },
    { letter: 'P', title: 'Parken', text: 'Begrenzte Parkplätze, ÖPNV empfohlen.' },
    { letter: 'S', title: 'Shuttle', text: 'Ein Shuttle fährt zwischen Trauung und Feier.' },
    { letter: 'U', title: 'Unterkunft', text: 'Hotelkontingente sind reserviert, Details folgen.' },
  ],
}) {
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const usedLetters = new Set(entries.map(e => e.letter.toUpperCase()));
  const filteredEntries = activeFilter ? entries.filter(e => e.letter.toUpperCase() === activeFilter) : entries;

  return (
    <Section ref={sectionRef} id="abc">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Infos von A-Z</Eyebrow>
          <Title>Hochzeits-ABC</Title>
        </Header>
        
        <AlphabetNav visible={visible}>
          {alphabet.map(letter => (
            <AlphabetLetter
              key={letter}
              hasEntry={usedLetters.has(letter)}
              active={activeFilter === letter}
              onClick={() => usedLetters.has(letter) && setActiveFilter(activeFilter === letter ? null : letter)}
            >
              {letter}
            </AlphabetLetter>
          ))}
        </AlphabetNav>
        
        <ABCGrid>
          {filteredEntries.map((entry, i) => (
            <ABCCard key={i} index={i} visible={visible}>
              <CardLetter>{entry.letter}</CardLetter>
              <CardTitle>{entry.title}</CardTitle>
              <CardText>{entry.text}</CardText>
            </ABCCard>
          ))}
        </ABCGrid>
      </Container>
    </Section>
  );
}

export default WeddingABC;
