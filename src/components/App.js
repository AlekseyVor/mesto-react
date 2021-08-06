import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser,setCurrentUser] = React.useState({})

  React.useEffect( () => {
    api.getUserInfo()
    .then((user) => {
      setCurrentUser({user})
    })
    .catch((err) => {console.log(err)})
}, [])

console.log(currentUser);

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
    
    <div className="page">
    <Header/>
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
    <Footer/>
    <PopupWithForm title="Редактировать профиль" id="profile" name="profile-editor" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
      <input type="text" minLength="2" maxLength="40" className="popup__input popup__input_name" placeholder="Имя" id="name" required/>
      <span className="popup__input-error" id="name-error"></span>
      <input type="text" minLength="2" maxLength="200" className="popup__input popup__input_job" placeholder="Профессия" id="about" required/>
      <span className="popup__input-error" id="about-error"></span>
    </PopupWithForm>
    <PopupWithForm title="Новое место" id="newplace" name="place-editor" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
      <input name="name" type="text" minLength="2" maxLength="30" className="popup__input popup__input_place" placeholder="Название" id="place" required/>
      <span className="popup__input-error" id="place-error"></span>
      <input name="link" type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url" required/>
      <span className="popup__input-error" id="url-error"></span>
    </PopupWithForm>
    <PopupWithForm title="Вы уверены?" id="delete" name="place-remove" isOpen={false} onClose={closeAllPopups} buttonText="Да">
    </PopupWithForm>
    <PopupWithForm title="Обновить аватар" id="avatar" name="avatar-editor" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
      <input type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url-avatar" required/>
            <span className="popup__input-error" id="url-avatar-error"></span>
    </PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
    
  );
}

export default App;


