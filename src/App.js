import "./App.css";
import { useEffect, useState } from "react";
import movieData from "./assets/movie-data.json";
import Movie from "./components/Movie";
import Aggregator from "./components/Aggregator";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
movieData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  
  //using state to keep track of genre selected, length selected, sorting 
  const [cartItems, setCartItems] = useState([])
  const [genre, setGenre] = useState("All");
  const [length, setLength] = useState("All");
  const originalList = movieData

  const [filteredDataList, setFilteredDataList] = useState(originalList)
  const [filteredDataList2, setFilteredDataList2] = useState(originalList)

  const [sorting, setSorting] = useState(false)
  

  //this is called when the button is clicked to set the type to be whatever genre is clicked 
  const selectGenre = (val) => {
    setGenre(val);
  }


  //this is called when the button is clicked to set the type to whichever length is chosen (over or under two hours)
  const selectLength = (val) => {
    setLength(val);
  }

  //this method is used to filter by genre and check if the genre of the item passed in matches the genre variable set by the button click
  const matchesGenre = (item) => {
    if(genre === "All") { 
      return true
    } else if (genre === item.genre) {
      return true
    } else {
      return false
    }
  }

  //this method is used to filter by length and check if the length of the item passed in matches the length variable set by the button click
  const matchesLength = (item) => {
    // all items should be shown when no filter is selected
    if(length === "All") { 
      return true
    } else if (length === "Under" && item.length < 120) {
      return true
    } else if (length === "Over" && item.length > 120) {
      return true
    } 
    else {
      return false
    }
  }

  //sort the list from highest rating to lowest rating 
  const sortByRating = (list) => {
    const sortedArray = list.sort((itemA, itemB) => itemB.rating - itemA.rating)
    setFilteredDataList([...sortedArray])
  }

  //useEffect to watch when genre changes
  useEffect(() => {
    sortByGenre()
  }, [genre])

  
  //sort by genre 
  const sortByGenre = () => {
    //first filter by genre 
    const filteredData = movieData.filter(matchesGenre)

    //set the filtered data list to be 
    setFilteredDataList([...filteredData])
    setFilteredDataList2([...filteredData])

    if (length != 'All'){
      //check if filter by length 
      const filteredData1 = filteredData.filter(matchesLength)
      setFilteredDataList(filteredData1)
      //check if sorting button is clicked
      if (sorting) {
        sortByRating(filteredData1)
      }
    } else {
      //if not filtering by length, check sort 
      if (sorting) {
        sortByRating(filteredData)
      }
    }
  }

  //useEffect to watch for length changes
  useEffect(() => {
    sortByLength()
  }, [length])

  const sortByLength = () => {
    //this is either original list or filtered by genre list as set in setType1
    const filteredData1 = filteredDataList2.filter(matchesLength)
    setFilteredDataList(filteredData1)

    //if sortings checked then sort by this list 
    if (sorting) {
      sortByRating(filteredData1)
    }
  }

  //useEffect to watch for sorting changes 
  useEffect(() =>{
    console.log('sorting')
    if (sorting){
      sortByRating(filteredDataList)
      // s
    } else {
      // sorting is unchecked 
      setFilteredDataList([...originalList])
      setFilteredDataList2([...originalList])

      if (genre != 'All'){
        sortByGenre()
      } 
      if (length != 'All'){
        sortByLength()
      } 
    }
  }, [sorting])


  function addToList(item) {
    setCartItems([...cartItems, item])
  }

  //filter out by title 
  function removeFromList(item) {
    const newList = cartItems.filter((movie) => movie.name != item.name)
    setCartItems([...newList])
  }

  function calcTotal() {
    let total = 0
    for (let i=0; i < cartItems.length; i++){
      total += cartItems[i].length
    }
    return total
  }

  function mapCartItems() {
     return cartItems.map((item) => (item.name ))
  }

  useEffect(() => {
    calcTotal()
  }, [cartItems])

  return (
    <div className="App">
      <h1>Movies</h1> {/* TODO: personalize your bakery (if you want) */}

      <div>
        <input type="radio" value="All" name="genre" onClick={() => selectGenre("All")}/> All
        <input type="radio" value="Rom Com" name="genre" onClick={() => selectGenre("Rom Com")}/> Rom Com
        <input type="radio" value="Action" name="genre" onClick={() => selectGenre("Action")}/> Action
        <input type="radio" value="Musical" name="genre" onClick={() => selectGenre("Musical")}/> Musical
        <input type="radio" value="Drama" name="genre" onClick={() => selectGenre("Drama")}/> Drama
        <input type="radio" value="Dystopian" name="genre" onClick={() => selectGenre("Dystopian")}/> Dystopian
      </div>

      <div>
        <input type="radio" value="All" name="length" onClick={() => selectLength("All")}/> All
        <input type="radio" value="Under 2 hours" name="length" onClick={() => selectLength("Under")}/> Under 2 hours
        <input type="radio" value="Over 2 hours" name="length" onClick={() => selectLength("Over")}/> Over 2 hours
      </div>

      <div>
        <input type="checkbox" value="Sort By Rating" name="rating" onClick={() => setSorting(!sorting)}/> Sort by rating high to low
      </div>


      <div>
        {filteredDataList.map(item => 
          <Movie item={item} addToList={addToList} removeFromList={removeFromList}/>
        )}
      </div>

      <div>
        <Aggregator item={mapCartItems()} total={calcTotal()}/>
      </div>
    </div>
  );
}

export default App;
