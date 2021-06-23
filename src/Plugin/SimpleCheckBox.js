import { Grid } from '@material-ui/core';
import React from 'react'
import Container from '@material-ui/core/Container';
const SimpleCheckBox = ({ type = "checkbox", name, checked = false, onChange,price }) =>{
    return (
      <Container  fixed>
                 <Grid container spacing={3}>
              <Grid item xs={9}>
              <input type={type} name={name} checked={checked} onChange={onChange} />
            
              </Grid>
              <Grid item xs={3}>
              <input type="number" step="0.00" value={price} onChange={onChange}/>
              </Grid>
              </Grid>
              </Container>
        
    )
}
export default SimpleCheckBox;