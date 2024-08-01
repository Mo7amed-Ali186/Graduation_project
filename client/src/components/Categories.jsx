import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-multilevel-dropdown";

export function Categories(props) {
  const { categories } = props;
  console.log(categories);

  if (!categories) {
    return "Loading Categories ...";
  } else {
    return (
      <>
        <Dropdown
          style={{
            backgroundColor: "transparent",
            fontFamily: "Poppins",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontStyle: "normal",
            fontSize: "15px",
            fontWeight: "500",
          }}
          title="Categories"
        >
          {categories?.map((category) => (
            <div key={category._id}>
              <Link role="button" to={`productsByCategory/${category._id}`}>
                <Dropdown.Item>
                  {category?.name}
                  {category.subCategory && (
                    <Dropdown.Submenu position="right">
                      {category.subCategory.map((sub) => (
                        <Link
                          key={sub._id}
                          role="button"
                          to={`productsBySubCategory/${sub._id}`}
                        >
                          <Dropdown.Item>{sub.name}</Dropdown.Item>
                        </Link>
                      ))}
                    </Dropdown.Submenu>
                  )}
                </Dropdown.Item>
              </Link>
            </div>
          ))}
        </Dropdown>
      </>
    );
  }
}
