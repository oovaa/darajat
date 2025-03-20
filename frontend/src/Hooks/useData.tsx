import useFetch from "./useFetch";
import useLocalStorage from "./useLocalStorage";
import { useState, useEffect } from "react";

// TODO: Add parameters to the function according to the body of the requests
// This hook will only take the onboarding form data
// The user name will be saved separately using useLocalStorage do don't worry
export function useData(data: {
    hoursPerDay: number;
    titles: string[];
    lastYear: number;
    yearsMissed: number;
}) {
    const [planData, setPlanData] = useLocalStorage("plan", null);
    const [contentData, setContentData] = useLocalStorage("content", null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    // State to store the URL dynamically
    const [planUrl, setPlanUrl] = useState<string>('');
    const [contentUrl, setContentUrl] = useState<string>('');

    // Function to update the error state
    const updateError = (newError: Error | null) => {
        setError((prevError) => prevError || newError);
    };

    const updateLoading = (newLoading: boolean) => {
        setLoading((prevLoading) => prevLoading || newLoading);
    };

    // Convert the data object to a JSON string for the body parameter
    const { data: plan, error: planError, loading: planLoading } = useFetch(planUrl, { body: JSON.stringify(data) });

    // Fetch content data using the URL (it will be null if content data is already in local storage)
    // TODO: Add parameters to the function according to the planData
    const { data: content, error: contentError, loading: contentLoading } = useFetch(contentUrl);

    // Update local storage and states when the data is fetched
    useEffect(() => {
        if (plan && !planData) {
            setPlanData(plan);
            updateError(planError);
            updateLoading(planLoading);
        }
    }, [plan, planData, planError, planLoading, setPlanData]);

    useEffect(() => {
        if (content && !contentData) {
            setContentData(content);
            updateError(contentError);
            updateLoading(contentLoading);
        }
    }, [content, contentData, contentError, contentLoading, setContentData]);

    // Set the loading state to true if either plan or content is loading
    useEffect(() => {
        setLoading(planLoading || contentLoading);
    }, [planLoading, contentLoading]);

    // Function to trigger fetching data
    const sendData = () => {
        if (!planData) {
            setPlanUrl(`${import.meta.env.VITE_API_BASE_URL}/plan`);
        } if (!contentData) {
            setContentUrl(`${import.meta.env.VITE_API_BASE_URL}/generate-content`);
        }
    };

    return {
        error,
        loading,
        sendData,
    };
}
