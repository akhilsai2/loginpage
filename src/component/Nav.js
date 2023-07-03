import React from 'react'
import {
    AppBar,
    AppBarSection,
    AppBarSpacer,
    Avatar,
} from "@progress/kendo-react-layout";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import '@progress/kendo-theme-default/dist/all.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setDistinct } from 'mathjs';
let kendokaAvatar =
    "https://www.telerik.com/kendo-react-ui-develop/components/images/kendoka-react.png";

const Navbar = () => {
    const { listItems: cartItem } = useSelector((store) => store.cart)
    return (
        <>
            <AppBar>
                <AppBarSection>
                    <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
                        <span className="k-icon k-i-menu" />
                    </button>
                </AppBarSection>

                <AppBarSpacer
                    style={{
                        width: 4,
                    }}
                />

                <AppBarSection>
                    <h1 className="title">MARTooV</h1>
                </AppBarSection>

                <AppBarSpacer
                    style={{
                        width: 32,
                    }}
                />

                <AppBarSection>
                    <ul>
                        <li>
                            <span><Link to="/" style={{ textDecoration: "none", color: "Black", fontWeight: "500" }} >Products</Link></span>
                        </li>
                        <li>
                            <span><Link to="/cart" style={{ textDecoration: "none", color: "Black", fontWeight: "500" }}>Cart</Link></span>
                        </li>

                    </ul>
                </AppBarSection>

                <AppBarSpacer />

                <AppBarSection className="actions">
                    <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
                        <BadgeContainer style={{ width: "10px", marginTop: "5px" }}>
                            <span className="k-icon k-i-bell" />
                            <Badge
                                shape="dot"
                                themeColor="info"
                                size="small"
                                position="outside"
                            >{setDistinct(cartItem).length}</Badge>
                        </BadgeContainer>
                    </button>
                </AppBarSection>

                <AppBarSection>
                    <span className="k-appbar-separator" />
                </AppBarSection>

                <AppBarSection>
                    <Avatar type="image">
                        <img src={kendokaAvatar} alt="KendoReact Layout Kendoka Avatar" />
                    </Avatar>
                </AppBarSection>
            </AppBar>
            <style>{`
                body {
                    background: #dfdfdf;
                }
                .title {
                    font-size: 18px;
                    margin: 0;
                }
                ul {
                    font-size: 14px;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                li {
                    margin: 0 10px;
                }
                li:hover {
                    cursor: pointer;
                    color: #84cef1;
                }
                .k-button k-button-md k-rounded-md k-button-solid k-button-solid-base {
                    padding: 0;
                }
                .k-badge-container {
                    margin-right: 8px;
                }
            `}</style>

        </>
    )
}

export default Navbar