import React, { useState } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import LoveStory from './components/LoveStory';
import Timeline from './components/Timeline';
import Locations from './components/Locations';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Gifts from './components/Gifts';
import FAQ from './components/FAQ';
import WeddingABC from './components/WeddingABC';
import PhotoUpload from './components/PhotoUpload';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [rsvpResponses, setRsvpResponses] = useState([
    { name: 'Lisa & Martin Hoffmann', email: 'lisa@email.de', status: 'yes', guests: 2, menu: 'Vegetarisch', allergies: '', date: '2024-03-15' },
    { name: 'Thomas Weber', email: 'thomas@email.de', status: 'yes', guests: 1, menu: 'Vegan', allergies: 'Nüsse', date: '2024-03-14' },
    { name: 'Anna Schmidt', email: 'anna@email.de', status: 'no', guests: 0, menu: '-', allergies: '', date: '2024-03-13' },
    { name: 'Familie Müller', email: 'mueller@email.de', status: 'yes', guests: 4, menu: 'Fleisch', allergies: '', date: '2024-03-12' },
  ]);
  const [uploadedPhotos, setUploadedPhotos] = useState([
    { url: null, guestName: 'Lisa Hoffmann' },
    { url: null, guestName: 'Thomas Weber' },
    { url: null, guestName: 'Lisa Hoffmann' },
    { url: null, guestName: 'Familie Müller' },
  ]);

  // Wedding Data - Botanical Style
  const weddingData = {
    couple: {
      name1: 'Olivia',
      name2: 'Benjamin',
      coupleNames: 'Olivia & Benjamin',
    },
    wedding: {
      date: '2025-06-21T15:00:00',
      dateFormatted: '21. Juni 2025',
      location: 'Botanischer Garten, München',
    },
    navLinks: [
      { label: 'Unsere Geschichte', href: '#story' },
      { label: 'Hochzeit', href: '#location' },
      { label: 'Ablauf', href: '#timeline' },
      { label: 'RSVP', href: '#rsvp' },
      { label: 'Galerie', href: '#gallery' },
    ],
    milestones: [
      { year: '2020', title: 'Der erste Blick', text: 'Zwischen blühenden Pfingstrosen im Botanischen Garten kreuzten sich unsere Wege zum ersten Mal. Ein zufälliges Gespräch über Orchideen wurde zum Beginn von allem.', image: null },
      { year: '2021', title: 'Gemeinsam wachsen', text: 'Wie zwei Pflanzen, die ihre Wurzeln verschränken, wuchsen wir zusammen – durch sonnige Tage und stürmische Nächte, immer füreinander da.', image: null },
      { year: '2023', title: 'Ein neues Zuhause', text: 'Mit einem kleinen Garten voller Wildblumen fanden wir unseren Ort, an dem Liebe gedeihen kann. Unser erstes gemeinsames Heim.', image: null },
      { year: '2024', title: 'Die große Frage', text: 'Unter dem alten Apfelbaum, zwischen fallenden Blütenblättern, kniete Benjamin nieder – und Olivia sagte unter Freudentränen Ja.', image: null },
    ],
    locations: [
      { type: 'Trauung', name: 'Botanischer Garten', address: 'Menzinger Straße 65, 80638 München', time: '15:00 Uhr', description: 'Freie Trauung unter der alten Linde im Rosengarten.', image: null, mapUrl: 'https://maps.google.com' },
      { type: 'Feier', name: 'Die Orangerie', address: 'Menzinger Straße 65, 80638 München', time: '18:00 Uhr', description: 'Festliches Dinner zwischen exotischen Pflanzen und warmem Kerzenlicht.', image: null, mapUrl: 'https://maps.google.com' },
    ],
    timelineEvents: [
      { time: '15:00', icon: '🌿', title: 'Freie Trauung', description: 'Unter der alten Linde im Rosengarten', location: 'Botanischer Garten', highlight: true },
      { time: '16:00', icon: '🥂', title: 'Sektempfang', description: 'Stoßt mit uns an zwischen blühenden Rosen', location: 'Rosengarten', highlight: false },
      { time: '17:00', icon: '📸', title: 'Paarfotos', description: 'Ein Spaziergang durch den Garten', location: 'Botanischer Garten', highlight: false },
      { time: '18:30', icon: '🍽️', title: 'Festliches Dinner', description: 'Nachhaltiges 4-Gänge-Menü aus regionalen Zutaten', location: 'Orangerie', highlight: true },
      { time: '21:00', icon: '💃', title: 'Tanz & Feier', description: 'Lasst uns gemeinsam in die Nacht tanzen', location: 'Orangerie', highlight: false },
      { time: '00:00', icon: '🌙', title: 'Mitternachtssnack', description: 'Kleine Stärkung für die Nacht', location: 'Orangerie', highlight: false },
    ],
    galleryImages: [
      { src: null, alt: 'Engagement Shooting 1' },
      { src: null, alt: 'Engagement Shooting 2' },
      { src: null, alt: 'Engagement Shooting 3' },
      { src: null, alt: 'Engagement Shooting 4' },
      { src: null, alt: 'Engagement Shooting 5' },
      { src: null, alt: 'Engagement Shooting 6' },
    ],
    faqs: [
      { question: 'Gibt es einen Dresscode?', answer: 'Wir freuen uns über festliche Kleidung in natürlichen, gedeckten Farben – Salbeigrün, Dusty Rose, Creme, Terrakotta. Bitte kein reines Weiß oder Schwarz.' },
      { question: 'Kann ich eine Begleitung mitbringen?', answer: 'Aufgrund der begrenzten Plätze können leider nur die auf der Einladung genannten Personen teilnehmen. Wir hoffen auf euer Verständnis.' },
      { question: 'Sind Kinder willkommen?', answer: 'Ja! Wir feiern gerne mit euren Kleinen. Es gibt einen betreuten Spielbereich im Garten und kindgerechtes Essen.' },
      { question: 'Was ist mit dem Wetter?', answer: 'Die Trauung findet bei jedem Wetter statt – bei Regen weichen wir in das Gewächshaus aus. Bringt sicherheitshalber einen Schirm mit.' },
      { question: 'Darf ich Fotos machen?', answer: 'Bei der Trauung bitten wir um eine "Unplugged Ceremony" – genießt den Moment ohne Handy. Bei der Feier sind Fotos herzlich willkommen!' },
    ],
    abcEntries: [
      { letter: 'A', title: 'Anfahrt', text: 'Der Botanische Garten ist mit der U1 (Haltestelle Rotkreuzplatz) gut erreichbar. Parkplätze sind begrenzt – wir empfehlen öffentliche Verkehrsmittel.' },
      { letter: 'B', title: 'Blumen', text: 'Bitte keine Schnittblumen mitbringen – die Natur im Botanischen Garten ist unsere Dekoration. Wir unterstützen damit Nachhaltigkeit.' },
      { letter: 'D', title: 'Dresscode', text: 'Festlich in natürlichen, gedeckten Farben. Denkt an bequeme Schuhe für den Garten! Kein Weiß oder Creme.' },
      { letter: 'F', title: 'Fotos', text: 'Unplugged Trauung – genießt den Moment. Bei der Feier dürft ihr gerne fotografieren und Bilder später hochladen.' },
      { letter: 'G', title: 'Geschenke', text: 'Eure Anwesenheit ist das größte Geschenk. Wer möchte, kann zu unserer Hochzeitsreise beitragen.' },
      { letter: 'K', title: 'Kinder', text: 'Herzlich willkommen! Es gibt einen betreuten Spielbereich und Kindermenü.' },
      { letter: 'P', title: 'Parken', text: 'Begrenzte Parkplätze am Botanischen Garten. Wir empfehlen die Anreise mit der U-Bahn.' },
      { letter: 'S', title: 'Shuttle', text: 'Kein Shuttle nötig – Trauung und Feier finden am selben Ort statt.' },
      { letter: 'U', title: 'Unterkunft', text: 'Hotelkontingente sind im Hotel Laimer Hof reserviert. Codewort "Olivia & Benjamin" für Sonderkonditionen.' },
      { letter: 'W', title: 'Wetter', text: 'Bei Regen findet die Trauung im wunderschönen Gewächshaus statt. Bringt vorsichtshalber einen Schirm mit.' },
    ],
    gifts: {
      intro: 'Eure Anwesenheit ist das schönste Geschenk. Wenn ihr uns dennoch etwas schenken möchtet, freuen wir uns über einen Beitrag zu unserer Hochzeitsreise.',
      honeymoonText: 'Wir träumen von einer Reise durch die Toskana – zwischen Olivenhainen, Weinbergen und kleinen Dörfern voller Geschichte.',
      bankDetails: {
        recipient: 'Olivia & Benjamin Weber',
        iban: 'DE89 3704 0044 0532 0130 00',
        bic: 'COBADEFFXXX',
        reference: 'Hochzeitsreise O&B',
      },
      wishlistUrl: null,
    },
    rsvp: {
      deadline: '15. Mai 2025',
      menuOptions: ['Vegetarisch', 'Vegan', 'Fleisch', 'Fisch'],
    },
    contact: {
      email: 'hochzeit@olivia-benjamin.de',
    },
  };

  const handleRsvpSubmit = (data) => {
    const newResponse = {
      ...data,
      status: data.attendance,
      date: new Date().toISOString().split('T')[0],
    };
    setRsvpResponses([...rsvpResponses, newResponse]);
  };

  const handlePhotoUpload = (files, guestName) => {
    const newPhotos = files.map(file => ({
      url: URL.createObjectURL(file),
      guestName,
    }));
    setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
  };

  const handleLogin = (email, password) => {
    if (email === 'demo' && password === 'demo') {
      setIsAdmin(true);
    }
  };

  // Admin View
  if (isAdmin) {
    return (
      <>
        <GlobalStyles />
        <Navigation 
          coupleNames={weddingData.couple.coupleNames}
          weddingDate={weddingData.wedding.dateFormatted}
          links={weddingData.navLinks}
        />
        <AdminDashboard
          coupleNames={weddingData.couple.coupleNames}
          rsvpData={rsvpResponses}
          photos={uploadedPhotos}
          onLogout={() => setIsAdmin(false)}
        />
      </>
    );
  }

  // Guest View
  return (
    <>
      <GlobalStyles />
      <Navigation 
        coupleNames={weddingData.couple.coupleNames}
        weddingDate={weddingData.wedding.dateFormatted}
        links={weddingData.navLinks}
      />
      <Hero
        name1={weddingData.couple.name1}
        name2={weddingData.couple.name2}
        date={weddingData.wedding.dateFormatted}
        location={weddingData.wedding.location}
        eyebrow="Wir heiraten"
      />
      <Countdown
        weddingDate={weddingData.wedding.date}
        message="Bald beginnt unser gemeinsames Abenteuer – und wir können es kaum erwarten, es mit euch zu teilen."
      />
      <LoveStory milestones={weddingData.milestones} />
      <Locations 
        locations={weddingData.locations}
        infoTitle="Anreise"
        infoText="Der Botanische Garten ist mit öffentlichen Verkehrsmitteln gut erreichbar (U1 Rotkreuzplatz). Parkplätze sind begrenzt vorhanden."
      />
      <Timeline 
        events={weddingData.timelineEvents}
        note="Zeiten sind flexibel – wir lassen uns vom Tag tragen."
      />
      <RSVP
        deadline={weddingData.rsvp.deadline}
        menuOptions={weddingData.rsvp.menuOptions}
        onSubmit={handleRsvpSubmit}
      />
      <Gallery images={weddingData.galleryImages} />
      <Gifts
        intro={weddingData.gifts.intro}
        honeymoonText={weddingData.gifts.honeymoonText}
        bankDetails={weddingData.gifts.bankDetails}
        wishlistUrl={weddingData.gifts.wishlistUrl}
      />
      <FAQ 
        faqs={weddingData.faqs}
        contactEmail={weddingData.contact.email}
      />
      <WeddingABC entries={weddingData.abcEntries} />
      <PhotoUpload
        onUpload={handlePhotoUpload}
        totalPhotos={uploadedPhotos.length}
        totalGuests={new Set(uploadedPhotos.map(p => p.guestName)).size}
      />
      <Footer
        coupleNames={weddingData.couple.coupleNames}
        tagline="Mit Liebe zur Natur feiern wir unseren besonderen Tag."
        links={weddingData.navLinks.slice(0, 3)}
        quickLinks={[
          { label: 'Galerie', href: '#gallery' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Kontakt', href: `mailto:${weddingData.contact.email}` },
        ]}
        onLogin={handleLogin}
        adminEmail="demo"
        adminPassword="demo"
      />
    </>
  );
}

export default App;
