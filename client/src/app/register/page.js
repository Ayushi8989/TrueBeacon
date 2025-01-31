"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import "@/styles/form.css";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) throw new Error("Registration failed");

            alert("Registration successful");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1 className="register-title">Register</h1>
                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button label="Register" onClick={handleRegister} />
            </div>
        </div>
    );
}
