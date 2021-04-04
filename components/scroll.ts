import React, {useEffect} from 'react';

export default function Scroll(props) {
    useEffect(function mount(){
      
        window.addEventListener("scroll", props.onScroll);

        return function unMount() {
            window.removeEventListener("scroll", props.onScroll);
        };
    })

    return null;
}