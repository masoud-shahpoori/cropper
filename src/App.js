import logo from './jenifer.jpeg';
import './App.css';
import ResizeComponent from "./cropper/resize.component";
import CropperContainer from "./cropper/cropper.container";

function App() {
    return (
        <div className="App">

            <CropperContainer
                src={logo}/>
        </div>
    );
}

export default App;
