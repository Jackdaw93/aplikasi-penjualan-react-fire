import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStyles from './styles/toko';

import isURL from 'validator/lib/isURL';

function Toko() {

    const classes = useStyles();

    const [form, setForm] = useState({
        nama:'',
        alamat:'',
        telepon:'',
        website:''
    })

    const [isSubmitting, setSubmitting] = useState(false)

    const [error, setError] = useState({
        nama:'',
        alamat:'',
        telepon:'',
        website:''

    })

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const validate = ()=> {

        const newError = {...error};

        if(!form.nama) {
            newError.nama = 'Nama harus diisi';
        }

        if(!form.alamat) {
            newError.alamat ='Alamat harus diisi';
        }

        if(!form.telepon) {
            newError.telepon ='Telepon harus diisi';
        }

        if(!form.website) {
            newError.website = 'Website harus diisi';
        } else if (!isURL(form.website)) {
            newError.website = 'Website tidak valid';
        }

        return newError;
    }

    const handleSubmit = e => {

        e.preventDefault();

        const findErrors = validate();

        if(Object.values(findErrors).some(err => 
            err !== '')) {
                setError(findErrors);
            }

    }


    return <div className={classes.pengaturanToko}>
        <form onSubmit={handleSubmit} noValidate>
            <TextField
            id="nama"
            name="nama"
            label="Nama Toko"
            margin="normal"
            fullWidth
            required
            helperText={error.nama}
            value={form.nama}
            onChange={handleChange}
            error={error.nama ? true : false}
            disabled={isSubmitting}
            />

            <TextField
                id="alamat"
                name="alamat"
                label="Alamat Toko"
                margin="normal"
                fullWidth
                required
                multiline
                rowsMax={3}
                helperText={error.alamat}
                value={form.alamat}
                onChange={handleChange}
                error={error.alamat ? true : false}
                disabled={isSubmitting}
            />

            <TextField
                id="teleoon"
                name="telepon"
                label="No Telepon Toko"
                margin="normal"
                fullWidth
                required
                helperText={error.telepon}
                value={form.telepon}
                onChange={handleChange}
                error={error.telepon ? true : false}
                disabled={isSubmitting}
            />

            <TextField
                id="website"
                name="website"
                label="Website Toko"
                margin="normal"
                fullWidth
                required
                helperText={error.website}
                value={form.website}
                onChange={handleChange}
                error={error.website ? true : false}
                disabled={isSubmitting}
            />

            <Button 
            type = "submit"
            className={classes.actionButton}
            variant="contained" 
            color="primary"
            disbled={isSubmitting}
            >
                Simpan
            </Button>

        </form>
    </div>

}

export default Toko;