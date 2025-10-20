import { useEffect, useState } from "react";

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const userId = "6714df9bc8b3c0aab1234567"; // Replace with your MongoDB ObjectId

    // ✅ Fetch user data
    useEffect(() => {
        fetch(`http://localhost:5000/api/admin/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        setEditMode(false);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });
            const data = await res.json();
            setMessage(data.message);
        } catch (err) {
            setMessage("Error updating password");
        }
    };


    if (!user)
        return (
            <div className="flex justify-center items-center text-gray-600">
                Loading user data...
            </div>
        );
    return (
        <>
            <div className="flex gap-2 mt-4">
                <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            User Profile
                        </h2>
                    </div>
                    {/* 🔹 User Profile Section */}
                    <div className="flex flex-col items-center">
                        <img
                            src={user.avatar || "https://www.w3schools.com/howto/img_avatar.png"}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full border-4 border-indigo-500"
                        />
                        <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </div>

                    <hr className="my-4 border-gray-200" />

                    <div className="space-y-3">
                        {["phone", "address", "bio"].map((field) => (
                            <div key={field}>
                                <label className="text-gray-600 capitalize">{field}</label>
                                {editMode ? (
                                    <input
                                        name={field}
                                        value={user[field] || ""}
                                        onChange={handleChange}
                                        className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <p className="text-gray-800">{user[field]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        {editMode ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
                    {/* 🔹 Forgot Password Section */}
                    <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            required
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Update Password
                        </button>

                        {message && (
                            <p className="text-center text-sm text-green-600 mt-4">{message}</p>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserProfile