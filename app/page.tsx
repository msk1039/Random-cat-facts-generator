"use client";
import Image from "next/image";
import { Boxes } from "@/components/ui/background-boxes";

import styles from "./page.module.css";
import { Suspense, useState ,useEffect} from "react";
// import getFacts from "./api/api";
import Loading from "./loading";

export default function Home() {
  let [facts,updateFacts] = useState("click the button to fetch");

  const [isLoading, setIsLoading] = useState(false);
  let [imgUrl , updateUrl] = useState("https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg");

  // async function getImg() {
  //   try {
  //     const img = await fetch("https://api.thecatapi.com/v1/images/search");
  //     const imgData = await img.json();
  //     console.log(imgData[0].url);
  //     const url = imgData[0].url;
  //     updateUrl(url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async function getText() {
    try {
      const response = await fetch(
        "https://meowfacts.herokuapp.com/"
      );
      const data = await response.json();
      console.log(data.data[0]);
      updateFacts(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getImage() {
    try {
      const img = await fetch("https://api.thecatapi.com/v1/images/search");
      const imgData = await img.json();
      console.log(imgData[0].url);
      const url = imgData[0].url;
      updateUrl(url);
    } catch (error) {
      console.log(error);
    }
  }


  async function getFacts() {
    try {
      setIsLoading(true);
      await getImage();
      await getText();
      setIsLoading(false);
     

    } catch (error) {
      console.log(error);
    }
  }


  const myLoader=()=>{
    return imgUrl;
  }
  

 
  // const triggerGetFacts = async () => {
  //   // facts = await getFacts();
  //   console.log(facts);
  // };
  return (
    <>

    <Boxes/>
    <main className={styles.main}>
      <h1 className={styles.heading}>Random Cat Facts</h1>


      
      
      <div className={styles.container}>
        
        <button className={styles.fetchButton} onClick={getFacts}>fetch  </button>
        {/* <div className={styles.fetchSpan}></div> */}
        {/* <Image alt="cat"  className={styles.fetchSpan} width={20} height={20} src={'./cat-paw.svg'}></Image> */}
        
        <p className={styles.factsText}>
          {  isLoading ? <span>Loading</span> :facts}
        </p>

       
       {   isLoading ?  <Loading /> :  <Image className="cat-image" loader={myLoader} src={imgUrl} alt="cat" width={300} height={300} />} 

      </div>
    </main>




    </>
    
  );
}
