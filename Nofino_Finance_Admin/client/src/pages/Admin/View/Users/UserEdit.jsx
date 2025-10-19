
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../store/auth";
import { toast } from 'react-toastify';

const UserEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { AuthorizationToken } = useAuth();
    const [data, setData] = useState({ username: "", email: "", phone: "" });


    const handleChange = e => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const URL = `${import.meta.env.VITE_API_URL}/api/admin/users/update/${params.id}`;
            const response = await fetch(URL, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: AuthorizationToken,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("User updated successfully!");
                navigate("/admin/users");
            } else {
                toast.error("Update failed!.. plc try");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    // fatch the data
    const getOneUsersData = async () => {
        try {
        const URL = `${import.meta.env.VITE_API_URL}/api/admin/users/${params.id}`;
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    Authorization: AuthorizationToken,
                },
            });

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        getOneUsersData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    placeholder="username"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default UserEdit