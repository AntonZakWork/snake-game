import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFormData } from '../Store/snakeSlice';
import './Form.scss';
export default function App() {
  //   const [maxWidthInput, setMaxWidthInput] = useState('20');
  //   const [maxHeightInput, setMaxHeightInput] = useState('20');
  const maxHeight = Math.floor((window.innerHeight - 220) / 16);
  const maxWidth = Math.floor((window.innerWidth - 370) / 16);
  console.log(maxWidth, maxHeight);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { height: 20, width: 20 } });

  const onSubmit = (data) => dispatch(setFormData(data));

  return (
    <div className="formContainer">
      <form>
        <div className="prop">
          <div>Field height</div>
          <div className="tip" onClick={() => setValue('height', `${maxHeight}`)}>
            Set max for my screen
          </div>
          <input
            type="number"
            placeholder="Height"
            {...register('height', { required: true, max: { maxHeight } })}
          />
          {errors.height && <div className="error">{`Max height is ${maxHeight}`}</div>}
        </div>
        <div className="prop">
          <div>Field width</div>
          <div className="tip" onClick={() => setValue('width', `${maxWidth}`)}>
            Set max for my screen
          </div>
          <input
            type="number"
            placeholder="Width"
            {...register('width', { required: true, max: { maxWidth } })}
          />
          {errors.width && <div className="error">{`Max width is ${maxWidth}`}</div>}
        </div>
        <div className="prop">
          <div>Snake speed</div>
          <input type="range" placeholder="Snake speed" {...register('snakeSpeed', {})} />
        </div>
        <button onClick={handleSubmit(onSubmit)}>Play!</button>
      </form>
    </div>
  );
}
