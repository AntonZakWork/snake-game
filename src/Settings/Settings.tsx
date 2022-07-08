import React from 'react';
import Form from '../Form/Form';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { useTypedSelector } from '../Hooks/useTypedSelector';
import { toggleSettings } from '../Store/snakeSlice';
import './Settings.scss';

type SettingsProps = {
    remove: boolean
    setRemove: React.Dispatch<React.SetStateAction<boolean>>
}

const Settings: React.FC<SettingsProps> = ({ remove, setRemove }) => {
  const { showSettings } = useTypedSelector((state) => state.snake);
  const dispatch = useAppDispatch();
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
