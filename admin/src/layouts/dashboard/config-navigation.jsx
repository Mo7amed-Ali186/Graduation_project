import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Category',
    path: '/blog',
    icon: icon('category'),
  },
  {
    title: 'Sub-Category',
    path: '/subblog',
    icon: icon('category'),
  },
  {
    title: 'Brand',
    path: '/brand',
    icon: icon('ic_blog'),
  },
  {
    title: 'Coupon',
    path: '/copon',
    icon: icon('copon'),
  },
  {
    title: 'Order',
    path: '/order',
    icon: icon('my-orders-icon'),
  },
];

export default navConfig;
