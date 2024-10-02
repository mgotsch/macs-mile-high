
# Mac's Mile High

**Mac's Mile High** is a single-page React application that displays my personally curated map of the greater Denver area, featuring some of top spots around the Mile High City. Whether you're looking for a great bar, park, restaurant, or activity, this app makes it easy to discover cool spots across Denver in a flash (or at least faster than the 7 years it took me to compile this list lol)!

## Features

- **Interactive Map**: The app is built using **Mapbox GL**, featuring a custom map style I created to align with the overall look and feel of the application.
- **Favorite Places**: Explore a variety of spots around Denver, categorized into the following types: Bars, Parks, Restaurants, Activities, Coffeeshops, Breakfast places, Stores, Breweries, and Sweets.
- **GeoJSON Data**: The map is populated using GeoJSON data pulled from my **Google Maps** and enhanced with additional data (images, descriptions, ratings, and price ranges) via a custom tool I created using the **Google Places API**.
- **Collapsible Filter**: Easily filter places by category using the filter box located in the bottom-right corner of the screen. Toggle all types with the 'All' option.
- **Popups for More Info**: Clicking on any pin opens a popup with the name, address, image, and a description of the location (if available).
- **Map Bounds**: The map is restricted to the greater Denver area to prevent accidental navigation away from the core focus area.
- **Local Expertise**: I don't want to toot my own horn, but I've been around the block for a minute and love trying out new spots (and, apparently, compulsively saving them to Google Maps). If you find a spot on here that you don't like you're probably wrong!

## Hosting

Coming soon! Stay tuned for the hosted version of **Mac's Mile High**.

## How the Dataset Was Created

The dataset was initially pulled from **Google Takeout's My Maps**. I manually categorized each place into one of the types ('Bar', 'Park', 'Restaurant', etc.).

To augment the data, I created a custom tool that:
1. Uses the place name and address from each geojson feature to pull the Google **Place ID** using the **Find Place from Text** request from the **Google Places API**.
2. Uses the **Place ID** to fetch additional data (images, editorial summaries, ratings, and price range) through a **Place Details** request.
3. From the photos info, it takes the first `photo_reference` to generate a URL that is used in the app to display images.

This tool can be found [here](https://github.com/mgotsch/google-maps-geojson-augmenter) (currently being finalized).

## Future Enhancements

- **Light Mode**: Introducing a light theme for users who prefer a brighter interface.
- **Additional Categories**: Expanding the types of places and adding more specific filters.
- **User Suggestions**: A form allowing users to suggest new places, which I can review and add to the map if they meet the criteria.
- **Currently Open Toggle**: An option to display only the places currently open based on their business hours.
- **Deals Mode**: Highlighting places offering active deals for the day.
- **Additional Data**: Including more data points for locations, such as reviews or menu links.
