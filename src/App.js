import logo from './jenifer.jpeg';
import './App.css';
import ResizeComponent from "./cropper/resize.component";
import CropperContainer from "./cropper/cropper.container";

function App() {
    return (
        <div className="App">


            <div style={{margin: '100px 100px', position: 'relative'}}>

                <CropperContainer
                    src={logo}/>

            </div>
        </div>
    );
}

export default App;
