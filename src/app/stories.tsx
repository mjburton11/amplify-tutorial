import React, { useState } from 'react';
import { xButton } from '../styles/component-styles';
import StoryBox from './story-box';

export default function Stories(props: {}) {
  const [addStory, setAddStory] = useState<boolean>(false);
  return (
    <section
      style={{
        display: 'grid',
        justifyContent: 'center',
        padding: '10vw',
        gap: '1vw',
      }}
    >
      <button
        style={xButton.large}
        onClick={() => {
          setAddStory(!addStory);
        }}
      >
        Add your travel horror story
      </button>
      {addStory ? <StoryBox /> : <></>}
    </section>
  );
}
