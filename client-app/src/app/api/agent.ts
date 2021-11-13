import axios, { AxiosError, AxiosResponse } from 'axios';
//import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Book } from '../models/bookType';
import { PageResult } from '../models/pagination';
import { IUser, IUserFormValues } from '../models/userType';

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.request.use(config => {
    var token: string | null
    token = window.localStorage.getItem('token'); 
    if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
)

axios.interceptors.response.use(async response => {
        const paging = response.headers['paging'];
        if (paging) {
            response.data = new PageResult(response.data, JSON.parse(paging));
            return response as AxiosResponse<PageResult<any>>
        }
        return response;
    }, (error: AxiosError) => {
        const{data, status, config} = error.response!;
        switch (status) {
            case 400:
                // launch, if guid is not valid
                if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                    history.push('/notfound')
                };
                
                if (data.errors) {
                    const modalStateErr = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErr.push(data.errors[key])
                        }
                    }
                    //console.log(data);
                    throw modalStateErr.flat();
                } else {
                    throw data.message;
                   // toast.error(data.message);
                }
                break;
            case 401:
                if (config.method === 'post') toast.error('unathorized');
                history.push('/');
                break;
            case 403:
                toast.error('forbidden');
                history.push('/');
                break;
            case 404:
                history.push('/notfound');
                break;
            case 500:
                if (data.errors) {
                    const modalStateErr = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErr.push(data.errors[key])
                        }
                    }
                    //console.log(data);
                    throw modalStateErr.flat();
                } else {
                    throw data.message;
                   // toast.error(data.message);
                }
                break;
        }
        return Promise.reject(error);
    });

// introduce generic <T> for type safety
// for requests requests.get<Book[]>. We say request should return array Book[]
const responseBody = <T> (response: AxiosResponse<T>) => response.data; 

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>   
        axios.post(url
            , JSON.stringify(body)
            ,{ headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }}
        )
        .then(responseBody)
        // .then(response => { 
        //     console.log(response)
        // })
        // .catch(error => {
        //     console.log(error.response)
        // })
    ,put: <T>(url: string, body: {}) => axios.put<T>(url, body)
        .then(responseBody)
        // .then(response => { 
        //    console.log(response)
        // })
        // .catch(error => {
        //     console.log(error.response)
        // }),
    ,del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Books = {
    list: (params:URLSearchParams) => axios.get<PageResult<Book[]>>('/books',{params}).then(responseBody),
    details: (id: string) => requests.get<Book>(`/books/${id}`),
    create: (book: Book) => requests.post<void>('/books', book),
    update: (book: Book) => requests.put<void>(`/books/${book.bookId}`, book),
    delete: (id: string) => requests.del<void>(`/books/${id}`)
}

const UserAccount = {
    current: () => requests.get<IUser>('/user'),
    login: (user: IUserFormValues) => requests.post<IUser>('/user/login', user), 
    //register: (user: IUserFormValues) => requests.post<IUser>('/user/register', user)
}

const agent = {
    Books,
    UserAccount
}

export default agent;