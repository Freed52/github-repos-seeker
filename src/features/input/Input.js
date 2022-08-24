import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { setSearchParams, checkOrg, clearMessage } from './inputSlice';

import styles from './styles/Input.module.css'

export const Input = () => {

    const dispatch = useDispatch()
    const [initSearch, setInitSearch] = useState(null)
    const message = useSelector((state => state.input.message))

    const formik = useFormik({
        initialValues: {
            search: '',
        },
        onSubmit: values => {
            setInitSearch(values.search)
            dispatch(setSearchParams(values.search))
        },
    });

    const handleFocus = () => {
        message === 'Not Found' && dispatch(clearMessage())
        formik.resetForm()
    }

    useEffect(() => {
        if (initSearch) {
            dispatch(checkOrg(initSearch))
        }
    }, [initSearch, dispatch])

    useEffect(() => {
        // componentWillUnmount nulling message
        return function cleanup() {
            dispatch(clearMessage())
        }
    }, [dispatch])

    return (
        <div className={'container w-1/2 mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10'}>
            {(message && message !== 'Not Found') && <Navigate to='/repos' replace={true} />}
            <div className='flex justify-center mb-4 font-bold'>
                <span>Поиск репозиториев на GitHub...</span>
            </div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <label htmlFor='myInput'>Название организации</label>
                <input
                    className={`${styles.input} mx-4 border-hidden px-2`}
                    id='myInput'
                    name='search'
                    onChange={formik.handleChange}
                    value={message ? message : formik.values.search}
                    onFocus={() => handleFocus()}
                />

                <button type="submit">Искать</button>
            </form>
        </div>
    );
}
