'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext({
    user: null,
    loading: true,
    login: async () => { },
    signup: async () => { },
    logout: async () => { },
    googleLogin: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const fetchMe = useCallback(async () => {
        try {
            const res = await api.get('/api/auth/me');
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    const login = async (credentials) => {
        try {
            // Backend expects 'identifier' (username or email) and 'password'
            const payload = {
                identifier: credentials.email || credentials.username,
                password: credentials.password
            };
            const response = await api.post('/api/auth/login', payload);
            await fetchMe();
            router.push('/dashboard');
        } catch (err) {
            throw err.response?.data?.error || 'Login failed';
        }
    };

    const signup = async (userData) => {
        try {
            await api.post('/api/auth/signup', userData);
            await fetchMe();
            router.push('/dashboard');
        } catch (err) {
            throw err.response?.data?.error || 'Signup failed';
        }
    };

    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
            setUser(null);
            router.push('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    const googleLogin = async (tokenId) => {
        try {
            console.log('🔵 [Frontend] Starting Google login');

            const response = await api.post('/api/auth/google', { tokenId });
            console.log('✅ [Frontend] Google login response:', response.data);

            await fetchMe();

            // Check for staff role and redirect accordingly
            const user = response.data?.user; // Note: authController login returns { user, accessToken }, ensure googleCallback does too.
            // Wait, fetchMe updates the 'user' state, but due to closure capture/async, 'user' state might not be updated immediately in this scope.
            // The backend googleCallback now returns { message, ...tokens, user: profile }.
            // Let's use the response data for immediate redirection decision.

            if (user?.clinicSlug) {
                router.push(`/staff/${user.clinicSlug}`);
            } else {
                router.push('/dashboard');
            }

        } catch (err) {
            console.error('❌ [Frontend] Google login error:', err);
            throw err.response?.data?.error || 'Google login failed';
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                updateUser,
                googleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
