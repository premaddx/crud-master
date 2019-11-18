import React from 'react';
import { connect } from 'react-redux';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        console.log(this.props);
        return (
            <div></div>
        );
    }
}

const mapStateToProps = state => {
    const { dataTableReducer } = state;
    return {
        dataTableReducer,
    };
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DataTable);
