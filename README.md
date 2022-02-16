# Hamburg Stairs Map

https://xennis.github.io/hamburg-stairs-map/

## Data set

Overpass API query ([Overpass turbo web UI](https://overpass-turbo.eu))

```
[out:json][timeout:25];
{{geocodeArea:Hamburg}}->.searchArea;
// gather results
(
  way["highway"="steps"](area.searchArea);
);
// print results
out body;
>;
out skel qt;
```

The data included in steps-hamburg.min.js is from [OpenStreetMap](https://www.openstreetmap.org). The data is made available under [ODbL](https://opendatacommons.org/licenses/odbl/1-0/).