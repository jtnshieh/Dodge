# Dodge

![]()

<a href="https://imgflip.com/gif/1y7h4h"><img src="https://i.imgflip.com/1y7h4h.gif" title="made at imgflip.com"/></a>

[Dodge](https://jtnshieh.github.io/Dodge/), built with plain Javascript and Canvas, is a fun, interactive game in which the user attempts to dodge red dots and acquire green dots.

## Features & Implementation

* Users can upload pictures to their profile, which show up on both their profile and the photo feed page.

* Users can comment on a post and delete their comment. They can also like or unlike a post.

### Secure Authentication

Users can sign up or log in to Memorylane using a secure authentication system. The demo login feature allows anyone to explore Memorylane's various features without being a registered user.

![Memorylane Login](https://github.com/jtnshieh/Memorylane/blob/master/app/assets/images/Memorylane_login.png)

### Feed

Users can comment on posts and delete their comments, as well as like or unlike a post.

![Memorylane Feed](https://github.com/jtnshieh/Memorylane/blob/master/app/assets/images/Memorylane_feed.png)

Something interesting and challenging that occurred while I was constructing my feed page was getting the `PostIndexContainer` to re-render to display the comment posted by the user instantaneously. To accomplish this, I had to attach a promise of `fetchPost` to `createComment` inside my `handleSubmit` function in my presentational component `Comments`. This promise returns a "new" post - which in reality is the same post, just with the additional comment - which then triggers the re-rendering.
````
handleSubmit(e) {
    e.preventDefault();
    const comment = Object.assign({}, this.state);
    comment['post_id'] = this.props.post.id;
    this.props.createComment(comment).then(() => {
      this.props.fetchPost(this.props.post.id);
      this.setState({"body":""});
    });
  }
````
### Post Upload

Users can upload posts.

![Memorylane Upload](https://github.com/jtnshieh/Memorylane/blob/master/app/assets/images/Memorylane_upload.png)

## Technologies

### Backend

* Ruby On Rails

* JBuilder

* PostgreSQL Database

* Heroku

### Frontend

* React/Redux

* Javscript

* SCSS/CSS

* npm

* Webpack

### Other

* Cloudinary for users' profile pictures and post pictures storage.

* BCrypt for password-salting and hashing for a secure authentication system.

## Additional Features

* Add the Follow feature.

* Implement user search.
