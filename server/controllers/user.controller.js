import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database.js';

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by username
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            // Generate JWT Token
            const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            res.json({ message: "Login successful", token });
        });
    });
};

const userRegister = async (req, res) =>{
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.run(query, [username, email, hashedPassword], function (err) {
            if (err) {
                return res.status(400).json({ message: "User already exists" });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    });
};

export {userLogin, userRegister};