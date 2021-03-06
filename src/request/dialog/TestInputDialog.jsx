import React from "react";
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField,} from '@material-ui/core';
import {connect} from "react-redux";
import ToastMessage from "./ToastMessage";
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
        // backgroundColor: '#e2e2e2',
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
    dialog: {
        width: 2000,
    },
    dialogCustomizedWidth: {
        'max-width': '80%'
    },
    paper: {
        width: '80%',
        height: '80%',
        minHeight: 600,
    },
});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let applyExistingTestText = true

class TestInputDialog extends React.Component {
    toastMessage = React.createRef()

    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps({testcase}, preState) {
        if (testcase && applyExistingTestText) {
            applyExistingTestText = false
            return {...testcase}
        }
        return null;
    }

    addRequest = () => {
        const {index, name, description, json, enable} = this.state
        const {addTest} = this.props
        let error;
        if (!name) error = 'Name can not be empty'
        else if (!this.isJsonString(json))
            error = 'Response is not a valid jaons'
        if (!error) {
            addTest({name, description, json, index, enable: enable ? true : false});
            this.onCloseAction()
        } else {
            this.toastMessage.current.show(error)
        }
    }


    isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
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

    onCloseAction = () => {
        const {onClose} = this.props
        this.setState({name: undefined, description: undefined, json: undefined})
        // this.forceUpdate()
        applyExistingTestText = true;
        onClose()
    }

    render() {
        const {open, classes, url} = this.props;
        const {name, description, json} = this.state;
        return (
            <div>
                <Dialog
                    maxWidth={'xl'}
                    classes={{
                        paper: classes.paper,
                    }}
                    TransitionComponent={Transition}
                    open={open} onClose={this.onCloseAction}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle color={'red'} id="form-dialog-title">{`Add test case for ${url}`}</DialogTitle>
                    <DialogContent dividers={true}>
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
                            <ToastMessage ref={this.toastMessage}/>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onCloseAction} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addRequest} color="primary">
                            Add Test
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, {request: {id}}) => ({
    addTest: (testcase) => {
        // console.log(`KLLKKLK URL: ${url}, TestName: ${testname}, Description: ${description}, JSON: ${json}, INDEX: ${index}`)
        dispatch(ADD_CASE_ASYNC(id, testcase))
    }
})


export default connect(null, mapDispatchToProps)(withStyles(styles)(TestInputDialog))

TestInputDialog.propTypes = {
    testcase: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
