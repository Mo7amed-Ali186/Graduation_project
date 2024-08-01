import axios from "axios";
import React from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

export function Subcategories(props) {
    const { subCategories } = props;
    if (!subCategories) {
        return "Loading SubCategories ...";
    } else {
        return (
            <ul className="dropdown-menu">
                {subCategories?.map((subcategory) => {
                    return (
                        <li key={subcategory?._id}>
                            <Link
                                className="dropdown-item"
                                to={`productsBySubCategory/${subcategory?._id}`}
                            >
                                {subcategory?.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
