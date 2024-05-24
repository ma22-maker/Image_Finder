import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseurl = process.env.EXPO_PUBLIC_API_URL;
const api_key = process.env.EXPO_PUBLIC_API_KEY;
const page = 1;
const per_page = 25;
const staleTime = 1000 * 60 * 60 * 2;

export function useGetTopics() {
  return useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      try {
        //console.log(await axios.get(`${baseurl}/topics/?client_id=${api_key}&page=${page}&per_page=${per_page}&order_by=latest`))
        const resp = await axios.get(
          `${baseurl}/topics/?client_id=${api_key}&page=${page}&per_page=${per_page}&order_by=latest`
        );
        // console.log(resp.data)
        const extractedCategories = resp?.data?.map((category) => ({
          id: category.id,
          title: category.title,
          photo: category.preview_photos[1].urls,
        }));
        // console.log(extractedCategories)
        return extractedCategories;
      } catch (error) {
        console.error("Error fetching topics:", error);
        return [];
      }
    },
  });
}

export function useGetTrends() {
  return useQuery({
    queryKey: ["trends"],
    queryFn: async () => {
      try {
        //console.log(await axios.get(`${baseurl}/topics/?client_id=${api_key}&page=${page}&per_page=${per_page}&order_by=latest`))
        const resp = await axios.get(
          `${baseurl}/photos/?client_id=${api_key}&page=${page}&per_page=${per_page}&order_by=popular`
        );
        //console.log(resp.data)
        const extractedTrends = resp?.data?.map((trends) => ({
          width: trends.width,
          height: trends.height,
          description: trends.description,
          id: trends.id,
          blur_hash: trends.blur_hash,
          urls: trends.urls,
        }));
        // console.log(extractedTrends)
        return extractedTrends;
      } catch (error) {
        console.error("Error fetching Trends:", error);
        return [];
      }
    },
  });
}

export function useGetCollections() {
  return useQuery({
    queryKey: ["Collections"],
    queryFn: async () => {
      try {
        const resp = await axios.get(
          `${baseurl}/collections/?client_id=${api_key}&page=${page}&per_page=${per_page}`
        );
        // console.log(resp.data)
        const extractedCollec = resp?.data?.map((collec) => ({
          id: collec.id,
          title: collec.title,
          preview_photos: collec.preview_photos,
        }));
        // console.log(extractedCollec)
        return extractedCollec;
      } catch (error) {
        console.error("Error fetching collections:", error);
        return [];
      }
    },
  });
}

export function useGetRandomPhotos() {
  return useQuery({
    queryKey: ["RamdomPhotos"],
    queryFn: async () => {
      try {
        const resp = await axios.get(
          `${baseurl}/photos/random/?client_id=${api_key}&count=${per_page}`
        );
        // console.log(resp.data)
        const extractedRndomphotos = resp?.data?.map((random) => ({
          width: random.width,
          height: random.height,
          id: random.id,
          blur_hash: random.blur_hash,
          urls: random.urls,
        }));
        // console.log("random",extractedRndomphotos)
        return (extractedRndomphotos);
      } catch (error) {
        console.error("Error fetching RamdomPhotos:", error);
        return [];
      }
    },
  });
}


    export function useGetGeneratedPic() {
      return useQuery({
        queryKey: ["GeneratedPic"],
        queryFn: async () => {
          const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjhiYmVjMTI5NGU3NjY4M2EwYzgwNjJhOWM0YTU2ZjA2IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMjNUMTM6NTA6NTkuNDc4ODIzIn0.UjUQMybosHTMTtuqrD0dPwcU0WKbi2JTPRnrHJXCpZw'
            },
            body: JSON.stringify({
              aspect_ratio: 'square',
              guidance_scale: 7.5,
              negprompt: 'deformed, bad anatomy, disfigured, poorly drawn face',
              prompt: 'tree walking on a muddey road in japan',
              safe_filter: true,
              samples: 1,
              seed: 2414,
              steps: 15,
              style: 'lowpoly'
            })
          };
      
          try {
            const response = await fetch('https://api.monsterapi.ai/v1/generate/txt2img', options);
            if (!response.ok) {
              throw new Error(`API request failed with status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data)
            console.log(data.process_id)
           return(data)
          } catch (err) {
            console.log(err.message);
          }
      
        },
      });
    }
    
  
    export function useGetGeneratedImage(processId) {
      return useQuery({
        queryKey: ["GeneratedImage", processId], 
        queryFn: async () => {
          if (!processId) {
            return null; 
          }
    
          const statusOptions = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjhiYmVjMTI5NGU3NjY4M2EwYzgwNjJhOWM0YTU2ZjA2IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMjNUMTM6NTA6NTkuNDc4ODIzIn0.UjUQMybosHTMTtuqrD0dPwcU0WKbi2JTPRnrHJXCpZw' // Replace with your actual API key
            }
          };
    
          const resp = await fetch(`https://api.monsterapi.ai/v1/status/${processId}`, statusOptions);
          if (!resp.ok) {
            throw new Error(`Failed to retrieve image status: ${statusResponse.status}`);
          }
    
          const imageData = await resp.json();
          console.log(imageData)
          return imageData; 
        },
        enabled: !!processId,
      });
    }
  