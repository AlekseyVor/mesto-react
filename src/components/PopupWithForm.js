export default function PopupWithForm(props) {
    return (
    <div className="popup__overlay" id={props.id}>
    <div className="popup__container popup__container_theme_white">
         <h2 className="popup__title">{props.title}</h2>
         <form className={`form ${props.name}`} name={`${props.name}`} novalidate> 
            {props.children}
        </form>
         <button type="button" className="popup__close"></button>
     </div>
     </div>
    )
    }
