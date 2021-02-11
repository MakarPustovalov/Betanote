import React from 'react';
import './GuidePage.scss'
import UI1 from '../../Assets/img/guide/UI1.jpg'
import UI2 from '../../Assets/img/guide/UI2.jpg'
import UI3 from '../../Assets/img/guide/UI3.png'
import UI4 from '../../Assets/img/guide/UI4.png'

const GuidePage = () => {
  return (
    <>
      <section className="guide">
        <div className="container">
          <h2 className="guide__title animate__animated animate__fadeInLeft">How to use BetaNote: quick guide</h2>
          <p className="guide__text animate__animated animate__fadeIn">Welcome to BetaNote! Let's take a look at the user interface.
          Find button "<span>Add new note</span>" and click on it to create your first note</p>
          <img src={UI1} alt="" className="guide__img animate__animated animate__fadeIn"/>
          <p className="guide__text animate__animated animate__fadeIn">There you are. Now you can see workspace. Let's take a look at the menubar. There you can see field (<span>1</span>) where you can type a name of your note.
          If you want to delete your note - click button "<span>2</span>". You can also add a tag for you note - click button "<span>3</span>" and type it in opened modal window.
          You can reset unsaved changes in your note by clicking button "<span>4</span>". to save your note - click button "<span>5</span>". When you are done, click button "<span>6</span>"
          to close workspace.</p>
          <img src={UI2} alt="" className="guide__img animate__animated animate__fadeIn"/>
          <p className="guide__text">When you save your note, it will be added inside the list at the left sidebar.</p>
          <img src={UI3} alt="" className="guide__img animate__animated animate__fadeIn"/>
          <p className="guide__text">Also you can navigating by tags (this is why they are making sense).
          Type a tag in field "<span>Search note by tag</span>" or simply click on a tag of note in the list,
          or choose and click tag in list of last 3 tags - and you will get a list with notes, which have this tag.</p>
          <img src={UI4} alt="" className="guide__img animate__animated animate__fadeIn"/>
          <p className="guide__text">To cancel searching - click to cross (<span>X</span>) after line "<span>Searching notes with tag [tagname]</span>"</p>
          <p className="guide__text">Hope you are doing great with this app!
          If you want to contact me and suggest or ask something - send mail to <a href="mailto:makarrpustovalov@gmail.com">makarrpustovalov@gmail.com</a></p>
        </div>
      </section>
    </>
  );
}

export default GuidePage;