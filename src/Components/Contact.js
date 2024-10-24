import React, { useState } from 'react';

function Contact({ chefId, onCommentSubmit }) {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    onCommentSubmit(chefId, comment);

    
    setEmail('');
    setComment('');
  };

  return (
    <div className='contact-page-wrapper'>
      <div className='contact-header'>
        <h1 className='primary-heading'>Leave a Comment</h1>
        <h2 className='secondary-heading'>We would love to hear your thoughts!</h2>
      </div>
      <form className='contact-form-container' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='yourmail@gmail.com'
          className='contact-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder='Your comment...'
          className='contact-input'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type='submit' className='contact-button'>Submit</button>
      </form>
    </div>
  );
}

export default Contact;
