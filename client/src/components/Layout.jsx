import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { NavLogin } from "./NavLogin";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
export class Layout extends Component {
    render() {
        return (
            <>
                <ScrollToTop>
                    <NavLogin />
                    <Outlet />
                    <Footer />
                </ScrollToTop>
            </>
        );
    }
}
