import React, {Component} from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";

const Collapse = styled.div.attrs({
    className : 'collpase navbar-collapse'
})``

const List  = styled.ul.attrs({
    className: 'navbar-nav mr-auto'
})``

const Item = styled.li.attrs({
    className: 'nav-item navbar-collapse'
})``

class Links extends Component{
    render(){
        return(
            <>
                <Link to="/movies/list" className = "navbar-brand text-info">
                    Curtis Movie Theater
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to='/movies/list' className='nav-link text-secondary'>
                                Movies
                            </Link>
                        </Item>
                        <Item>
                            <Link to='/movies/create' className='nav-link text-secondary' >
                                Create Movie
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </>
        )
    }
}

export default Links