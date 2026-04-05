import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { theme } from '../theme';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  // Step 1
  fullName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  nationalId: string;
  // Step 2
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  // Step 3
  accountType: string;
  initialDeposit: string;
  currency: string;
  pin: string;
  // Step 4
  password: string;
  confirmPassword: string;
  securityQuestion: string;
  securityAnswer: string;
  agreeTerms: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    nationalId: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
    accountType: 'savings',
    initialDeposit: '',
    currency: 'INR',
    pin: '',
    password: '',
    confirmPassword: '',
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

  const stepStyle = (stepNum: Step): React.CSSProperties => ({
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
    backgroundColor: theme.colors.surfaceAlt,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    color: theme.colors.textPrimary,
    fontSize: '14px',
    fontFamily: theme.font.body,
    cursor: 'pointer',
  };

  const buttonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
  };

  const successSectionStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const successIconStyle: React.CSSProperties = {
    fontSize: '64px',
    marginBottom: '16px',
  };

  const successTitleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 600,
    fontFamily: theme.font.heading,
    color: theme.colors.success,
  };

  const accountNumberStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.border}`,
    padding: '16px',
    fontFamily: theme.font.number,
    fontSize: '18px',
    color: theme.colors.accent,
    letterSpacing: '2px',
    marginBottom: '16px',
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
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.nationalId) newErrors.nationalId = 'ID number is required';
        break;
      case 2:
        if (!formData.street) newErrors.street = 'Street address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zip) newErrors.zip = 'ZIP code is required';
        break;
      case 3:
        if (!formData.initialDeposit) newErrors.initialDeposit = 'Deposit amount is required';
        const deposit = parseFloat(formData.initialDeposit);
        if (isNaN(deposit) || deposit < 100)
          newErrors.initialDeposit = 'Minimum deposit is INR 100';
        if (!formData.pin || formData.pin.length !== 4)
          newErrors.pin = 'PIN must be 4 digits';
        break;
      case 4:
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.securityQuestion) newErrors.securityQuestion = 'Security question is required';
        if (!formData.securityAnswer) newErrors.securityAnswer = 'Security answer is required';
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

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create account');
        }

        setNewAccount(data);
        setCurrentStep(6);
      } catch (error: any) {
        setErrors({ submit: error.message || 'Failed to create account. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={logoStyle}>VAULTEX</div>
          <h1 style={titleStyle}>Create Account</h1>
          <p style={subtitleStyle}>
            {currentStep === 6 ? 'Account Created Successfully' : 'Join VAULTEX in 4 simple steps'}
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep !== 6 && (
          <div style={progressBarStyle}>
            <div style={stepsStyle}>
              {([1, 2, 3, 4] as const).map((step) => (
                <div key={step} style={stepStyle(step)}></div>
              ))}
            </div>
            <div style={stepCounterStyle}>
              Step {currentStep} of 4
            </div>
          </div>
        )}

        {/* Form Content */}
        {currentStep === 1 && (
          <div style={formStyle}>
            <div style={fieldsStyle}>
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                error={errors.fullName}
                required
              />
              <div style={rowStyle}>
                <Input
                  type="date"
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(e) => updateFormData('dob', e.target.value)}
                  error={errors.dob}
                  required
                />
                <div>
                  <label style={{ fontSize: '12px', color: theme.colors.textMuted }}>
                    Gender
                  </label>
                  <select
                    style={selectStyle}
                    value={formData.gender}
                    onChange={(e) => updateFormData('gender', e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <div style={{ fontSize: '12px', color: theme.colors.danger }}>
                      {errors.gender}
                    </div>
                  )}
                </div>
              </div>
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                error={errors.email}
                required
              />
              <Input
                type="tel"
                label="Phone Number"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                error={errors.phone}
                required
              />
              <Input
                label="Aadhaar/PAN Number"
                placeholder="12-digit Aadhaar or PAN"
                value={formData.nationalId}
                onChange={(e) => updateFormData('nationalId', e.target.value)}
                error={errors.nationalId}
                required
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div style={formStyle}>
            <div style={fieldsStyle}>
              <Input
                label="Street Address"
                placeholder="123 Main Street"
                value={formData.street}
                onChange={(e) => updateFormData('street', e.target.value)}
                error={errors.street}
                required
              />
              <div style={rowStyle}>
                <Input
                  label="City"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  error={errors.city}
                  required
                />
                <Input
                  label="State"
                  placeholder="Maharashtra"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  error={errors.state}
                  required
                />
              </div>
              <div style={rowStyle}>
                <Input
                  label="ZIP Code"
                  placeholder="400001"
                  value={formData.zip}
                  onChange={(e) => updateFormData('zip', e.target.value)}
                  error={errors.zip}
                  required
                />
                <div>
                  <label style={{ fontSize: '12px', color: theme.colors.textMuted }}>
                    Country
                  </label>
                  <select style={selectStyle} value={formData.country} disabled>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div style={formStyle}>
            <div style={fieldsStyle}>
              <div>
                <label style={{ fontSize: '12px', color: theme.colors.textMuted }}>
                  Account Type
                </label>
                <select
                  style={selectStyle}
                  value={formData.accountType}
                  onChange={(e) => updateFormData('accountType', e.target.value)}
                >
                  <option value="savings">Savings Account</option>
                  <option value="checking">Checking Account</option>
                  <option value="fixed_deposit">Fixed Deposit</option>
                </select>
              </div>
              <Input
                type="number"
                label="Initial Deposit Amount (INR)"
                placeholder="1000"
                value={formData.initialDeposit}
                onChange={(e) => updateFormData('initialDeposit', e.target.value)}
                error={errors.initialDeposit}
                required
              />
              <div>
                <label style={{ fontSize: '12px', color: theme.colors.textMuted }}>
                  Currency
                </label>
                <select style={selectStyle} value={formData.currency} disabled>
                  <option value="INR">Indian Rupee (INR)</option>
                </select>
              </div>
              <Input
                type="password"
                label="Transaction PIN (4 digits)"
                placeholder="••••"
                value={formData.pin}
                onChange={(e) => updateFormData('pin', e.target.value.slice(0, 4))}
                error={errors.pin}
                required
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div style={formStyle}>
            <div style={fieldsStyle}>
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                error={errors.password}
                required
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
              />
              <div>
                <label style={{ fontSize: '12px', color: theme.colors.textMuted }}>
                  Security Question
                </label>
                <select
                  style={selectStyle}
                  value={formData.securityQuestion}
                  onChange={(e) => updateFormData('securityQuestion', e.target.value)}
                >
                  <option value="">Select a question</option>
                  <option value="pet_name">What is your pet's name?</option>
                  <option value="mother_city">In what city was your mother born?</option>
                  <option value="favorite_book">What is your favorite book?</option>
                </select>
                {errors.securityQuestion && (
                  <div style={{ fontSize: '12px', color: theme.colors.danger }}>
                    {errors.securityQuestion}
                  </div>
                )}
              </div>
              <Input
                label="Security Answer"
                placeholder="Your answer"
                value={formData.securityAnswer}
                onChange={(e) => updateFormData('securityAnswer', e.target.value)}
                error={errors.securityAnswer}
                required
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: theme.colors.surfaceAlt,
                  borderRadius: theme.radius.md,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeTerms}
                  onChange={(e) => updateFormData('agreeTerms', e.target.checked)}
                  style={{ cursor: 'pointer', marginTop: '2px' }}
                />
                <label
                  htmlFor="terms"
                  style={{
                    fontSize: '13px',
                    color: theme.colors.textMuted,
                    cursor: 'pointer',
                    lineHeight: '1.5',
                  }}
                >
                  I agree to VAULTEX's Terms & Conditions and Privacy Policy. I understand that
                  my account must comply with Indian banking regulations.
                </label>
              </div>
              {errors.agreeTerms && (
                <div style={{ fontSize: '12px', color: theme.colors.danger }}>
                  {errors.agreeTerms}
                </div>
              )}
            </div>

            {errors.submit && (
              <div 
                style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  backgroundColor: theme.colors.danger + '15',
                  border: `1px solid ${theme.colors.danger}`,
                  borderRadius: theme.radius.md,
                  color: theme.colors.danger,
                  fontSize: '14px',
                  textAlign: 'center'
                }}
              >
                {errors.submit}
              </div>
            )}
          </div>
        )}

        {currentStep === 6 && (
          <div style={successSectionStyle}>
            <div style={successIconStyle}>✓</div>
            <h2 style={successTitleStyle}>Account Created Successfully!</h2>
            <div>
              <p style={{ fontSize: '14px', color: theme.colors.textMuted, marginBottom: '16px' }}>
                Your VAULTEX account has been created and is ready to use.
              </p>
              <div style={{ fontSize: '12px', color: theme.colors.textMuted, marginBottom: '16px' }}>
                Account Details:
              </div>
              <div style={accountNumberStyle}>
                AC: {newAccount?.accountNumber || '1234567890'}
              </div>
              <div style={accountNumberStyle}>
                IBAN: IN500{newAccount?.accountNumber || '0123456789'}
              </div>
            </div>
            <Button onClick={() => navigate('/login')} fullWidth>
              Go to Login
            </Button>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep !== 6 && (
          <div style={buttonsStyle}>
            <Button
              variant="secondary"
              onClick={handlePrev}
              disabled={currentStep === 1}
              fullWidth
            >
              Previous
            </Button>
            <Button
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? 'Processing...' : currentStep === 4 ? 'Create Account' : 'Next'}
            </Button>
          </div>
        )}

        {currentStep === 6 && (
          <div style={buttonsStyle}>
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              fullWidth
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
