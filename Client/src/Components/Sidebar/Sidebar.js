import React from 'react'
import NoteList from '../NoteList/NoteList'
import cross from '../../Assets/img/cross.png'
import LastTagsLine from './LastTagsLine'

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
    return(
      <section className="sidebar">
        <div className="sidebar__wrapper">
          <div className="sidebar__container animated fadeIn">
    
            <div className="sidebar__header">
    
              <input
                type="text"
                className="sidebar__input"
                placeholder="Search note by tag..."
                value={this.state.currentTag}
                onChange={this.searchInputHandler}
              />
      
              <div className="sidebar__tag-line">
  
                {this.props.lastTags.length > 0 ? <LastTagsLine lastTags={this.props.lastTags} tagClickHandler={this.tagClickHandler} /> : false}
      
              </div>
    
            </div>

            {this.state.currentTag !== '' ?
              <p className="sidebar__currentSearch animated fadeIn">
                Searching notes with tag "<span>{this.state.currentTag}</span>"
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