"use client"

import next from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { createContext, useContext, useState, useEffect } = require("react");

const LOGIN_REDIRECT_URL = '/'
const LOGOUT_REDIRECT_URL = '/login'
const LOGIN_REQUIRED_URL = '/login'

const LOCAL_STORAGE_KEY = "is-logged-in"
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedAuthStatus) {
            const storedAuthStatusInt = parseInt(storedAuthStatus);

            setIsAuthenticated(storedAuthStatusInt === 1)
        }
    }, [])

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem(LOCAL_STORAGE_KEY, "1")
        const nextUrl = searchParams.get('next')
        const invalidNextUrl = ['/login', '/logout']
        const nextUrlValid = nextUrl && nextUrl.startsWith('/') && !invalidNextUrl.includes(nextUrl)
        if (nextUrlValid) {
            router.replace(nextUrl)
        } else {
            router.replace(LOGIN_REDIRECT_URL)
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        router.replace(LOGOUT_REDIRECT_URL)
    }

    const loginRequiredRedirect = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0")
        const loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`

        if (LOGIN_REQUIRED_URL === pathname) {
            const loginWithNextUrl = `${LOGIN_REQUIRED_URL}`
        }

        router.replace(loginWithNextUrl)
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, logout, loginRequiredRedirect }}>
        {children}
    </AuthContext.Provider>

}

export function useAuth() {
    return useContext(AuthContext)
}
