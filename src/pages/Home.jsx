import React from 'react';
import ChatBox from '../components/ChatBox';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">ResumeIQ AI Assistant</h1>
      <ChatBox />
    </div>
  );
};

export default Home;
