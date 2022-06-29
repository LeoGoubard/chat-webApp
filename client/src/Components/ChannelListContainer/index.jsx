import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from '../';
import SideBar from './SideBar';
import CompanyHeader from './CompanyHeader';
import { initialState } from 'stream-chat-react/dist/components/Channel/channelState';

const cookies = new Cookies();

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const Logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('userName');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } };

  const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
  }
  const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
  }

  return (
    <>
      <SideBar Logout={Logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              iscreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              iscreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  )
}

const ChanelListContainer = ({ setCreateType, setIsCreating, isCreating,  setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
    <div className="channel-list__container">
      <ChannelListContent
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
      />
    </div>
    <div className="channel-list__container-responsive"
      style={{ left: toggleContainer ? '0%': '-89%', backgroundColor: '#005fff' }}
    >
      <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggle) => !prevToggle)}>
      </div>
      <ChannelListContent
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}
      />
    </div>
    </>
  )
}

export default ChanelListContainer;