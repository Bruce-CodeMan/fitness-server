interface IResult<T> {
    code: number;
    message: string;
    data?: T;
}

interface IResults<T> {
    code: number;
    message: string;
    data?: T[];
}