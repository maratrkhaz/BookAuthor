import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Message } from "semantic-ui-react";
//import * as actions from '../../app/store/actions/dBookAction'

interface Props {
  err: string | string[] | undefined;
}

function ErrMessage({err}: Props) {
  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   if (err) dispatch(actions.CLEAR_ERROR_MESSAGE());
  // },[err, dispatch]);
  
    return (
      <Message error>
        {err && typeof(err)==='string' && err}
        {err && typeof(err)!=='string' && (
            <Message.List>
              {err.map((r: any, i: any) => (
                <Message.Item key={i}>{r}</Message.Item>
              ))}
            </Message.List>
          )}
      </Message>
       );
}

export default ErrMessage
