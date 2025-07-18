import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Content from "./components/Content";


function App() {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    async function fetchData() {
      const today = new Date().toDateString();
      const localStorageKey = `NASA-${today}`;
      if (localStorage.getItem(localStorageKey)) {
        const cachedData = JSON.parse(localStorage.getItem(localStorageKey));
        setData(cachedData);
        console.log("Using cached data:", cachedData);
        return;
      }
      
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);
        const apiJson = await response.json();
        localStorage.setItem(localStorageKey, JSON.stringify(apiJson));
        setData(apiJson);
        setLoading(false);
        console.log("Using api data:", apiJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
    
    <Content data={data}> </Content>
    {showModal && (<SideBar data={data} toggleModal={toggleModal}> </SideBar>)}
    <Footer data={data} toggleModal={toggleModal} />
    </>
  )
}

export default App
