export default function Main(props) {
    return(
    <main>
        <section className="profile">
            <button type="button" className="profile__avatar-edit" onClick={props.onEditAvatar}><img src="test" alt="Аватар" className="profile__avatar"/></button>
            <div className="profile__info">
                <h1 className="profile__name" id="username">Жак-Ив Кусто</h1>
                <button type="button" className="profile__user-edit" onClick={props.onEditProfile}></button>
                <p className="profile__job" id="userjob">Исследователь океана</p>
            </div>
            <button type="button" className="profile__place-edit" onClick={props.onAddPlace}></button>
        </section>
        <section className="places">
        </section>
    </main>
    )
}





