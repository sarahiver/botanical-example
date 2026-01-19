import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

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

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  background: var(--cream);
  border-radius: 20px;
  overflow: hidden;
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '20px'});
  transition: all 0.6s ease;
  transition-delay: ${p => p.index * 0.08}s;
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  
  h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: var(--forest);
    flex: 1;
    transition: color 0.3s ease;
  }
  
  &:hover h4 { color: var(--sage-dark); }
`;

const ToggleIcon = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.isOpen ? 'var(--sage)' : 'var(--cream-dark)'};
  color: ${p => p.isOpen ? 'var(--cream)' : 'var(--sage-dark)'};
  border-radius: 50%;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  transform: rotate(${p => p.isOpen ? '45deg' : '0'});
`;

const Answer = styled.div`
  max-height: ${p => p.isOpen ? '300px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;

const AnswerContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  
  p {
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: var(--text-light);
    line-height: 1.8;
  }
`;

const ContactBox = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: var(--cream);
  border-radius: 20px;
  text-align: center;
  border: 1px dashed var(--sage-light);
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.5s;
  
  h4 { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--sage-dark); margin-bottom: 0.5rem; }
  p { font-family: 'Lato', sans-serif; font-size: 0.9rem; color: var(--text-light); }
  a { color: var(--sage-dark); text-decoration: underline; &:hover { text-decoration: none; } }
`;

function FAQ({
  faqs = [
    { question: 'Gibt es einen Dresscode?', answer: 'Wir freuen uns über festliche Kleidung in natürlichen, gedeckten Farben. Bitte kein Weiß oder Creme.' },
    { question: 'Kann ich eine Begleitung mitbringen?', answer: 'Aufgrund begrenzter Plätze können leider nur die auf der Einladung genannten Personen teilnehmen.' },
    { question: 'Sind Kinder willkommen?', answer: 'Ja! Wir feiern gerne mit euren Kindern. Es gibt einen kleinen Spielbereich.' },
    { question: 'Gibt es Übernachtungsmöglichkeiten?', answer: 'Wir haben Kontingente in nahegelegenen Hotels reserviert. Details folgen.' },
    { question: 'Darf ich Fotos machen?', answer: 'Bei der Trauung bitten wir um Unplugged Ceremony. Bei der Feier sind Fotos erwünscht!' },
  ],
  contactEmail = 'hochzeit@olivia-benjamin.de',
}) {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} id="faq">
      <Container>
        <Header visible={visible}>
          <Eyebrow>FAQ</Eyebrow>
          <Title>Häufige Fragen</Title>
        </Header>
        
        <FAQList>
          {faqs.map((faq, i) => (
            <FAQItem key={i} index={i} visible={visible}>
              <Question onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <h4>{faq.question}</h4>
                <ToggleIcon isOpen={openIndex === i}>+</ToggleIcon>
              </Question>
              <Answer isOpen={openIndex === i}>
                <AnswerContent><p>{faq.answer}</p></AnswerContent>
              </Answer>
            </FAQItem>
          ))}
        </FAQList>
        
        {contactEmail && (
          <ContactBox visible={visible}>
            <h4>Weitere Fragen?</h4>
            <p>Schreibt uns an <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </ContactBox>
        )}
      </Container>
    </Section>
  );
}

export default FAQ;
