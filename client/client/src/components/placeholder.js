import * as React from 'react';
import axios from "axios"; 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { Container, CssBaseline, TextField, Link } from '@mui/material';
import { Typography } from '@mui/material';


const api = axios.create({
    baseURL: 'http://localhost:5000/api/url/shorten'
})

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/">
          Slug.Pizza
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


class SubmitForm extends React.Component {
    state = {
        longUrl: '',
        shortUrl: ''
    };

    /* This is where the magic happens 
    */
    handleSubmit = async event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await api.post('/', { longUrl: data.get('longUrl') })
        .then(res=>{
            console.log(res);
            console.log(res.data);
            if(res.data.shortUrl == null) {
                this.setState({ shortUrl: 'Error' })
                console.log(this.state.shortUrl)
            }
            else {
                this.setState({ shortUrl: res.data.shortUrl })
                console.log(this.state.shortUrl)
            }
            this.setState.longUrl = '';
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    handleChange = event =>{
        this.setState({ longUrl: event.target.value});
    }

    render() {
        return (
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx = {{
                        marginTop: 8, 
                        display: 'flex',
                        flexDirection: 'column',
                    }} 
                    textAlign='center'
                    >
                    <Typography variant="h1" align="center">
                        Slug.Pizza
                    </Typography>
                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            margin="normal"
                            required
                            fullWidth
                            id="longUrl"
                            label="Your Long URL"
                            name="longUrl"
                            autoComplete="longUrl"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullwidth
                            variant="contained"
                            sx = {{ mt: 2, mb: 2}}
                        > Submit </Button>
                    </Box>

                <Typography variant="h5" align="center" sx ={{ mt: 4 }}>
                    New Link:
                </Typography>

                <Link color="inherit" href={this.state.shortUrl}>
                    {this.state.shortUrl}
                </Link>

                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        );
    }
}
export default SubmitForm;