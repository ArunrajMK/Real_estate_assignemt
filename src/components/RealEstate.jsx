import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./style.css"
function RealEstate() {

    const [data,setData] = useState([])
    const [query, setQuery] = useState("")
    const [city, setCity] = useState("")
    const [type, setType] = useState(['villa','house','appartment'])
    const [location, setLocation] = useState([])
    

const handleClick = ()=>{
    getData(query,type)
}

const getData = (query,type)=>{
    console.log("data location",location)
    axios({
        method:"GET",
        url:"http://localhost:8080/data",
        params:{
            q:`${query}`,
            type:type,
           
        }
    })
    .then((res)=>{
      setData(res.data)
    })
    .then((err)=>{

    })
}


const handleAdd = (data)=>{
   let color = ""
if(data.fav==="red"){
   color = "teal"
}
if(data.fav==="teal"){
    color ="red"
 }
console.log("color",color)
    axios({
        method:"PATCH",
        url:`http://localhost:8080/data/${data.id}`,
        data:{
            fav:color
        }
       
    })
    .then((res)=>{
       
    })
    .then((err)=>{

    })
    getData(query,type)
}


useEffect(()=>{
getData(query)
},[query])

console.log("data",data)

  return (
    <div>
           <input onChange={(e)=>setQuery(e.target.value)} placeholder="Search"/><br/>
           <select  onChange={(e)=>setQuery(e.target.value)}>
            <option value="#">City</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="rewa">Rewa</option>
           </select>
           <select onChange={(e)=>setQuery(e.target.value)}>
            <option value="#">Price</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
           </select>
           <select onChange={(e)=>setQuery(e.target.value)}>
            <option value="#">Property type</option>
            <option value="house">House</option>
            <option value="appartment">Appartment</option>
            <option value="villa">Villa</option>
           </select>
           <button onClick={handleClick}>Submit</button>

        <div id="container">
         
            {data.map((item)=>(
                <div id="card">
                   <img src={item.image} alt={item.name} id="image" />
                    <div>
                        <h6>${item.price}/month</h6>
                        <h5>{item.name}</h5>
                        <p>{item.address}</p>
                        <div id="bottom">
                            <p>{item.noofbeds}</p> 
                            <p>{item.noofbathroom}</p> 
                            <p>{item.area}</p>
                           <button style={{color:`${item.fav}`, fontSize:"30px", fontWeight:"bolder"}} onClick={()=>handleAdd(item)}>♡</button>
                        </div>
                    </div>
                    </div>
            ))}

        </div>
    </div>
  )
}

export default RealEstate