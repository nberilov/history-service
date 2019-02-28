## Usage

### Deploying the application
* Create a Google service account with access to your project and Datastore
* Save that account's key as key.json in project's root folder
* Create a `.env` file based on `.env_test`, replacing placeholders with relevant data
* Build the image  
    `docker build -t gcr.io/PROJECT_ID/history-service:v1 .`
* Push the image by running  
`docker push gcr.io/PROJECT_ID/history-service:v1`
* Create a container cluster via  
`gcloud container clusters create` or the [Google Cloud Platform Console](https://console.cloud.google.com/kubernetes)
* Configure kubectl to manage your kubernetes cluster.  
  To do this go to [Google Cloud Platform Console](https://console.cloud.google.com/kubernetes) -> Kubernetes Engine -> click on the "connect" button and run the command from the "Command-line access" box 
* Deploy the application with  
`kubectl run history-service --image=gcr.io/PROJECT_ID/history-service:v1 --port 3000`
* Expose the application:  
`kubectl expose deployment history-service --type=LoadBalancer --port 3000 --target-port 3000`

### Running the application locally
* Create a Google service account with access to your project and Datastore
* Save that account's key as key.json in project's root folder
* Create a `.env` file based on `.env_test`, replacing placeholders with relevant data
* Either:  
      * Start the application by building and running the docker image  
      or  
      * Start the application by running `npm i && npm start`
    
### Testing the API
* Pricing API can be accessed via `/prices?symbols=<comma separated array of symbols>&startDate=<valid date>&endDate=<valid date>`  
  ISO 8601 or Unix timestamps are examples of valid date formats, but other formats might work as well
* Metrics are available via `/metrics`

### Running tests
* Run tests using `npm run test`

## Notes

### Packages used
* `@google-cloud/datastore` is the official package for working with Datastore
* `dotenv` is used to load environmental variables (which can still be overwritten by variables defined in K8S or Docker)
* `morgan` provides logging middleware for endpoint calls
* `prom-client` is a Prometheus client that is used to gather metrics
* `jest` is a great and simple testing framework

### Production-readiness
Here's a list of things I would do before considering this application production-ready:
* Publish common code as npm modules
* Write tests for the entire codebase
* Connect `/metrics` to a dashboard
* Add caching to DB calls
* Add and improve logging throughout the application
* Add JSDocs describing every function/method