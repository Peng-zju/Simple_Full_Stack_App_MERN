import React, {Component} from "react";
import styled from "styled-components";

import Logo from './Logo'
import Links from './Links'

const container = styled.div.attrs({
    className : 'container'
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-sm  bg-dark'
})`
    margin-bottom : 20 px;
`

class NavBar extends Component{
    render(){
        return(
            <container>
                <Nav>
                    <Logo/>
                    <Links/>
                </Nav>
            </container>
        )
    }
}

export default NavBar