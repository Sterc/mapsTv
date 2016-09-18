# MapsTV
Custom MODX Google Maps Marker Template Variable.
Adds a Google Maps and several fields. Ideal for Sites that use a lot of address related information.

## Features
- Clean interface
- Google Maps Preview
- Generate Latitude and Longitude with one button click
- Drag 'n Drop to easily find and change the latitude and longitude of correct location
- Stored in JSON
- Allows several instances of Google Maps
- Snippet for JSONtoChunk


## Manager Usage
- Install the Package
- Create a new TV
- Select under the tab Input Options : Input Type *Maps Tv*
- Save and you're Done

## Template Usage
    [[*tvValue:JSONtoChunk=`ChunkName`]]

### Placeholders in chunk
- _Street_ : [[+street]]
- _Housenumber_ : [[+housenumber]]
- _Zipcode_ : [[+zipcode]]
- _City_ : [[+city]]
- _State_ : [[+state]]
- _Country_ : [[+country]]
- _Latitude_ : [[+latitude]]
- _Longitude_ : [[+longitude]]
