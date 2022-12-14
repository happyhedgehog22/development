//component to represent a single movie 
function Movie(props) {
    return (
    <div className="Movie">
        <h3>{props.item.name}</h3>
        <p>Rating: {props.item.rating}%</p>
        <p>Length in minutes: {props.item.length}</p>
        <p>Genre: {props.item.genre}</p>
        <img src={props.item.image} width="400"/>
        <p></p>
        <button onClick={() => {props.addToList(props.item)}}>Add to list</button>  
        <button onClick={() => {props.removeFromList(props.item)}}>Remove from list</button>  
    </div>)
}

export default Movie;
