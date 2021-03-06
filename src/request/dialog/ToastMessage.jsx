import React from "react";

import {withStyles} from '@material-ui/styles';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    title: {
        color: 'red'
    },
});


class ToastMessage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {visible: false, message: ''}
    }

    show = (message) => {
        this.setState({visible: true, message})
    }

    render() {
        const {visible, message} = this.state
        const {classes} = this.props;
        return (
            <div>
                {visible ? <Typography className={classes.title} variant="h6" id="tableTitle">
                    {message}
                </Typography> : undefined}
            </div>
        )
    }
}

export default withStyles(styles)(ToastMessage);
