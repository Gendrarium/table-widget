import type { ITableRow } from '../../interfaces';

import Droplist from '../Droplist/Droplist';
import useForm from '../../hooks/useForm';
import {
  columnSelectDroplist,
  conditionSelectDroplist,
  conditionSelectWithNameDroplist,
} from '../../utils/const';
import './Sorter.scss';
import { useEffect } from 'react';

interface SorterProps {
  allRows: ITableRow[];
  setSorteredRows: React.Dispatch<React.SetStateAction<ITableRow[]>>;
}

const Sorter: React.FC<SorterProps> = ({ allRows, setSorteredRows }) => {
  const { values, handleChange, setValues } = useForm<string>();

  useEffect(() => {
    //sort by condition
    function sortByCondition(
      array: ITableRow[],
      columnName: 'name' | 'amount' | 'distance',
      condition: 'descending' | 'ascending' = 'ascending'
    ): ITableRow[] {
      if (condition === 'ascending') {
        return array.sort((a, b) => {
          if (a[columnName] > b[columnName]) {
            return 1;
          }
          if (a[columnName] < b[columnName]) {
            return -1;
          }
          return 0;
        });
      } else {
        return array.sort((a, b) => {
          if (a[columnName] > b[columnName]) {
            return -1;
          }
          if (a[columnName] < b[columnName]) {
            return 1;
          }
          return 0;
        });
      }
    }

    //filter by conditions
    function filterByColumnName(
      array: ITableRow[],
      columnName: 'name' | 'amount' | 'distance'
    ): ITableRow[] {
      if (columnName === 'name') {
        if (values['condition'] === 'equal') {
          return sortByCondition(
            array.filter((item) => item[columnName].toLowerCase() === values['sorter'].toLowerCase()),
            columnName
          );
        } else {
          return sortByCondition(
            array.filter(
              (item) => item[columnName].indexOf(values['sorter']) > -1
            ),
            columnName
          );
        }
      } else {
        if (values['condition'] === 'equal') {
          return sortByCondition(
            array.filter(
              (item) => String(item[columnName]) === values['sorter']
            ),
            columnName
          );
        } else if (values['condition'] === 'contain') {
          return sortByCondition(
            array.filter(
              (item) => String(item[columnName]).indexOf(values['sorter']) > -1
            ),
            columnName
          );
        } else if (values['condition'] === 'more') {
          return sortByCondition(
            array.filter((item) => item[columnName] > Number(values['sorter'])),
            columnName
          );
        } else {
          return sortByCondition(
            array.filter((item) => item[columnName] < Number(values['sorter'])),
            columnName,
            'descending'
          );
        }
      }
    }

    let newAllRows = [...allRows];
    if (values['columnName'] && values['condition'] && values['sorter']) {
      if (values['columnName'] === 'name') {
        newAllRows = filterByColumnName(newAllRows, 'name');
      } else if (values['columnName'] === 'amount') {
        newAllRows = filterByColumnName(newAllRows, 'amount');
      } else if (values['columnName'] === 'distance') {
        newAllRows = filterByColumnName(newAllRows, 'distance');
      }
    }
    setSorteredRows(newAllRows);
  }, [allRows, setSorteredRows, values]);

  return (
    <div className='sorter'>
      <Droplist
        className='sorter__input'
        inputClass='input input_with-arrow'
        selectId='columnName'
        values={values}
        defaultState='Name'
        placeholder='Select column'
        setValues={setValues}
        name='columnName'
        array={columnSelectDroplist}
      />
      <Droplist
        className='sorter__input'
        inputClass='input input_with-arrow'
        selectId='condition'
        values={values}
        placeholder='Select condition'
        defaultState='Contain'
        setValues={setValues}
        name='condition'
        array={
          values['columnName'] && values['columnName'] === 'name'
            ? conditionSelectWithNameDroplist
            : conditionSelectDroplist
        }
      />
      <input
        className='input sorter__input'
        value={values['sorter'] || ''}
        onChange={handleChange}
        name='sorter'
        type='text'
        placeholder='Enter text'
      />
    </div>
  );
};

export default Sorter;
