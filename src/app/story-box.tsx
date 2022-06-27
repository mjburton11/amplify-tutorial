import React, { useState } from 'react';

export default function StoryBox(props: {}) {
  const [story, setStory] = useState<string>('');
  const saveStory = () => {};
  return (
    <section>
      <textarea
        style={{
          minWidth: '300px',
          maxWidth: '400px',
          minHeight: '200px',
          maxHeight: '400px',
        }}
        placeholder="Enter your story here..."
        value={story}
        onChange={(event) => setStory(event.target.value)}
      ></textarea>
      <button
        type="button"
        onClick={() => {
          saveStory();
        }}
      >
        Save
      </button>
    </section>
  );
}
