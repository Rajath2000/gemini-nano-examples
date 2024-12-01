import React, { useState, useEffect } from 'react';
import GeminiNano from "gemini-nano-prompt";

export default function GeminiSupport({ children }) {

    let [isGeminiReady, setIsGeminiReady] = useState()

    useEffect(() => {
        async function start() {
            let geminiNano = new GeminiNano();
            let isReady = await geminiNano?.checkEnv()
            setIsGeminiReady(isReady)
        }
        start()
    }, []);


    if (isGeminiReady) {
        return <>
                {children}
                </>
    }

    return (
        <>
            <div>Gemini Not Ready please check console and do nessery / or refer
                <a href='https://medium.com/@akashtdev/chromes-gemini-nano-and-window-ai-for-offline-ai-28231a716c0b'> Refer Set up Document</a>
            </div>
        </>
    )
}
