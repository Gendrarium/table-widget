import './Pagination.scss';

interface PaginationProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  countRows: number;
  setCountRows: React.Dispatch<React.SetStateAction<number>>;
  allPagesNumber: number;
}
const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  setPageNumber,
  countRows,
  setCountRows,
  allPagesNumber,
}) => {
  function handleButtonClick(value: number) {
    setCountRows(value);
    setPageNumber(0);
  }
  function handlePageChange(value: number) {
    setPageNumber(value);
  }

  function createArrayByNumber(number: number) {
    const array = [];
    for (let i = 0; i < number; i++) {
      array.push(i);
    }
    return array;
  }

  return (
    <div className='pagination'>
      <div
        className='pagination__container'>
        <div className='pagination__pages-container'>
          {createArrayByNumber(allPagesNumber).map((item) => (
            <button
              key={item}
              className={`pagination__button pagination__button_page${
                item === pageNumber ? ' pagination__button_active' : ''
              }`}
              type='button'
              onClick={
                item !== pageNumber
                  ? handlePageChange.bind(null, item)
                  : undefined
              }>
              {item + 1}
            </button>
          ))}
        </div>
        <div className='pagination__buttons-container'>
          <button
            className={`pagination__button${
              countRows === 10 ? ' pagination__button_active' : ''
            }`}
            type='button'
            onClick={handleButtonClick.bind(null, 10)}>
            10
          </button>
          <button
            className={`pagination__button${
              countRows === 20 ? ' pagination__button_active' : ''
            }`}
            type='button'
            onClick={handleButtonClick.bind(null, 20)}>
            20
          </button>
          <button
            className={`pagination__button${
              countRows === 30 ? ' pagination__button_active' : ''
            }`}
            type='button'
            onClick={handleButtonClick.bind(null, 30)}>
            30
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
