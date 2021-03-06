import React from "react";

import {withStyles} from '@material-ui/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    TextField,
} from '@material-ui/core';
import {CLOSE_ADD_REQUEST_DIALOG} from "../../redux/actions";
import {connect} from "react-redux";
import {ADD_REQUEST_ASYNC} from "../../redux/requestActions";

const styles = theme => ({
    title: {
        paddingLeft: 16,
        color: 'black'
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
});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class RequestInputDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {urlInput: '/'}
        this.addRequest = this.addRequest.bind(this)
        this.onURLChange = this.onURLChange.bind(this)
    }

    addRequest = () => {
        const {urlInput} = this.state
        if (!urlInput) return
        const {addRequest} = this.props
        addRequest(urlInput);
        this.onClose()
    }

    onURLChange = (text) => {
        this.setState({urlInput: text.target.value})
    }
    onClose = () => {
        const {closeAddRequestDialog} = this.props;
        closeAddRequestDialog()
    }

    render() {
        const {open} = this.props;
        const {urlInput} = this.state;
        return (
            <div>
                <Dialog
                    TransitionComponent={Transition}
                    open={open} onClose={this.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add your URL</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            After successfully adding your URL you can add test casess by clicking on Add Case.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            label="Enter the URL"
                            type="url"
                            value={urlInput}
                            onChange={this.onURLChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.addRequest} color="primary">
                            Add Request
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


const mapStateToProps = ({common: {openAddRequestDialog}}) => ({
    open: openAddRequestDialog
})

const mapDispatchToProps = (dispatch) => ({
    addRequest: (url) => dispatch(ADD_REQUEST_ASYNC({url})),
    closeAddRequestDialog: () => dispatch(CLOSE_ADD_REQUEST_DIALOG()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RequestInputDialog))
