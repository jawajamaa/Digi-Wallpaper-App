import { Box } from "@mui/material";

function MobileOverlay({
    id,
    title,
    location,
    year,
    horizontal,
    path,
    user_id}) {
    console.log(id)
    console.log(title)
    console.log(user_id)

    return(
        <Box>
            {<img
                src= { path }
                alt= { title }
                />}
        </Box>
    )
};

export default MobileOverlay;
