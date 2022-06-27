import React from 'react';
// import { ChannelList, useChatContext } from 'stream-chat-react';
// import Cookies from 'universal-cookie';
// import { ChannelSearch, TeamChannelList, TeamChannelPreview } from '../';
import SideBar from './SideBar';
import CompanyHeader from './CompanyHeader';

const ChanelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
      </div>
    </>
  )
}

export default ChanelListContainer;