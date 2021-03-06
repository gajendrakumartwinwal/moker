import React from "react";
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import {Add, Delete} from '@material-ui/icons';
import {connect} from "react-redux";
import {DELETE_REQUEST_ASYNC} from "../redux/requestActions";

const styles = theme => ({
    title: {
        fontSize: 14,
        paddingLeft: 16,
        color: 'black'
    },
    div: {
        display: 'flex',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#e0e0e0',
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        height: 15,
        width: 15,
    },
});


class HeaderView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.onRemove = this.onRemove.bind(this)
    }


    onRemove = () => {
        const {deleteRequest} = this.props
        deleteRequest();
    }

    render() {
        const {classes, request: {url, id}, edit, showDialog} = this.props;
        const {open} = this.state;
        return (
            <div>
                <div className={classes.div}>
                    <Typography className={classes.title} variant="h6" id="tableTitle">
                        {url}
                    </Typography>
                    {edit ? <Delete className={classes.icon} onClick={this.onRemove}/> :
                        <Add className={classes.icon} onClick={showDialog}/>}
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({common: {edit}}) => ({
    edit: edit
})

const mapDispatchToProps = (dispatch, {request: {id}}) => ({
    deleteRequest: () => dispatch(DELETE_REQUEST_ASYNC(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderView))

HeaderView.propTypes = {
    request: PropTypes.object.isRequired,
    showDialog: PropTypes.func.isRequired,
};
