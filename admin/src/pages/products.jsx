import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/product/view';
// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products CLOZR </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
