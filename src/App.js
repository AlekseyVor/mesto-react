import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';
import React from 'react';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
}

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
}

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
}
function handleCardClick(card) {
  setSelectedCard(card);
}

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <>
    <div className="page">
    <Header/>
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
    <Footer/>
    <PopupWithForm title="Редактировать профиль" id="profile" name="profile-editor" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <input type="text" minlength="2" maxlength="40" className="popup__input popup__input_name" placeholder="Имя" id="name" required/>
      <span className="popup__input-error" id="name-error"></span>
      <input type="text" minlength="2" maxlength="200" className="popup__input popup__input_job" placeholder="Профессия" id="about" required/>
      <span className="popup__input-error" id="about-error"></span>
      <button type="submit" className="popup__submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm title="Новое место" id="newplace" name="place-editor" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
      <input name="name" type="text" minlength="2" maxlength="30" className="popup__input popup__input_place" placeholder="Название" id="place" required/>
      <span className="popup__input-error" id="place-error"></span>
      <input name="link" type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url" required/>
      <span className="popup__input-error" id="url-error"></span>
      <button type="submit" className="popup__submit">Создать</button>
    </PopupWithForm>
    <PopupWithForm title="Вы уверены?" id="delete" name="place-remove" isOpen={false} onClose={closeAllPopups}>
      <button type="submit" className="popup__submit">Да</button>
    </PopupWithForm>
    <PopupWithForm title="Обновить аватар" id="avatar" name="avatar-editor" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <input type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url-avatar" required/>
            <span className="popup__input-error" id="url-avatar-error"></span>
            <button type="submit" className="popup__submit">Сохранить</button>
    </PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
    </>
  );
}

export default App;


