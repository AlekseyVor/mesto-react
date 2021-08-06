import {api} from '../utils/Api.js';
import Card from './Card';
import React from 'react';

export default function Main(props) {
    

    const [user,setUser] = React.useState({userAvatar: '',userName: '', userDescription: ''})
    const [cards,setCards] = React.useState([])

    React.useEffect( () => {
        api.getUserInfo()
        .then((user) => {
            setUser({
            userAvatar: user.avatar,
            userName: user.name,
            userDescription: user.about
            })
        })
        .catch((err) => {console.log(err)})
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
        .then((cards) => {
            setCards(cards);
        })
        .catch((err) => {console.log(err)})
    }, [])

    return(
    <main>
        <section className="profile">
            <button type="button" className="profile__avatar-edit" onClick={props.onEditAvatar}><img src={user.userAvatar} alt="Аватар" className="profile__avatar"/></button>
            <div className="profile__info">
                <h1 className="profile__name" id="username">{user.userName}</h1>
                <button type="button" className="profile__user-edit" onClick={props.onEditProfile}></button>
                <p className="profile__job" id="userjob">{user.userDescription}</p>
            </div>
            <button type="button" className="profile__place-edit" onClick={props.onAddPlace}></button>
        </section>
        <section className="places">
        {cards.map( (item)  => { 
                    return (<Card  key={item._id} card={item} onCardClick={props.onCardClick}/>)
        })}
        </section>
    </main>
    )
}





