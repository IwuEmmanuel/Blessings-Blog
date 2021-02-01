import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client";





export default function AllPosts(){
    const [allPostsData, setAllPosts]  = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "post"]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`
        )
        .then((data) => setAllPosts(data))
        .catch(console.error); 
    }, []);
    
    return (
        <div className="bg-gray-200 container mx-auto min-h-screen p-12">
            <h2 className="text-5xl flex justify-center"> Food Blog </h2>
            <h3 className="text-lg text-gray-600 flex justify-center pb-5 pt-4">Discover the beauty of Marrakech Cusines.</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {allPostsData &&
                   allPostsData.map((post, index) => (
                       <Link to={"/" + post.slug.current} key={post.slug.current}>
                              <div key={index}>
                                    <div className=" mx-auto pt-10 pb-10">
                                        <ul>                                          
                                            <li className="my-2 px-2 w-full overflow-hidden">
                                                
                                                    <div className="mx-2 flex items-center justify-center bg-gray-300 bg-cover bg-center relative rounded overflow-hidden" 
                                                    style={{height:"300px", backgroundImage: 'url(' + post.mainImage.asset.url + ')'}}>
                                                        <div className="absolute w-full h-full bg-black z-10 opacity-50"></div>
                                                        <div className="relative z-20 text-center p-5">
                                                            <span className="inline-block text-white uppercase text-xs tracking-wide">Food</span>
                                                            <h2 className="text-white font-semibold font-serif text-xl my-5">{post.title}</h2>
                                                            <span className="inline-block text-xs text-white font-sans">Check Receipe</span>
                                                        </div>
                                                    </div>
                                                
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                       </Link>
                   ))}
            </div>
        </div>
    )
}