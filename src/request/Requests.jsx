import React from 'react';
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles';
import {Button, Paper} from '@material-ui/core';
import Request from "./Request";
import RequestInputDialog from "./dialog/RequestInputDialog";
import {CLOSE_ADD_REQUEST_DIALOG} from "../redux/actions";
import {LOAD_REQUEST_ASYNC} from "../redux/requestActions";

const useStyles = makeStyles(theme => ({
    div: {
        marginTop: 100,
    },
    button: {
        width: '100%',
        marginTop: 16,
        marginBottom: 50,
        // backgroundColor: '#ff5a5a'
    },
    buttonCenter: {
        width: '100%',
        marginTop: 16,
        marginBottom: 50,
        marginLeft: 16,
        marginRight: 16,
        // backgroundColor: '#ff5a5a'
    },
    paper: {
        marginBottom: 8,
        marginTop: 16
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
}));

const Requests = ({requests}) => {
    const classes = useStyles();
    const onClearData = () => {
        localStorage && localStorage.clear();
    }
    return (
        <div className={classes.div}>
            {requests.map(request => <Paper className={classes.paper}><Request request={request}/></Paper>)}
            <div className={classes.buttonContainer}>
                <Button className={classes.button} variant="contained" onClick={onClearData}>CLEAR DATA</Button>
            </div>
            <RequestInputDialog/>
        </div>
    )
}

const mapStateToProps = ({requests}) => ({
    requests: requests
})
const mapDispatchToProps = dispatch => ({
    closeAddRequestDialog: () => dispatch(CLOSE_ADD_REQUEST_DIALOG()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Requests)
