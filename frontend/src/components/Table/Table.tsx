import { Fragment } from 'react';
import { ITableRow } from '../../interfaces';
import './Table.scss';

interface TableProps {
  sorteredRows: ITableRow[];
}
const Table: React.FC<TableProps> = ({ sorteredRows }) => {
  function dateNormalize(date: number): string {
    return String(date).length === 1 ? `0${date}` : `${date}`;
  }

  return (
    <div className='table'>
      <div className='table__row-grid'>
        <p className='table__text table__text_bold'>Date</p>
        <p className='table__text table__text_bold'>Name</p>
        <p className='table__text table__text_bold'>Amount</p>
        <p className='table__text table__text_bold'>Distance</p>
      </div>
      {sorteredRows.map((item, id) => {
        const date: Date = new Date(item.date);
        const dateForTable: string = `${dateNormalize(
          date.getDate()
        )}-${dateNormalize(date.getMonth() + 1)}-${date.getFullYear()}`;

        return (
          <Fragment key={id}>
            <div className='table__row-grid'>
              <p className='table__text'>{dateForTable}</p>
              <p className='table__text'>{item.name}</p>
              <p className='table__text'>{item.amount}</p>
              <p className='table__text'>{item.distance}</p>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Table;
