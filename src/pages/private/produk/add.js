import React, {useState} from 'react';
import propTypes from 'prop-types';
import Dialog  from '@material-ui/core/Dialog';
import TextField  from '@material-ui/core/TextField';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogContent  from '@material-ui/core/DialogContent';
import DialogAction  from '@material-ui/core/DialogActions';
import Button  from '@material-ui/core/Button';
import {useFirebase} from '../../../components/FirebaseProvider';
import { withRouter } from 'react-router-dom';

function AddDialog({history, open, handleClose}) {

    const [nama, setNama] = useState('');
    const {firestore, user} = useFirebase();
    const produkCol = firestore.collection(`toko/${user.uid}/produk`);
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSimpan = async e=> {

        setSubmitting(true);
        try {

            if(!nama) {
                throw new Error('Nama Produk harus diisi');
            }

            const produkBaru = await produkCol.add({nama});

            history.push(`produk/edit/${produkBaru.id}`);

        }catch(e) {

            setError(e.message)
        }
        setSubmitting(false);

    }

    return<Dialog   open={open}
                    onClose={handleClose}
                    disableBackdropClick={isSubmitting}
                    disableEscapeKeyDown={isSubmitting}
                    >
            <DialogTitle>Buat Produk Baru</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        id="nama"
                        label="Nama Produk"
                        value={nama}
                        onChange={(e) => {
                            setError('');
                            setNama(e.target.value);
                        }}
                        helperText={error}
                        error={error ? true : false}
                        disabled={isSubmitting}
                    />
                </DialogContent>
                <DialogAction>
                    <Button 
                        disabled={isSubmitting}
                        onClick={handleClose}
                    >
                        Batal
                    </Button>
                    <Button 
                        disabled={isSubmitting}
                        onClick={handleSimpan}
                        color="primary">
                        Simpan
                    </Button>
                </DialogAction>
        </Dialog>
}
 
AddDialog.propTypes = {
    open : propTypes.bool.isRequired,
    handleClose : propTypes.func.isRequired
}



export default withRouter(AddDialog);