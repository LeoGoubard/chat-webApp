import React, { useEffect, useState } from 'react'
import { useChatContext } from 'stream-chat-react';

import UserITem from './UserITem';


const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  )
}

const UserList = ({
  setSelectedUsers,
}) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID },
            role: {$ne: 'admin'},
          },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          console.log(response.users);
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }

    if(client) getUsers();
  }, [])

  if(error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    )
  }
  if(listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">
          No users found.
        </div>
      </ListContainer>
    )
  }
  return (
    <ListContainer>
      {loading ? <div className="user-list__message">
        Loading users...
      </div> : (
        users.map((userItem, i) => (
          <UserITem
            index={i}
            key={userItem.id}
            user={userItem}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  )
}

export default UserList;