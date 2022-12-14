//component to represent aggregator  
function Aggregator(props) {
    return (
    <div className="Aggregator">
         <h2>To Watch</h2>
        <p>Movies: {props.item }</p>
        <p>Total watch time: {props.total}</p>
    </div>)
}

export default Aggregator;