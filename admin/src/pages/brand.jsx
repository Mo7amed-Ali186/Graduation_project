import { Helmet } from 'react-helmet-async';

import { BrandView } from 'src/sections/brand/view';

// ----------------------------------------------------------------------

export default function BrandPage() {
  return (
    <>
      <Helmet>
        <title> Brand CLOZR </title>
      </Helmet>

      <BrandView />
    </>
  );
}
