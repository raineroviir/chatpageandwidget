import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { SignIn } from 'components/SignIn';

const metaData = {
  title: 'Login | Chat Center',
  description: 'Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class Login extends Component {
  render() {
    return (
      <div>
          <DocumentMeta {...metaData} />
          <SignIn />
      </div>
    );
  }
}
