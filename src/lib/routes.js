const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'All Events',
    path: '/events/all',
  },
];

export const publicRoutes = [
  ...routes,
  {
    name: 'Log In',
    path: '/login',
  },
];

export const userRoutes = [
  ...routes,
  {
    name: 'Profile',
    path: '/profile',
  },
];

export const adminRoutes = [
  ...routes,
  {
    name: 'Admin Panel',
    path: '/admin',
  },
];
