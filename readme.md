Title
==============
Wordpress Admin Panel 

### Highlights

### Notes For Better Understanding
1. technologies used node.js, react.js , redux
2. React table used for rendering of posts in table form
3. APis build on backend to fetch wordpressand these apis are consumed for frontend
4. Postman Link of postman API collection :- https://www.getpostman.com/collections/b2141ac23b618fe6dd52
5. redux used to store posts data  as these values should be centrally stored and should not be fetched multiple times ,postId (which was clicked to view details), category (clicked to view posts), tags(clicked to view posts) as well stored in redux
6. offset for pagination stored in state as it's for a particular componenet, particular post data stored in state for same reason


### Dependencies
inside api folder
* create config.production.json file(for productions) and config.development.json file(for development)  inside config folder and copy config.example.json 


### Installation
 #Backend
cd api
* npm install
npm start

 #Frontend
 cd frontend
* npm install

### RUN
# Backend
cd api
* npm start for development

# Backend
cd Frontend
* npm start for development

### Downtime Required
* No


