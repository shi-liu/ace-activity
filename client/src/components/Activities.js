import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TablePagination from '@material-ui/core/TablePagination';
import { getActivities, deleteActivity } from '../redux/actions/dataActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import NoteIcon from '@material-ui/icons/Note';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

const styles = {
  mod: {
    position:"absolute",
    width: "300px", 
    height: "500px", 
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%,-50%)",
    outline: 0
  },
  errorText: {
    color: "red",
    fontFamily: "Nunito",
    fontSize: 17
  },
  textFont: {
    fontFamily: "Nunito",
  },
  headerFont: {
    fontFamily: "Nunito",
    fontWeight: "bold"
  }
}

/**
 * Responsible for data fetching and table UI 
 */

class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: 0,
          rowsPerPage: 10,
          open: false,
          openDia: false,
          delAct: {},
          activity: {}
        };
    };
    componentDidMount(){
      this.props.getActivities();
    }

    handleDelete = act => {
      this.props.deleteActivity(act);
      this.setState({openDia: false})
    }

    handleModal = (act) => {
      this.setState({activity : act});
      this.setState({open: !this.state.open});
    }

    closeModal = () => {
      this.setState({open: false});
    }
    handleCloseDia = () => {
      this.setState({openDia: false});
      this.setState({delAct: {}})
      console.log("this is runnin")
    }


    handleDialog = (act) => {
      this.setState({openDia: true});
      this.setState({delAct: act})
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    }
  
    handleChangeRows = event => {
      this.setState({ rowsPerPage: parseInt(event.target.value, 10)});
      this.setState({ page: 0 });
    };


    render(){
      const { classes } = this.props;
      const { activities } = this.props.activity; 
      const dialog = (
        <div>
            <DialogContentText className={classes.textFont}>
                Are you sure you want to delete {this.state.delAct.activity}?
            </DialogContentText>
            <DialogActions>
                <Button className={classes.textFont}
                onClick={this.handleCloseDia}>
                    No
                </Button>
                <Button className={classes.textFont} 
                onClick={this.handleDelete.bind(this,this.state.delAct.activityId)}>
                    Yes
                </Button>
            </DialogActions>
        </div>)
      const body = (
        <div className={classes.mod}>
            <Paper 
            style={{width: 300, height: 500}}>
            <Grid container 
            align="center" justify="center">
              <Grid container item 
              justify="center" 
              className={classes.textFont}>
              {this.state.activity.activity}
              </Grid>
              <Grid container item 
              align="center" 
              style={{marginTop:"25px"}} 
              className={classes.textFont}>
              {this.state.activity.notes}
              </Grid>
            </Grid>
            <Typography>
            </Typography>
            </Paper>
        </div>)

      const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, activities.length - this.state.page * this.state.rowsPerPage);

      return (
          <div style={{ width: '100%'}}>
            <Dialog open={this.state.openDia} onClose={this.handCloseDia}>
              {this.state.openDia && dialog}
            </Dialog>
            <Modal open={this.state.open} onClose={this.closeModal}>
              {body}
            </Modal>
            <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.headerFont}>Activity</TableCell>
                <TableCell align="center" className={classes.headerFont}>Duration(m)</TableCell>
                <TableCell align="center" className={classes.headerFont}>Date</TableCell>
                <TableCell align="center" className={classes.headerFont}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities
              .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((act, i) => (
                <TableRow key={`row-${i}`} hover role="checkbox">
                  <TableCell align="center" className={classes.textFont}>{(act.activity.length > 10) ? act.activity.substring(0,10)+"..." : act.activity}</TableCell>
                  <TableCell align="center" className={classes.textFont}>{act.duration}</TableCell>
                  <TableCell align="center" className={classes.textFont}>{act.date && act.date.substring(0,10)}</TableCell>
                  <TableCell align="center" className={classes.textFont}>
                    <Grid container align="center" direction="row">
                      <Grid item xs={12} sm={6}>
                        <IconButton
                          onClick={this.handleModal.bind(this,act)}
                          color="primary"
                          size="small">
                          <NoteIcon/>
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <IconButton
                          onClick={this.handleDialog.bind(this,act)}
                          color="secondary"
                          size="small">
                          <CloseIcon/>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 42 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={activities.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}/>
        </TableContainer>
      </div>
      )
    }
}

const mapStateToProps = state => ({
  activity: state.activity
})

const mapActionsToProps = {
  getActivities,
  deleteActivity
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Activities));