import Header from './components/layout/admin/header';
import Footer from './components/layout/admin/footer';
import { Outlet, useLocation } from 'react-router-dom';
import { getAccountAPI } from './services/api.service';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from './components/context/auth.context';
import { Spin } from 'antd';

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  const [current, setCurrent] = useState('home');
  const location = useLocation();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setCurrent('home');
    }
  }, [location]);

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  }

  return (
    <>
      {isAppLoading === true ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin />
        </div>
        :
        <>
          <Header current={current} setCurrent={setCurrent} />
          <Outlet />
          <Footer />
        </>
      }
    </>
  )
}

export default App;