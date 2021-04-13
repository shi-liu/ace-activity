import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';
import { connect } from 'react-redux';



class Home extends Component {
    componentDidMount() {

    }

    render(){
        const { authenticated } = this.props.user;
        const { UI: {loading}} = this.props;
        const contents = authenticated ? <Dashboard/> : <Landing/>
        return (
            <div>
                {!loading && contents}
            </div>
        )
    }
};

Home.propTypes = {
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {

}
export default connect(mapStateToProps, mapActionsToProps)(Home);