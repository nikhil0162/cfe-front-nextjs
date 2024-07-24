"use server"

import { getRrefreshToken, getToken, setToken, setRefreshToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const DJANGO_API_LOGIN_URL = "http://localhost:8004/api/token/pair"

export async function POST(request) {
    const requestData = await request.json()

    // 3. Stringify that object
    const jsonData = JSON.stringify(requestData)

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    }

    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
    const responseData = await response.json();

    if (response.ok) {
        const { access, refresh } = responseData

        setToken(access)
        setRefreshToken(refresh)

        return NextResponse.json({ "loggedIn": true }, { status: 200 })
    }

    return NextResponse.json({ "loggedIn": false, ...responseData }, { status: 400 })
}
