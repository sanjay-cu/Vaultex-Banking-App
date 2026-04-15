import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

export const translations: Translations = {
  // Navigation
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', mr: 'डॅशबोर्ड' },
  accounts: { en: 'Accounts', hi: 'खाते', mr: 'खाती' },
  deposit: { en: 'Deposit', hi: 'जमा करें', mr: 'जमा करा' },
  withdraw: { en: 'Withdraw', hi: 'निकालें', mr: 'काढून घ्या' },
  transfer: { en: 'Transfer', hi: 'स्थानांतरण', mr: 'हस्तांतरण' },
  bills: { en: 'Bill Payment', hi: 'बिल भुगतान', mr: 'बिल पेमेंट' },
  cards: { en: 'Cards', hi: 'कार्ड', mr: 'कार्ड' },
  requests: { en: 'Requests', hi: 'अनुरोध', mr: 'विनंत्या' },
  fixedDeposit: { en: 'Fixed Deposit', hi: 'सावधि जमा', mr: 'मुदत ठेव' },
  profile: { en: 'Profile', hi: 'प्रोफ़ाइल', mr: 'प्रोफाइल' },
  settings: { en: 'Settings', hi: 'सेटिंग्स', mr: 'सेटिंग्ज' },
  logout: { en: 'Logout', hi: 'लॉगआउट', mr: 'लॉगआउट' },
  support: { en: 'Support', hi: 'सहायता', mr: 'मदत' },
  notifications: { en: 'Notifications', hi: 'सूचनाएं', mr: 'सूचना' },

  // Buttons & Common
  continue: { en: 'Continue', hi: 'आगे बढ़ें', mr: 'पुढे जा' },
  back: { en: 'Back', hi: 'पीछे', mr: 'मागे' },
  save: { en: 'Save', hi: 'सहेजें', mr: 'जतन करा' },
  cancel: { en: 'Cancel', hi: 'रद्द करें', mr: 'रद्द करा' },
  submit: { en: 'Submit', hi: 'जमा करें', mr: 'सबमिट करा' },
  loading: { en: 'Loading...', hi: 'लोड हो रहा है...', mr: 'लोड होत आहे...' },
  success: { en: 'Success', hi: 'सफल', mr: 'यशस्वी' },
  error: { en: 'Error', hi: 'त्रुटि', mr: 'त्रुटी' },
  confirm: { en: 'Confirm', hi: 'पुष्टि करें', mr: 'पुष्टी करा' },

  // Form Labels
  fullName: { en: 'Full Name', hi: 'पूरा नाम', mr: 'पूर्ण नाव' },
  emailAddress: { en: 'Email Address', hi: 'ईमेल पता', mr: 'ईमेल पत्ता' },
  phoneNumber: { en: 'Phone Number', hi: 'फ़ोन नंबर', mr: 'फोन नंबर' },
  amount: { en: 'Amount', hi: 'राशि', mr: 'रक्कम' },
  password: { en: 'Password', hi: 'पासवर्ड', mr: 'पासवर्ड' },
  description: { en: 'Description', hi: 'विवरण', mr: 'वर्णन' },
  pin: { en: 'Transaction PIN', hi: 'लेनदेन पिन', mr: 'व्यवहार पिन' },

  // Page Titles
  depositFunds: { en: 'Deposit Funds', hi: 'पैसे जमा करें', mr: 'पैसे जमा करा' },
  withdrawMoney: { en: 'Withdraw Money', hi: 'पैसे निकालें', mr: 'पैसे काढा' },
  transferMoney: { en: 'Transfer Money', hi: 'पैसे भेजें', mr: 'पैसे पाठवा' },
  payBills: { en: 'Pay Bills', hi: 'बिल भुगतान', mr: 'बिल भरा' },
  myCards: { en: 'My Cards', hi: 'मेरे कार्ड', mr: 'माझे कार्ड' },
  myAccounts: { en: 'My Accounts', hi: 'मेरे खाते', mr: 'माझी खाती' },
  accountProfile: { en: 'Account Profile', hi: 'खाता प्रोफ़ाइल', mr: 'खाते प्रोफाइल' },

  // Dashboard
  goodMorning: { en: 'Good Morning', hi: 'सुप्रभात', mr: 'सुप्रभात' },
  goodAfternoon: { en: 'Good Afternoon', hi: 'नमस्कार', mr: 'नमस्कार' },
  goodEvening: { en: 'Good Evening', hi: 'शुभ संध्या', mr: 'शुभ संध्या' },
  currentBalance: { en: 'Current Balance', hi: 'कुल शेष', mr: 'एकूण शिल्लक' },
  monthlyIncome: { en: 'This Month Income', hi: 'इस महीने की आय', mr: 'या महिन्याचे उत्पन्न' },
  monthlySpent: { en: 'This Month Spent', hi: 'इस महीने का खर्च', mr: 'या महिन्याचा खर्च' },
  recentTransactions: { en: 'Recent Transactions', hi: 'हाल के लेनदेन', mr: 'अलीकडील व्यवहार' },
  viewAll: { en: 'View All', hi: 'सभी देखें', mr: 'सर्व पहा' },
  quickActions: { en: 'Quick Actions', hi: 'त्वरित कार्रवाई', mr: 'त्वरीत कृती' },

  // Landing
  bankingRedefined: { en: 'Banking Redefined', hi: 'बैंकिंग की नई परिभाषा', mr: 'बँकिंगची नवीन व्याख्या' },
  heroSubtitle: { 
    en: 'Experience modern banking with VAULTEX. Secure, fast, and transparent financial services.', 
    hi: 'VAULTEX के साथ आधुनिक बैंकिंग का अनुभव करें। सुरक्षित, तेज़ और पारदर्शी वित्तीय सेवाएँ।',
    mr: 'VAULTEX सह आधुनिक बँकिंगचा अनुभव घ्या. सुरक्षित, जलद आणि पारदर्शक वित्तीय सेवा.'
  },
  openAccount: { en: 'Open Account', hi: 'खाता खोलें', mr: 'खाते उघडा' },
  login: { en: 'Login', hi: 'लॉगिन', mr: 'लॉगिन' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vaultex-lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('vaultex-lang', language);
  }, [language]);

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key].en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
