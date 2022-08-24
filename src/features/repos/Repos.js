import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { getRepos, clearUpRepos } from './reposSlice';

import styles from './styles/Repos.module.css'

export const Repos = () => {

  const dispatch = useDispatch()

  const theads = ['Name', 'Description', 'Language', 'Stars']

  const repos = useSelector((state => state.repos.list))
  const pagination = useSelector((state => state.repos.pagination))
  const search = useSelector((state => state.input.search))
  const startPage = useSelector((state => state.input.startPage))

  const [page, setPage] = useState(startPage)

  const clickHandler = (e) => {
    e.stopPropagation();

    const value = Number(e.currentTarget.getAttribute('data-value'))
    setPage(value + 1)
  }

  useEffect(() => {
    if (page) {
      const params = { search, page }
      dispatch(getRepos(params))
    }
  }, [page, search, dispatch])

  useEffect(() => {
    // componentWillUnmount remove repos
    return function cleanup() {
      dispatch(clearUpRepos())
    }
  }, [dispatch])

  return (
    <div>
      <div className='flex items-center'>
        <nav className='px-4'>
          <Link className='text-slate-400' to="/">К поиску</Link>
        </nav>
        <span className='prose prose-slate mx-auto text-4xl font-bold py-4'>{search}</span>
      </div>
      <table className={`${styles.table} table-auto`}>
        <thead>
          <tr>
            {theads.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {repos && repos.map((l, i) => <tr key={i}>
            {theads.map(t => <td key={t}>
              {!l[t.toLowerCase()] ? l['stargazers_count'] : l[t.toLowerCase()]}
            </td>)}
          </tr>)}
        </tbody>
      </table>
      {pagination && pagination.map(p => <span
        className='bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium cursor-pointer'
        onClick={(e) => { clickHandler(e) }} data-value={p} key={p}>{p + 1}</span>)}
    </div>
  );
}
