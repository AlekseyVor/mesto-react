import {api} from '../utils/Api.js';
import {config} from '../utils/constants.js';
import Card from './Card';
import React from 'react';

export default function Main(props) {
    

    const [user,setUser] = React.useState({userAvatar: '',userName: '', userDescription: ''})
    const [cards,setCards] = React.useState([])

    React.useEffect( () => {
        api.getUserInfo(config.urlMe, config.methodGET, config.token)
        .then((user) => {
            setUser({
            userAvatar: user.avatar,
            userName: user.name,
            userDescription: user.about
            })
        })
    }, [])

    React.useEffect(() => {
        api.getInitialCards(config.urlCards, config.methodGET, config.token)
        .then((cards) => {
            setCards(cards);
        })
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
        {cards.map( (item, i)  => { 
                    return (<Card  key={i} card={item} onCardClick={props.onCardClick}/>)
        })}
        </section>
    </main>
    )
}





