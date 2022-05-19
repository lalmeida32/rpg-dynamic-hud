import { CharacterSheet } from './CharacterSheet';

export const AppGameRoom = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      <CharacterSheet />
    </div>
  );
};
