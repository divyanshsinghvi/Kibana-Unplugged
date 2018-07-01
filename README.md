# Kibana Unplugged

## Do what Kibana never could

Kibana unplugged is a **package management system** for kibana, much like PyPi and pip or anaconda for python. It aims to provide a Kibana version agnostic and rendering engine independent support for HTML and js modules for kibana, all while dynamically integrating plugin visualizations to kibana data, just like a Kibana plugin would function.

### Pros

 - No need to worry about constantly updating your plugin to match pace with the flux in Kibana code.
 - Simple YAML syntax to add configuration options to your plugin. UI is taken care of automatically.
 - You can even take elastic DSL as input and use multiple aggregations, something that Kibana very much lags at right now.

### What it is not

Kibana unplugged does not currently provide tools for editing current visualizations in ES, it is made for adding new visualizations and integrating web pages into Kibana.

## How to use:

 - Write a YAML to define your config page, a es-driver.js to handle elastic search data and a plugin.html with the content you want to render.
  - Use *plug* to plug your visualization into kibana. You need to install python3 to use this.
  - Once your visualization is on the server it can be served easily by simply using the textbox in the vis selector section
    of the visual editor.