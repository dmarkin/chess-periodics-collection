import axios from 'axios';

export const getAll = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/books`);
    if (res.status !== 200) {
        return new Error('Internal Server Error');
    }

    const data = await res.data?.books;
    console.log('Response data for Get All', data);
    return data;
};

export const getById = async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/books/${id}`);
    if (res.status !== 200) {
        return new Error('Internal Server Error');
    }

    const data = await res.data?.book;
    console.log('Response data for Get by Id', data);
    return data;
};

export const create = async (data) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/books`, data);
    console.log(res);
    if (res.status !== 201) {
        return new Error('Internal Server Error');
    }

    const responseData = await res.data?.book;
    console.log('Response data for Create', responseData);
    return responseData;
};

export const update = async (data) => {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/books/${data._id}`, data);
    if (res.status !== 200) {
        return new Error('Internal Server Error');
    }

    const responseData = await res.data?.book;
    console.log('Response data for Update', responseData);
    return responseData;
};

export const remove = async (id) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/books/${id}`);
    if (res.status !== 200) {
        return new Error('Internal Server Error');
    }

    const responseData = await res.data?.book;
    console.log('Response data for Remove', responseData);
    return responseData;
};
