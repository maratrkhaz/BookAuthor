export  type ModalState = {
    open: boolean;
    body: JSX.Element | null;
   }
   
 export  type ModalAction = {
     type: string
     payload: any 
 }
 
 export  type DispatchType = (args: ModalAction) => ModalAction