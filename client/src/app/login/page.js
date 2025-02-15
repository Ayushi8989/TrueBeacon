"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { loginHandler } from "@/lib/api";
import Link from "next/link";
import './page.css';

export default function LoginPage() {
    const router = useRouter(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            const response = await loginHandler(username, password);

            console.log(23, response)
            if (response.success == false) {
                throw new Error(response.message || "Login failed");
            }else{
                router.push("/dashboard");
            }

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
                <div className="go-to-login">
                <h5>New user? </h5>
                <Link href="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}
