# blox

## Overview

This is an experimental attempt to elegantly manage the state of a multiplayer system using [redux](https://redux.js.org/) on the server side.
The server maintains a single store that represents the world state, and the clients dispatch actions over a WebSockets connection to request that the state be modified (for instance, to move throughout the world).
After receiving an action, the server runs the reducer on the action and emits the new world state (i.e. the new state of the store) to each client.
At this point, the clients all update their local copies of the state (which in turn causes their view to re-render).

## Running in development mode

Execute `docker-compose up` from inside this directory to start the app in dev mode.
Any changes to the source code will cause the relevant parts of the application to be rebuilt.
By default, the frontend will be available at http://localhost:8080, but this is configurable (see docker-compose.yml).

## Building a production image

To build a standalone production image, simply execute:

```
docker build -t blox:prod .
```
Once this process is complete, your can run the image by executing:

```
docker run --rm -p 8080:8080 blox:prod
```

The frontend will be available at http://localhost:8080 in this case; to run the app on a different port, replace `<port>` with your desired port number in:

```
docker run --rm -p <port>:8080 blox:prod
```

## Deploying to Heroku

Deployment to [Heroku](https://www.heroku.com/) is incredibly straightforward.
Ensure you are logged in:

```
heroku container:login
```

Push the image to the container registry:

```
heroku container:push web -a wjlewis-blox
```

And create a new release:

```
heroku container:release web -a wjlewis-blox
```

See [the docs](https://devcenter.heroku.com/articles/container-registry-and-runtime#cli) for more information.
