import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const SearchResult = ({ channel, focusedId, type, setChannel, setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();

  
  const channelByUser = async ({ client, setActiveChannel, channel, setChannel }) => {
    const filters = {
      type: 'messaging',
      member_count: 2,
      members: { $eq: [client.user.id, client.userID] },
    };
  
    const [existingChannel] = await client.queryChannels(filters);
  
    if (existingChannel) return setActiveChannel(existingChannel);
  
    const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });
    
    setChannel(newChannel)
  
    return setActiveChannel(newChannel);
  };

  if (type === 'channel') {
    return (
      <div
        onClick={() => {
          setChannel(channel)
          if(setToggleContainer) {
            setToggleContainer((prevState) => !prevState)   
          }
        }}
        className={focusedId === channel.id ? 'channel-search__result-container__focused' : 'channel-search__result-container' }
      >
        <div className='result-hashtag'>#</div>
        <p className='channel-search__result-text'>{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel })
        if(setToggleContainer) {
            setToggleContainer((prevState) => !prevState)   
        }
      }}
      className={focusedId === channel.id ? 'channel-search__result-container__focused' : 'channel-search__result-container' }
    >
      <div className='channel-search__result-user'>
        <Avatar image={channel.image || undefined} name={channel.name} size={24} />
        <p className='channel-search__result-text'>{channel.name}</p>
      </div>
    </div>
  );
};

export default SearchResult;