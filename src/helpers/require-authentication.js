import React, {Component} from 'react';
import { Security, ImplicitCallback, withAuth } from '@okta/okta-react';

export const OktaAuthComponent = withAuth(class Auth extends Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.auth.login()}>Signin</button>
            </div>
        );
    }
});