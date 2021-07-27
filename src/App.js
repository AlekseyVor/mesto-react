import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup'


function App() {

  function handleEditAvatarClick() {
    document.querySelector('#avatar').classList.add('popup_opened');
}

function handleEditProfileClick() {
    document.querySelector('#profile').classList.add('popup_opened');
}

function handleAddPlaceClick() {
    document.querySelector('#newplace').classList.add('popup_opened');
}

  return (
    
    <>
    <Header/>
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
    <Footer/>
    <PopupWithForm title="Редактировать профиль" id="profile" name="profile-editor" children={<>
    <input type="text" minlength="2" maxlength="40" className="popup__input popup__input_name" placeholder="Имя" id="name" required/>
            <span className="popup__input-error" id="name-error"></span>
           <input type="text" minlength="2" maxlength="200" className="popup__input popup__input_job" placeholder="Профессия" id="about" required/>
            <span className="popup__input-error" id="about-error"></span>
            <button type="submit" className="popup__submit">Сохранить</button>
            </>}/>
    <PopupWithForm title="Новое место" id="newplace" name="place-editor" children={<>
      <input name="name" type="text" minlength="2" maxlength="30" className="popup__input popup__input_place" placeholder="Название" id="place" required/>
             <span className="popup__input-error" id="place-error"></span>
             <input name="link" type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url" required/>
             <span className="popup__input-error" id="url-error"></span>
             <button type="submit" className="popup__submit">Создать</button>
    </>}/>
    <PopupWithForm title="Вы уверены?" id="delete" name="place-remove" children={<>
      <button type="submit" className="popup__submit">Да</button>
    </>}/>
    <PopupWithForm title="Обновить аватар" id="avatar" name="avatar-editor" children={<>
      <input type="url" className="popup__input popup__input_url" placeholder="Ссылка на картинку" id="url-avatar" required/>
             <span className="popup__input-error" id="url-avatar-error"></span>
             <button type="submit" className="popup__submit">Сохранить</button>
    </>}/>
    <ImagePopup/>
    <template className="card-template_type_default" id="cards">
        <div className="place">
            <img src="template" alt="template" className="place__image"/>
            <div className="place__header">
                <h2 className="place__title"></h2>
                <div>
                <button type="button" className="place__like"></button>
                <p className="place__likes">1</p>
                </div>
            </div>
            <button type="button" className="place__delete"></button>
        </div>
    </template>
    </>
  );
}

export default App;


