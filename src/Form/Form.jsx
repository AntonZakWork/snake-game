import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, toggleSettings, toggleStartForm } from '../Store/snakeSlice';
import './Form.scss';
const Form = ({ setRemove }) => {
  const { showSettings } = useSelector((state) => state.snake);
  const maxHeight = Math.floor((window.innerHeight - 220) / 16);
  const maxWidth = Math.floor((window.innerWidth - 350) / 16);
  const dispatch = useDispatch();
  const [removeForm, setRemoveForm] = useState(false);
  const onAnimationEnd = () => {
    dispatch(toggleStartForm());
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { height: 20, width: 20 } });
  const buttonRef = useRef();
  useEffect(() => {
    !showSettings && buttonRef.current.focus();
  }, []);
  const onSubmit = (data) => {
    dispatch(setFormData(data));
    setRemoveForm(true);
    if (showSettings) {
      setRemove((prev) => !prev);
      dispatch(toggleSettings());
    }
  };

  return (
    <div
      className={removeForm ? 'formContainer remove' : 'formContainer'}
      onAnimationEnd={removeForm ? onAnimationEnd : undefined}>
      <form>
        <div className="prop">
          <div>Field height</div>
          <div className="tip" onClick={() => setValue('height', `${maxHeight}`)}>
            Set max for my screen
          </div>
          <input
            type="number"
            placeholder="Height"
            {...register('height', { required: true, max: maxHeight, min: 3 })}
          />
          {errors.height?.type === 'max' && (
            <div className="error">{`Max  allowed height is ${maxHeight}`}</div>
          )}
          {errors.height?.type === 'min' && <div className="error">Too small!</div>}
        </div>
        <div className="prop">
          <div>Field width</div>
          <div className="tip" onClick={() => setValue('width', `${maxWidth}`)}>
            Set max for my screen
          </div>
          <input
            type="number"
            placeholder="Width"
            {...register('width', { required: true, max: maxWidth, min: 3 })}
          />
          {errors.width?.type === 'max' && (
            <div className="error">{`Max allowed width is ${maxWidth}`}</div>
          )}
          {errors.width?.type === 'min' && <div className="error">Too small!</div>}
        </div>
        <div className="prop">
          <div>Snake speed</div>
          <input type="range" placeholder="Snake speed" {...register('snakeSpeed', {})} />
        </div>
        {showSettings ? (
          <>
            <button onClick={handleSubmit(onSubmit)}>Restart now</button>{' '}
            <button
              onClick={(e) => {
                e.preventDefault();
                const values = getValues();
                localStorage.setItem('values', JSON.stringify(values));
                setRemove((prev) => !prev);
                dispatch(toggleSettings());
              }}>
              Apply on the next game
            </button>
          </>
        ) : (
          <button ref={buttonRef} onClick={handleSubmit(onSubmit)}>
            Play!
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;