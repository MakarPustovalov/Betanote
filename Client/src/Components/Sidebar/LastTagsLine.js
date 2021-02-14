import React from 'react';

const LastTagsLine = ({lastTags, tagClickHandler}) => {
  return (
    <>
      {
        lastTags.map(tag => {
          return(
            <div
              id={tag}
              key={Math.floor(Math.random() * 1000)}
              className="sidebar__tag animated fadeIn"
              onClick={tagClickHandler}
            >
              <div className="sidebar__tag-circle"></div>
              <span className="sidebar__tag-text">{tag}</span>
            </div>
          )
        })
      }
    </>
  );
}

export default LastTagsLine;
