# Earthquakes dashboard API
The following repo contains the API for the usgs earthquakes dashboard.

Documentation can be found in the following link: 


## Requirements
```
Node v10.15.0
Now 16.7.3
```

## Development
Create .env file with en mongod uri:
```
MONGODB_URI=mongodb+srv://<user>:<password>@<ipaddress>/<database-name>?retryWrites=true
```

Install dependencies
  ```
  $ npm install
  ```
### Using Zeit.com now:
Install zeit.com now
```
  $ npm install -g now
```

Run development:
```
  $ now dev
```


## Deployment

### Using Zeit.com

Add environment variable to production:
```
$ now secrets add earthquakes-mongodb-uri mongodb+srv://<user>:<password>@<ipaddress>/<database-name>?retryWrites=true
```

Add the github integration to Zeit.co for auto deployment or Run now:
```
$ now --prod
```

## Documentation

Documentation is built using apidoc.
To install apidoc, run:
```
  $ npm install -g apidoc
```

To generate documentation, run:
```
  $ apidoc -i api/ -o doc/
```

Documentation is autobuilt in Netlify via webhook.