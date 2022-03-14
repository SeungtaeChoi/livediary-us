import React, { useState } from 'react';
import { Grid, Paper, Typography, Container, Divider, Box, TextField } from '@mui/material';
import { blue, yellow } from '@mui/material/colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faListCheck } from "@fortawesome/free-solid-svg-icons";

const Now = ({ user, api }) => {
    // console.log('now');

    return (
        <Container sx={{ padding: "1em", height: "100%" }}>
            <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={{ md: 4, xs: 2 }} sx={{ height: "100%" }}>
                <Grid item md={4} sm={6} xs={12}>
                    {/* <NowTask user={user} api={api} /> */}
                </Grid>
                <Grid item md={4} sm={6} xs={12} sx={{ height: "100%" }}>
                    <Paper elevation={4} sx={{ height: "100%" }}>
                        <Box
                            sx={{ display: "flex", alignItems: "center", padding: "0.5em 1em", bgcolor: yellow[100] }}
                        >
                            <FontAwesomeIcon icon={faNoteSticky} />
                            <Typography variant="subtitle1" component="div" style={{ marginLeft: "0.5em" }}>메모</Typography>
                        </Box>
                        <Divider />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

// const NowTask = ({ user, api }) => {

//     const [items, setItems] = useState([1, 2, 3, 4, 5]);
    

//     return (
//         <Paper elevation={4}>
//             <Box
//                 sx={{ display: "flex", alignItems: "center", padding: "0.5em 1em", bgcolor: blue[100] }}
//             >
//                 <FontAwesomeIcon icon={faListCheck} />
//                 <Typography variant="subtitle1" component="div" style={{ marginLeft: "0.5em" }}>할 일</Typography>
//             </Box>
//             <Divider />
//             <Box sx={{ padding: "0.5em 1em" }} >
//                 <div>
//                     {/* <TextField id="t1" variant="standard" style={{ width: "100%" }} /> */}
//                     <DraggableList items={items} onDragEnd={onDragEnd} />
//                 </div>
//             </Box>
//         </Paper>
//     )
// }

// const DraggableList = () => {
//     return (

//     );
// }

export default Now;