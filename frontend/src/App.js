import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import bg from './assets/images/9721900-minimalist-cat-wallpaper.png';

const FULL_PAGE_ROUTES = ['/', '/search', '/login', '/register', '/profile'];

const App = () => {
  const { pathname } = useLocation();
  const isFullPage = FULL_PAGE_ROUTES.includes(pathname);

  return (
    <>
      <Header />
      <main className={isFullPage ? '' : 'page-wrapper'}>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
};

export default App;