import { Fragment } from 'react';

import MainHeader from './MainHeader';
import Notification from '../Notification/Notification';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  const notification = useSelector(state => state.ui.notification);
  return (
    <Fragment>
      {notification && 
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      }
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
