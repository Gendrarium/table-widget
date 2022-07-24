import { memo, useCallback, useEffect, useRef, useState } from 'react';

import type { IValue } from '../../interfaces';

import DroplistAddButtonIcon from '../../icons/DroplistAddButtonIcon';
import './Droplist.scss';

export type ArrayObject = {
  text?: string;
  key?: string;
  [index: string]: string;
};

interface DroplistProps {
  className?: string;
  withPersonal?: boolean;
  inputClass?: string;
  inputTitle?: string;
  labelClass?: string;
  upSelectClass?: string;
  selectId: string;
  selectClass?: string;
  required?: boolean;
  values: IValue;
  readOnly?: boolean;
  placeholder?: string;
  defaultState?: string;
  setValues: React.Dispatch<React.SetStateAction<IValue>>;
  name: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  array: ArrayObject[];
}

const Droplist: React.FC<DroplistProps> = memo(
  ({
    className,
    withPersonal,
    inputClass,
    inputTitle,
    labelClass,
    upSelectClass,
    selectId,
    selectClass,
    required,
    values,
    readOnly,
    placeholder,
    defaultState,
    setValues,
    name,
    inputRef,
    array,
  }) => {
    const [value, setValue] = useState<string>('');
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
    const [filteredArray, setFilteredArray] = useState<ArrayObject[]>(array);
    const [selectedValue, setSelectedValue] = useState<ArrayObject>({
      text: '',
      key: '',
    });
    const [isFisrtStatePlace, setIsFisrtStatePlace] = useState<boolean>(true);
    const [isItemsUp, setIsItemsUp] = useState<boolean>(false);
    const [isValueInArray, setIsValueInArray] = useState<boolean>(false);
    const itemsRef = useRef<HTMLDivElement | null>(null);

    function handleChangeMainValue(value: string): void {
      if (!value) {
        setValues((prev) => {
          return { ...prev, [name]: '' };
        });
        setSelectedValue({ key: '', text: '' });
      }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
      handleChangeMainValue(e.target.value);
      setValue(e.target.value);
      if (!isSelectOpen) handleOpen();
    }

    function handleFocusInput(): void {
      setIsInputFocus(true);
      handleOpen();
    }

    function handleBlurInput(e: React.FocusEvent<HTMLInputElement>): void {
      setIsInputFocus(false);
      if (
        !withPersonal &&
        (!e.relatedTarget || !e.relatedTarget.closest(`#${selectId}`))
      ) {
        if (!values[name]) {
          setValue('');
          handleChangeMainValue('');
          handleClose();
        } else if (selectedValue.text !== value) {
          setValue('');
          handleChangeMainValue('');
          handleClose();
        } else {
          handleClose();
        }
      } else if (
        withPersonal &&
        (!e.relatedTarget || !e.relatedTarget.closest(`#${selectId}`))
      ) {
        handleTestSelect(value || values[name]);
      }
    }

    const doNotScrollPage = useCallback((e: any): void => {
      if (['ArrowDown', 'ArrowUp'].indexOf(e.key) > -1) {
        e.preventDefault();
      }
    }, []);

    function handleKeyDown(e: any): void {
      window.addEventListener('keydown', doNotScrollPage);
      if (e.key === 'ArrowDown') {
        const element = e.target.closest(`#${selectId}`).lastChild.firstChild;
        if (element) element.focus();
      } else if (e.key === 'Enter') {
        const element = e.target.closest(`#${selectId}`).lastChild.firstChild;
        e.preventDefault();
        if (element) element.click();
      }
      setTimeout(() => {
        window.removeEventListener('keydown', doNotScrollPage);
      }, 1000);
    }

    function handleLiKeyDown(e: any, text: string, item?: IValue): void {
      window.addEventListener('keydown', doNotScrollPage);
      if (e.key === 'ArrowDown') {
        const nextElement = e.target.nextSibling;
        if (nextElement && nextElement.nodeName === 'DIV') {
          nextElement.focus();
        } else {
          const firstElement = e.target.closest('#ul').firstChild;
          if (firstElement && firstElement.nodeName === 'DIV')
            firstElement.focus();
        }
      } else if (e.key === 'ArrowUp') {
        const prevElement = e.target.previousSibling;
        if (prevElement && prevElement.nodeName === 'DIV') {
          prevElement.focus();
        } else {
          const lastElement = e.target.closest('#ul').lastChild;
          console.log(lastElement);
          if (lastElement && lastElement.nodeName === 'DIV') {
            lastElement.focus();
          } else if (
            lastElement.previousSibling &&
            lastElement.previousSibling.nodeName === 'DIV'
          ) {
            lastElement.previousSibling.focus();
          }
        }
      } else if (e.key === 'Enter') {
        handleTestSelect(text, item);
      }
      setTimeout(() => {
        window.removeEventListener('keydown', doNotScrollPage);
      }, 1000);
    }

    function handleTestSelect(text: string, item?: IValue): void {
      let key;
      array.some((i) => {
        if (i.text === text) {
          key = i.key;
          return true;
        }
        return false;
      });
      if (key) {
        handleSelect(key, text, item);
      } else {
        handleSelect('personal', text);
      }
    }

    function handleSelect(key: string, text: string, item?: IValue): void {
      if (key === 'personal') {
        setValues((prev) => {
          return { ...prev, [name]: text };
        });
      } else {
        setValues((prev) => {
          return { ...prev, [name]: key };
        });
        setValue(text);
      }
      setSelectedValue({ key: key, text: text });
      handleClose();
    }

    function handleOpen() {
      if (!isSelectOpen) {
        document.addEventListener('click', closeDrop);
        setIsSelectOpen(true);
      } else if (!isInputFocus) {
        handleClose();
      }
    }

    function handleClose() {
      document.removeEventListener('click', closeDrop);
      setIsSelectOpen(false);
    }

    const closeDrop = useCallback((e: any) => {
      if (!e.target.closest('#no-close')) handleClose();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (selectedValue.key !== 'personal') {
        let isOldValues;
        let text: string = '';
        isOldValues = array.some((i) => {
          if (i.text && i.text === selectedValue.text) {
            text = i.text;
          }
          return i.text === selectedValue.text;
        });

        if (!isOldValues) {
          setValue('');
        } else {
          setValue(text);
        }
      }
    }, [array, selectedValue]);

    useEffect(() => {
      if (values[name] && !value && array.length > 0) {
        let text: string = '';
        array.some((i, id) => {
          if (i.key === values[name] && i.text) {
            text = i.text;
            return true;
          }
          return false;
        });
        if (text) {
          setValue(text);
          setSelectedValue({ key: values[name], text: text });
        } else {
          setValue(values[name]);
          setSelectedValue({ key: 'personal', text: values[name] });
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [array]);

    useEffect(() => {
      if (value) {
        let arrayBeforeFilter: ArrayObject[];
        arrayBeforeFilter = array;
        setFilteredArray(
          selectedValue.key !== values[name] || selectedValue.text !== value
            ? arrayBeforeFilter.filter((item) => {
                if (item.text) {
                  return (
                    item.text.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  );
                } else {
                  return undefined;
                }
              })
            : arrayBeforeFilter,
        );
      } else {
        setFilteredArray(array);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [array, value, selectedValue]);

    useEffect(() => {
      if (defaultState && isFisrtStatePlace && !values[name]) {
        let key: string = '';
        array.some((i, id) => {
          if (i.text === defaultState && i.key) {
            key = i.key;
            setIsFisrtStatePlace(false);
            return true;
          }
          return false;
        });
        if (key) {
          setValue(defaultState);
          setValues((prev) => {
            return { ...prev, [name]: key };
          });
          setSelectedValue({ key: key, text: defaultState });
        }
      } else {
        setIsFisrtStatePlace(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [array, defaultState, isFisrtStatePlace]);

    useEffect(() => {
      if (
        itemsRef &&
        itemsRef.current &&
        itemsRef.current.previousSibling &&
        filteredArray
      ) {
        // console.log(itemsRef.current.previousSibling.getBoundingClientRect().bottom, (filteredArray.length > 4 ? 260 : filteredArray.length*40), window.innerHeight)
        if (
          itemsRef.current.previousSibling.getBoundingClientRect().bottom +
            (filteredArray.length > 4 ? 260 : filteredArray.length * 40) >
          window.innerHeight
        ) {
          setIsItemsUp(true);
        } else {
          setIsItemsUp(false);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelectOpen, filteredArray, itemsRef.current]);

    useEffect(() => {
      let k;
      filteredArray.some((i) => {
        if (i.text === value) {
          k = i.text;
          return true;
        }
        return false;
      });
      if (k) {
        setIsValueInArray(true);
      } else {
        setIsValueInArray(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <div
        id="no-close"
        className={`droplist${className ? ` ${className}` : ''}`}
      >
        <div
          id={selectId}
          className={`droplist__select${
            upSelectClass ? ` ${upSelectClass}` : ''
          }`}
        >
          <label
            className={`${
              labelClass
                ? labelClass
                : `droplist__label${
                    isInputFocus ? ' droplist__label_focused' : ''
                  }`
            }`}
          >
            {
              <input
                required={required}
                className={`droplist__input${
                  inputClass ? ` ${inputClass}` : ''
                }${readOnly ? ' droplist__input_readonly' : ''}`}
                placeholder={placeholder}
                name={name}
                readOnly={readOnly}
                onChange={handleChange}
                ref={inputRef}
                value={value}
                onClick={handleOpen}
                onFocus={handleFocusInput}
                onBlur={handleBlurInput}
                onKeyDown={handleKeyDown}
                autoComplete="new-password"
              />
            }
            {inputTitle && inputTitle}
          </label>
          {isSelectOpen && (
            <div
              ref={itemsRef}
              id="ul"
              className={`droplist__items${
                isSelectOpen ? ' droplist__items_open' : ''
              }${selectClass ? ` ${selectClass}` : ''}${
                value && withPersonal ? ' droplist__items_with-pesronal' : ''
              }${
                isItemsUp ? ' droplist__items_up' : ' droplist__items_bottom'
              }`}
            >
              {filteredArray &&
                filteredArray.map((item, id) => (
                  <div
                    className="droplist__item"
                    key={id}
                    tabIndex={id + 1}
                    onClick={() => {
                      handleSelect(
                        item.key ? item.key : '',
                        item.text ? item.text : '',
                        item,
                      );
                    }}
                    onKeyDown={(e) => {
                      handleLiKeyDown(e, item.text ? item.text : '', item);
                    }}
                  >
                    <span className="droplist__text">{item.text}</span>
                  </div>
                ))}
              {value && !isValueInArray && withPersonal && (
                <div
                  className="droplist__item"
                  tabIndex={filteredArray && filteredArray.length + 1}
                  onClick={() => {
                    handleTestSelect(value);
                  }}
                  onKeyDown={(e) => {
                    handleLiKeyDown(e, value);
                  }}
                >
                  {' '}
                  <DroplistAddButtonIcon
                    className="droplist__item-plus"
                    fill="droplist__item-plus-fill"
                  />{' '}
                  Добавить{' '}
                  <span className="droplist__text droplist__text_blue">
                    {value}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default Droplist;
