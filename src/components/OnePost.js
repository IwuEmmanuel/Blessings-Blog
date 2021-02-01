import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source){
    return builder.image(source);
}


export default function OnePost(){
    
      const [postData, setPostData] = useState(null);
      const { slug } = useParams();

      useEffect(() => {
          sanityClient.fetch(
              `*[slug.current == $slug]{
                  title,
                  slug,
                  mainImage{
                      asset->{
                          _id,
                          url
                      }
                  },
                  body,
                  "name": author->name,
                  "authorImage": author->image
              }`, 
              {slug}
          )
          .then((data) => setPostData(data[0]))
          .catch(console.error);          
      }, [slug]);
      
      if (!postData) return <div>Loading... Please wait...</div>;


    return (
        <main className="max-w-2xl mx-auto pb-10 pt-10">
               <div className="w-full overflow-hidden min-h-screen">
                  <div className="mr-2 md:mr-4 ml-2">
                        <div className="pb-40">
                            <div className="text-center">
                                <img className="article-image bg-contain" src={urlFor(postData.mainImage).width(600).url()} alt=""/>
                                <h2 className="text-gray-900 font-serif text-3xl my-5 font-thin">{postData.title}</h2>
                                <div className="article-body text-left">
                                    <BlockContent
                                        blocks={postData.body}
                                        projectId={sanityClient.clientConfig.projectId}
                                        dataset={sanityClient.clientConfig.dataset}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            
            <div className="w-full overflow-hidden">
                <div className="ml-2 md:ml-4 mr-2">
                    <div className="mt-20 sm:mt-0 text-center">
                        <img className="w-55 h-55 rounded-full mx-auto" src={urlFor(postData.authorImage).width(100).url()} alt="Emmanuel"/>
                        <h2 className="font-light text-xl my-5">{postData.name}</h2>
                        <p className="article-body">Hi! Welcome to Raalhu theme preview. Raalhu is a minimal blog theme built with tailwindcss. It is an html theme available free of change, with only a few page templates. Enjoy!</p>
                    </div>
                </div>
            </div>
        </main>
    )
}