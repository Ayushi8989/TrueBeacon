"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerNewUser } from "@/lib/api";

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Link from "next/link";

import './page.css';

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await registerNewUser(username, email, password);
            console.log(response.success)
            if ( response.success === false) {
                alert(response.message.message);
            } else {
                router.push("/login");
            }
        } catch (error) {
            console.log("Error: ", error)
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button label="Register" onClick={handleRegister} />
                <div className="go-to-login">
                    <h5>Already a user? </h5>
                    <Link href="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}
