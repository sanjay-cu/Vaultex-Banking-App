import { Router } from 'express';
import { User } from '../models/User';
import { Transaction } from '../models/Transaction';
import bcrypt from 'bcryptjs';

const router = Router();

    // Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    console.log('--- REGISTRATION ATTEMPT STARTED ---');
    console.log('Headers:', JSON.stringify(req.headers));
    console.log('Body type:', typeof req.body);
    console.log('Body keys:', Object.keys(req.body || {}));

    const { 
      fullName, email, password, 
      dob, gender, phone, nationalId,
      street, city, state, zip, country,
      accountType, initialDeposit, currency, pin,
      securityQuestion, securityAnswer
    } = req.body || {};

    console.log(`Payload received for: ${email || 'UNKNOWN'}`);

    if (!fullName || !email || !password) {
      console.warn('Registration failed: Missing primary fields');
      return res.status(400).json({ 
        error: 'All primary fields (Name, Email, Password) are required.',
        debug: {
          receivedEmail: !!email,
          receivedName: !!fullName,
          receivedPassword: !!password,
          bodyPresent: !!req.body && Object.keys(req.body).length > 0
        }
      });
    }

    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`Registration failed: User ${email} already exists`);
      return res.status(400).json({ error: 'Email already exists! Try logging in.' });
    }

    // Generate dummy account number
    const accountNumber = `AC${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
    console.log(`Generated account number: ${accountNumber}`);

    // Hash password and PIN
    console.log('Hashing password and PIN...');
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = pin ? await bcrypt.hash(pin, 10) : undefined;
    console.log('Hashing completed');

    // Safely parse initialDeposit
    let numericDeposit = 0;
    if (initialDeposit) {
      const parsed = parseFloat(initialDeposit);
      numericDeposit = isNaN(parsed) ? 0 : parsed;
    }

    console.log('Creating new user model instance...');
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      accountNumber,
      dob,
      gender,
      phone,
      nationalId,
      street,
      city,
      state,
      zip,
      country,
      accountType,
      initialDeposit: numericDeposit,
      currency,
      pin: hashedPin,
      securityQuestion,
      securityAnswer
    });

    console.log('Attempting to save user to database...');
    try {
      await newUser.save();
      console.log('User saved successfully to DB');

      // Create initial deposit transaction if amount > 0
      if (numericDeposit > 0) {
        console.log('Creating initial deposit transaction...');
        const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const formatCurrencyStr = (num: number) => `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const initialTx = new Transaction({
          userId: newUser._id,
          date: today,
          ref: `TXN${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
          type: 'Deposit',
          description: 'Initial Deposit',
          amount: formatCurrencyStr(numericDeposit),
          numericAmount: numericDeposit,
          status: '✓',
          numericBalance: numericDeposit,
        });
        await initialTx.save();
        console.log('Initial transaction record created');
      }
    } catch (saveError: any) {
      console.error('DATABASE SAVE ERROR:', saveError);
      if (saveError.code === 11000) {
        return res.status(400).json({ error: 'Email already exists', message: 'An account with this email already exists.' });
      }
      throw saveError;
    }

    console.log('Sending success response');
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      accountNumber: newUser.accountNumber,
      kycStatus: newUser.kycStatus,
      message: 'Account created successfully'
    });
    console.log('--- REGISTRATION SUCCESSFUL ---');
  } catch (error: any) {
    console.error('REGISTRATION CATASTROPHIC FAILURE:', error);
    res.status(500).json({ 
      error: 'Failed to create user account', 
      message: error.message || 'Unknown server error',
      details: error.name
    });
  }
});

// Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      accountNumber: user.accountNumber,
      kycStatus: user.kycStatus || 'not_started',
      kycLastCompletedAt: user.kycLastCompletedAt,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// KYC Completion Endpoint
router.post('/kyc', async (req, res) => {
  try {
    const { 
      userId, 
      street, city, state, zip, 
      nationalId, occupation, incomeGroup 
    } = req.body;

    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.street = street;
    user.city = city;
    user.state = state;
    user.zip = zip;
    user.nationalId = nationalId;
    user.occupation = occupation;
    user.incomeGroup = incomeGroup;
    user.kycStatus = 'completed'; // For demo, auto-complete
    user.kycLastCompletedAt = new Date();

    await user.save();

    res.json({
      success: true,
      kycStatus: user.kycStatus,
      kycLastCompletedAt: user.kycLastCompletedAt,
      message: 'KYC completed successfully'
    });
  } catch (error: any) {
    console.error('KYC error:', error);
    res.status(500).json({ error: 'Failed to update KYC' });
  }
});

// PIN Verification Endpoint
router.post('/verify-pin', async (req, res) => {
  try {
    const { userId, pin } = req.body;
    if (!userId || !pin) return res.status(400).json({ error: 'User ID and PIN are required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // If user has no PIN set, for demo purposes we might allow 1234 or fail
    if (!user.pin) {
       return res.status(400).json({ error: 'No PIN set for this account' });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect PIN' });
    }

    res.json({ success: true, message: 'PIN verified' });
  } catch (error) {
    console.error('PIN verification error:', error);
    res.status(500).json({ error: 'Server error during PIN verification' });
  }
});

export default router;
