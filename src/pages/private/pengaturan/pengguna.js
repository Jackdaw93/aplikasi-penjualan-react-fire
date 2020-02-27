import React, {useRef, useState} from 'react';

//material ui
import TextField from '@material-ui/core/TextField';

import {useFirebase} from '../../../components/FirebaseProvider';
import {useSnackbar} from 'notistack';

function Pengguna() {

    const {user} = useFirebase();
    const [error, setError] = useState({
        displayName:''
    })
    const {enqueueSnackbar} = useSnackbar();
    const [isSubmitting, setSubmitting] = useState(false);
    const displayNameRef = useRef();
    const saveDisplayName = async (e)=> {

        const displayName = displayNameRef.current.value;
        console.log(saveDisplayName);

        if(!displayName){
            setError({
                displayName: 'Nama harus diisi'
            })
        }else if(displayName !== user.displayName) {

            setError({
                displayName: ''
            })
            setSubmitting(true);
        await user.updateProfile({
            displayName
        })
        setSubmitting(false);
        enqueueSnackbar('Data pengguna berhasil diperbarui', {variant: 'success'})
        }
   
    }
    return <>
        <TextField
        id="displayName"
        name="displayName"
        label="Nama"
        inputProps={{
            ref: displayNameRef,
            onBlur: saveDisplayName
            }}
            disabled={isSubmitting}
            helperText={error.displayName}
            error={error.displayName ? true : false}
        />
    </>

}

export default Pengguna;