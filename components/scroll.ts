import { useEffect } from 'react';

export default function Scroll({onScroll}: any) {
    useEffect(function mount() {

        window.addEventListener("scroll", onScroll);

        return function unMount() {
            window.removeEventListener("scroll", onScroll);
        };
    })

    return null;
}