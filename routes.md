# Routes

## Views (tentative)

- collections_index.ejs
  - Homepage display resources from all users
- collections_new.ejs
  - Contains a form to add a new resource
- collections_show.ejs
  - Displays the resource details, rating, likes, & comments.
- collections_edit.ejs
  - Contains a form to edit or delete a specific resource
- collections_search.ejs
  - Search results page displaying multiple resources as rows
- users_index.ejs
  - Displays resources for a specific users
- register.ejs
- login.ejs

## HTTP Methods
- GET = browse/read
- PUT = edit
- POST = add
- DELETE = delete

## Routes

* The end user wants to see all collections:
  * [DONE] GET /collections  -->  Renders collections_index.ejs

* The end-user wants to see a particular resource:
  * [DONE] GET /collections/:id  -->  Renders collections_show.ejs

* The end-user wants to save a new resource:
  * [DONE] GET /collections/new  -->  Renders collections_new.ejs
  * [IN PROGRESS] POST /collections

* The end-user wants to update an existing resource:
  * [DONE] GET /collections/:id/update  -->  Renders collections_edit.ejs
  * [IN PROGRESS] PUT /collections/:id

* The end-user wants to delete an existing resource:
  * [IN PROGRESS] DELETE /collections/:id/delete

* The end-user wants to see the collection for a specific profile:
  * [DONE] GET /users/:id  -->  Renders users_index.ejs
