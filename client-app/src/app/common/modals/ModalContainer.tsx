import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import * as actions from '../../../app/store/actions/modalAction';

export default function ModalContainer() {
    const dispatch = useDispatch();

    var mbody: JSX.Element | null;
    mbody = useSelector((state: any) => state.modalReducer.body);

    var mopen: boolean;
    mopen = useSelector((state: any) => state.modalReducer.open);

    function handleModalOpen() {
        //dispatch(actions.OpenModal())
      }
    
      function handleModalClose() {
        dispatch(actions.CloseModal())
      }
    
    return (
        <Modal open={mopen} onClose={handleModalClose} size='mini'>
            <Modal.Content>
                {mbody}
            </Modal.Content>
        </Modal>
    )
}

