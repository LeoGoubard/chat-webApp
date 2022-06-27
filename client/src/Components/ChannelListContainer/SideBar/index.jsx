import React from 'react';
import HospitalIcon from '../../../assets/hospital.png';

import LogoutIcon from '../../../assets/logout.png';

const SideBar = () => (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={HospitalIcon} alt="Hospital" width="30" />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner">
          <img src={LogoutIcon} alt="Logout" width="30" />
        </div>
      </div>
    </div>
  );
  export default SideBar;