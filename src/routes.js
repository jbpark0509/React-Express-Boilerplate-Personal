import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, About, Login, Register, Main, NotFound } from 'containers';

export default (store) => {
    const requireLogin = (nextState, replace, cb) => {
        function checkAuth() {
            const { auth: { user } } = store.getState();
            if (!user) {
                replace('/login');
            }
            cb();
        }
        checkAuth();
    };

    return (
        <Route path="/" component={App}>
    		{ /* Home (main) route */ }
    		<IndexRoute component={Home}/>

    		<Route onEnter={requireLogin}>
    			<Route path="main" component={Main}/>
    		</Route>

    		{ /* Routes */ }
    	  	<Route path="about" component={About}/>
            <Route path="login" component={Login}/>
    	  	<Route path="register" component={Register}/>

    	  	{ /* Catch all route */ }
    	  	<Route path="*" component={NotFound} status={404} />
    	</Route>
    );
};
