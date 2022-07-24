import { useEffect, useState } from 'react';

import type { ITableRow } from '../../interfaces';

import Table from '../Table/Table';
import Sorter from '../Sorter/Sorter';
import { getAllRows } from '../../utils/api';
import './App.scss';
import Pagination from '../Pagination/Pagination';

function App() {
  const [allRows, setAllRows] = useState<ITableRow[] | []>([]);
  const [onePageRows, setOnePageRows] = useState<ITableRow[] | []>([]);
  const [sorteredRows, setSorteredRows] = useState<ITableRow[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [allPagesNumber, setAllPagesNumber] = useState<number>(1);
  const [countRows, setCountRows] = useState<number>(10);

  useEffect(() => {
    //api call
    getAllRows()
      .then((res) => {
        setAllRows(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setAllPagesNumber(Math.ceil(sorteredRows.length/countRows))
  }, [countRows, sorteredRows.length]);

  useEffect(() => {
    let newAllRows = [...sorteredRows]; 
    if (sorteredRows.length > countRows) {
      newAllRows = newAllRows.slice(pageNumber*countRows, pageNumber*countRows + countRows)
    }
    setOnePageRows(newAllRows)
  }, [countRows, pageNumber, sorteredRows]);

  return (
    <div className='app'>
      <Sorter allRows={allRows} setSorteredRows={setSorteredRows} />
      <Table sorteredRows={onePageRows} />
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        countRows={countRows}
        setCountRows={setCountRows}
        allPagesNumber={allPagesNumber}
      />
    </div>
  );
}

export default App;
