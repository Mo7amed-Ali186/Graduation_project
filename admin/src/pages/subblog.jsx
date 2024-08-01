import { Helmet } from 'react-helmet-async';

import SubblogView from 'src/sections/sub-blog/view/subblog-view';

// ----------------------------------------------------------------------
export default function SubblogPage() {
  return (
    <>
      <Helmet>
        <title> Sub-Category CLOZR</title>
      </Helmet>
      <SubblogView />
    </>
  );
}
