import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: var(--cream);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: var(--forest);
`;

const LogoutBtn = styled.button`
  padding: 0.75rem 1.5rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sage-dark);
  background: transparent;
  border: 1px solid var(--sage);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: var(--sage); color: var(--cream); }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
  background: var(--cream-dark);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  
  .number { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--sage); }
  .label { font-family: 'Lato', sans-serif; font-size: 0.7rem; color: var(--text-light); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.5rem; }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(139,157,131,0.3);
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.active ? 'var(--sage-dark)' : 'var(--text-light)'};
  background: ${p => p.active ? 'var(--cream-dark)' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${p => p.active ? 'var(--sage)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { color: var(--sage-dark); }
`;

const TabContent = styled.div`
  background: var(--cream-dark);
  border-radius: 20px;
  padding: 2rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(139,157,131,0.2);
  }
  
  th {
    font-family: 'Lato', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--sage-dark);
  }
  
  td {
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    color: var(--text);
  }
  
  tr:hover td { background: rgba(139,157,131,0.05); }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 15px;
  
  ${p => p.status === 'yes' && `background: rgba(46, 204, 113, 0.15); color: #27ae60; border: 1px solid rgba(46, 204, 113, 0.3);`}
  ${p => p.status === 'no' && `background: rgba(231, 76, 60, 0.15); color: #c0392b; border: 1px solid rgba(231, 76, 60, 0.3);`}
  ${p => p.status === 'pending' && `background: rgba(241, 196, 15, 0.15); color: #d4a017; border: 1px solid rgba(241, 196, 15, 0.3);`}
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const PhotoCard = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: var(--cream);
  border-radius: 15px;
  overflow: hidden;
  
  img { width: 100%; height: 100%; object-fit: cover; }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(45,59,45,0.7);
    display: flex;
    align-items: flex-end;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover .overlay { opacity: 1; }
  
  .guest-name { font-family: 'Lato', sans-serif; font-size: 0.8rem; color: var(--cream); }
`;

const PlaceholderPhoto = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cream);
  
  span { font-size: 2rem; opacity: 0.3; }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionBtn = styled.button`
  padding: 0.75rem 1.5rem;
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${p => p.primary ? 'var(--sage)' : 'transparent'};
  color: ${p => p.primary ? 'var(--cream)' : 'var(--sage-dark)'};
  border: ${p => p.primary ? 'none' : '1px solid var(--sage)'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    ${p => p.primary ? 'background: var(--sage-dark);' : 'background: var(--sage); color: var(--cream);'}
  }
`;

function AdminDashboard({
  coupleNames = 'Olivia & Benjamin',
  rsvpData = [
    { name: 'Lisa Meier', email: 'lisa@email.de', status: 'yes', guests: 2, menu: 'Vegetarisch', date: '2024-03-15' },
    { name: 'Thomas Koch', email: 'thomas@email.de', status: 'yes', guests: 1, menu: 'Vegan', date: '2024-03-14' },
    { name: 'Anna Weber', email: 'anna@email.de', status: 'no', guests: 0, menu: '-', date: '2024-03-13' },
  ],
  photos = [
    { url: null, guestName: 'Lisa Meier' },
    { url: null, guestName: 'Thomas Koch' },
    { url: null, guestName: 'Lisa Meier' },
  ],
  onLogout = () => console.log('Logout'),
}) {
  const [activeTab, setActiveTab] = useState('rsvp');

  const confirmedGuests = rsvpData.filter(r => r.status === 'yes').reduce((sum, r) => sum + r.guests, 0);
  const pendingResponses = rsvpData.filter(r => r.status === 'pending').length;

  const downloadCSV = () => {
    const headers = ['Name', 'E-Mail', 'Status', 'Gäste', 'Menü', 'Datum'];
    const rows = rsvpData.map(r => [r.name, r.email, r.status, r.guests, r.menu, r.date]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp-responses.csv';
    a.click();
  };

  return (
    <Section>
      <Container>
        <Header>
          <Title>Admin Dashboard</Title>
          <LogoutBtn onClick={onLogout}>Abmelden</LogoutBtn>
        </Header>
        
        <StatsGrid>
          <StatCard><div className="number">{rsvpData.filter(r => r.status === 'yes').length}</div><div className="label">Zusagen</div></StatCard>
          <StatCard><div className="number">{confirmedGuests}</div><div className="label">Gäste gesamt</div></StatCard>
          <StatCard><div className="number">{pendingResponses}</div><div className="label">Ausstehend</div></StatCard>
          <StatCard><div className="number">{photos.length}</div><div className="label">Fotos</div></StatCard>
        </StatsGrid>
        
        <Tabs>
          <Tab active={activeTab === 'rsvp'} onClick={() => setActiveTab('rsvp')}>RSVP Übersicht</Tab>
          <Tab active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>Fotos</Tab>
        </Tabs>
        
        <TabContent>
          {activeTab === 'rsvp' && (
            <>
              <TableWrapper>
                <Table>
                  <thead>
                    <tr><th>Name</th><th>E-Mail</th><th>Status</th><th>Gäste</th><th>Menü</th><th>Datum</th></tr>
                  </thead>
                  <tbody>
                    {rsvpData.map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.email}</td>
                        <td><StatusBadge status={r.status}>{r.status === 'yes' ? 'Zusage' : r.status === 'no' ? 'Absage' : 'Offen'}</StatusBadge></td>
                        <td>{r.guests}</td>
                        <td>{r.menu}</td>
                        <td>{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrapper>
              <ActionBar>
                <ActionBtn onClick={downloadCSV}>CSV Export</ActionBtn>
                <ActionBtn primary>Erinnerung senden</ActionBtn>
              </ActionBar>
            </>
          )}
          
          {activeTab === 'photos' && (
            <>
              <PhotoGrid>
                {photos.map((photo, i) => (
                  <PhotoCard key={i}>
                    {photo.url ? <img src={photo.url} alt="" /> : <PlaceholderPhoto><span>🌿</span></PlaceholderPhoto>}
                    <div className="overlay"><span className="guest-name">{photo.guestName}</span></div>
                  </PhotoCard>
                ))}
              </PhotoGrid>
              <ActionBar><ActionBtn primary>Alle Fotos herunterladen</ActionBtn></ActionBar>
            </>
          )}
        </TabContent>
      </Container>
    </Section>
  );
}

export default AdminDashboard;
