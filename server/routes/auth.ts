import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

const router = Router();

    // Registration Endpoint
router.post('/register', async (req, res) => {
  console.log('--- REGISTRATION ATTEMPT STARTED ---');
  try {
    const { 
      fullName, email, password, 
      dob, gender, phone, nationalId,
      street, city, state, zip, country,
      accountType, initialDeposit, currency, pin,
      securityQuestion, securityAnswer
    } = req.body;

    console.log(`Payload received for: ${email}`);

    if (!fullName || !email || !password) {
      console.warn('Registration failed: Missing primary fields');
      return res.status(400).json({ error: 'All primary fields (Name, Email, Password) are required.' });
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
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;
