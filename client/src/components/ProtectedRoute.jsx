// ProtectedRoute.js
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { authContext } from "./authen";

// export const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const { token } = useContext(authContext);

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 token ? <Component {...props} /> :  />
//             }
//         />
//     );
// };
