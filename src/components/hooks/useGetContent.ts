import { useEffect, useState } from "react";
import { apiConnector } from "../../operations/apiconnector";
import { endPoints } from "../../operations/api";
import { useRecoilValue} from "recoil";
import {  contentRefreshTriggerAtom } from "../Recoil/store/atom/contentAtom";


interface UseGetContentProps {
  // fetched: boolean;
  setFetched: (value: boolean) => void;
}


export default function useGetContent({setFetched}:UseGetContentProps) {
  const [content, setContent] = useState([]);


  
  const refreshTrigger = useRecoilValue(contentRefreshTriggerAtom);
  console.log("UseGetCOntent called")
  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await apiConnector({
          method: "get",
          url: endPoints.CONTENT,
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        console.log("response from getConetntt", response);
        setContent(response.data.content);
        setFetched(true)
       
      } catch (err) {}
    }

    fetchContent();
  }, [refreshTrigger]);

  return content;
}
