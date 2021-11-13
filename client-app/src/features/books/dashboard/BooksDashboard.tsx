import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, GridColumn } from "semantic-ui-react";
import BooksList from "./BooksList";
import * as actions from  '../../../app/store/actions/bookAction';
import { IPagination, IPagingParams, PageParams } from "../../../app/models/pagination";

const BooksDashboard = () => {
  const dispatch = useDispatch();

  const [loadingNext, setloadingNext] = useState(false);

  const pagination  = useSelector((state: any) => state.bookReducer.pagination);

  useEffect(() => {
    if (pagination === null) {
      let currentparam: IPagingParams = {
        pageNumber: PageParams.pageNumber,
        pageSize: PageParams.pageSize
      };
      
      dispatch(actions.fetchAll(currentparam));
      setloadingNext(false);
    }
  }, []);

  function handleFetchNext() {
    setloadingNext(true);

    let nextparam: IPagingParams = {
      pageNumber: pagination.curPage,
      pageSize: pagination.itemsPerPage + PageParams.pageSize
    };
    
    dispatch(actions.SET_PAGING_PARAMS(nextparam));
    
    dispatch(actions.fetchAll(nextparam));
    setloadingNext(false);
  }

  return (
    <Grid>
      <GridColumn width='10'>
        <BooksList />
        <Button 
          floated='right'
          content='More...'
          positive onClick={handleFetchNext} 
          loading={loadingNext}
          disabled={pagination?.curPage === pagination?.totalPages}
        />
      </GridColumn>
      <GridColumn width='6'>
          {/* {selectedBook && !editMode &&
            <BooksDetails />
          } */}
          {/* {editMode &&
            <BooksForm />
          } */}
      </GridColumn>
    </Grid>
  );
};

export default (BooksDashboard);

