"use client"

import { useAuth } from "@/components/authProvider"

// const LOGIN_URL = "http://localhost:8004/api/token/pair"
const LOGIN_URL = "/api/login/"

export default function Page() {
    const auth = useAuth()

    async function handleSubmit(event) {
        event.preventDefault()


        // 1. instead of fetch one field at a time, just take all at once
        const formData = new FormData(event.target);

        // 2. convert form to object
        const objectFromForm = Object.fromEntries(formData)

        // 3. Stringify that object
        const jsonData = JSON.stringify(objectFromForm)

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }
        const response = await fetch(LOGIN_URL, requestOptions);

        if (response.ok) {
            auth.login()
        }
    }

    return (
        <div className="h-[95vh]">
            <div className="max-w-md mx-auto py-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Your name" />
                    <input type="password" name="password" placeholder="Password" />

                    <button type="submit">Login</button>
                </form>
            </div>
            <h1>Login Here</h1>
        </div>
    )
}   