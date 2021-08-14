import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser,setCurrentUser] = React.useState({name: '', about: '', avatar: ''})
  const [cards,setCards] = React.useState([])

  React.useEffect(() => {
      api.getInitialCards()
      .then((cards) => {
          setCards(cards);
      })
      .catch((err) => {console.log(err)})
  }, [])
  React.useEffect( () => {
    api.getUserInfo()
    .then((user) => {
      setCurrentUser(user)
    })
    .catch((err) => {console.log(err)})
}, [])

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

  function handleUpdateUser(data) {
    api.patchUserInfo(data)
    .then((res) => { 
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(data) {
    console.log(data);
    api.patchUserAvatar(data.avatar)
    .then((res) => { 
        setCurrentUser(res);
        closeAllPopups();
    })
    .catch((err) => {console.log(err)})
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.updateLike(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} 

function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
    });
}

function handleAddPlace(card) {
    api.postNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
        })
    .catch((err) => {console.log(err)})
}

  return (
    
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
    <Header/>
    <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
    <Footer/>
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}  onUpdateUser={handleUpdateUser}/>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
    <PopupWithForm title="Вы уверены?" id="delete" name="place-remove" isOpen={false} onClose={closeAllPopups} buttonText="Да">
    </PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;


