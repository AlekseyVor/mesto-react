export default function Card(props) {
        function handleClick() {
        props.onCardClick(props.card);
    } 
        return (
            <>
            <div className="place">
                    <img src={props.card.link} alt={props.card.name} className="place__image" onClick={handleClick}/>
                    <div className="place__header">
                        <h2 className="place__title">{props.card.name}</h2>
                        <div>
                        <button type="button" className="place__like"></button>
                        <p className="place__likes">{props.card.likes.length}</p>
                        </div>
                    </div>
                    <button type="button" className="place__delete"></button>
            </div>
            </>
        )
}