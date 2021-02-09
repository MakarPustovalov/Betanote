import React from 'react'
import WorkSpace from '../WorkSpace/WorkSpace'
import logo from '../../Assets/img/logo.png'

class MainSide extends React.Component {
  constructor() {
    super()
    this.state = {
      isTagInputShow: false
    }
    this.setTagBtnHandler = this.setTagBtnHandler.bind(this)
    this.hideTagInput = this.hideTagInput.bind(this)
  }

  setTagBtnHandler() {
    this.setState(state => {return {isTagInputShow: !state.isTagInputShow}}, () => {
      const elem = document.querySelector('.mainside__tag-input')
      if (this.state.isTagInputShow && elem) {
        elem.style.visibility = "visible"
        elem.classList.add('animate__fadeInDown')
        elem.classList.remove('animate__fadeOut')
      } else if (elem) {
        elem.classList.add('animate__fadeOut')
        elem.classList.remove('animate__fadeInDown')
      }
    })
  }

  hideTagInput() {
    this.setState({isTagInputShow: false}, () => {
        const elem = document.querySelector('.mainside__tag-input')
        if (elem) {
          elem.classList.remove('animate__fadeInDown')
          elem.classList.add('animate__fadeOut')
        }
      }
    )
  }

  render() {

    return(
      <section className="mainside">
        <div className="mainside__wrapper">
          <div className="mainside__container">

            {this.props.isWorkspaceOn ? 
              <WorkSpace
              currentNote={this.props.currentNote}
              inputHandler={this.props.inputHandler}
              saveHandler={this.props.saveHandler}
              closeWorkspace={this.props.closeWorkspace}
              deleteNoteHandler={this.props.deleteNoteHandler}
              resetChanges={this.props.resetChanges}
              setTagBtnHandler={this.setTagBtnHandler}
              tagInputHandler={this.props.tagInputHandler}
              getCookie={this.props.getCookie}
              hideTagInput={this.hideTagInput}
              />
              :
              <div className="mainside__logo-container animate__animated animate__fadeIn">
                
                {!(this.props.getCookie('needGuide')) ?
                  <p className="mainside__welcome">Welcome to</p>
                : false}

                <img src={logo} alt="Betanote" className="mainside__logo"></img>

                {!(this.props.getCookie('needGuide')) ?
                  <p className="mainside__tip">Click to button “Add a new note”<br/>
                  to create a note</p>
                : false}

              </div>
            }

          </div>
        </div>
      </section>

    )
  }
}

export default MainSide;