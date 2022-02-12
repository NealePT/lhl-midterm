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

* The end user wants to see all collections: GET /collections
  * GET /collections  -->  Renders collections_index.ejs
* The end-user wants to see a particular resource
  * GET/collections/:id  -->  Renders collections_show.ejs
* The end-user wants to save a new resource: POST /collections
  * GET /collections/new  -->  Renders collections_new.ejs
  * POST POST /collections
* The end-user wants to update an existing resource:
  * GET /collections/:id/update  -->  Renders collections_edit.ejs
  * PUT /collections/:id
* The end-user wants to delete an existing resource:
  * DELETE /collections/:id/delete
* The end-user wants to see a specific profile:
  * GET /user/:id  -->  Renders users_index.ejs


Need to update:
- The end-user wants to see a list of the photos for a specific profile: GET /users/:id/resource/
- The end-user wants to see one particular resource of a particular user GET /users/:user_id/resource/:id
