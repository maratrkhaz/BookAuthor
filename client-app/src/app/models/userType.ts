export interface IUser {
    username: string;
    displayName: string;
    image?: string;
   // token: string;
}

export interface IUserFormValues {
    email: string;
    password: string;
    // displayName: string;
    // username: string;
}

export  type UserState = {
   user: IUser | null ;
   token: string | null ;
  }
  
export  type UserAction = {
    type: string
    payload: any 
}

export  type DispatchType = (args: UserAction) => UserAction