import React from 'react'
import { useGlobalContext } from './context'

const Stories = () => {
  const{hits,query,removeStory} = useGlobalContext()   //hints is array of object and includes title,points,etc.


  return(
    <section className='stories'>
      {hits.map((story)=>{
        return(
          <article className='story'>
            <h4 className='title'>{story.title}</h4>
            <p className='info'>{story.points}  points by 
            <span>{story.author}  | </span>
            {story.num_comments}  comments
            </p>
            <div>
              <a href={story.url} className='read-link'>read more</a>
              <button className='remove-btn' onClick={()=>removeStory(story.objectID)}>remove</button>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Stories
