import './index.css'
import React, {useEffect, useRef, useState} from 'react';
import './index.css';

function ResizeComponent(props) {
    const resizableRef = useRef(null);
    const resizeContainerRef = useRef(null);
    const resizersRef = useRef([]);
    const imageRef = useRef(null)
    const [imgSrc, setImgSrc] = useState(props.src)


    function makeResizableDiv() {
        const element = resizableRef.current;
        const resizers = resizersRef.current;
        const max_width = 150
        const minimum_size = 0;
        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;

        for (let i = 0; i < resizers.length; i++) {
            const currentResizer = resizers[i];
            currentResizer.addEventListener('mousedown', function (e) {
                e.preventDefault();
                original_width = parseFloat(
                    getComputedStyle(element, null).getPropertyValue('width').replace('px', '')
                );
                original_height = parseFloat(
                    getComputedStyle(element, null).getPropertyValue('height').replace('px', '')
                );
                original_x = element.getBoundingClientRect().left;
                original_y = element.getBoundingClientRect().top;
                original_mouse_x = e.pageX;
                original_mouse_y = e.pageY;
                window.addEventListener('mousemove', resize);
                window.addEventListener('mouseup', stopResize);
            });

            function resize(e) {

                if (currentResizer.classList.contains('bottom-right')) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    const height = original_height + (e.pageY - original_mouse_y);
                    if (width > minimum_size) {
                        element.style.width = width + 'px';
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px';
                    }
                } else if (currentResizer.classList.contains('bottom-left')) {
                    const height = original_height + (e.pageY - original_mouse_y);
                    const width = original_width - (e.pageX - original_mouse_x);
                    if (height > minimum_size) {
                        element.style.height = height + 'px';
                    }
                    if (width > minimum_size) {
                        element.style.width = width + 'px';
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
                    }
                } else if (currentResizer.classList.contains('top-right')) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    const height = original_height - (e.pageY - original_mouse_y);
                    if (width > minimum_size) {
                        element.style.width = width + 'px';
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px';
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
                    }
                } else {
                    const width = original_width - (e.pageX - original_mouse_x);
                    const height = original_height - (e.pageY - original_mouse_y);
                    if (width > minimum_size) {
                        element.style.width = width + 'px';
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px';
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
                    }
                }
            }

            function stopResize() {
                window.removeEventListener('mousemove', resize);
            }
        }
    }

    useEffect(() => {
        makeResizableDiv();
    }, []);


    const handleCropImage = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const originalImage = document.createElement('img')
        originalImage.src = imgSrc
        const resizableElement = resizableRef.current?.getBoundingClientRect()
        canvas.width = resizableElement.width;
        canvas.height = resizableElement.height;
        ctx.drawImage(originalImage, resizableElement.x, resizableElement.y, resizableElement.width, resizableElement.height, 0, 0, resizableElement.width, resizableElement.height);
        const croppedImage = new Image();
        croppedImage.src = canvas.toDataURL('image/png');
        document.getElementById('demo').appendChild(croppedImage)


    }

    const handeRotate = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const originalImage = new Image();
        originalImage.src = imgSrc;
        originalImage.onload = () => {
            const element = imageRef.current;
            const original_width = parseFloat(
                getComputedStyle(element).getPropertyValue('width').replace('px', '')
            );
            const original_height = parseFloat(
                getComputedStyle(element).getPropertyValue('height').replace('px', '')
            );
            const maxDimension = Math.max(original_width, original_height);
            canvas.width = maxDimension;
            canvas.height = maxDimension;
            ctx.translate(maxDimension / 2, maxDimension / 2);
            ctx.rotate((90 * Math.PI) / 180);

            const scaleFactor = maxDimension / Math.max(original_width, original_height);
            const scaledWidth = original_width * scaleFactor;
            const scaledHeight = original_height * scaleFactor;
            ctx.drawImage(
                originalImage,
                -scaledWidth / 2,
                -scaledHeight / 2,
                scaledWidth,
                scaledHeight
            );

            setImgSrc(canvas.toDataURL('image/png'));
        };
    };


    return (
        <>
            <div style={{width: '300px', height: '300px', overflow: 'hidden', position: 'relative'}}
                 ref={resizeContainerRef}
                 className={'resizable-container'}>
                <img style={{position: 'absolute', top: 0, left: 0,}} src={imgSrc} alt="" ref={imageRef}
                />

                <div className='resizable' ref={resizableRef}>
                    <div className='resizers'>
                        <div className='resizer top-left' ref={(el) => (resizersRef.current[0] = el)}/>
                        <div className='resizer top-right' ref={(el) => (resizersRef.current[1] = el)}/>
                        <div className='resizer bottom-left' ref={(el) => (resizersRef.current[2] = el)}/>
                        <div className='resizer bottom-right' ref={(el) => (resizersRef.current[3] = el)}/>
                    </div>
                </div>
            </div>

            <button onClick={() => handeRotate('increase')}>rotate -></button>
            <button onClick={handleCropImage}>crop</button>
            <div id={'demo'}></div>
        </>
    );
}

export default ResizeComponent;
