import React from "react";

import {withStyles} from '@material-ui/styles';
import {AppBar, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Add, Delete} from '@material-ui/icons';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {connect} from "react-redux";
import {EDIT_TOGGLE, OPEN_ADD_REQUEST_DIALOG} from "./redux/actions";
import {LOAD_REQUEST_ASYNC} from "./redux/requestActions";

const styles = theme => ({
    title: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#e0e0e0',
    },
    linearProgess: {
        height: 5,
    },
});


class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
    }

    componentDidMount() {
        const {loadRequests} = this.props;
        loadRequests();
    }

    onAddRequest = () => {
        const {openAddRequestDialog} = this.props
        openAddRequestDialog()
    }

    onPress = () => {
        const {toggleEdit} = this.props
        toggleEdit()
    }

    render() {
        const {classes, edit, loading} = this.props;
        return (
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        API Tester
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={this.onAddRequest}
                    >
                        <Add/>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={this.onPress}
                    >
                        {edit ? <Delete/> : <DeleteOutlinedIcon/>}
                    </IconButton>
                </Toolbar>
                {loading && <LinearProgress
                    className={classes.linearProgess}/>}
            </AppBar>
        )
    }
}

const mapStateToProps = ({common: {edit, loading}}) => ({
    edit,
    loading
})

const mapDispatchToProps = (dispatch) => ({
    toggleEdit: () => dispatch(EDIT_TOGGLE()),
    // saveTests: () => dispatch(SAVE_CASES),
    openAddRequestDialog: () => dispatch(OPEN_ADD_REQUEST_DIALOG()),
    loadRequests: () => dispatch(LOAD_REQUEST_ASYNC()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavigationBar))
