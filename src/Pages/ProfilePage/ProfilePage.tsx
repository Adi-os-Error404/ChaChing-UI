import React, { useEffect, useState } from 'react';
import Spinner from '../../Components/Spinner/Spinner';
import { useAuth } from '../../Context/useAuth';
import { updateUserFirstLastNameAPI } from '../../Services/AuthService';
import { toast } from 'react-toastify';

type Props = {}

const ProfilePage = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const { userDetails, getUserDetails, updateUserFirstLastName, updatePassword, deleteUserAccount } = useAuth();
    const [firstName, setFirstName] = useState(userDetails?.firstName || "");
    const [lastName, setLastName] = useState(userDetails?.lastName || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [deletePassword, setDeletePassword] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            await getUserDetails();
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="max-w-3xl mx-auto mt-20 px-6 space-y-15 my-10">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">👤 Profile Information</h1>
                {userDetails ? (
                    <div className="space-y-6 text-lg">
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">ID:</span>
                            <span className="text-gray-900">{userDetails.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Name:</span>
                            <span className="text-gray-900">{userDetails.firstName} {userDetails.lastName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Username:</span>
                            <span className="text-gray-900">{userDetails.username}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">Email:</span>
                            <span className="text-gray-900">{userDetails.email}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">User data not found.</p>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">✏️ Change Name</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full h-12 bg-stone-100 rounded-lg font-semibold border-solid px-6  border-black border-4"
                            placeholder={userDetails?.firstName}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full h-12 bg-stone-100 rounded-lg font-semibold border-solid px-6  border-black border-4"
                            placeholder={userDetails?.lastName}
                        />
                    </div>
                    <button
                        onClick={() => updateUserFirstLastName(firstName, lastName)}
                        className="w-full mt-2 py-2 bg-blue-400 text-white font-bold rounded-lg"
                    >
                        Update Name
                    </button>
                </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">🔐 Change Password</h2>
                <div className="space-y-4">
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full h-12 bg-stone-100 rounded-lg font-semibold border-solid px-6 border-black border-4"
                        placeholder="Enter current password"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-12 bg-stone-100 rounded-lg font-semibold border-solid px-6 border-black border-4"
                        placeholder="Enter new password"
                    />
                    <button
                        onClick={
                            async () => {
                                if (!currentPassword.trim() || !newPassword.trim()) {
                                    toast.error("Both fields are required");
                                    return;
                                }
                                try {
                                    await updatePassword(currentPassword, newPassword);
                                    setCurrentPassword("");
                                    setNewPassword("");
                                } catch (err) {
                                    toast.error("Failed to update password");
                                }
                            }
                        }
                        className="w-full mt-2 py-2 bg-blue-400 text-white font-bold rounded-lg"
                    >
                        Update Password
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🗑️ Delete Account</h2>
                <p className="text-red-500 mb-4 font-semibold">
                Warning: This action is irreversible. Deleting your account will remove all associated data.
                </p>
                <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full h-12 bg-stone-100 rounded-lg font-semibold border-solid px-6 border-black border-4 mb-4"
                    placeholder="Enter your password to confirm"
                />
                <button
                    onClick={async () => {
                        if (!deletePassword.trim()) {
                            toast.error("Password is required to delete your account.");
                            return;
                        }

                        if (!userDetails?.username) {
                            toast.error("Could not find your username.");
                            return;
                        }

                        await deleteUserAccount(userDetails.username, deletePassword);
                    }}
                    className="w-full py-2 bg-rose-400 hover:bg-red-500 text-white font-bold rounded-lg"
                >
                    Delete My Account
                </button>
            </div>


            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔒 Change Email</h2>
                <p className="text-gray-600">Coming soon: Change your account email securely.</p>
            </div>
        </div>
    );
};

export default ProfilePage
