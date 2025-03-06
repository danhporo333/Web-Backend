
import Header from './components/layout/admin/header';
import Footer from './components/layout/admin/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.service';
import { useEffect, useContext } from 'react';
import { AuthContext } from './components/context/auth.context';

const App = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    // await delay(3000)
    if (res.data) {
      setUser(res.data.user);
      console.log(">>check user data: ", res.data.user)
    }
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
