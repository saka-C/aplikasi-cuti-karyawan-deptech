import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminPage = () => {

  return (
    <>
        <Sidebar>
          <Outlet />
        </Sidebar>
    </>
  );
};

export default AdminPage;
