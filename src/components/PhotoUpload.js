import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--forest);
`;

const Container = styled.div`
  max-width: 650px;
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
  color: var(--sage-light);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--cream);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: rgba(245,241,235,0.7);
  line-height: 1.6;
`;

const UploadArea = styled.div`
  opacity: ${p => p.visible ? 1 : 0};
  transform: translateY(${p => p.visible ? 0 : '30px'});
  transition: all 0.8s ease;
  transition-delay: 0.2s;
`;

const DropZone = styled.div`
  padding: 4rem 2rem;
  background: ${p => p.isDragging ? 'rgba(139,157,131,0.2)' : 'rgba(245,241,235,0.05)'};
  border: 2px dashed ${p => p.isDragging ? 'var(--sage)' : 'rgba(139,157,131,0.3)'};
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--sage);
    background: rgba(139,157,131,0.1);
  }
`;

const DropIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const DropText = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--cream);
  margin-bottom: 0.5rem;
`;

const DropSubtext = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  color: rgba(245,241,235,0.5);
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 24px;
  height: 24px;
  background: var(--cream);
  color: var(--forest);
  border: none;
  border-radius: 50%;
  font-size: 0.7rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${PreviewItem}:hover & { opacity: 1; }
`;

const SubmitSection = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GuestName = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: var(--cream);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(139,157,131,0.3);
  border-radius: 15px;
  
  &:focus { outline: none; border-color: var(--sage); }
  &::placeholder { color: rgba(245,241,235,0.4); }
`;

const SubmitBtn = styled.button`
  padding: 1.2rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--forest);
  background: var(--sage);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: var(--sage-light);
    transform: translateY(-2px);
  }
  
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;
  
  .icon { font-size: 3rem; margin-bottom: 1rem; }
  h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--sage); margin-bottom: 1rem; }
  p { font-family: 'Lato', sans-serif; color: rgba(245,241,235,0.7); }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(245,241,235,0.05);
  border-radius: 20px;
  opacity: ${p => p.visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 0.3s;
`;

const StatItem = styled.div`
  text-align: center;
  
  .number { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--sage); }
  .label { font-family: 'Lato', sans-serif; font-size: 0.65rem; color: rgba(245,241,235,0.5); letter-spacing: 0.15em; text-transform: uppercase; margin-top: 0.25rem; }
`;

function PhotoUpload({
  maxFiles = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/heic'],
  totalPhotos = 64,
  totalGuests = 18,
  onUpload = (files, guestName) => console.log('Upload:', files, guestName),
}) {
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(e.dataTransfer.files).filter(f => acceptedTypes.includes(f.type));
    addFiles(newFiles);
  };

  const addFiles = (newFiles) => {
    const combined = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(combined.map(file => ({ file, preview: URL.createObjectURL(file) })));
  };

  const removeFile = (i) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[i].preview);
    newFiles.splice(i, 1);
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    if (files.length === 0 || !guestName.trim()) return;
    onUpload(files.map(f => f.file), guestName);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section ref={sectionRef} id="photos">
        <Container>
          <SuccessMessage>
            <div className="icon">🌿</div>
            <h3>Danke, {guestName}!</h3>
            <p>{files.length} Foto{files.length !== 1 ? 's' : ''} erfolgreich hochgeladen.</p>
          </SuccessMessage>
        </Container>
      </Section>
    );
  }

  return (
    <Section ref={sectionRef} id="photos">
      <Container>
        <Header visible={visible}>
          <Eyebrow>Teilt eure Momente</Eyebrow>
          <Title>Foto-Upload</Title>
          <Subtitle>Ladet eure schönsten Erinnerungen der Feier hoch!</Subtitle>
        </Header>
        
        <UploadArea visible={visible}>
          <DropZone isDragging={isDragging} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
            <DropIcon>📷</DropIcon>
            <DropText>Fotos hierher ziehen</DropText>
            <DropSubtext>oder klicken (max. {maxFiles})</DropSubtext>
          </DropZone>
          
          <HiddenInput ref={fileInputRef} type="file" multiple accept={acceptedTypes.join(',')} onChange={(e) => addFiles(Array.from(e.target.files))} />
          
          {files.length > 0 && (
            <>
              <PreviewGrid>
                {files.map((item, i) => (
                  <PreviewItem key={i}>
                    <img src={item.preview} alt="" />
                    <RemoveBtn onClick={() => removeFile(i)}>✕</RemoveBtn>
                  </PreviewItem>
                ))}
              </PreviewGrid>
              <SubmitSection>
                <GuestName type="text" placeholder="Euer Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                <SubmitBtn onClick={handleSubmit} disabled={!guestName.trim()}>{files.length} Foto{files.length !== 1 ? 's' : ''} hochladen</SubmitBtn>
              </SubmitSection>
            </>
          )}
        </UploadArea>
        
        <Stats visible={visible}>
          <StatItem><div className="number">{totalPhotos}</div><div className="label">Fotos</div></StatItem>
          <StatItem><div className="number">{totalGuests}</div><div className="label">Gäste</div></StatItem>
        </Stats>
      </Container>
    </Section>
  );
}

export default PhotoUpload;
