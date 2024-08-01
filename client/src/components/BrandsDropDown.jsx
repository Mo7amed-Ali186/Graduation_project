import React from "react";
import { Link } from "react-router-dom";

export function BrandsDropDown(props) {
  const { brands } = props;
  if (!brands) {
    return "Loading Brands ...";
  } else {
    return (
      <ul className="dropdown-menu">
        {brands?.map((brand) => {
          return (
            <li key={brand._id}>
              <Link
                className="dropdown-item"
                to={`productsByBrand/${brand._id}`}
              >
                {brand?.name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}
