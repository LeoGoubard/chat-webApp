import React, { useState} from 'react'
import { Avatar } from 'stream-chat-react';
import { InviteIcon } from '../../../assets';

const UserITem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if(selected) {
      setSelectedUsers((prevUSers) => prevUSers.filter((prevUser) => prevUser !== user.id));
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id])
    }
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <div className="user-item__wrapper" onClick={() => handleSelect()}>
      <div className="user-item__name-wrapper">
          <Avatar
            image={user.image || "https://bibliosud.omekas.mind-and-go.net/files/large/c1484806f4c7a25e189dea862adbd9a6fc20b2d3.jpg"}
            name={user.fullName || user.id}
            size={32}
          />
          <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

export default UserITem;