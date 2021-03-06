import React from "react";
import {connect} from 'react-redux'
import {Table, TableBody, TableContainer} from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import HeaderView from "./HeaderView";
import TestCase from "./TestCase";
import PropTypes from "prop-types";
import TestInputDialog from "./dialog/TestInputDialog";

const styles = theme => ({
    tableContainer: {},
    tableBody: {
        flex: 1,

    },
    button: {
        width: 200,
        margin: 8,
    },
    table: {
        display: 'flex',
        minWidth: 250,
    },
    title: {
        paddingLeft: 16,
        color: 'black'
    },
});


class Request extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onTestClick = (testcase) => {
        this.setState({testcase, open: true})
    }

    onDialogClose = () => {
        this.setState({open: false, testcase: undefined})
    }

    showDialog = () => {
        this.setState({open: true})
    }


    render() {
        const {classes, request} = this.props;
        const {testcases = []} = request
        const {testcase, open} = this.state;
        return (
            <TableContainer className={classes.tableContainer}>
                <HeaderView ref={this.headerViewRef}  request={request} showDialog={this.showDialog}/>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table"
                >
                    <TableBody className={classes.tableBody}>
                        {testcases && testcases.map((row, index) => <TestCase
                            onTestClick={this.onTestClick} request={request}
                            testcase={row}/>)}
                    </TableBody>
                </Table>
                <TestInputDialog testcase={testcase} request={request} open={open} onClose={this.onDialogClose}/>
            </TableContainer>)
    }
}

let counter = 1;
const mapDispatchToProps = (dispatch, {request}) => ({
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(Request))


Request.propTypes = {
    request: PropTypes.shape({
        url: PropTypes.string.isRequired,
        testcases: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            enable: PropTypes.bool.isRequired,
            description: PropTypes.string.isRequired
        }))
    })
};
