import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card as UICard } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { useTheme } from '../context/ThemeContext';
import { useAccount, Card } from '../context/AccountContext';
import Sidebar from '../components/Sidebar';

const Cards = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { cards, addCard, deleteCard, updateCardLimit, user } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  
  const [cardType, setCardType] = useState<'Debit' | 'Credit'>('Debit');
  const [brand, setBrand] = useState<'Visa' | 'Mastercard' | 'Rupay'>('Visa');
  const [holderName, setHolderName] = useState(user?.fullName || '');
  const [error, setError] = useState('');

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
  };

  const mainContentStyle: React.CSSProperties = {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  };

  const pageHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const pageTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const cardsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '24px',
  };

  const virtualCardStyle = (isActive: boolean): React.CSSProperties => ({
    width: '100%',
    aspectRatio: '1.586/1', // Gold standard CR80 credit card ratio
    borderRadius: '16px',
    background: isActive 
      ? 'linear-gradient(135deg, #1a1c22 0%, #2a2d36 100%)' 
      : 'linear-gradient(135deg, #0f1115 0%, #1a1c22 100%)',
    border: `1px solid ${isActive ? theme.colors.accent : theme.colors.border}`,
    padding: '24px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#fff',
    boxShadow: isActive ? '0 10px 30px rgba(0, 212, 255, 0.1)' : 'none',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  });

  const cardChipStyle: React.CSSProperties = {
    width: '40px',
    height: '30px',
    backgroundColor: '#ffd700',
    borderRadius: '4px',
    background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
    opacity: 0.8,
  };

  const handleCreateCard = () => {
    setError('');

    // Constraint check: One user can only create one card of each brand/type
    const exists = cards.find(c => c.type === cardType && c.brand === brand);
    if (exists) {
      setError(`You already have a ${brand} ${cardType} card. Only one is allowed per brand.`);
      return;
    }

    // Generate a random-ish card number
    const cardNumber = Array(4).fill(0).map(() => Math.floor(Math.random() * 9000 + 1000).toString()).join(' ');
    const expiry = `${Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0')}/${Math.floor(Math.random() * 5 + 24)}`;
    const cvv = Math.floor(Math.random() * 900 + 100).toString();

    addCard({
      type: cardType,
      brand,
      number: cardNumber,
      expiry,
      cvv,
      holderName: holderName || user?.fullName || 'User',
      oneTimeLimit: 10000, // Default limit
    });
    setIsModalOpen(false);
  };

  const openManageModal = (card: Card) => {
    setSelectedCard(card);
    setIsManageModalOpen(true);
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div style={pageHeaderStyle}>
          <div>
            <h1 style={pageTitleStyle}>My Cards</h1>
            <p style={{ color: theme.colors.textMuted, marginTop: '8px' }}>
              Manage your digital and physical banking cards
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>+ Create New Card</Button>
        </div>

        {cards.length === 0 ? (
          <UICard style={{ textAlign: 'center', padding: '64px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💳</div>
            <h3>No Cards Found</h3>
            <p style={{ color: theme.colors.textMuted, marginBottom: '24px' }}>
              Create your first virtual Debit or Credit card to start using VaultEx services.
            </p>
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>Create Card</Button>
          </UICard>
        ) : (
          <div style={cardsGridStyle}>
            {cards.map((card) => (
              <div 
                key={card.id} 
                style={virtualCardStyle(card.type === 'Credit')}
                onClick={() => openManageModal(card)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6 }}>{card.type} CARD</div>
                  <div style={{ fontWeight: 700, fontStyle: 'italic', fontSize: '18px' }}>{card.brand}</div>
                </div>

                <div style={cardChipStyle}></div>

                <div style={{ fontSize: '22px', fontFamily: theme.font.number, letterSpacing: '4px', marginBottom: '8px' }}>
                  {card.number}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>CARD HOLDER</div>
                    <div style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 600 }}>{card.holderName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '4px' }}>EXPIRES</div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{card.expiry}</div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div style={{ 
                  position: 'absolute', 
                  right: '-20px', 
                  bottom: '-20px', 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  border: '1px solid rgba(255,255,255,0.05)' 
                }}></div>
              </div>
            ))}
          </div>
        )}

        {/* Create Card Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Create Virtual Card"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div style={{ 
                padding: '12px', 
                backgroundColor: 'rgba(255, 0, 0, 0.1)', 
                color: '#ff4444', 
                fontSize: '13px', 
                borderRadius: '8px',
                border: '1px solid #ff4444' 
              }}>
                ⚠️ {error}
              </div>
            )}

            <div>
              <p style={{ fontSize: '13px', marginBottom: '12px', color: theme.colors.textMuted }}>Select Card Type</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button 
                  variant={cardType === 'Debit' ? 'primary' : 'secondary'} 
                  onClick={() => setCardType('Debit')}
                  fullWidth
                >
                  Debit
                </Button>
                <Button 
                  variant={cardType === 'Credit' ? 'primary' : 'secondary'} 
                  onClick={() => setCardType('Credit')}
                  fullWidth
                >
                  Credit
                </Button>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '13px', marginBottom: '12px', color: theme.colors.textMuted }}>Select Provider</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button 
                  variant={brand === 'Visa' ? 'primary' : 'secondary'} 
                  onClick={() => setBrand('Visa')}
                >
                  Visa
                </Button>
                <Button 
                  variant={brand === 'Mastercard' ? 'primary' : 'secondary'} 
                  onClick={() => setBrand('Mastercard')}
                >
                  Mastercard
                </Button>
                <Button 
                  variant={brand === 'Rupay' ? 'primary' : 'secondary'} 
                  onClick={() => setBrand('Rupay')}
                >
                  Rupay
                </Button>
              </div>
            </div>

            <Input 
              label="Cardholder Name" 
              value={holderName} 
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Full Name"
            />

            <Button onClick={handleCreateCard} style={{ marginTop: '12px' }} fullWidth>Create My Card</Button>
          </div>
        </Modal>

        {/* Manage Card Modal */}
        <Modal
          isOpen={isManageModalOpen}
          onClose={() => setIsManageModalOpen(false)}
          title={`Manage your ${selectedCard?.brand} ${selectedCard?.type}`}
        >
          {selectedCard && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ 
                padding: '16px', 
                backgroundColor: theme.colors.surfaceAlt, 
                borderRadius: '12px',
                border: `1px solid ${theme.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ fontSize: '24px' }}>💳</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{selectedCard.brand} Card</div>
                  <div style={{ fontSize: '12px', color: theme.colors.textMuted }}>**** **** **** {selectedCard.number.split(' ').pop()}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px' }}>One-time Purchase Limit</span>
                  <span style={{ fontWeight: 700, color: theme.colors.success }}>
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(selectedCard.oneTimeLimit)}
                  </span>
                </div>
                <Input 
                  type="number" 
                  placeholder="Set New One-time Limit" 
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) updateCardLimit(selectedCard.id, val);
                  }}
                />
              </div>

              <div style={{ borderTop: `1px solid ${theme.colors.border}`, paddingTop: '16px', display: 'flex', gap: '12px' }}>
                <Button variant="secondary" fullWidth onClick={() => alert("Card frozen! No online transactions will be allowed.")}>
                  ❄️ Freeze
                </Button>
                <Button 
                  variant="secondary" 
                  style={{ backgroundColor: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', borderColor: '#ff4444' }} 
                  fullWidth 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
                      deleteCard(selectedCard.id);
                      setIsManageModalOpen(false);
                    }
                  }}
                >
                  🗑️ Delete Card
                </Button>
              </div>

              <div style={{ padding: '12px', backgroundColor: theme.colors.surfaceAlt, borderRadius: '8px', fontSize: '11px', color: theme.colors.textMuted }}>
                Note: Blocking the card is permanent and cannot be undone. You will need to request a new virtual card.
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Cards;
