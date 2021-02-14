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
        elem.classList.add('fadeInDown')
        elem.classList.remove('fadeOutUp')
      } else if (elem) {
        elem.classList.add('fadeOutUp')
        elem.classList.remove('fadeInDown')
      }
    })
  }

  hideTagInput() {
    this.setState({isTagInputShow: false}, () => {
        const elem = document.querySelector('.mainside__tag-input')
        if (elem) {
          elem.classList.remove('fadeInDown')
          elem.classList.add('fadeOutUp')
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
                noteInputHandler={this.props.noteInputHandler}
                saveCurrentNote={this.props.saveCurrentNote}
                closeWorkspace={this.props.closeWorkspace}
                deleteNoteHandler={this.props.deleteNoteHandler}
                resetChanges={this.props.resetChanges}
                setTagBtnHandler={this.setTagBtnHandler}
                hideTagInput={this.hideTagInput}
              />
              :
              <div className="mainside__logo-container animated fadeIn">

                <img src={logo} alt="Betanote" className="mainside__logo"></img>

              </div>
            }

          </div>
        </div>
      </section>

    )
  }
}

export default MainSide;