import useLocalStorage from "./useLocalStorage";

export function useUpdate() {
    const [progress, setProgress] = useLocalStorage("progress", null);

}