# Google Maps TV
Custom MODX Google Maps Marker Template Variable.
Adds a Google Map along with additional fields. Ideal for websites that use a lot of address related information.

## Features
- Clean interface
- Google Maps preview
- Generate latitude and longitude with one click
- Drag 'n drop to easily find and change the latitude and longitude of correct location
- Stored in JSON
- Allows several instances of Google Maps

## Setup Google Maps API key
- You need a Google Maps API key to be abled to access the map. Please restrict this key to your domain to prevent unauthorized usage of your key.
- Enable the APIs (libraries) "Maps JavaScript API" and "Geocoding API"
- Make sure you have configured an a valid billing account

## Manager Usage
- Install the Package
- Create a new TV
- Select under the tab Input Options : Input Type *Maps Tv*
- Store your Google Maps API key (see above) in the system settings section "mapstv"
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

# Free Extra
This is a free extra and the code is publicly available for you to change. The extra is being actively maintained and you're free to put in pull requests which match our roadmap. Please create an issue if the pull request differs from the roadmap so we can make sure we're on the same page.

Need help? [Approach our support desk for paid premium support.](mailto:service@sterc.com)
