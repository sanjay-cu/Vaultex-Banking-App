import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1: Personal
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  // Step 2: Account Security
  password: string;
  confirmPassword: string;
  pin: string;
  currency: string;
  // Step 3: Support & Terms
  securityQuestion: string;
  securityAnswer: string;
  agreeTerms: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
    pin: '',
    currency: 'INR',
    securityQuestion: '',
    securityAnswer: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [newAccount, setNewAccount] = useState<{ accountNumber: string } | null>(null);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: theme.colors.base,
    padding: '40px 20px',
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '40px',
    textAlign: 'center',
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: theme.font.heading,
    color: theme.colors.accent,
    marginBottom: '20px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 600,
    fontFamily: theme.font.heading,
    color: theme.colors.textPrimary,
    marginBottom: '8px',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.textMuted,
    fontFamily: theme.font.body,
  };

  const progressBarStyle: React.CSSProperties = {
    marginBottom: '40px',
  };

  const stepsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  };

  const stepStyle = (stepNum: number): React.CSSProperties => ({
    flex: 1,
    height: '4px',
    backgroundColor: stepNum <= currentStep ? theme.colors.accent : theme.colors.border,
    borderRadius: theme.radius.sm,
    transition: 'all 0.3s ease',
  });

  const stepCounterStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme.colors.textMuted,
    textAlign: 'center',
    fontFamily: theme.font.body,
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    padding: '40px',
    marginBottom: '24px',
  };

  const fieldsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  };

  const selectStyle: React.CSSProperties = {
    padding: '12px 16px',
    width: '100%',
    backgroundColor: theme.colors.surfaceAlt,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    color: theme.colors.textPrimary,
    fontSize: '14px',
    fontFamily: theme.font.body,
    cursor: 'pointer',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme.colors.textMuted,
    marginBottom: '6px',
    display: 'block',
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 2:
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be 8+ characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.pin || formData.pin.length !== 4) newErrors.pin = 'PIN must be 4 digits';
        break;
      case 3:
        if (!formData.securityQuestion) newErrors.securityQuestion = 'Security question is required';
        if (!formData.securityAnswer) newErrors.securityAnswer = 'Answer is required';
        if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as Step);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Registration failed');

        setNewAccount(data);
        setCurrentStep(4);
      } catch (error: any) {
        setErrors({ submit: error.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={logoStyle}>VAULTEX</div>
          <h1 style={titleStyle}>Create Account</h1>
          <p style={subtitleStyle}>
            {currentStep === 4 ? 'Success!' : `Step ${currentStep} of 3`}
          </p>
        </div>

        {currentStep < 4 && (
          <div style={progressBarStyle}>
            <div style={stepsStyle}>
              {[1, 2, 3].map((s) => (
                <div key={s} style={stepStyle(s)}></div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div style={formStyle}>
            <div style={fieldsStyle}>
              <Input
                label={t('fullName')}
                placeholder="Sanjay Choudhary"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                error={errors.fullName}
              />
              <Input
                label={t('emailAddress')}
                placeholder="sanjay@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                error={errors.email}
              />
              <Input
                label={t('phoneNumber')}
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                error={errors.phone}
              />
              <div style={rowStyle}>
                <Input
                  type="date"
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(e) => updateFormData('dob', e.target.value)}
                  error={errors.dob}
                />
                <div>
                  <label style={labelStyle}>Gender</label>
                  <select
                    style={selectStyle}
                    value={formData.gender}
                    onChange={(e) => updateFormData('gender', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div style={formStyle}>
            <div style={fieldsStyle}>
              <Input
                type="password"
                label={t('password')}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                error={errors.password}
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
              />
              <Input
                type="password"
                label="Transaction PIN (4 digits)"
                placeholder="••••"
                value={formData.pin}
                onChange={(e) => updateFormData('pin', e.target.value.slice(0, 4))}
                error={errors.pin}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div style={formStyle}>
            <div style={fieldsStyle}>
              <div>
                <label style={labelStyle}>Security Question</label>
                <select
                  style={selectStyle}
                  value={formData.securityQuestion}
                  onChange={(e) => updateFormData('securityQuestion', e.target.value)}
                >
                  <option value="">Select a question</option>
                  <option value="pet">Pet's name?</option>
                  <option value="city">Mother's birth city?</option>
                  <option value="school">First school name?</option>
                </select>
              </div>
              <Input
                label="Security Answer"
                placeholder="Your answer"
                value={formData.securityAnswer}
                onChange={(e) => updateFormData('securityAnswer', e.target.value)}
                error={errors.securityAnswer}
              />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateFormData('agreeTerms', e.target.checked)}
                />
                <label style={{ fontSize: '13px', color: theme.colors.textMuted }}>
                  I agree to the Terms & Conditions
                </label>
              </div>
              {errors.agreeTerms && <div style={{ color: theme.colors.danger, fontSize: '12px' }}>{errors.agreeTerms}</div>}
              {errors.submit && <div style={{ color: theme.colors.danger, fontSize: '14px', marginTop: '10px' }}>{errors.submit}</div>}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div style={{ ...formStyle, textAlign: 'center' }}>
            <div style={{ fontSize: '48px', color: theme.colors.success, marginBottom: '20px' }}>✓</div>
            <h2 style={{ ...titleStyle, color: theme.colors.success }}>Account Created!</h2>
            <p style={{ ...subtitleStyle, marginBottom: '24px' }}>
              Your account number is: <strong style={{ color: theme.colors.accent }}>{newAccount?.accountNumber}</strong>
            </p>
            <Button onClick={() => navigate('/login')} fullWidth>Continue to Login</Button>
          </div>
        )}

        {currentStep < 4 && (
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="secondary" onClick={handlePrev} disabled={currentStep === 1} fullWidth>
              {t('back')}
            </Button>
            <Button onClick={currentStep === 3 ? handleSubmit : handleNext} disabled={isLoading} fullWidth>
              {isLoading ? t('loading') : currentStep === 3 ? t('openAccount') : t('continue')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
