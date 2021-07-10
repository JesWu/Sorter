import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Sortbar(){

    return(
    <AppBar position="static">
        <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
            Sorter
            </Typography>
        </Toolbar>
    </AppBar>
    );
}

export default Sortbar;