
'use client'
import Link from 'next/link'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import  axios  from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log('Login Success', response.data);

            if (response.data.success) {
                router.push("/profile");
            }
        } catch (error) {
            console.error(error);
            console.log("Error logging in");
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        setButtonDisabled(user.email.length === 0 || user.password.length === 0);
    }, [ user])
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
    <nav className="absolute top-0 left-0 w-full flex justify-between p-4">
        <div className="text-lg font-bold">OAuth</div>
        <div className="flex space-x-4">
            <Link href="/signup" className="py-2 px-4 bg-white text-black rounded-md">Sign up</Link>
            <Link href="/login" className="py-2 px-4 bg-white text-black rounded-md">Log in</Link>
        </div>
    </nav>
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-md">
        <h1 className="text-2xl font-bold mb-8 text-center">loading ? {loading ? "Authenticating" : "Login"}</h1>
        <label htmlFor="email" className="block mb-2">Email</label>
        <input
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
        />
        <label htmlFor="password" className="block mb-2">Password</label>
        <input
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
        />
        <button
            className="w-full p-2 mb-4 bg-white text-black rounded-md hover:bg-gray-300 focus:outline-none"
            onClick={onLogin}
        >
            Login
        </button>
        <p className="text-center">
            Don&apos;t have an account? <Link href="/signup" className="text-blue-400">Sign up</Link>
        </p>
    </div>
</div>
);
}