import React, { useEffect, useState } from 'react'
import { useChatContext } from 'stream-chat-react';

import { SearchIcon } from '../../assets';

const ChannelSearch = () => {
  const [query, setQuery] = useState('');
  const[loading, setLoading] = useState(false);

  const getChannels = async (text) => {
    try {
      // TODO: fetch channels
    } catch (error) {
      setQuery('');
      console.log(error)
    }
  }

  const onSearch = (evt) => {
    evt.preventDefault();
    setLoading(true);
    setQuery(evt.target.value);
    getChannels(evt.target.value);
  };

  return (
    <div className="channel-search__container">
        <div className="channel-search__input__wrapper">
            <div className="channel-search__input__icon">
                <SearchIcon />
                <input
                    className="channel-search__input__text"
                    placeholder="Searchh"
                    type="text"
                    value={query}
                    onChange={(evt) => onSearch(evt)}    
                />
            </div>

        </div>
    </div>
  )
}

export default ChannelSearch