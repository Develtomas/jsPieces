import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewsList from './components/NewsList.jsx';
import './styles/base.less';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const App = React.createClass({
    render() {

        return (
            <MuiThemeProvider>
                <div className='App'>
                    <NewsList />
                </div>
            </MuiThemeProvider>
        );
    },
});

export default App;
