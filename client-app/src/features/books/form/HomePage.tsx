import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { IUser } from '../../../app/models/userType';
import * as actions from  '../../../app/store/actions/modalAction';
import UserLoginForm from '../../users/UserLoginForm';

const HomePage = () => {
  const dispatch = useDispatch();

 /* var user: IUser;
  user = useSelector((state: any) => state.userReducer.user);*/

  var token: string | null;
  token = useSelector((state: any) => state.userReducer.token);

  //console.log(token);

  return (
       <Segment inverted textAlign='center' vertical className='masthead'>
         <Container text>
           <Header as='h1' inverted>
             <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
             Books
           </Header>
           {/* <Header as='h2' inverted content='Book authors'/> */}
           {/*user*/token ? (
              <Button as={Link} to='/books' size='huge' inverted>
                Go to books 
              </Button>
              ) : (
              <Button onClick={()=>dispatch(actions.OpenModal(<UserLoginForm/>))} size='huge' inverted>
                Login 
              </Button>
              )
            }
           
         </Container>
       </Segment>
    );
};

export default  HomePage;




