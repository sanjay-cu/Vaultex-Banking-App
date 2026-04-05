import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

const router = Router();

// Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    const { 
      fullName, email, password, 
      dob, gender, phone, nationalId,
      street, city, state, zip, country,
      accountType, initialDeposit, currency, pin,
      securityQuestion, securityAnswer
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'All primary fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists! Try logging in.' });
    }

    // Generate dummy account number
    const accountNumber = `AC${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;

    // Hash password and PIN
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = pin ? await bcrypt.hash(pin, 10) : undefined;

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
      initialDeposit: initialDeposit ? parseFloat(initialDeposit) : 0,
      currency,
      pin: hashedPin,
      securityQuestion,
      securityAnswer
    });

    await newUser.save();

    res.json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      accountNumber: newUser.accountNumber,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create user' });
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
