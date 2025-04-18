import React, { useEffect, useState } from 'react'
import Spinner from '../../Components/Spinner/Spinner';
import { useAuth } from '../../Context/useAuth';
import { UserDetails } from '../../Models/User';
import { getUserDetailsAPI } from '../../Services/AuthService';

type Props = {}

const ProfilePage = (props: Props) => {

    const [loading, setLoading] = useState(true);
    const { userDetails, getUserDetails } = useAuth();
    
    useEffect(() => {
        const fetchUser = async () => {
            await getUserDetails();
            setLoading(false);
        };
        fetchUser();
    }, []);
    

    if (loading) return <Spinner />;
    return (
        <div>
            <h1>Profile Page</h1>
            {userDetails ? (
                <div>
                    <p><strong>Name:</strong> {userDetails?.firstName} {userDetails?.lastName}</p>
                    <p><strong>Username:</strong> {userDetails?.username}</p>
                    <p><strong>Email:</strong> {userDetails?.email}</p>
                </div>
            ) : (
                <p>User data not found.</p>
            )}
        </div>
    )
}

export default ProfilePage