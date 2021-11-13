import React, { SyntheticEvent, useState, useEffect } from "react";
import { connect } from "react-redux"
import * as actions from '../../../app/store/actions/bookAction';
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const BooksList = (props: any) => {
    
  const [target, setTarget] = useState('');
  const {loading} = props;
  const {pagingParams} = props;

  // useEffect(() => {
  //       props.fetchAllBooks(pagingParams);
  //     }, []);

  function handleBookDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        if (window.confirm('Are you sure to delete the book?')) {
        setTarget(e.currentTarget.name); 
        props.deleteBook(id);
        }
  }

  return (
    <Segment>
      <Item.Group divided>
        {props.dBookList.map((record: any, index: string) => (
          <Item key={index}>
            <Item.Content>
              <Item.Header>{record.title} </Item.Header>
              <Item.Description>
                <div>{record.description}</div>
              </Item.Description>
              <Item.Extra>
                {/* <Button onClick={()=>props.selectBook(record.bookId)} floated="right" content="View" color="blue"></Button> */}
                <Button as={Link} to={`/books/${record.bookId}`} floated="right" content="View" color="blue"></Button>
                <Button
                    name={record.bookId} 
                    loading={loading && target === record.bookId}
                     onClick={(e)=>handleBookDelete(e, record.bookId)}
                    floated="right" content="Delete" color="red">
                </Button>
                <Label basic content={record.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

const mapStateToProps = (state: any ) => ({
  dBookList: state.bookReducer.books,
  loading: state.bookReducer.loading,
  pagingParams: state.bookReducer.pagingParams
});

const mapActionToProps = {
  fetchAllBooks: actions.fetchAll,
  deleteBook: actions.Delete,
  selectBook: actions.SelectBook
};

export default connect(mapStateToProps, mapActionToProps)(BooksList);
