
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: "Hello! I'm your personal AI Assistant Doctor.", timestamp: '10:25' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(!!input.trim());
  }, [input]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { type: 'user', content: input.trim(), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([...messages, newMessage]);
      setInput('');
      setIsLoading(true);

      setTimeout(() => {
        const botResponse = { type: 'bot', content: "I'm here to help!", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleFileUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const newMessage = {
            type: 'user',
            content: reader.result, // Base64 encoded image data
            isImage: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
  
          setTimeout(() => {
            const botResponse = {
              type: 'bot',
              content: "Image received! What would you like me to do with this?",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
          }, 1500);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };
  

  const handleAudioRecord = () => {
    console.log('Audio recording started...');
  };

  return (
    <>
      <Head>
        <title>Chatbot</title>
      </Head>
      <div className="flex flex-col h-screen font-sans bg-gray-100">
        <header className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-teal-500 to-green-400 text-gray-800">
          <h1 className="text-lg font-bold">T4T: AI Doctor 🤖</h1>
          <button className="focus:outline-none">
            <img src="/settings.svg" alt="Settings" className="w-6 h-6" />
          </button>
        </header>

        <main className="flex flex-col flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col flex-1 mb-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'bot' ? '' : 'flex-row-reverse'} items-start space-x-2`}>
                <span className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {message.type === 'bot' ? 'SL' : 'U'}
                </span>
                <div className={`max-w-xs px-4 py-2 rounded-3xl shadow ${message.type === 'user' ? 'bg-gradient-to-r from-teal-500 to-green-400 text-white' : 'bg-gray-200'}`}>
                {message.isImage ? (
                  <img src={message.content} alt="Uploaded content" className="rounded-lg max-w-full" />
                ) : (
                  <p>{message.content}</p>
                  )}
                   <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">SL</span>
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 sticky bottom-0">
            <button className="p-2 bg-gray-200 rounded-full focus:outline-none" onClick={handleFileUpload}>
              <img src="/attachfile.svg" alt="Attach File" className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-gray-200 rounded-full focus:outline-none"
              onMouseDown={handleAudioRecord}
              onMouseUp={() => console.log('Audio recording stopped.')}
            >
              <img src="/mic.svg" alt="Record Audio" className="w-5 h-5" />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Take a follow-up on your health by asking queries..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring focus:ring-teal-400"
              />
              {isTyping && (
                <div className="absolute right-4 top-2 flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                </div>
              )}
            </div>
            <button
              className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-3xl hover:bg-blue-600 focus:outline-none"
              onClick={handleSend}
            >
              Send
              <img src="/sendtext.svg" alt="Send" className="w-5 h-5 ml-2" />
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Chatbot;

