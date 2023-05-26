import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback( async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : "GET", /* so if it is set, than X if not than lófasz and so on */
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body): null,
          }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();   
        applyData(data);

      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, []);

    return {
        /* isLoadingState: isLoading, 
        errorState: error,
        sendRequestProp: sendRequest */
        /* the abowe could be written like this: 
        isLoading: isLoading, 
        error: error,
        sendRequest: sendRequest */
        //And if we are this negligentm than there is a shoertcut, from which there is a sense in being negligent:
        isLoading, 
        error,
        sendRequest
    };
};

export default useHttp;