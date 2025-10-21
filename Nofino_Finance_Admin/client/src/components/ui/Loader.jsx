import "../../App.css"
export function Loader() {
    return (
        // <div className="z-50 items-center justify-center max-h-screen my-40 justify-items-center py-9 max-w-7xl">
        //     <div className="loader"></div>
        // </div>
       <div className="loader-overlay">
            <div className="spinner" />
        </div>

    )
}

export default Loader;