import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/styles';
import {Checkbox, TableCell, TableRow} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import {DELETE_CASE_ASYNC, TOGGLE_CASE_ASYNC} from "../redux/requestActions";

const styles = theme => ({
    title: {
        paddingLeft: 16,
        color: 'black'
    },
    icon: {
        height: 15,
        width: 15,
    },
    tableRow: {
        display: 'flex',
        height: 45,
        flex: 1,
    },
    checkBoxCell: {
        display: 'flex',
        // backgroundColor: 'green'
    },
    checkBox: {
        display: 'flex',
        // backgroundColor: 'green'
    },
    delete: {
        display: 'flex',
        // backgroundColor: 'green'
    },
    name: {
        textAlign: 'flex-start',
        fontSize: 12,
        display: 'flex',
        // backgroundColor: 'green'
    },
    descrition: {
        fontSize: 12,
        flex: 1,
        display: 'flex',
        // alignSelf: 'flex-end',
    },
});


class TestCase extends React.Component {

    onToggle = () => {
        const {toggleCase, testcase} = this.props
        toggleCase(testcase.id)
    }
    onRemove = () => {
        const {deleteCase, testcase} = this.props
        deleteCase(testcase.id)
    }
    onTestClick1 = () => {
        const {onTestClick, testcase} = this.props
        onTestClick(testcase)
    }

    render() {
        const {classes, testcase, edit} = this.props;
        const labelId = testcase.name;
        return (
            <TableRow
                className={classes.tableRow}
                hover
                role="checkbox"
                aria-checked={testcase.enable}
                tabIndex={-1}
                key={testcase.name}
                selected={testcase.enable}
            >
                <TableCell
                    className={classes.checkBoxCell}
                    padding="checkbox">
                    <Checkbox
                        className={classes.checkBox}
                        checked={testcase.enable}
                        onChange={this.onToggle}
                        inputProps={{'aria-labelledby': labelId}}
                    />
                </TableCell>
                <TableCell
                    className={classes.name}
                    onClick={this.onTestClick1}
                    align="right">{testcase.name}</TableCell>
                <TableCell
                    className={classes.descrition}
                    onClick={this.onTestClick1}
                    align="right">{testcase.description}</TableCell>

                {edit &&
                <TableCell
                    className={classes.delete}
                    align="right"><Delete className={classes.icon} onClick={this.onRemove}/> </TableCell>}
            </TableRow>
        )
    }
}


const mapStateToProps = ({common: {edit}}) => ({
    edit: edit
})

const mapDispatchToProps = (dispatch, {request: {id}}) => ({
    toggleCase: index => dispatch(TOGGLE_CASE_ASYNC(id, index)),
    deleteCase: index => dispatch(DELETE_CASE_ASYNC(id, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TestCase))

TestCase.propTypes = {
    onTestClick: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    testcase: PropTypes.shape({
        name: PropTypes.string.isRequired,
        enable: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
};
