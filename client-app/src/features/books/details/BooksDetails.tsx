import React, { useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { useSelector, useDispatch  } from "react-redux"
import * as actions from '../../../app/store/actions/bookAction';
import { useParams } from "react-router";
import { Book } from "../../../app/models/bookType";
import { Link } from "react-router-dom";
import ErrMessage from "../../errors/ErrMessage";

const BooksDetails= () => {
 const {id} = useParams<{id: string}>();
 const dispatch = useDispatch();

  useEffect(()=>{
      if (id) dispatch(actions.SelectBook(id));
  },[id, dispatch]);

  var selectedBook: Book;
  selectedBook  = useSelector((state: any) => state.bookReducer.selectedBook);

  useEffect(()=>{
    if (errMessage) dispatch(actions.CLEAR_ERROR_MESSAGE());
  },[errMessage, dispatch]);

  var errMessage: string[]|undefined;
  errMessage = useSelector((state: any) => state.bookReducer.errorMessage);

 

  const selBook = selectedBook ??  {
    bookId: "",
    title: "",
    description: "",
    categoryId: "",
    category: "",
  };
    
  return (
    <>
    {errMessage && <ErrMessage err={errMessage}/>}
    <Card fluid>
     
      {/* <Image src={`/assets/bookimages/empty.png`} /> */}
      
      <Card.Content>
        <Card.Header>{selBook.title}</Card.Header>
        <Card.Description>{selBook.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button as={Link} to={`/bookedit/${selBook.bookId}`}  basic color="blue" content="Edit" />
          <Button as={Link} to='/books' basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
    </>
  );
}

export default (BooksDetails);