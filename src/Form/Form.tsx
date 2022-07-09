import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { useTypedSelector } from '../Hooks/useTypedSelector';
import { reset, setFormData, toggleSettings, toggleStartForm } from '../Store/snakeSlice';
import { FormData } from '../Types/SnakeTypes';
import './Form.scss';
type FormProps = {
    setRemove: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: React.FC<FormProps> = ({ setRemove }) => {
  const { showSettings } = useTypedSelector((state) => state.snake);
  const maxHeight = Math.floor(Math.max(((window.innerHeight - 220) / 16), 3));
  const maxWidth = Math.floor(Math.max(((window.innerWidth - 350) / 16), 3));
  const dispatch = useAppDispatch();
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
  } = useForm({ defaultValues: { height: 20, width: 20, snakeSpeed: 50, stonesAmount: 50 } });
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    !showSettings && buttonRef.current!.focus();
  }, []);
  const onSubmit = (data: FormData): void => {
    dispatch(reset())
    dispatch(setFormData(data));
    setRemoveForm(true);
    if (showSettings) {
      setRemove((prev) => !prev);
      dispatch(toggleSettings());
    }
  };
  const onSubmitSave = () => {
    const values = getValues();
    localStorage.setItem('values', JSON.stringify(values));
    setRemove((prev) => !prev);
    dispatch(toggleSettings());
  }
  const onSubmitRestart = (data: FormData) => {
    dispatch(reset());
    dispatch(setFormData(data));
    const values = getValues();
    localStorage.setItem('values', JSON.stringify(values));
    setRemove((prev) => !prev);
    dispatch(toggleSettings());
    
  }
  return (
    <div
      className={removeForm ? 'formContainer remove' : 'formContainer'}
      onAnimationEnd={removeForm ? onAnimationEnd : undefined}>
      <form>
        <div className="prop">
          <div>Field height</div>
          <div className="tip" onClick={() => setValue('height', maxHeight)}>
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
          <div className="tip" onClick={() => setValue('width', maxWidth)}>
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
        <div className="prop">
          <div>Amount of rocks</div>
          <input type="range" placeholder="Amount of stones" {...register('stonesAmount', {})} />
        </div>
        {showSettings ? (
          <>
            <button
              onClick={handleSubmit(onSubmitRestart)}>
              Restart now
            </button>{' '}
            <button
              onClick={handleSubmit(onSubmitSave)}>
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
