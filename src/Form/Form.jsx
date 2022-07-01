import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormData, toggleStartForm } from '../Store/snakeSlice';
import './Form.scss';
export default function App() {
  const maxHeight = Math.floor((window.innerHeight - 220) / 16);
  const maxWidth = Math.floor((window.innerWidth - 350) / 16);
  const dispatch = useDispatch();
  const [remove, setRemove] = useState(false);
  const onAnimationEnd = () => {
    dispatch(toggleStartForm());
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { height: 20, width: 20 } });
  const buttonRef = useRef();
  useEffect(() => {
    buttonRef.current.focus();
  }, []);
  const onSubmit = (data) => {
    dispatch(setFormData(data));
    setRemove(true);
  };

  return (
    <div
      className={remove ? 'formContainer remove' : 'formContainer'}
      onAnimationEnd={remove ? onAnimationEnd : undefined}>
      <form>
        <div className="prop">
          <div>Field height</div>
          <div className="tip" onClick={() => setValue('height', `${maxHeight}`)}>
            Set max for my screen
          </div>
          <input
            type="number"
            placeholder="Height"
            {...register('height', { required: true, max: maxHeight })}
          />
          {errors.height && <div className="error">{`Max  allowed height is ${maxHeight}`}</div>}
        </div>
        <div className="prop">
          <div>Field width</div>
          <div className="tip" onClick={() => setValue('width', `${maxWidth}`)}>
            Set max for my screen
          </div>
          <input
            type="number"
            placeholder="Width"
            {...register('width', { required: true, max: maxWidth })}
          />
          {errors.width && <div className="error">{`Max allowed width is ${maxWidth}`}</div>}
        </div>
        <div className="prop">
          <div>Snake speed</div>
          <input type="range" placeholder="Snake speed" {...register('snakeSpeed', {})} />
        </div>
        <button ref={buttonRef} onClick={handleSubmit(onSubmit)}>
          Play!
        </button>
      </form>
    </div>
  );
}
