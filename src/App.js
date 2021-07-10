import Sortbar from './Sortbar'
import Sorter from './Sorter'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F4B266',
    },
    secondary: {
      main: '#9B7E46',
    },
    background: {
      paper: '#E2EFDE',
      default: '#E2EFDE',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme = {theme}>
      <Paper style={{height: '100vh'}}>
        <header>
          <Sortbar/>
        </header>
          <Sorter/>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
