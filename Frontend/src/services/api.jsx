let sessionId = sessionStorage.getItem("chat_session_id") || null;

export const sendMessageToAPI = async (question) => {
    try {
        const response = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, session_id: sessionId }),
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        sessionId = data.session_id;
        sessionStorage.setItem("chat_session_id", sessionId);

        return data.answer;
    } catch (error) {
        throw new Error("Error connecting to server");
    }
};