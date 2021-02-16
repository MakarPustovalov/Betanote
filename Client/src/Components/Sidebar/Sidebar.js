import React from 'react'
import NoteList from '../NoteList/NoteList'
import cross from '../../Assets/img/cross.png'
import LastTagsLine from './LastTagsLine'

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      currentTag: '',
      lastTags: [] //last 3 tags
    }
  }

  tagClickHandler = event => {
    this.setState({currentTag: event.currentTarget.id})
  }

  cancelSearch = () => {
    this.setState({currentTag: ''})
  }

  searchInputHandler = event => {
    this.setState({currentTag: event.target.value})
  }

  // get list of last 3 tags

  getLastTags = () => {
    const tagsArr = this.props.notes.map(elem => elem.tag)

    const cleanTagsArr = []
    //Clear dublicates
    for (let i = 0; i < tagsArr.length; i++) {
      const elem = tagsArr[i]
      if (!(elem === tagsArr[i - 1] || elem === '')) {
        cleanTagsArr.push(elem)
      }
    }

    const newTags = []
    //Shortening to 3 elements in massive
    for (let i = 0; i < 3 && i < cleanTagsArr.length; i++) {
      newTags.push(cleanTagsArr[i])
    }

    this.setState({lastTags: newTags})
  }

  componentDidUpdate(prevProps) {
    // Compare tags arr in props
    const prevTags = prevProps.notes.map(elem => elem.tag)
    const tags = this.props.notes.map(elem => elem.tag)

    // Get changed elements
    const comparedArr = prevTags.filter((elem, i) => {
      return tags[i] !== elem
    })

    let isPropsChanged = false

    if ((comparedArr.length > 0) || (prevTags.length !== tags.length)) isPropsChanged = true

    // Update state if tags arr changed

    if (isPropsChanged) this.getLastTags()
  }

  componentDidMount() {
    this.getLastTags()
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Compare notes arr in props
    const prevNotes = this.props.notes
    const notes = nextProps.notes

    // Get changed notes
    const comparedArr = prevNotes.filter((elem, i) => {
      return notes[i] !== elem
    })

    let isPropsChanged = false

    if ((comparedArr.length > 0) || (prevNotes.length !== notes.length)) isPropsChanged = true

    if (isPropsChanged) return true
    if (nextState !== this.state) return true
    return false
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
  
                {this.state.lastTags.length > 0 ? <LastTagsLine lastTags={this.state.lastTags} tagClickHandler={this.tagClickHandler} /> : false}
      
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