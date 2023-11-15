import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

class UserController {
  async registerUser(req: Request, res: Response) {
    const { username, password, roles } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword, roles });
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const secretKey = process.env.SECRET_KEY as Secret;

      if (!secretKey) {
        return res.status(500).json({ message: 'Internal Server Error. JWT secret key is not defined.' });
      }

      const token = jwt.sign({ username, roles: user.roles }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new UserController();
