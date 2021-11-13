import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Menu, Image, Icon, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { IUser } from "../models/userType";
import * as actions from '../../app/store/actions/userAction';

const NavBar = (props: any) => {
  const dispatch = useDispatch();

  var user: IUser;
  user = useSelector((state: any) => state.userReducer.user);

  function handleLogout() {
    dispatch(actions.Logout())
  }

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
        </Menu.Item>
        <Menu.Item >
          <Button as={NavLink} to='/books'  content="Books" />
        </Menu.Item>
        <Menu.Item>
          <Button as={NavLink} to='/createBook'  content="New book" />
        </Menu.Item>
        <Menu.Item position='right'>
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout} text='Logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default (NavBar);
