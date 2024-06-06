import { ImageListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
 

function MobileCard({ mobilepaper }) {
    const{
        id,
        title,
        location,
        year,
        path,
        user_id
    } = mobilepaper;

    return(
        <ImageListItem key = {id}>
            <img 
                src= { path } 
                alt= { title } 
            />
        </ImageListItem>
        // <Grid item xs={4}>
        //     <Box
        //         sx={{p:5}}>
        //         <Paper elevation={3} square >
        //             <img 
        //                 src= { path } 
        //                 alt= { title } 
        //                 width = "150px"
        //             />
        //             <h4>{ title }</h4>
        //             <h5>{ location }</h5><h6>{ year }</h6>
        //         </Paper>
        //     </Box>
        // </Grid>
    );
};

export default MobileCard;
