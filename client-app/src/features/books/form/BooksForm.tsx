import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {v4 as uuid} from 'uuid';
import * as actions from  '../../../app/store/actions/bookAction';
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import { Book } from "../../../app/models/bookType";
import { NavLink, Redirect, /*useHistory,*/ useParams } from "react-router-dom";
import {history} from '../../../index';
import ErrMessage from "../../errors/ErrMessage";
import { Formik,Form, Field, FormikProps, ErrorMessage } from "formik";
import * as Yup from 'yup';
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import CustomTextArea from "../../../app/common/form/CustomTextArea";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import { categories } from "../../../app/models/categories";

// interface MyFormValues {
//   title: string;
//   category: string;
//   description: string;
// }

// interface IProps extends FormikProps<MyFormValues> {
//   setEditMode(arg: boolean): void;
// }


const BooksForm = () => {    
   //const history = useHistory();
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch();
  let submitting = false;

  useEffect(()=>{
      if (id) {
        dispatch(actions.SelectBook(id));
      }
      else {
        dispatch(actions.CancelSelectedBook());
      }
  },[id, dispatch]);

  var selectedBook: Book;
  selectedBook  = useSelector((state: any) => state.bookReducer.selectedBook);

  const initialState = selectedBook ??  {
    bookId: "",
    title: "",
    description: "",
    categoryId: "",
    category: "",
  };

  const [book, setBook] = useState(initialState);

  useEffect(()=>{
    if (selectedBook) {
      setBook(selectedBook);
    }
  },[selectedBook]);

  const validationSchema = Yup.object({
    title: Yup.string().required('The book title is required.'),
    description: Yup.string().required('The book description is required.'),
    categoryId: Yup.string().required('The book category is required.'),
  })

  const {loading}  = useSelector((state: any) => state.bookReducer.loading);

  useEffect(()=>{
    if (errMessage) dispatch(actions.CLEAR_ERROR_MESSAGE());
  },[errMessage, dispatch]);
  
  var errMessage: string[]|undefined;
  errMessage = useSelector((state: any) => state.bookReducer.errorMessage);

  function handleFormSubmit(bookSubmitted: Book) {
    CreateOrEditBook(bookSubmitted);
  }

  function CreateOrEditBook(book:Book) {
    dispatch(actions.SetLoading());
    dispatch(actions.CLEAR_ERROR_MESSAGE())
    book.categoryId = book.categoryId && book.categoryId.toString();

    if (id) {
        dispatch(actions.Update(book));
        //history.push(`/books/${book.bookId}`);
    } else {
      book.bookId = uuid();
      dispatch(actions.Create(book));
      //history.push('/books');
    }
  }

  submitting  = useSelector((state: any) => state.bookReducer.submitting);
 
  if (submitting && errMessage === undefined) {
    dispatch(actions.CancelSubmitting());
  }

  return (
    <Segment clearing>
      {errMessage && <ErrMessage err={errMessage}/>}
      <Formik 
        validationSchema={validationSchema}
        enableReinitialize 
        initialValues={book}
        onSubmit={values => handleFormSubmit(values)}
      >
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off" >
            <CustomTextInput name='title' placeholder='Title' />
            <CustomTextArea placeholder="Description" name="description" rows={5} />
            <CustomSelectInput options={categories} name="categoryId"  placeholder='Category' />
            <Button 
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading} floated="right" positive type="submit" content="Submit" 
            />
            <Button
              as={NavLink} to='/books'
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
      
    </Segment>
  );
};

export default BooksForm;

