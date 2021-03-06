import React from "react";
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/styles';
import {AppBar, Button, Dialog, IconButton, Slide, TextField, Toolbar, Typography,} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from "react-redux";
import {ADD_CASE_ASYNC} from "../../redux/requestActions";

const styles = theme => ({
    title: {
        marginLeft: 16,
        flex: 1,
    },
    appBar: {
        position: 'relative',
    },
    div: {
        display: 'flex',
        alignItems: 'center',
        height: 60,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    divInput: {
        display: 'flex',
        height: 60,
        marginTop: 50,
        paddingRight: 16,
        flexDirection: 'column',
        paddingLeft: 16,
    },
    testcase: {
        display: 'flex',
        height: 80,
        marginBottom: 30,
    },
    description: {
        height: 80,
        marginBottom: 30,
    },
    response: {
        height: 200,
        marginBottom: 30,
    },
});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class TestInputDialog1 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    /*static getDerivedStateFromProps({testcase}, preState) {
        console.log('FSAFASFA--> FDSDAFSDFSD! --> '+ JSON.stringify({testcase}))
        return {testcase};
    }*/

    addRequest = () => {
        const index = this.getProperty('index')
        const name = this.getProperty('name')
        const description = this.getProperty('description')
        const json = this.getProperty('json')
        if (!name || !json) return
        const {addTest} = this.props
        addTest(name, description, json, index);
        this.onCloseAction()
    }
    onCancel = () => {
        const {removeRequest} = this.props
        removeRequest();
    }

    onTestNameChange = (text) => {
        this.setState({name: text.target.value})
    }
    onTestDescriptionChange = (text) => {
        this.setState({description: text.target.value})
    }
    onTestJsonChange = (text) => {
        this.setState({json: text.target.value})
    }

    getProperty = (key) => {
        let {testcase = {}} = this.props;
        return this.state[key] || testcase[key]
    }

    onCloseAction = () => {
        const {onClose} = this.props
        this.state = {name: undefined, description: undefined, json: undefined}
        this.forceUpdate()
        onClose()
    }

    render() {
        const {open, classes} = this.props;
        const name = this.getProperty('name')
        const description = this.getProperty('description')
        const json = this.getProperty('json')
        return (
            <div>
                <Dialog fullScreen open={open} onClose={this.onCloseAction} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.onCloseAction} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Add your testcase
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.addRequest}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.divInput}>
                        <TextField
                            height={60}
                            className={classes.testcase}
                            autoFocus
                            label="Enter the Test name"
                            type="url"
                            value={name}
                            onChange={this.onTestNameChange}
                            fullWidth
                            placeholder="Test name"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.description}
                            label="Enter the Test description"
                            type="url"
                            value={description}
                            onChange={this.onTestDescriptionChange}
                            fullWidth
                            placeholder="Description"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.response}
                            label="Enter the Testcase json response"
                            multiline
                            value={json}
                            onChange={this.onTestJsonChange}
                            fullWidth
                            placeholder="json"
                            variant="outlined"/>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, {request}) => ({
    addTest: (testname, description, json, index) => dispatch(ADD_CASE_ASYNC(request.url, testname, description, json, index))
})


export default connect(null, mapDispatchToProps)(withStyles(styles)(TestInputDialog1))

TestInputDialog1.propTypes = {
    testcase: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
