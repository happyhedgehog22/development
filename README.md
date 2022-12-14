# Development

### Link to Deployed Website
https://happyhedgehog22.github.io/development

### Goal and Value of the Application
The goal of this application is to show users potenial movies that they might be interested in watching and be able to save them to a list to watch later. They can filter by genere or length (over two hours or under two hours) and sort by rotten tomatoes rating from high to low. 

### Usability Principles Considered
I used a clear hierarchy for my design. I used h1 heading for the title and then cards for each item. The cards all had a clear hierarchy within with titles being an h3 heading. The aggregator (to watch list) was designated with an h2 heading. The buttons to sort and filter were placed at the top. I used clear language to explain that checking the sort box will sort the movies by rating from high to low. 

### Organization of Components
I have two components: one for movies and one for the to watch list. The movie component takes in props which is a movie from movie-data.json and displays name, rating, length, genre, and an image. It also has buttons to add or remove from the aggregator. The component for the aggregator displays the movies added to your list and the total time of all the movies on your list. 

### How Data is Passed Down Through Components
The movie component takes in a movie-data item, addToList and removeFromList function. The movie-data item is used in Movie component to display information about the movie including name, rating, genre and the image as specified in the movie-data.json. The addToList function and removeFromList functions are also passed into this and used to add the movies to the list. The agreggator component takes in a list of all movies added to list and the total calculated from the calcTotal method defined in App.js

### How the User Triggers State Changes
User triggers a number of different state changes. I use state to keep track of the items in the cart, which buttons are selected and the lists of movies to display. When the user checks the sorting button, then the sorting variable is set to either true or false to either resort or unsort the movies. The state for genre or length is also updated based on whatever filter selection the user makes.
