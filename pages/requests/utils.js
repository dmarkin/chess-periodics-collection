import axios from 'axios';

export const getAll = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/books`);
    if (res.status !== 200) {
        return new Error('Internal Server Error');
    }

    console.log('Utils getAll', res.data);
    const data = await res.data?.books;
    return data;
};

export const getById = async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/books/${id}`);
    if (res.status !== 200) {
        return new Error('Internal Server Error');
    }

    console.log(res.data);
    const data = await res.data?.book;
    return data;
};

export const create = async (data) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/books`, data);
    console.log(res);
    if (res.status !== 201) {
        return new Error('Internal Server Error');
    }

    console.log(res.data);
    const responseData = await res.data?.book;
    return responseData;
};

export const update = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/books/${data._id}`, data);
    console.log(res);
    if (res.status !== 200) {
        return new Error('Internal Server Error');
    }

    console.log(res.data);
    const responseData = await res.data?.book;
    return responseData;
};

export const remove = async (id) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/books/${id}`);
    if (res.status !== 200) {
        return new Error('Internal Server Error');
    }

    console.log(res.data);
    const responseData = await res.data?.book;
    return responseData;
};
