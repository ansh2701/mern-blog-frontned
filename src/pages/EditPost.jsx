import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { redirect, useFetcher, useLoaderData } from 'react-router-dom'

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export async function editAction({request,params}) {
      const data = await request.formData()
      const values = Object.fromEntries(data)
      console.log(values)
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'file' || value.name) {
          formData.append(key, value);
        }
      });
      formData.append("id" , params.id)

      const response = await fetch("http://localhost:4000/post", {
        method : "PUT",
        body : formData,
        credentials : 'include'
      })

      if(response.ok){
        return redirect('/post/'+params.id)
      }
      return null
}

const EditPost = () => {
    const data = useLoaderData()
  
    const [content,setContent] = useState(data.content)
    const fetcher = useFetcher()
    const submitting = fetcher.state === "submitting"
    return (
      <fetcher.Form method='put' encType="multipart/form-data">
          <input type='text' placeholder='Title' name='title' defaultValue={data.title}/>
          <input type="text" placeholder='Summary' name='summary' defaultValue={data.summary}/>
          <input type="file" name="file"/>
          <ReactQuill theme='snow' modules={modules} formats={formats} value={content} onChange={newValue =>setContent(newValue)}/>
          <input type="hidden" value={content} name='content' />
          <button type='submit' disabled={submitting} style={{marginTop:'5px'}}> {submitting ? "Submitting...":"Edit Post" }</button>
      </fetcher.Form>
    )
}

export default EditPost