export const sendMessageToAPI = async (question) =>{
    
    try{
        const response = await fetch("http://localhost:8000/chat",{
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({ question: question }),
        });

        const data = await response.json();
        return data.answer;
    }catch(error){
        throw new Error("Error connecting to server")
    }
};