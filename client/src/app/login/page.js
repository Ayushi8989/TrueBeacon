"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import "@/styles/form.css"; 

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error("Login failed");

            alert("Login successful");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
            <h1 className="login-title">Login</h1>
                <InputField
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button label="Login" onClick={handleLogin} />
            </div>
        </div>
    );
}
