import React from "react";

interface ErrorMeassageProps {
    error: string
}

export function ErrorMeassage({error}: ErrorMeassageProps) {
    return (
        <p className='text-center text-red-600' >{error}</p>
    )
}