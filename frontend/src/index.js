import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import './assets/styles/global.css';

import App from './App';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import HomeScreen from './screens/HomeScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import RoomScreen from './screens/RoomScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

import RoomListScreen from './screens/admin/RoomListScreen';
import RoomEditScreen from './screens/admin/RoomEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import BookingListScreen from './screens/admin/BookingListScreen';
import BookingEditScreen from './screens/admin/BookingEditScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import BookingDetailsScreen from './screens/BookingDetailScreen';
import BookingSuccessScreen from './screens/BookingSuccessScreen';
import BookingCancelScreen from './screens/admin/BookingCancelScreen';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}> 
      
      <Route index element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/room/:id' element={<RoomScreen />} />
      <Route path="/search" element={<SearchResultsScreen />} />

      <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path="/mybookings" element={<MyBookingsScreen />} />
      <Route path='/booking/:id' element={<BookingDetailsScreen />} />

      <Route path='/booking/success' element={<BookingSuccessScreen />} />
      <Route path='/booking/cancel' element={<BookingCancelScreen />} />
      </Route>


      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/roomlist' element={<RoomListScreen />} />
        <Route path='/admin/roomlist/:pageNumber' element={<RoomListScreen />} />
        <Route path='/admin/room/:id/edit' element={<RoomEditScreen />} />
        <Route path="/admin/bookinglist" element={<BookingListScreen />} />
        <Route path="/admin/booking/:id/edit" element={<BookingEditScreen />} />


        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>

      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
