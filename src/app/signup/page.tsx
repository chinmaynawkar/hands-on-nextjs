
'use client'
import Link from 'next/link'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import  axios from "axios";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
      username: '',
      email: '',
      password: '',
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log('Signup Success', response.data);

        if (response.data.success) {
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
        console.log("Error signing up");
      } finally {
        setLoading(false);
      }

    }

    useEffect(() => {
        setButtonDisabled(user.username.length === 0 || 
          user.email.length === 0 || user.password.length === 0);
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
        <h1 className="text-2xl font-bold mb-8 text-center">Sign up</h1>
        <label htmlFor="username" className="block mb-2">Username</label>
        <input
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
            id="username"
            type="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
        />
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
            onClick={onSignup}
        >
                {buttonDisabled ? "Cannot be empty" : "Sign up"}
        </button>
        <p className="text-center">
            Already have an account? <Link href="/login" className="text-blue-400">Log in</Link>
        </p>
    </div>
</div> 
  );
}