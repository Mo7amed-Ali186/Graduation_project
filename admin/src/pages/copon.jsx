import { Helmet } from 'react-helmet-async';

import CoponView from 'src/sections/copon/view/copon-view';
// ----------------------------------------------------------------------
export default function CoponPage() {
  return (
    <>
      <Helmet>
        <title> Copon CLOZR</title>
      </Helmet>
      <CoponView />
    </>
  );
}
