const usersDB = {
  'user1': {
  id: 'user1' ,
  name: 'Guest',
  email: 'guest@gmail.com',
  password: 'password'
  },
  'user2': {
    id: 'user2' ,
    name: 'John Appleseed',
    email: 'jappleseed@gmail.com',
    password: 'password'
    },
};

const resourcesDB = {
  'b2xVn2': {
  id: 'b2xVn2',
  owner_id: 'user1',
  title: 'title1',
  description: 'description1',
  category: 'blog',
  url: 'https://www.thegeekstuff.com/2012/04/curl-examples/',
  date_created: '2012-04-11',
  date_modified: '2019-06-21'
  },
  '9sm5xK': {
    id: '9sm5xK',
    owner_id: 'user2',
    title: 'title2',
    description: 'description2',
    category: 'video',
    url: 'https://www.youtube.com/watch?v=tYxI9CV2Zyk',
    date_created: '2022-01-24',
    date_modified: ''
    },
};

module.exports = { usersDB, resourcesDB };
