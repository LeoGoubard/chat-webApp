import React, { useEffect, useState } from 'react'
import { useChatContext } from 'stream-chat-react';

import { SearchIcon } from '../../assets';
import ResultsDropdown from './ResultsDropdown';

const ChannelSearch = ({ setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const[loading, setLoading] = useState(false);
  const[teamChannels, setTeamChannels] = useState([]);
  const[directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if(!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query])

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
          type: 'team', 
          name: { $autocomplete: text }, 
          members: { $in: [client.userID]}
      });
      const userResponse = client.queryUsers({
          id: { $ne: client.userID },
          name: { $autocomplete: text }
      })

      const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

      if(channels.length) setTeamChannels(channels);
      if(users.length) setDirectChannels(users);
    } catch (error) {
      setQuery('')
    }
  }
  const onSearch = (evt) => {
    evt.preventDefault();
    setLoading(true);
    setQuery(evt.target.value);
    getChannels(evt.target.value);
  };

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  }
  return (
    <div className="channel-search__container">
        <div className="channel-search__input__wrapper">
            <div className="channel-search__input__icon">
                <SearchIcon />
                <input
                    className="channel-search__input__text"
                    placeholder="Search"
                    type="text"
                    value={query}
                    onChange={(evt) => onSearch(evt)}    
                />
            </div>
          {query && (
            <ResultsDropdown
              teamChannels={teamChannels}
              directChannels={directChannels}
              setChannel={setChannel}
              loading={loading}
              setQuery={setQuery}
              setToggleContainer={setToggleContainer}
            />
          )}
        </div>
    </div>
  )
}

export default ChannelSearch