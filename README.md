# Reroute

###### *Note: currently, this repo combines the Reroute-router and plugins with a reference implementation of the Reroute pattern.  The router and plugins will soon be abstracted out as standalone repos/npm modules.

Reroute is a framework for building data-driven, single-page apps.  Its goal is to reimagine the role routing can play in managing — and reasoning about — your app's state.

### Overview

Reroute apps consist of the Reroute-router, a single, immutable store, and plugins.  Plugins provide the router with routes.  Routes — when registered with the router —  tell the router how to respond to corresponding events.



