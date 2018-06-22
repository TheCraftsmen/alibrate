import React from 'react';
import Svg,{ Path, Polygon } from 'react-native-svg';

export default class SvgTitle extends React.Component {
    render() {
        return (
            <Svg height="200" width="500" fill="white">
                <Path id="Fill-1" fill="white" d="M12.5,0.4L0,57.6h7.9L10.5,43h12.3l2.6,14.6h7.9L21.7,0.4H12.5z M16.7,8.8h0.2l4.9,27.6h-10    L16.7,8.8z"/>
                <Polygon id="Fill-2" fill="white" points="43,0.4 43,57.6 64.2,57.6 64.2,50.9 50.9,50.9 50.9,0.4   "/>
                <Path id="Fill-3" fill="white" d="M100.9,51.4h4.9c4.5,0,5.3-1.3,5.3-10.4c0-8.6-0.7-9.9-5.1-9.9h-5.1V51.4z M100.9,24.9h4.6    c4.7,0,5.2-1,5.2-10.3c0-6.5-1-8.1-6.1-8.1h-3.7V24.9z M93,0.4h13.7c9.7,0,11.4,3.4,11.4,13.9c0,11.2-1.8,13.1-7.2,13.8v0.2    c6.3,1.2,7.6,3.3,7.6,13.1c0,12.4-1.6,16.3-13.1,16.3H93V0.4z"/>
                <Path id="Fill-5" fill="white" d="M137.5,26h2.1c6.2,0,7.1-1.2,7.1-9.7c0-8.5-0.5-9.3-5.4-9.3h-3.8V26z M129.6,0.4h12.2    c11.5,0,12.7,3.1,12.7,15.6c0,7.7-1,11-7.5,13v0.2c5.4,0.6,7.2,3.3,7.2,8.7v12.4c0,2.1,0,4.9,0.5,7.3h-7.4    c-0.8-1.4-0.9-2.9-0.9-5.1V39.5c0-5.4-0.9-6.8-6.2-6.8h-2.7v24.9h-7.9V0.4z"/>
                <Path id="Fill-8" fill="white" d="M175.8,36.3h10L181,8.8h-0.2L175.8,36.3z M176.7,0.4h9.2l11.6,57.2h-7.9L186.9,43h-12.3L172,57.6    h-7.9L176.7,0.4z"/>
                <Polygon id="Fill-10" fill="white" points="198.4,0.4 225.2,0.4 225.2,7 215.8,7 215.8,57.6 207.9,57.6 207.9,7 198.4,7   "/>
                <Polygon id="Fill-13" fill="white" points="73,6.7 81.8,6.7 81.8,0 73,0   "/>
                <Polygon id="Fill-13-Copy" fill="white" points="73,57.6 81.8,57.6 81.8,50.9 73,50.9   "/>
                <Polygon id="Fill-15" fill="white" points="73,11.1 81.8,11.1 81.8,9 73,9   "/>
                <Polygon id="Fill-15-Copy-2" fill="white" points="73,14.6 81.8,14.6 81.8,12.5 73,12.5   "/>
                <Polygon id="Fill-15-Copy" fill="white" points="73,48.6 81.8,48.6 81.8,46.4 73,46.4   "/>
                <Polygon id="Fill-16" fill="white" points="73.1,44.1 81.9,44.1 81.9,17 73.1,17   "/>
                <Polygon id="Fill-17" fill="white" points="234.5,0.4 256,0.4 256,7 242.4,7 242.4,24.9 255.2,24.9 255.2,31.6 242.4,31.6     242.4,50.9 256,50.9 256,57.6 234.5,57.6   "/>
            </Svg>
        );
    }
}