import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../Form/Form';
import { toggleSettings } from '../Store/snakeSlice';
import './Settings.scss';
const Settings = ({ remove, setRemove }) => {
  const { showSettings } = useSelector((state) => state.snake);
  const dispatch = useDispatch();
  return (
    <>
      {showSettings && (
        <div
          className={remove ? 'settings hidden' : 'settings'}
          onAnimationEnd={
            remove
              ? () => {
                  dispatch(toggleSettings());
                }
              : undefined
          }>
          <Form setRemove={setRemove} />
        </div>
      )}
    </>
  );
};

export default Settings;
