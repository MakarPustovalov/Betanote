import React from 'react'
import NoteList from '../NoteList/NoteList'
import cross from '../../Assets/img/cross.png'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      currentTag: ''
    }
    this.tagClickHandler = this.tagClickHandler.bind(this)
    this.cancelSearch = this.cancelSearch.bind(this)
    this.searchInputHandler =this.searchInputHandler.bind(this)
  }

  tagClickHandler(event) {
    this.setState({currentTag: event.currentTarget.id})
  }

  cancelSearch() {
    this.setState({currentTag: ''})
  }

  searchInputHandler(event) {
    this.setState({currentTag: event.target.value})
  }

  render() {
    console.log(this.state)

    return(
      <section className="sidebar">
        <div className="sidebar__wrapper">
          <div className="sidebar__container animate__animated animate__fadeIn">
    
            <div className="sidebar__header">
    
              <input
                type="text"
                className="sidebar__input"
                placeholder="Search note by tag..."
                value={this.state.currentTag}
                onChange={this.searchInputHandler}
              />
      
              <div className="sidebar__tag-line">
  
                {this.props.lastTags.length > 0 ?
                  this.props.lastTags.map(tag => {
                    return(
                      <div
                        id={tag}
                        key={Math.floor(Math.random() * 1000)}
                        className="sidebar__tag"
                        onClick={this.tagClickHandler}
                      >
                        <div className="sidebar__tag-circle"></div>
                        <span className="sidebar__tag-text">{tag}</span>
                      </div>
                    )
                  }) : false
                }
      
              </div>
    
            </div>

            {this.state.currentTag !== '' ?
              <p className="sidebar__currentSearch">
                Notes with tag <span>{this.state.currentTag}</span>
                <img src={cross} alt="Cancel" onClick={this.cancelSearch}/>
              </p>
            : false}
  
            <NoteList
              notes={this.props.notes}
              noteClickHandler={this.props.noteClickHandler}
              createNewNote={this.props.createNewNote}
              currentTag={this.state.currentTag}
              tagClickHandler={this.tagClickHandler}
            />
    
          </div>
        </div>
      </section>
    );
  }
}

export default Sidebar;