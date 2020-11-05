import React from 'react'
import plus from '../../assets/img/plus.svg'

function Sidebar() {
  return(

    <section className="sidebar">
      <div className="sidebar__wrapper">
        <div className="sidebar__container">
  
          <div className="sidebar__header">
  
            <input
            type="text"
            className="sidebar__input"
            placeholder="Search note by tag..." />
    
            <div className="sidebar__tag-line">
    
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 1</span>
              </div>
    
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 2</span>
              </div>
    
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 3</span>
              </div>
    
            </div>
  
          </div>
  
          <div className="sidebar__tasks">
  
  
            <div className="sidebar__task sidebar__task-add">
              <span className="sidebar__task-text">Add new task...</span>
              <img src={plus} alt="Add" />
            </div>
  
            <div className="sidebar__task">
              <span className="sidebar__task-text">Task description</span>
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 3</span>
              </div>
            </div>
  
            <div className="sidebar__task">
              <span className="sidebar__task-text">Task description</span>
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 3</span>
              </div>
            </div>
  
            <div className="sidebar__task">
              <span className="sidebar__task-text">Task description</span>
              <div className="sidebar__tag">
                <div className="sidebar__tag-circle"></div>
                <span className="sidebar__tag-text">Tag Name 3</span>
              </div>
            </div>
  
          </div>
  
        </div>
      </div>
    </section>

  );
}

export default Sidebar;