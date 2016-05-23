// 1. scaffold out the component to show the form
// 2. add component to routes file as a new url that user can navigate to
// 3. implement a button in posts_index component to navigate to posts_new
// 4. add a form to posts_new
//    when user submits the form, it will call an action creator to 
//    make a request to save the blog post
// 5. create action creator and update reducers

import React, { Component, PropTypes} from 'react';
// reduxForm function is nearly identical to the connect function in
// react-redux library
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  // avoid using context at all cost, only exception is when working with router
  static contextTypes = {
    router: PropTypes.object
  }

  // props is props from the form: title, categories, content
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      })
  }

  render() {
    // const handleSubmit = this.props.handleSubmit;
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    // const title = this.props.fields.title;

    // ...title  is called destructuring

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">{title.touched ? title.error : ''}</div>
        </div>
        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">{categories.touched ? categories.error : ''}</div>
        </div>
        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">{content.touched ? content.error : ''}</div>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }

  if (!values.categories) {
    errors.categories = 'Enter categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

// inside the first argument is our configuration for reduxForm
export default reduxForm({
  form: 'PostsNewForm', // this doesn't have to match our class name but its a unique token
  fields: ['title', 'categories', 'content'],  // fields that the form will contain
  validate
}, null, { createPost })(PostsNew);

// whenever users make changes to the fields in the form, it is setting new
// value to these inputs in our global application state

// user types something in... record it on application state

// behind the scenes, reduxForm is using this info to record the input the user
// adds on the different keys on our global state object
// state === {
//   form: {
//     PostsNewForm: {
//       title: 'whatever user types in',
//       categories: 'whatever user types in',
//       content: 'whatever user types in'
//     }
//   }
// }