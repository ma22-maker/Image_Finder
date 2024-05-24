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


    // export function useGetGeneratedPic() {
    //   return useQuery({
    //     queryKey: ["GeneratedPic"],
    //     queryFn: async () => {
    //       try {
    //         const response = await axios.post(
    //             'https://api.openai.com/v1/images/generations',
    //             {
    //                 model: 'dall-e-2',
    //                 prompt:'tree walking on the muddy road when it is raining',
    //                 n: 1,
    //                 size: '1024x1024',
    //             },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: "Bearer sk-proj-qTDABbtXbixNe3b7LUwfT3BlbkFJvm7cSoOsYWdi1mRGzuox",
    //                 },
    //             }
    //         );
    //         console.log(response.data);
    //         console.log(response.data.data[0].url);
    //     } catch (error) {
    //       console.error('Error generating image from chatgpt:', error);
    //       setError(error.message);
    //   } 
    //     },
    //   });
    // }
    
  