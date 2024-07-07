import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
            <nav className="absolute top-0 left-0 w-full flex justify-between p-4">
                <div className="text-lg font-bold">Profile</div>
                <div className="flex space-x-4">
                    <Link href="/signup" className="py-2 px-4 bg-white text-black rounded-md">Sign up</Link>
                    <Link href="/login" className="py-2 px-4 bg-white text-black rounded-md">Log in</Link>
                </div>
            </nav>
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-md">
                <h1 className="text-2xl font-bold mb-8 text-center">Profile</h1>
                <p className="text-center">
                    <Link href="/signup" className="text-blue-400">Sign up</Link>
                </p>
            </div>
        </div>
    );
}