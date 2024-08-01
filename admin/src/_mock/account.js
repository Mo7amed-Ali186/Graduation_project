// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtDecode } from 'jwt-decode';
// eslint-disable-next-line no-debugger
 

const account = {
  displayName: 'temp',
  email: 'temp',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};

const token = localStorage.getItem('userToken');
if (token !== null) {
  const decoded = jwtDecode(token);
  account.displayName = decoded.name;
  account.email = decoded.email;
}

export { account };
