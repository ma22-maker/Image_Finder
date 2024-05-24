import axios from 'axios'

const baseurl =process.env.EXPO_PUBLIC_API_URL
const api_key = process.env.EXPO_PUBLIC_API_KEY
const page= 1
const per_page = 25

export const gettopics = async () => {
    const {data} = await axios.get(`${baseurl}/topics/?client_id=${api_key}&page=${page}&per_page=${per_page}&order_by=latest`)
    const topics = data.map(topic => ({
      id: topic.id,
      title: topic.title
    }));
    console.log(topics)
    return topics;
  }
  
  export default  getTrendingPic = async () =>{
    try {
      const {Trends} = await axios.get(`${baseurl}/photos/?client_id=${api_key}&page=${page}&per_page=${per_page}&order_by=popular`)
    console.log(Trends)
    return Trends
      
    } catch (error) {
      console.log(error.message)
      
    }
  }

  export const getGreetingTime = () => {
    const currentTime = new Date().getHours();
  
    if (currentTime < 12) {
      return 'Good morning!';
    } else if (currentTime < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };
  