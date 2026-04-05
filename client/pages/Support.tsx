import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { theme } from '../theme';
import Sidebar from '../components/Sidebar';

const Support = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const pageTitleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
  };

  const faqStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '24px',
  };

  const faqItemStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
    }, 3000);
  };

  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={mainContentStyle}>
        <div>
          <h1 style={pageTitleStyle}>Help & Support</h1>
          <p style={{ color: theme.colors.textMuted, marginTop: '8px' }}>
            We're here to help you 24/7. Get in touch with our team or browse our FAQs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
          {/* FAQs */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Frequently Asked Questions</h3>
            <div style={faqStyle}>
              <div style={faqItemStyle}>
                <div style={{ fontWeight: 700, marginBottom: '8px', color: theme.colors.accent }}>How do I change my PIN?</div>
                <p style={{ fontSize: '13px', color: theme.colors.textMuted }}>Go to Settings &gt; Security and enter your old PIN to set a new one.</p>
              </div>
              <div style={faqItemStyle}>
                <div style={{ fontWeight: 700, marginBottom: '8px', color: theme.colors.accent }}>Is my money safe with VaultEx?</div>
                <p style={{ fontSize: '13px', color: theme.colors.textMuted }}>Yes, all accounts are insured up to ₹5,00,000 by RIC (Retail Insurance Corp) and protected by AES-256 encryption.</p>
              </div>
              <div style={faqItemStyle}>
                <div style={{ fontWeight: 700, marginBottom: '8px', color: theme.colors.accent }}>Where can I download my statements?</div>
                <p style={{ fontSize: '13px', color: theme.colors.textMuted }}>Visit the Accounts or Dashboard page and click the "Download Statement" button.</p>
              </div>
              <div style={faqItemStyle}>
                <div style={{ fontWeight: 700, marginBottom: '8px', color: theme.colors.accent }}>What is the FD interest rate?</div>
                <p style={{ fontSize: '13px', color: theme.colors.textMuted }}>We offer a guaranteed return of 8.00% p.a. on all Fixed Deposits!</p>
              </div>
            </div>
          </div>

          {/* Support Ticket Form */}
          <Card style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Submit a Ticket</h3>
            
            {isSubmitted ? (
              <div style={{ padding: '32px', textAlign: 'center', backgroundColor: 'rgba(0, 255, 137, 0.1)', borderRadius: theme.radius.md, border: `1px solid ${theme.colors.success}` }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚀</div>
                <h4 style={{ color: theme.colors.success }}>Ticket Submitted!</h4>
                <p style={{ fontSize: '12px', color: theme.colors.textMuted, marginTop: '8px' }}>Our support engineers will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Input 
                  label="Subject" 
                  placeholder="e.g. Transaction issue" 
                  value={ticketSubject} 
                  onChange={(e) => setTicketSubject(e.target.value)}
                  required
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', color: theme.colors.textMuted }}>Message</label>
                  <textarea 
                    placeholder="Describe your issue in detail..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    required
                    style={{
                      padding: '12px',
                      backgroundColor: theme.colors.surfaceAlt,
                      color: '#fff',
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: theme.radius.md,
                      fontFamily: theme.font.body,
                      minHeight: '120px',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <Button type="submit" fullWidth>Send Message</Button>
              </form>
            )}

            <div style={{ borderTop: `1px solid ${theme.colors.border}`, marginTop: '24px', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <span style={{ fontSize: '16px' }}>📞</span>
                <span>Customer Care: +1800 123 456</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <span style={{ fontSize: '16px' }}>📧</span>
                <span>Support: help@vaultex.com</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
