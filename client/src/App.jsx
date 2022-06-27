import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
// import Cookies from 'universal-cookie';
import { ChannelContainer, ChannelListContainer } from './Components';

import './App.css';

const App = () => {
  const apiKey = 'vz9mj29m6kqp';
  const client  = StreamChat.getInstance(apiKey);

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
