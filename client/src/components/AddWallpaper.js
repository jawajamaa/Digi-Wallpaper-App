

function AddWallpaper() {
// title, year, location image taken, path or url, username and name?
    return(
        <div>
            <h2>Wallpaper additions go here!</h2>
            <form onSubmit={formik.handleSubmit} style={{ margin: '30px'}}>

                <label htmlfor="title">Image Title</label>
                <br />
                <input 
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <p style={{ color:'red' }}> {formik.errors.title} </p>

                <label htmlfor="year">Year Image taken</label>
                <br />
                <input
                    id="year"
                    name="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                />
                <p style={{ color:'red'}}> {formik.errors.year} </p>
            </form>
        </div>
    );
}

export default AddWallpaper;
