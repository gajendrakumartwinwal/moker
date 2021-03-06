import React from 'react';
import {Provider} from 'react-redux'
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core';
import Requests from "./request/Requests";
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from "./redux/reducer";
import NavigationBar from "./NavigationBar";
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#ffffff',
            main: '#424242',
            dark: '#aeaeae',
            contrastText: '#000000',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});


const useStyles = makeStyles(theme => ({
    root: {
        width: '80%',
        paddingLeft: '10%',
        paddingRight: '10%',
        flexDirection: 'column'
    },
}));

// const store = createStore(reducer, LOAD_CASES(), applyMiddleware(thunk))
const App = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <div className={classes.root}>
                    <div>
                        <NavigationBar/>
                        <Requests/>
                    </div>
                </div>
            </Provider>
        </ThemeProvider>
    );
}

export default App
