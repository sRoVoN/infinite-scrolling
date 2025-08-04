import { useEffect } from "react";

const useInfiniteScroll = (ref, callback, dependencies= []) =>{
    useEffect(() => {
        const target = ref?.current;
        if(!target) return;

        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting){
                callback();
            }
        }, {threshold: 1});
        observer.observe(target);

        return() => {
            if(target) observer.unobserve(target);
        }

    }, [ref, ...dependencies])
    
}
export default useInfiniteScroll;