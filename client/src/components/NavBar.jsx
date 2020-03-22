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
    margin : 0px 0px 20px 0px;
   
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