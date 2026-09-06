import React from 'react'

function ChatHeader() {
  return (
    <div className='card-header bg-primary text-white text-center py-3 rounded-top-4 shadow-sm'>
        <h3 className='mb-0'>AI Student Assistant</h3>
        <small>Powered by FastAPI, Chroma DB & Qwen</small>
    </div>
  )
}

export default ChatHeader