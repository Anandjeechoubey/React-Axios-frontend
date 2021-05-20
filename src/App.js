import React, { useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));


const App = () => {

  const classes = useStyles();
  const [branch, setBranch] = React.useState('');
  const [city, setCity] = React.useState('');
  const [rows, setRows] = React.useState(['']);

  // const resp = await (Axios.get('http://localhost:8000/api/branches/autocomplete/?q=rtgs&limit=14&offset=0'))

  // console.log(resp)

  // Axios.get('http://localhost:8000/api/branches/autocomplete/?q=rtgs&limit=14&offset=0')
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err))

  
  // let response = () => {
  //   return new Promise(function(resolve, reject) {
  //     Axios.get('http://localhost:8000/api/branches', { params: { q: city , limit: 5 , offest: 0 }}).then(response => {
  //       resolve(response);
  //       setRows(response.data);
  //     });
  //   });
  // };
  // let responseData = response().then((res)=> console.log(res.data));

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        'https://fyle-backend-2021.herokuapp.com/api/branches',
        { params: { q: city , limit: 5 , offest: 0 }}
      );
 
      setRows(result.data);
    };
 
    fetchData();
  }, [city]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        'https://fyle-backend-2021.herokuapp.com/api/branches/autocomplete',
        { params: { q: branch , limit: 5 , offest: 0 }}
      );
 
      setRows(result.data);
    };
 
    fetchData();
  }, [branch]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
    console.log(branch);
  };

  return (
    <div className="App">
      <h1>Bank Branches</h1>
      <div className="forms">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={city}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'banglore'} key={10}>Banglore</MenuItem>
            <MenuItem value={'mumbai'} key={20}>Mumbai</MenuItem>
            <MenuItem value={'pune'} key={30}>Pune</MenuItem>
            <MenuItem value={'delhi'} key={40}>Delhi</MenuItem>
            <MenuItem value={'hyderabad'} key={50}>Hyderabad</MenuItem>
          </Select>
        </FormControl>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Outlined" variant="outlined" value={branch}
            onChange={handleChangeBranch}/>
        </form>
      </div>
      <div className="result__table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Bank ID</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell align="right">IFSC</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">State</TableCell>
                <TableCell align="right">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right">{row.bank_id}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.branch}
                  </TableCell>
                  <TableCell align="right">{row.ifsc}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.state}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
